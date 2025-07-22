const config = {
  defaultRaycastModel: "google/gemini-2.5-flash-lite",
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
  temperature: 0.5,
  translate: {
    model: "google/gemini-2.5-flash-lite",
    temperature: 0.5,
  },
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
  },
};

module.exports = config;
