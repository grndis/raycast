const OpenAI = require('openai');
const config = require('../config');

function generateTranslationsPrompts(target, text) {
  return [
    {
      role: "system",
      content: `You are a professional translator. Translate the given text to ${target}. 
First line should be the detected source language code (e.g., 'en', 'es', 'fr').
Following lines should be the translated text.
Only return the language code and translation, nothing else.`
    },
    {
      role: "user", 
      content: text
    }
  ];
}

async function openaiGenerateContent(prompt, model) {
  const openai = new OpenAI({
    baseURL: config.baseURL,
    apiKey: config.apiKey
  });

  try {
    const result = await openai.chat.completions.create({
      stream: false,
      messages: prompt,
      temperature: config.translate.temperature || config.temperature,
      stop: null,
      n: 1,
      model
    });

    const text = result.choices[0].message.content;
    const split = text.split("\n");
    const detectedSourceLanguage = split[0];
    const translatedText = split.slice(1).join("\n");

    return {
      content: translatedText,
      detectedSourceLanguage
    };
  } catch (error) {
    throw new Error(`OpenAI Chat Completions Failed: ${error.message}`);
  }
}

async function translateWithAI(body) {
  const prompts = generateTranslationsPrompts(body.target, body.q);
  const model = config.translate.model;
  const { content, detectedSourceLanguage } = await openaiGenerateContent(prompts, model);

  const result = {
    data: {
      translations: [
        {
          translatedText: content
        }
      ]
    }
  };

  if (detectedSourceLanguage) {
    result.data.translations[0].detectedSourceLanguage = detectedSourceLanguage;
  }

  return result;
}

module.exports = { translateWithAI };