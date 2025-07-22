const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const aiRoutes = require('./routes/ai');
const meRoutes = require('./routes/me');
const translationRoutes = require('./routes/translations');

// API routes - only handle models locally, proxy chat_completions
app.use('/api/v1/ai/models', aiRoutes);
app.use('/api/v1/me', meRoutes);
app.use('/api/v1/translations', translationRoutes);

// Import proxy utility for fallback routes
const { getBackendResponse } = require('./utils/request');

// Handle specific proxy routes that should always go to Raycast backend
app.get('/api/v1/store_listings*', async (req, res) => {
  try {
    console.log(`[STORE_LISTINGS] Route matched: ${req.method} ${req.originalUrl}`);
    console.log(`[STORE_LISTINGS] Proxy mode: ${process.env.RAYCAST_PROXY_MODE}`);
    console.log(`[STORE_LISTINGS] Proxy URLs: ${process.env.PROXY_URLS}`);
    
    const response = await getBackendResponse(
      req.originalUrl, 
      req.headers, 
      req.method,
      req.body
    );
    
    res.json(response);
  } catch (error) {
    console.error('[STORE_LISTINGS] Proxy error:', error.message);
    res.status(502).json({
      error: true,
      message: 'Bad Gateway - Could not reach Raycast backend',
      statusCode: 502,
      details: error.message
    });
  }
});

app.get('/api/v1/extensions*', async (req, res) => {
  try {
    console.log(`[PROXY] Forwarding ${req.method} ${req.originalUrl} to Raycast backend`);
    
    const response = await getBackendResponse(
      req.originalUrl, 
      req.headers, 
      req.method,
      req.body
    );
    
    res.json(response);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(502).json({
      error: true,
      message: 'Bad Gateway - Could not reach Raycast backend',
      statusCode: 502,
      details: error.message
    });
  }
});

app.get('/api/v1/commands*', async (req, res) => {
  try {
    console.log(`[PROXY] Forwarding ${req.method} ${req.originalUrl} to Raycast backend`);
    
    const response = await getBackendResponse(
      req.originalUrl, 
      req.headers, 
      req.method,
      req.body
    );
    
    res.json(response);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(502).json({
      error: true,
      message: 'Bad Gateway - Could not reach Raycast backend',
      statusCode: 502,
      details: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all for any other API routes that should be proxied
app.use('/api/v1/*', async (req, res) => {
  try {
    console.log(`[API_PROXY] Forwarding unmatched route ${req.method} ${req.originalUrl} to Raycast backend`);
    
    const response = await getBackendResponse(
      req.originalUrl, 
      req.headers, 
      req.method,
      req.body
    );
    
    res.json(response);
  } catch (error) {
    console.error('[API_PROXY] Proxy error:', error.message);
    res.status(502).json({
      error: true,
      message: 'Bad Gateway - Could not reach Raycast backend',
      statusCode: 502,
      details: error.message
    });
  }
});

// Fallback handling
if (!process.env.RAYCAST_EMAIL) {
  console.log('🔄 Running in proxy mode - forwarding remaining routes to Raycast backend');
  
  // Handle all remaining unmatched routes with custom proxy
  app.use('*', async (req, res) => {
    try {
      console.log(`[PROXY] Forwarding remaining route ${req.method} ${req.originalUrl}`);
      
      const response = await getBackendResponse(
        req.originalUrl, 
        req.headers, 
        req.method,
        req.body
      );
      
      res.json(response);
    } catch (error) {
      console.error('Proxy error:', error.message);
      res.status(502).json({
        error: true,
        message: 'Bad Gateway - Could not reach Raycast backend',
        statusCode: 502,
        details: error.message
      });
    }
  });
} else {
  console.log(`✅ Running in hybrid mode with email: ${process.env.RAYCAST_EMAIL}`);
  console.log(`📡 Specific routes (store_listings, extensions, etc.) will still be proxied`);
  
  // 404 handler for local mode (only for unhandled routes)
  app.use('*', (req, res) => {
    res.status(404).json({
      error: true,
      message: 'Not Found',
      statusCode: 404,
      path: req.originalUrl
    });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    statusCode: 500
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Raycast Local server running on http://0.0.0.0:${PORT}`);
  console.log(`📧 Email: ${process.env.RAYCAST_EMAIL || 'Not set (proxy mode)'}`);
  console.log(`🔑 API Key: ${process.env.OPENAI_API_KEY ? 'Set' : 'Not set'}`);
  console.log(`🌐 Base URL: ${process.env.OPENAI_BASE_URL || 'Default OpenAI'}`);
});

module.exports = app;