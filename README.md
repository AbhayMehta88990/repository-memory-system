# Repository Memory System — Round 2
### AI-Powered Codebase Onboarding Assistant with Guided Tours

---

> **For Judges:** Please refer to [README-ROUND1.md](./README-ROUND1.md) for the complete problem statement, objectives, and Round 1 feature overview.

---

## Demo Video

A complete video walkthrough demonstrating all Round 2 features is available in this repository.

**Video File:** [demo-video.mp4](./demo-video.mp4)
**Drive Link:** https://drive.google.com/file/d/1aP0w8xUxs4zGtHqc5v289EvLY8ccDVpX/view?usp=sharing
---

## PROJECT LINKS

| Resource | Link |
|----------|------|
| Project Overview Website | https://repository-memory-overview.vercel.app |
| Main Demo Website | https://repository-memory-system.vercel.app |

---

## Problem Statement

When new developers join a project, they face challenges such as:

- Large and complex codebases
- Outdated or incomplete documentation
- High dependency on senior developers for explanations
- Slow onboarding and early mistakes

This leads to higher onboarding time, repeated effort, and reduced productivity.

---

## Project Objective

The project aims to make developer onboarding:

- Faster and more structured
- Less dependent on senior engineers
- Easier for beginners to understand
- Scalable across teams and evolving repositories

---

## What the System Does

The Repository Memory System allows a developer to:

1. Select a repository
2. Automatically analyze the codebase structure
3. Follow an AI-generated onboarding tour
4. Ask natural-language questions about the code
5. Start contributing using beginner-friendly starter tasks

All from a **single unified onboarding dashboard**.

---

## Key Features — Round 2

| Feature | Description |
|---------|-------------|
| **GitHub OAuth Integration** | Connect with GitHub, select any repository from your account |
| **Repository Selector** | Browse, search, and select repositories with full metadata display |
| **Role-Based Onboarding Tours** | Personalized tours for Frontend, Backend, and DevOps developers |
| **Enhanced Dashboard** | Professional layout with icons, statistics, and better alignment |
| **Real-Time Repository Stats** | File counts, languages, and code metrics from GitHub API |

---

## Feature Details

### GitHub OAuth Authentication
- Secure login with GitHub OAuth 2.0
- User profile display with avatar in header
- Token-based session management
- Logout functionality 

### Repository Selector
- Displays all repositories from connected GitHub account
- Search functionality to filter repositories
- Shows repository name, description, language, stars, and visibility
- One-click selection to analyze any repository

### Role-Based Onboarding Tours
Instead of a generic walkthrough, the system adapts based on developer role:

| Role | Focus Areas |
|------|-------------|
| **Frontend Developer** | UI components, API integration, state management |
| **Backend Developer** | APIs, services, database layer, authentication |
| **DevOps Engineer** | Build scripts, CI/CD pipelines, deployment logic |

Each tour includes:
- Step-by-step guided walkthrough
- Code snippets for relevant examples
- File references for each step
- Progress tracking with visual indicators

### Enhanced Dashboard
- Professional layout with Feather icons
- Statistics cards showing file count, lines of code, and languages
- Quick Actions panel for navigation
- Code Analysis section with functions, classes, and dependencies
- Mode-specific banners for Demo and GitHub modes

### Intelligent Q&A System
- Ask natural-language questions about architecture and logic
- Context-driven answers using repository understanding
- Pre-defined question suggestions for common queries

### Starter Tasks
- Beginner-friendly contribution recommendations
- Difficulty levels: Easy, Medium, Hard
- Linked to relevant files and modules
- Clear descriptions explaining what to do

---

## Working Features and Limitations

### Full Functionality in Demo Mode

| Feature | Status | Description |
|---------|--------|-------------|
| Dashboard | Working | Complete repository analysis with all statistics |
| Role-Based Onboarding | Working | Personalized tours for all three developer roles |
| Q&A System | Working | Context-aware answers about the codebase |
| Starter Tasks | Working | Ranked beginner-friendly tasks with file references |

### GitHub Login Mode Limitations

| Feature | Status | Reason |
|---------|--------|--------|
| Dashboard | Working | Real-time stats from GitHub API |
| Repository Selector | Working | Full access to user's GitHub repositories |
| Onboarding Tour | Limited | Requires source code parsing and AI processing |
| Q&A System | Limited | Needs pre-built semantic understanding |
| Starter Tasks | Limited | Requires codebase analysis for task generation |

**Why these limitations exist:**

The AI-powered features (Onboarding Tours, Q&A, Starter Tasks) require:

1. **Deep Code Parsing** — Analyzing every file to extract functions, classes, and relationships
2. **Semantic Understanding** — Building context about code architecture and patterns
3. **AI Processing** — Generating intelligent content based on parsed data

For live GitHub repositories, this processing hasn't been performed. In demo mode, the test repository has been pre-analyzed, enabling full functionality.

---

## System Architecture

### Frontend
- React 18 with React Router
- Axios for API communication
- Feather Icons (react-icons/fi)
- CSS Variables for theming

**Pages:**
- Login (Demo / GitHub OAuth)
- Auth Callback (OAuth flow)
- Repository Selector
- Dashboard
- Onboarding Tour (Role-based)
- Q&A Chat
- Starter Tasks

### Backend
- Node.js + Express
- GitHub OAuth integration
- GitHub API for repository data

**Endpoints:**
- `/api/auth/github` — OAuth login
- `/api/auth/github/callback` — OAuth callback
- `/api/auth/repos` — Fetch user repositories
- `/api/auth/repo/:name/stats` — Repository statistics
- `/api/ai/generate-tour` — Tour generation (with role parameter)
- `/api/ai/ask` — Q&A responses
- `/api/ai/starter-tasks` — Task suggestions

---

## Flow Diagrams

### System Flow Chart
![System Flow Chart](./Flow-charts.svg)

---

### Data Flow Diagram
![Data Flow Diagram](./Data-Flow-Diagram.svg)

---

## Demo Repository — E-Commerce API

Used to simulate onboarding, Q&A, and task generation with pre-analyzed data.

### Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

### API Modules
- `/api/auth` — Authentication and JWT
- `/api/products` — Product management
- `/api/cart` — Cart operations
- `/api/orders` — Order processing
- `/api/users` — User management

### Additional Data for Round 2
- **Role-Based Tour Content:**
  - Frontend Developer path (6 steps)
  - Backend Developer path (6 steps)
  - DevOps Engineer path (6 steps)
- **Enhanced Metadata:**
  - 16 documented functions
  - 4 key dependencies
  - Entry point mapping
- **Code Snippets:**
  - JWT token examples
  - Middleware patterns
  - Docker configurations

---

## Project Status — Round 2

| Component | Status |
|-----------|--------|
| GitHub OAuth Integration | Complete |
| Repository Selection | Complete |
| Role-Based Onboarding | Complete |
| Enhanced Dashboard | Complete |
| Q&A System | Complete (Demo Mode) |
| Starter Tasks | Complete (Demo Mode) |
| Professional UI/UX | Complete |

### Completed in Round 2
- Full GitHub OAuth authentication flow
- Repository selector with search and metadata
- Role-based onboarding tours (Frontend, Backend, DevOps)
- Enhanced dashboard with professional design
- Logout functionality
- Responsive design improvements

### Technical Implementation
- GitHub OAuth 2.0 with secure token handling
- GitHub API integration for repository data
- Role parameter support in tour generation API
- Conditional rendering for mode-specific UI
- Professional styling 

---

**Repository Memory System — Round 2**  
Built for Hack The Winter Evaluation
