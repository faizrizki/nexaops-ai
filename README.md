# NexaOps AI

AI-powered business operations copilot — portfolio project for Software Engineering + AI Engineering.

> Current milestone: **Milestone 1 — full-stack foundation**. The dashboard is connected to a FastAPI backend using synthetic demo data. LLM, RAG, database persistence, forecasting, authentication, and deployment are intentionally planned for later milestones; they are not implemented yet.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: FastAPI, Python, Pydantic
- Tests: Pytest (backend); frontend build check
- CI: GitHub Actions

## Project structure

```text
nexaops-ai/
├── .github/workflows/ci.yml
├── backend/
│   ├── app/
│   │   ├── api/routes.py
│   │   └── main.py
│   ├── tests/test_api.py
│   └── requirements.txt
├── docs/
│   └── roadmap.md
└── frontend/
    ├── app/
    ├── lib/api.ts
    └── package.json
```

## Requirements

- Node.js 20.9 or newer (recommended: current LTS)
- Python 3.10 or newer
- Git
- VS Code (recommended)

## Run locally on Windows (PowerShell)

Open two terminals in VS Code.

### 1. Backend API

```powershell
cd backend
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

If PowerShell blocks activation, run this in the same terminal (this only changes policy for the current process):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Backend links:
- API health: http://127.0.0.1:8000/api/v1/health
- API docs: http://127.0.0.1:8000/docs
- Dashboard data: http://127.0.0.1:8000/api/v1/dashboard/summary

### 2. Frontend

In a second terminal, from the project root:

```powershell
cd frontend
Copy-Item .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. The frontend calls the backend at `http://127.0.0.1:8000` by default.

### Run backend tests

From the project root:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
python -m pytest -q
```

### Production build check

```powershell
cd frontend
npm run build
```

## First Git commit and GitHub remote

1. Create a **new empty repository** on GitHub named `nexaops-ai`. For the simplest first push, do not initialize it with a README, license, or `.gitignore` because those already exist locally.
2. From the root `nexaops-ai` folder in PowerShell:

```powershell
git init
git branch -M main
git add .
git status
git commit -m "chore: initialize NexaOps AI full-stack foundation"
git remote add origin https://github.com/YOUR-USERNAME/nexaops-ai.git
git remote -v
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and use the exact HTTPS URL shown on your new repository page. GitHub no longer accepts account passwords for Git HTTPS; use Git Credential Manager/browser sign-in or configure SSH if prompted. Never put tokens, `.env` files, or API keys into the repository.

For later changes:

```powershell
git add .
git commit -m "feat: describe your change"
git push
```

## Roadmap

See [`docs/roadmap.md`](docs/roadmap.md). The next milestone is PostgreSQL persistence and database migrations, followed by authentication/RBAC, business query tools, RAG, forecasting, LLM evaluation, monitoring, and deployment.
