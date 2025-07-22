# Raycast Local

A local backend implementation for Raycast that provides AI chat completions and translation services using OpenAI APIs. This project allows you to run a self-hosted version of Raycast's AI features with your own OpenAI API key.

## Features

- 🤖 **AI Chat Completions**: Stream-based chat completions using OpenAI APIs
- 🌍 **Translation Services**: AI-powered text translation with auto-detection
- 🔧 **Multiple Model Support**: GPT-3.5 Turbo, GPT-4, GPT-4o, and GPT-4o mini
- 🚀 **Universal Compatibility**: Runs on any device with Node.js
- 🔐 **Local Mode**: Full local operation with your API keys
- 📡 **Proxy Mode**: Fallback to official Raycast backend when needed
- 🐳 **Docker Ready**: Easy containerization
- 📊 **PM2 Support**: Production process management

## Prerequisites

- **Node.js 16+** (Required)
- **OpenAI API key** (or compatible service like OpenRouter)

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd raycast-local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start

# Or use the startup script
./start.sh
```

## Configuration

Create a `.env` file with your settings:

```env
# Required: Your OpenAI API key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Custom OpenAI endpoint (default: https://api.openai.com/v1)
OPENAI_BASE_URL=https://api.openai.com/v1

# Optional: Email for local mode (enables local operation)
RAYCAST_EMAIL=your-email@example.com

# Optional: Server configuration
PORT=3000
HOST=0.0.0.0
```

## API Endpoints

### Health Check

- **GET** `/health` - Server health status

### AI Services

- **GET** `/api/v1/ai/models` - Available AI models
- **POST** `/api/v1/ai/chat_completions` - Stream-based chat completions

### User Management

- **GET** `/api/v1/me` - User profile and subscription status
- **GET** `/api/v1/me/sync` - Sync user data
- **GET** `/api/v1/me/trial_status` - Trial status

### Translation

- **POST** `/api/v1/translations` - AI-powered text translation

## Running Modes

### Local Mode (Recommended)

Set `RAYCAST_EMAIL` in your `.env` file to enable local mode:

- All requests handled locally
- No dependency on Raycast servers
- Full control over AI models and responses

### Proxy Mode

Leave `RAYCAST_EMAIL` unset to enable proxy mode:

- Unmatched routes forwarded to Raycast backend
- Useful for gradual migration or testing

## Production Deployment

### Option 1: Docker

1. **Create Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY .env ./

EXPOSE 3000
CMD ["npm", "start"]
```

2. **Build and run:**

```bash
docker build -t raycast-local .
docker run -p 3000:3000 --env-file .env raycast-local
```

### Option 2: Systemd Service

1. **Create service file:**

```ini
[Unit]
Description=Raycast Local
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/raycast-local
ExecStart=/usr/bin/node src/app.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

2. **Enable and start:**

```bash
sudo systemctl enable raycast-local
sudo systemctl start raycast-local
```

## Development

### Project Structure

```
src/
├── app.js              # Main application entry point
├── config.js           # Configuration management
├── models.js           # AI model definitions
├── routes/             # API route handlers
│   ├── ai.js          # AI-related endpoints
│   ├── me.js          # User management
│   └── translations.js # Translation services
├── services/           # Business logic
│   ├── completions.js  # Chat completion service
│   └── translations.js # Translation service
└── utils/              # Utility functions
    └── request.js      # HTTP request helpers
```

### Available Scripts

```bash
npm start           # Start production server
npm run dev         # Start development server with auto-reload
npm run health      # Check server health
```

## Testing

### Test the API endpoints:

1. **Health check:**

```bash
curl http://localhost:3000/health
```

2. **Get models:**

```bash
curl http://localhost:3000/api/v1/ai/models
```

3. **Chat completion:**

```bash
curl -X POST http://localhost:3000/api/v1/ai/chat_completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "author": "user",
        "content": {
          "text": "Hello!"
        }
      }
    ]
  }'
```

4. **Translation:**

```bash
curl -X POST http://localhost:3000/api/v1/translations \
  -H "Content-Type: application/json" \
  -d '{
    "q": "Hello world",
    "target": "es"
  }'
```

## Environment Variables

| Variable          | Description            | Required | Default                     |
| ----------------- | ---------------------- | -------- | --------------------------- |
| `OPENAI_API_KEY`  | Your OpenAI API key    | Yes      | -                           |
| `OPENAI_BASE_URL` | Custom OpenAI endpoint | No       | `https://api.openai.com/v1` |
| `RAYCAST_EMAIL`   | Email for local mode   | No       | -                           |
| `PORT`            | Server port            | No       | `3000`                      |
| `HOST`            | Server host            | No       | `0.0.0.0`                   |
| `NODE_ENV`        | Environment mode       | No       | `development`               |
