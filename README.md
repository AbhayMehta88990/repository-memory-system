# Repository Memory System  
### AI-Powered Codebase Onboarding Assistant with Guided Tours

---

## PROJECT LINKS  

### 🔗 Project Overview Website  
https://repository-memory-overview.vercel.app  

### 🔗 Main Demo Website  
https://repository-memory-system.vercel.app  


Repository Memory System is an AI-driven onboarding assistant that helps developers understand large and unfamiliar codebases faster.  
It transforms any repository into an interactive onboarding experience using automated code analysis, contextual Q&A, and beginner-friendly starter tasks.

---

##  Problem Statement

When new developers join a project, they face challenges such as:

- Large and complex codebases  
- Outdated or incomplete documentation  
- High dependency on senior developers for explanations  
- Slow onboarding and early mistakes  

This leads to higher onboarding time, repeated effort, and reduced productivity.

---

##  Project Objective

The project aims to make developer onboarding:

- Faster and more structured  
- Less dependent on senior engineers  
- Easier for beginners to understand  
- Scalable across teams and evolving repositories  

---

##  What the System Does

The Repository Memory System allows a developer to:

1. Select a repository  
2. Automatically analyze the codebase structure  
3. Follow an AI-generated onboarding tour  
4. Ask natural-language questions about the code  
5. Start contributing using beginner-friendly starter tasks  

All from a **single unified onboarding dashboard**.

---

##  Key Features (Round-1 MVP)

| Feature | Description |
|--------|------------|
| **Dashboard** | Repository overview, structure summary, key modules |
| **AI-Generated Onboarding Tour** | Step-by-step walkthrough of important files |
| **Intelligent Q&A System** | Context-aware explanations about architecture & logic |
| **Starter Tasks** | Beginner-friendly contribution suggestions |
| **Unified Experience** | Dashboard, tours, Q&A, and tasks in one interface |

---

###  Dashboard
- Repository overview and structure summary  
- Key file and module identification  
- Central access to all onboarding tools  

###  AI-Generated Onboarding Tour
- Guided walkthrough of important files and modules  
- Step-based learning path for new developers  
- File references mapped to each step  

###  Intelligent Q&A System
- Ask natural-language questions about architecture and logic  
- Context-driven answers using repository understanding  

###  Starter Tasks
- Beginner-friendly contribution recommendations  
- Linked to relevant files and modules  

###  Unified Onboarding Experience
- Dashboard, Tour, Q&A, and Tasks in one place  
- Persistent onboarding flow  

---

##  Future Enhancements — Round 2

### ▶ Role-Based & Context-Aware Onboarding Paths
Dynamic onboarding tailored to developer roles:

- Frontend → UI components, routes, state flow  
- Backend → APIs, services, database layer  
- DevOps → pipelines, deployment workflows  

---

### ▶ Auto-Updating Onboarding When Code Changes
The system will automatically:

1. Detect repository changes  
2. Re-analyze affected modules  
3. Update onboarding steps intelligently  

---

### ▶ Starter-Task Smart Ranking System
Tasks will include structured ranking attributes:

1. Difficulty level  
2. Learning value  
3. Risk level  
4. Code-area mapping  

---

### ▶ Basic Productivity Insights
Light-weight onboarding intelligence such as:

1. Most complex files  
2. Most-coupled modules  
3. Files new developers struggle with  

---

##  System Architecture (High-Level)

### Frontend
- React 18  
- React Router  
- Axios  

**Pages**
- Dashboard  
- Onboarding Tour  
- Q&A Chat  
- Starter Tasks  

---

### Backend
- Node.js + Express  

**Responsibilities**
- Repository ingestion  
- Code parsing & metadata extraction  
- Tour generation  
- Q&A responses  
- Starter task suggestions  

Uses **mock-data mode for demo stability**.

---

### AI & Context Layer
- Builds structured context from code metadata  
- LLM (conceptual in MVP) supports:
  - Onboarding tour generation  
  - Code explanations  
  - Starter task creation  

---

##  Flow Diagrams

GitHub supports static SVG files in README.md.  
They can be embedded as follows:


---

###  System Flow Chart
![System Flow Chart](./Flow-charts.svg)

---

###  Data Flow Diagram
![Data Flow Diagram](./Data0-Flow-Diagram.svg)

---

##  Demo Repository (E-Commerce API — Sample Codebase)

Used to simulate onboarding, Q&A and task generation.

### Tech Stack
- Node.js  
- Express  
- MongoDB (Mongoose)  
- JWT Authentication  

### API Modules
- /api/auth — Authentication & JWT  
- /api/products — Product management  
- /api/cart — Cart operations  
- /api/orders — Order processing  
- /api/users — User management  

---

##  Project Status

This is a **Round-1 MVP demo** developed for hack the winter evaluation.  
Future versions will expand:

- real-repository ingestion  
- adaptive onboarding intelligence  
- multi-repo learning support  

---

