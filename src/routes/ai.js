const express = require('express');
const { models } = require('../models');
const config = require('../config');
const { openAIChatCompletion } = require('../services/completions');

const router = express.Router();

// Get available models
router.get('/models', (req, res) => {
  const fallbackModel = "openai-gpt-3.5-turbo";
  
  let default_models = {
    chat: fallbackModel,
    quick_ai: fallbackModel,
    commands: fallbackModel,
    api: fallbackModel,
    emoji_search: fallbackModel
  };

  if (config.defaultRaycastModel) {
    if (typeof config.defaultRaycastModel === "string") {
      default_models = {
        chat: config.defaultRaycastModel,
        quick_ai: config.defaultRaycastModel,
        commands: config.defaultRaycastModel,
        api: config.defaultRaycastModel,
        emoji_search: config.defaultRaycastModel
      };
    } else {
      Object.assign(default_models, config.defaultRaycastModel);
    }
  }

  res.json({
    default_models,
    models
  });
});

// Chat completions
router.post('/chat_completions', async (req, res) => {
  try {
    await openAIChatCompletion(req, res);
  } catch (err) {
    console.error('Chat completion error:', err);
    res.status(500).json({
      error: true,
      message: err.message || 'Internal server error',
      statusCode: 500
    });
  }
});

module.exports = router;