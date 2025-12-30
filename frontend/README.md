# Repository Memory System - Frontend

React frontend for the Repository Memory System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Features

- **Dashboard**: Overview of the codebase with statistics
- **Onboarding Tour**: Step-by-step guided walkthrough
- **Ask Questions**: AI-powered Q&A chat interface
- **Starter Tasks**: Beginner-friendly tasks to get started

## Theme Colors

The app uses a minimalistic design with the following color palette:

- Background: `#f9f4ef`
- Headline: `#020826`
- Paragraph: `#716040`
- Button: `#8c7851`
- Highlight: `#8c7851`
- Secondary: `#eaddcf`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── styles/         # CSS files
│   ├── App.js
│   └── index.js
└── package.json
```
