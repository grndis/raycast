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
      // Don't log the full response for binary data to avoid console spam
      if (proxyData.info && proxyData.info.headers && proxyData.info.headers['content-type'] && 
          (proxyData.info.headers['content-type'].includes('application/zip') ||
           proxyData.info.headers['content-type'].includes('application/octet-stream'))) {
        console.log(`[PROXY] Response: Binary file, size: ${proxyData.body ? proxyData.body.length : 0} bytes`);
      } else {
        console.log(`[PROXY] Response:`, JSON.stringify(proxyData, null, 2));
      }

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

      // Return the full proxy response with headers and body
      const contentType = proxyData.info.headers ? proxyData.info.headers['content-type'] : null;
      let processedData = proxyData.body;
      
      // Handle different content types
      if (proxyData.isBinary) {
        // For binary content, the data is base64 encoded - convert back to buffer
        processedData = Buffer.from(proxyData.body, 'base64');
      } else if (contentType && contentType.includes('application/json')) {
        // For JSON content, parse if it's a string
        if (typeof processedData === 'string') {
          try {
            processedData = JSON.parse(processedData);
          } catch (e) {
            // If parsing fails, keep as string
            console.warn('[PROXY] Failed to parse JSON response:', e.message);
          }
        }
      }
      
      return {
        data: processedData,
        headers: proxyData.info.headers || {},
        statusCode: proxyData.info.statusCode,
        contentType: contentType,
        isBinary: proxyData.isBinary || false
      };
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

      const contentType = response.headers.get('content-type') || '';
      
      // Handle different content types
      if (contentType.includes('application/json')) {
        const data = await response.json();
        return {
          data: data,
          headers: Object.fromEntries(response.headers.entries()),
          statusCode: response.status,
          contentType: contentType,
          isBinary: false
        };
      } else if (contentType.includes('application/zip') || 
                 contentType.includes('application/octet-stream') ||
                 contentType.includes('application/x-zip')) {
        // For binary data, return as buffer
        const buffer = await response.buffer();
        return {
          data: buffer,
          headers: Object.fromEntries(response.headers.entries()),
          statusCode: response.status,
          contentType: contentType,
          isBinary: true
        };
      } else {
        // For text content
        const text = await response.text();
        return {
          data: text,
          headers: Object.fromEntries(response.headers.entries()),
          statusCode: response.status,
          contentType: contentType,
          isBinary: false
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async fetch(url, options = {}) {
    const proxyMode = process.env.RAYCAST_PROXY_MODE || "auto";

    console.log(`[PROXY] Fetching ${url}, proxy mode: ${proxyMode}`);
    
    // For extension downloads, always use direct fetch to avoid proxy size limits
    if (url.includes('raycast-store-extensions.s3') || 
        url.includes('raycast-extension-downloads.s3') ||
        url.includes('.zip')) {
      console.log(`[PROXY] Detected extension download, using direct fetch`);
      try {
        const response = await this.directFetch(url, options);
        console.log(`[PROXY] Direct fetch successful for download`);
        return response;
      } catch (error) {
        console.log(`[PROXY] Direct fetch failed for download: ${error.message}`);
        throw error;
      }
    }

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

    // For backward compatibility, if response has data property, return the structured response
    // Otherwise return the response as-is (for JSON responses)
    if (response && typeof response === 'object' && response.hasOwnProperty('data')) {
      return response;
    }
    
    // Legacy format - wrap in structure for consistency
    return {
      data: response,
      headers: {},
      statusCode: 200,
      contentType: 'application/json',
      isBinary: false
    };
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
