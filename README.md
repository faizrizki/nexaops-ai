# NexaOps AI

AI-powered business operations copilot — portfolio project for Software Engineering and AI Engineering.

## Overview

NexaOps AI is a web application designed to help business owners understand sales performance, monitor inventory, and gain insights from business data using AI.

## Current Status

**Milestone 1 — Full-Stack Foundation**

- Next.js, React, TypeScript, and Tailwind CSS frontend
- FastAPI and Python backend
- Dashboard powered by synthetic demo data
- Backend API tests
- GitHub Actions CI workflow

AI assistant, RAG, PostgreSQL persistence, forecasting, authentication, and deployment are planned for future milestones.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Python, FastAPI, Pydantic
- Testing: Pytest
- CI/CD: GitHub Actions
- Planned database: PostgreSQL with pgvector

## Run Locally

### Backend

```powershell
cd backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API documentation: http://127.0.0.1:8000/docs

### Frontend

Open a second terminal from the project root:

```powershell
cd frontend
Copy-Item .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Project Roadmap

1. Full-stack foundation
2. PostgreSQL and authentication
3. AI business assistant and tool calling
4. RAG knowledge base
5. Inventory monitoring and demand forecasting
6. AI evaluation, security, and deployment

## Disclaimer

This project currently uses synthetic demo data. Features listed in the roadmap are planned and may not yet be implemented.
