# APJ TRUE LIFE — Digital Health Platform

> Award-winning Ayurvedic Medical Centre | AYUSH TV National Health Award 2024

A full-stack digital health platform for APJ TRUE LIFE Ayurvedic Medical Centre, consisting of:

- **Flutter Mobile App** (`apps/mobile/`) — Patient-facing iOS & Android app
- **Next.js Web Dashboard** (`apps/web/`) — Doctor clinical management console  
- **8 Spring Boot Microservices** (`services/`) — Backend REST APIs

## Project Structure

```
APJ-True-Life/
├── apps/
│   ├── mobile/          ← Flutter patient app (Phase 2)
│   └── web/             ← Next.js doctor dashboard ✅ Done
├── services/
│   ├── api-gateway/     ← Spring Cloud Gateway (port 8080) ✅
│   ├── auth-service/    ← Firebase Auth + JWT (port 8081) ✅
│   ├── patient-service/ ← Patient CRUD (port 8082) ✅
│   ├── doctor-service/  ← Doctor & Clinic (port 8083) ✅
│   ├── treatment-service/ ← Treatment Plans (port 8084) ✅
│   ├── appointment-service/ ← Appointments (port 8085) ✅
│   ├── chat-service/    ← WebSocket Chat STOMP (port 8086) ✅
│   ├── notification-service/ ← FCM Push (port 8087) ✅
│   └── media-service/   ← Cloudinary upload (port 8088) ✅
└── docs/
```

## Tech Stack

| Layer | Technology |
|---|---|
| Patient App | Flutter 3.x / Dart 3.x |
| Doctor Dashboard | Next.js 14 / TypeScript / Tailwind CSS |
| Backend | Java 21 / Spring Boot 3.x / Spring Cloud Gateway |
| Database | NeonDB (PostgreSQL 16) via Flyway migrations |
| Auth | Firebase Authentication |
| Storage | Cloudinary |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Railway |
| Push Notifications | Firebase Cloud Messaging (FCM) |

## Getting Started

### Web Dashboard
```bash
cd apps/web
cp .env.local.example .env.local
# Fill in Firebase + API keys
npm install
npm run dev
```

### Backend Services (each service)
```bash
cd services/auth-service
# Set env vars: DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, JWT_SECRET, FIREBASE_CREDENTIALS_PATH
./gradlew bootRun
```

### Required Environment Variables
See `apps/web/.env.local.example` and each service's `application.yml` for the full list.

## Development Phases

- [x] Phase 0 — Foundation & Infrastructure
- [x] Phase 1 — Core Backend Microservices (scaffold + Flyway migrations)
- [x] Phase 3 — Doctor Web Dashboard (Next.js)
- [ ] Phase 2 — Flutter App: Auth & Onboarding
- [ ] Phase 4 — Treatment Management (full UI integration)
- [ ] Phase 5 — Appointments System
- [ ] Phase 6 — Chat & Real-time
- [ ] Phase 7 — Advanced Features & Polish
- [ ] Phase 8 — Testing, Launch & Go-Live
