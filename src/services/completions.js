const OpenAI = require("openai");
const config = require("../config");

async function openAIChatCompletion(req, res) {
  const openai_message = [];
  const body = req.body;
  const messages = body.messages;
  let temperature = config.temperature;

  // Process messages
  for (const message of messages) {
    if (message.content.system_instructions) {
      openai_message.push({
        role: "system",
        content: message.content.system_instructions,
      });
    }

    if (message.content.command_instructions) {
      openai_message.push({
        role: "system",
        content: message.content.command_instructions,
      });
    }

    if (body.additional_system_instructions) {
      openai_message.push({
        role: "system",
        content: body.additional_system_instructions,
      });
    }

    if (message.content.text) {
      openai_message.push({
        role: message.author,
        content: message.content.text,
      });
    }

    if (message.content.temperature) {
      temperature = message.content.temperature;
    }
  }

  const openai = new OpenAI({
    baseURL: config.baseURL,
    apiKey: config.apiKey,
  });

  try {
    const stream = await openai.chat.completions.create({
      stream: true,
      model: body.model,
      temperature,
      stop: null,
      n: 1,
      messages: openai_message,
    });

    // Set headers for streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    // Send finish signal
    res.write(
      `data: ${JSON.stringify({ text: "", finish_reason: "stop" })}\n\n`,
    );
    res.end();
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`OpenAI Chat Completions Failed: ${error.message}`);
  }
}

module.exports = { openAIChatCompletion };
