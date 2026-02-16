# Ezri Backend - Starter Kit

This folder contains the complete backend structure for the Ezri mental health application.

## Structure Overview

```
backend-starter/
├── api-server/          # Node.js API Server (Express + TypeScript)
├── ai-service/          # Python AI Service (FastAPI)
├── docker/              # Docker configurations
└── shared/              # Shared types and constants
```

## Quick Start

### 1. API Server (Node.js)
```bash
cd api-server
npm install
cp .env.example .env
npm run dev
```

### 2. AI Service (Python)
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### 3. Docker (All Services)
```bash
docker-compose up -d
```

## Services

- **API Server**: http://localhost:3001
- **AI Service**: http://localhost:8000
- **WebSocket**: http://localhost:3002

## Documentation

See `/EZRI_BACKEND_ARCHITECTURE.md` for complete architecture details.
