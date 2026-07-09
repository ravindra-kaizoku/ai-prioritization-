# UniResolve

AI-powered university complaint classification and intelligent prioritization system for student grievances.

## Folder Structure

```text
UniResolve/
  src/                 React, Vite, Tailwind, protected dashboards
  server/              Node.js, Express MVC, MongoDB, JWT, Cloudinary, REST APIs
  ai-service/          Flask, scikit-learn NLP training and prediction API
  scripts/dev.mjs      Runs frontend and backend together
```

## Main Features

- Student registration, login, complaint submission, image upload, history, details, notifications, profile, and feedback.
- Admin login, analytics, priority queue, complaint management, status updates, user API, and department routing.
- AI classification for Hostel, Academics, Examination, IT Support, Library, Transport, Maintenance, Mess & Cafeteria, Security, and Medical.
- AI priority output: Critical, High, Medium, Low.
- JWT role-based access control, MongoDB schemas, validation, error handling, and Cloudinary integration.

## Quick Start

```bash
npm install
npm --prefix server install
copy server\.env.example server\.env
npm run dev
```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## AI Service

```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python train.py
python app.py
```

The AI API runs on `http://localhost:8000`. If it is offline, the Node API uses the same deterministic heuristic classifier as a fallback.

## Environment Variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/uniresolve
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend optionally supports `VITE_API_URL=http://localhost:5000/api`.

## REST API

- `POST /api/auth/register`: create student or admin account.
- `POST /api/auth/login`: return JWT and profile.
- `GET /api/complaints`: list role-scoped complaints.
- `POST /api/complaints`: create complaint with optional `image` multipart upload.
- `GET /api/complaints/:id`: complaint tracking details.
- `PATCH /api/complaints/:id`: admin status, department, or staff update.
- `GET /api/analytics/summary`: admin analytics.
- `GET /api/departments`: department directory.
- `GET /api/notifications`: user notifications.
- `POST /api/feedback`: submit complaint feedback.
- `GET /api/users`: admin user management API.

## Deployment Guide

Build the frontend with `npm run build` and host `dist/` on a static hosting service. Deploy `server/` as a Node.js service with MongoDB and Cloudinary credentials. Deploy `ai-service/` as a Python web service and set `AI_SERVICE_URL` in the Node environment.
