const fetch = require('node-fetch');

const BASE_URL = 'https://backend.raycast.com/api/v1';

async function getBackendResponse(url, headers = {}, method = 'GET', data = null) {
  const requestHeaders = {
    ...headers,
    'x-raycast-unblock': 'true',
    'host': 'backend.raycast.com'
  };

  const options = {
    method,
    headers: requestHeaders
  };

  if (data && method !== 'GET') {
    options.body = typeof data === 'string' ? data : JSON.stringify(data);
    options.headers['content-type'] = 'application/json';
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[Raycast Backend] Request error:', {
      url: `${BASE_URL}${url}`,
      method,
      error: error.message
    });
    throw error;
  }
}

module.exports = { getBackendResponse };