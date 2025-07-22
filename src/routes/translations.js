const express = require('express');
const { translateWithAI } = require('../services/translations');

const router = express.Router();

// Translate text
router.post('/', async (req, res) => {
  try {
    const result = await translateWithAI(req.body);
    res.json(result);
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Translation failed',
      statusCode: 500
    });
  }
});

module.exports = router;