const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const aiRoutes = require("./routes/ai");
const meRoutes = require("./routes/me");
const translationRoutes = require("./routes/translations");

// API routes - handle all AI endpoints locally for subscription independence
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/me", meRoutes);
app.use("/api/v1/translations", translationRoutes);

// Import proxy utility for fallback routes
const { getBackendResponse } = require("./utils/request");

// Helper function to send response based on content type
function sendProxyResponse(res, response) {
  // Handle structured response format
  if (
    response &&
    typeof response === "object" &&
    response.hasOwnProperty("data")
  ) {
    const { data, headers, statusCode, contentType, isBinary } = response;

    // Set response headers
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        // Skip certain headers that Express handles or that could cause issues
        const skipHeaders = [
          "content-length",
          "transfer-encoding",
          "connection",
          "content-encoding", // Skip gzip/compression headers since we're decompressing
          "vary",
        ];
        if (!skipHeaders.includes(key.toLowerCase())) {
          res.set(key, value);
        }
      });
    }

    res.status(statusCode || 200);

    // Handle different content types
    if (
      isBinary ||
      (contentType &&
        (contentType.includes("application/zip") ||
          contentType.includes("application/octet-stream")))
    ) {
      // For binary files, send as binary
      if (Buffer.isBuffer(data)) {
        res.send(data);
      } else if (typeof data === "string") {
        // If it's a string (from proxy), convert to buffer
        res.send(Buffer.from(data, "binary"));
      } else {
        res.send(data);
      }
    } else if (contentType && contentType.includes("application/json")) {
      res.json(data);
    } else if (contentType && contentType.startsWith("text/")) {
      // For text content, send as text
      res.send(data);
    } else {
      // For other content types, send as-is
      res.send(data);
    }
  } else {
    // Legacy format - assume JSON
    res.json(response);
  }
}

// Handle specific proxy routes that should always go to Raycast backend
app.get("/api/v1/store_listings*", async (req, res) => {
  try {
    console.log(
      `[STORE_LISTINGS] Route matched: ${req.method} ${req.originalUrl}`,
    );
    console.log(
      `[STORE_LISTINGS] Proxy mode: ${process.env.RAYCAST_PROXY_MODE}`,
    );
    console.log(`[STORE_LISTINGS] Proxy URLs: ${process.env.PROXY_URLS}`);

    const response = await getBackendResponse(
      req.originalUrl,
      req.headers,
      req.method,
      req.body,
    );

    sendProxyResponse(res, response);
  } catch (error) {
    console.error("[STORE_LISTINGS] Proxy error:", error.message);
    res.status(502).json({
      error: true,
      message: "Bad Gateway - Could not reach Raycast backend",
      statusCode: 502,
      details: error.message,
    });
  }
});

app.get("/api/v1/extensions*", async (req, res) => {
  try {
    console.log(`[EXTENSIONS] Route matched: ${req.method} ${req.originalUrl}`);

    const response = await getBackendResponse(
      req.originalUrl,
      req.headers,
      req.method,
      req.body,
    );

    sendProxyResponse(res, response);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(502).json({
      error: true,
      message: "Bad Gateway - Could not reach Raycast backend",
      statusCode: 502,
      details: error.message,
    });
  }
});

app.get("/api/v1/commands*", async (req, res) => {
  try {
    console.log(`[COMMANDS] Route matched: ${req.method} ${req.originalUrl}`);

    // Check if this is a request for user's commands
    if (req.originalUrl.includes("/api/v1/commands")) {
      console.log(`[COMMANDS] Returning empty commands list for local mode`);
      res.json({
        data: [],
        meta: {
          total: 0,
          page: 1,
          per_page: 25,
        },
      });
      return;
    }

    const response = await getBackendResponse(
      req.originalUrl,
      req.headers,
      req.method,
      req.body,
    );

    sendProxyResponse(res, response);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(502).json({
      error: true,
      message: "Bad Gateway - Could not reach Raycast backend",
      statusCode: 502,
      details: error.message,
    });
  }
});

