const config = {
  defaultRaycastModel: "openai-gpt-3.5-turbo",
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  temperature: 0.5,
  translate: {
    model: "gpt-3.5-turbo",
    temperature: 0.5
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  }
};

module.exports = config;