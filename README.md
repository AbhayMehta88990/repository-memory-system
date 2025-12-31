# Repository Memory System

AI-powered tool to help developers understand new codebases faster with guided tours, intelligent Q&A, and personalized starter tasks.

##  Project Overview

This project helps solve the common problem of codebase onboarding by providing:

- Automated Code Analysis: Parses and understands your repository structure
- AI-Generated Tours: Step-by-step guided walkthroughs of the codebase
- Interactive Q&A: Ask questions and get intelligent answers about the code
- Starter Tasks: Beginner-friendly tasks to help you contribute

##  Features

### 1. Dashboard
- Repository statistics and overview
- Language distribution
- Key files identification
- Quick access to all features

### 2. Onboarding Tour
- AI-generated step-by-step guide
- Progress tracking
- File references for each step
- Interactive navigation

### 3. Chat Interface
- Natural language questions about code
- Context-aware AI responses
- Suggested questions
- Real-time conversation

### 4. Starter Tasks
- Beginner-friendly task suggestions
- Difficulty levels
- Progress tracking
- Related file references


##  Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- No API keys required Uses mock data for demo

### Installation 

Backend:
```bash
cd backend
npm install
npm run dev
```
 Server starts at http://localhost:5000

Frontend (new terminal):
```bash
cd frontend
npm install
npm start
```
 App opens at http://localhost:3000

##  Demo Mode

This project uses mock data for hassle-free demos:
-  No API keys needed
-  No external dependencies
-  Works offline
-  Instant responses
-  Perfect for presentations

### Frontend
- React 18
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express
- Mock Data System

##  How It Works

1. Code Analysis: Backend analyzes the test repository, extracting:
   - File structure and organization
   - Functions, classes, and imports
   - Dependencies and relationships
   - Key entry points

2. AI Processing: Analysis data is sent to LLM to generate:
   - Structured onboarding tour
   - Answers to specific questions
   - Beginner-friendly tasks

3. Interactive UI: Frontend displays:
   - Visual dashboard with statistics
   - Step-by-step tour with progress tracking
   - Chat interface for Q&A
   - Task list with completion tracking

##  Demo Repository

The project includes a **test repository** (E-Commerce API) with:
- Node.js/Express application structure
- Controllers, models, and routes
- Authentication system
- RESTful API design

##  Future Enhancements

- GitHub OAuth integration
- Real-time code analysis
- Multi-repository support
- Team collaboration features
- Visual dependency graphs
- VS Code extension

##  Notes

- Demo uses mock data for reliable presentations
- No API keys required for demo mode
- Test repository included for demonstration

##  Contributors

Built for Hackathon Round 1