// Test endpoint for extension downloads
app.get("/test/download/:extensionId", async (req, res) => {
  try {
    console.log(
      `[TEST_DOWNLOAD] Testing download for extension: ${req.params.extensionId}`,
    );

    // First get the store listing to get the download URL
    const storeResponse = await getBackendResponse(
      "/store_listings",
      req.headers,
      "GET",
    );

    if (!storeResponse.data || !storeResponse.data.data) {
      throw new Error("Failed to get store listings");
    }

    // Find the extension by name or use the first one for testing
    const extension =
      storeResponse.data.data.find(
        (ext) =>
          ext.name === req.params.extensionId ||
          ext.id === req.params.extensionId,
      ) || storeResponse.data.data[0];

    if (!extension || !extension.download_url) {
      throw new Error("Extension not found or no download URL");
    }

    console.log(
      `[TEST_DOWNLOAD] Found extension: ${extension.name}, downloading from: ${extension.download_url}`,
    );

    // Now download the extension using our proxy system
    const fetch = require("node-fetch");
    const response = await fetch(extension.download_url, {
      headers: {
        "User-Agent": "Raycast/1.101.1 (macOS)",
        Accept: "application/zip",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Download failed: ${response.status} ${response.statusText}`,
      );
    }

    // Stream the response
    res.set({
      "Content-Type": response.headers.get("content-type") || "application/zip",
      "Content-Disposition":
        response.headers.get("content-disposition") ||
        `attachment; filename="${extension.name}.zip"`,
      "Content-Length": response.headers.get("content-length"),
    });

    response.body.pipe(res);
  } catch (error) {
    console.error("[TEST_DOWNLOAD] Error:", error.message);
    res.status(500).json({
      error: true,
      message: "Download failed",
      details: error.message,
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Catch-all for any other API routes that should be proxied
app.use("/api/v1/*", async (req, res) => {
  try {
    console.log(
      `[API_PROXY] Forwarding unmatched route ${req.method} ${req.originalUrl} to Raycast backend`,
    );

    const response = await getBackendResponse(
      req.originalUrl,
      req.headers,
      req.method,
      req.body,
    );

    sendProxyResponse(res, response);
  } catch (error) {
    console.error("[API_PROXY] Proxy error:", error.message);
    res.status(502).json({
      error: true,
      message: "Bad Gateway - Could not reach Raycast backend",
      statusCode: 502,
      details: error.message,
    });
  }
});

// Fallback handling
if (!process.env.RAYCAST_EMAIL) {
  console.log(
    "🔄 Running in proxy mode - forwarding remaining routes to Raycast backend",
  );

  // Handle all remaining unmatched routes with custom proxy
  app.use("*", async (req, res) => {
    try {
      console.log(
        `[PROXY] Forwarding remaining route ${req.method} ${req.originalUrl}`,
      );

      const response = await getBackendResponse(
        req.originalUrl,
        req.headers,
        req.method,
        req.body,
      );

      sendProxyResponse(res, response);
    } catch (error) {
      console.error("Proxy error:", error.message);
      res.status(502).json({
        error: true,
        message: "Bad Gateway - Could not reach Raycast backend",
        statusCode: 502,
        details: error.message,
      });
    }
  });
} else {
  console.log(
    `✅ Running in hybrid mode with email: ${process.env.RAYCAST_EMAIL}`,
  );
  console.log(
    `📡 Specific routes (store_listings, extensions, etc.) will still be proxied`,
  );

  // 404 handler for local mode (only for unhandled routes)
  app.use("*", (req, res) => {
    res.status(404).json({
      error: true,
      message: "Not Found",
      statusCode: 404,
      path: req.originalUrl,
    });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: true,
    message: err.message || "Internal Server Error",
    statusCode: 500,
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Raycast Local server running on http://0.0.0.0:${PORT}`);
  console.log(
    `📧 Email: ${process.env.RAYCAST_EMAIL || "Not set (proxy mode)"}`,
  );
  console.log(`🔑 API Key: ${process.env.OPENAI_API_KEY ? "Set" : "Not set"}`);
  console.log(
    `🌐 Base URL: ${process.env.OPENAI_BASE_URL || "Default OpenAI"}`,
  );
});

module.exports = app;
