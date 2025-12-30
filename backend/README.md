# Repository Memory System - Backend

Backend API for the Repository Memory System.

## 🚀 Quick Start (No API Keys Required!)

This demo uses **mock data** - no external APIs needed!

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run dev
```

That's it! The server will use mock data automatically.

## API Endpoints

### Repository Analysis
- `GET /api/repo/analyze` - Analyze test repository
- `GET /api/repo/file/*` - Get file details

### AI Features
- `POST /api/ai/generate-tour` - Generate onboarding tour
- `POST /api/ai/ask` - Ask questions about code
- `GET /api/ai/starter-tasks` - Get starter tasks

## Project Structure

```
backend/
├── src/
│   ├── routes/          # API routes
│   ├── services/        # Mock data
│   └── server.js        # Entry point
├── package.json
└── .env.example
```
