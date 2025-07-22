const fetch = require("node-fetch");

class ProxyFetch {
  constructor() {
    if (!process.env.PROXY_URLS) {
      console.warn(
        "[PROXY] No PROXY_URLS environment variable set. Proxy functionality will be disabled.",
      );
      this.proxyUrls = [];
    } else {
      this.proxyUrls = process.env.PROXY_URLS.split(",").map((url) =>
        url.trim(),
      );
    }

    this.userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    ];
  }

  getRefererFromUrl(url) {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}/`;
    } catch (e) {
      return "";
    }
  }

  getRandomProxyUrl() {
    if (this.proxyUrls.length === 0) {
      throw new Error(
        "No proxy URLs configured. Set PROXY_URLS environment variable.",
      );
    }
    return this.proxyUrls[Math.floor(Math.random() * this.proxyUrls.length)];
  }

  async proxyFetch(url, options = {}) {
    try {
      const proxyRequest = {
        url: url,
        headers: [
          `User-Agent: ${this.userAgents[Math.floor(Math.random() * this.userAgents.length)]}`,
          "Content-Type: application/x-www-form-urlencoded",
          "timeout: 60",
          `Referer: ${this.getRefererFromUrl(url)}`,
        ],
      };

      // Add headers from options
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (
            key.toLowerCase() !== "host" &&
            key.toLowerCase() !== "user-agent" &&
            key.toLowerCase() !== "content-type"
          ) {
            proxyRequest.headers.push(`${key}: ${value}`);
          }
        });
      }

      if (options.body) {
        proxyRequest.requestBody = options.body;
      }

      console.log(`[PROXY] Sending request to ${this.getRandomProxyUrl()}`);
      console.log(`[PROXY] Request:`, JSON.stringify(proxyRequest, null, 2));

      const response = await fetch(this.getRandomProxyUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proxyRequest),
      });

      const proxyData = await response.json();
      console.log(`[PROXY] Response:`, JSON.stringify(proxyData, null, 2));

      if (proxyData.errors) {
        throw new Error("Proxy request failed");
      }

      if (
        (proxyData.info && proxyData.info.statusCode < 200) ||
        proxyData.info.statusCode >= 300
      ) {
        throw new Error(
          `Proxy fetch received non-OK status: ${proxyData.info.statusCode}`,
        );
      }

      // Parse JSON response if it's JSON
      let responseData;
      try {
        responseData = JSON.parse(proxyData.body);
      } catch (e) {
        responseData = proxyData.body;
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async directFetch(url, options = {}) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async fetch(url, options = {}) {
    const proxyMode = process.env.RAYCAST_PROXY_MODE || "auto";

    console.log(`[PROXY] Fetching ${url}, proxy mode: ${proxyMode}`);

    // Always try direct fetch first (works when deployed to Vercel)
    if (proxyMode === "0" || proxyMode === "auto") {
      try {
        const response = await this.directFetch(url, options);
        console.log(`[PROXY] Direct fetch successful`);
        return response;
      } catch (error) {
        console.log(`[PROXY] Direct fetch failed: ${error.message}`);

        // If proxy mode is 0, don't try proxy
        if (proxyMode === "0") {
          throw error;
        }
      }
    }

    // Try proxy as fallback or if proxy mode is 1
    if (proxyMode === "1" || proxyMode === "auto") {
      try {
        console.log(`[PROXY] Attempting proxy fetch...`);
        const response = await this.proxyFetch(url, options);
        console.log(`[PROXY] Proxy fetch successful`);
        return response;
      } catch (error) {
        console.log(`[PROXY] Proxy fetch failed: ${error.message}`);
        throw new Error(
          `Both direct and proxy fetch failed. Direct: ${error.message}`,
        );
      }
    }

    throw new Error(`Invalid proxy mode: ${proxyMode}`);
  }
}

// Create a singleton instance
const proxyFetch = new ProxyFetch();

const BASE_URL = "https://backend.raycast.com/api/v1";

async function getBackendResponse(
  url,
  headers = {},
  method = "GET",
  data = null,
) {
  // Clean up headers - remove host and other problematic headers
  const cleanHeaders = { ...headers };
  delete cleanHeaders.host;
  delete cleanHeaders.connection;
  delete cleanHeaders["accept-encoding"];

  const requestHeaders = {
    ...cleanHeaders,
    "x-raycast-unblock": "true",
    host: "backend.raycast.com",
  };

  const options = {
    method,
    headers: requestHeaders,
  };

  if (data && method !== "GET") {
    options.body = typeof data === "string" ? data : JSON.stringify(data);
    options.headers["content-type"] = "application/json";
  }

  try {
    // Build the full URL - check if url already includes the base path
    const fullUrl = url.startsWith("/api/v1")
      ? `https://backend.raycast.com${url}`
      : `${BASE_URL}${url}`;

    console.log(
      `[RAYCAST] Making request to Raycast backend: ${method} ${fullUrl}`,
    );
    console.log(`[RAYCAST] Headers:`, JSON.stringify(requestHeaders, null, 2));

    // Use ProxyFetch instead of direct fetch to handle SSL issues
    const response = await proxyFetch.fetch(fullUrl, options);

    return response;
  } catch (error) {
    console.error("[Raycast Backend] Request error:", {
      url: url.startsWith("/api/v1")
        ? `https://backend.raycast.com${url}`
        : `${BASE_URL}${url}`,
      method,
      error: error.message,
    });
    throw error;
  }
}

module.exports = { getBackendResponse, ProxyFetch };
