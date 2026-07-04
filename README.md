# APJ TRUE LIFE — Digital Health Platform v2.0

> **Ayurvedic Medical Centre Patient & Doctor Management System**  
> Single-branch monorepo · Supabase Postgres · Custom Spring Boot Auth · Flutter + Next.js

---

## Architecture Overview

```
APJ-True-Life/
├── apps/
│   ├── mobile/          # Flutter 3.x — Patient-facing app (Riverpod, Dio, go_router)
│   └── web/             # Next.js 14+ — Doctor dashboard (TanStack Query, Tailwind, shadcn/ui)
├── services/            # Spring Boot 3.x microservices (Java 21, Gradle)
│   ├── api-gateway/     # Port 8080 — JWT validation, rate limiting, routing
│   ├── auth-service/    # Port 8081 — Custom OTP + doctor/admin auth (NO Firebase Auth)
│   ├── patient-service/ # Port 8082
│   ├── doctor-service/  # Port 8083
│   ├── treatment-service/  # Port 8084
│   ├── appointment-service/ # Port 8085
│   ├── chat-service/    # Port 8086 — STOMP WebSocket
│   ├── notification-service/ # Port 8087 — FCM push (Firebase messaging scope only)
│   └── media-service/   # Port 8088 — Supabase Storage signed URLs
├── docs/
│   └── APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md  ← Source of truth
├── docker-compose.dev.yml   # Local Postgres 16 + Adminer
└── .github/workflows/ci.yml
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Patient App | Flutter 3.x / Dart 3.x, Riverpod 2.x, Dio, go_router |
| Doctor Dashboard | Next.js 14+ (App Router), TypeScript 5.x, Tailwind CSS, shadcn/ui |
| Backend | Spring Boot 3.x, Java 21, Gradle 8.x (multi-project monorepo) |
| Authentication | **Custom Spring Boot Auth Service** — mobile OTP + doctor password, RS256 JWT |
| Database | **Supabase Postgres** (Flyway migrations) |
| File Storage | **Supabase Storage** (private buckets, signed URLs via media-service) |
| OTP/SMS Delivery | **DLT-registered SMS gateway** (MSG91 — see docs for DLT setup guide) |
| Push Notifications | Firebase Cloud Messaging (**FCM only** — Firebase Auth is NOT used) |
| Backend Hosting | Railway |
| Frontend Hosting | Vercel |
| DNS/DDoS | Cloudflare |
| Error Tracking | Sentry |

---

## Quick Start (Local Dev)

### Prerequisites
- Docker Desktop
- Java 21 (Temurin recommended)
- Flutter 3.x SDK
- Node.js 20+

### 1. Start local database
```bash
docker compose -f docker-compose.dev.yml up -d
# Postgres: localhost:5432 | Adminer UI: http://localhost:8081
```

### 2. Start a backend service (example: auth-service)
```bash
cd services/auth-service
# Copy .env.example → .env and fill in local values
cp .env.example .env
./gradlew bootRun --args='--spring.profiles.active=local'
```

### 3. Start Next.js dashboard
```bash
cd apps/web
cp .env.example .env.local
npm install
npm run dev
```

### 4. Start Flutter app
```bash
cd apps/mobile
flutter pub get
flutter run
```

---

## Key Architecture Decisions

- **No Firebase Auth** — Authentication is fully custom (Spring Boot `auth-service`). Firebase project is kept for FCM push notifications only.
- **Supabase replaces NeonDB + Cloudinary** — one platform for database and file storage.
- **`prepareThreshold=0` on all JDBC URLs** — required for Supavisor transaction-mode pooling (ADR-012).
- **Flyway migrations use SESSION-mode connection** (port 5432); runtime HikariCP uses TRANSACTION-mode pooler (port 6543).
- **All storage buckets are private** — every file access goes through `media-service` signed URLs.
- **DLT compliance required for OTP SMS** — see `docs/APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md` Part D.5.

---

## Development Phases

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation: repo, docker, CI, env scaffolding | ✅ In Progress |
| 1 | Custom Auth Service (OTP, JWT, refresh rotation) | 🔜 Next |
| 2 | API Gateway hardening + patient/doctor services | ⏳ Pending |
| 3 | Treatment & appointment services | ⏳ Pending |
| 4 | Media service (Supabase Storage) + chat service | ⏳ Pending |
| 5 | Notification service (FCM-only) | ⏳ Pending |
| 6 | Flutter app: real auth + data wiring | ⏳ Pending |
| 7 | Next.js dashboard: real auth + data wiring | ⏳ Pending |
| 8 | Advanced features + design consistency pass | ⏳ Pending |
| 9 | Security hardening & compliance | ⏳ Pending |
| 10 | Testing, launch & go-live | ⏳ Pending |

---

## Security Notes

- **Never commit `.env` files** — use `.env.example` as the template.
- **`SUPABASE_SERVICE_ROLE_KEY`** lives only in `media-service`'s Railway environment — nowhere else.
- **`FIREBASE_SERVICE_ACCOUNT_KEY`** lives only in `notification-service` — nowhere else.
- **JWT RS256 keypair** lives only in `auth-service`.
- See `docs/APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md` Part G for the full security architecture.

---

*Build guide & full specification: `docs/APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md`*
