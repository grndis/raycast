const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

// API routes
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/me', meRoutes);
app.use('/api/v1/translations', translationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy fallback (if no RAYCAST_EMAIL is set)
if (!process.env.RAYCAST_EMAIL) {
  console.log('🔄 Running in proxy mode - forwarding to Raycast backend');
  
  // Proxy all unmatched routes to Raycast backend
  app.use('*', createProxyMiddleware({
    target: 'https://backend.raycast.com',
    changeOrigin: true,
    pathRewrite: {
      '^/': '/'
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err.message);
      res.status(502).json({
        error: true,
        message: 'Bad Gateway - Could not reach Raycast backend',
        statusCode: 502
      });
    }
  }));
} else {
  console.log(`✅ Running in local mode with email: ${process.env.RAYCAST_EMAIL}`);
  
  // 404 handler for local mode
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