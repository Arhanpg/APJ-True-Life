# APJ TRUE LIFE — Digital Health Platform v2.0

> **Ayurvedic Medical Centre · Patient & Doctor Management System**
> Flutter · Next.js · Spring Boot · Firebase Auth · Supabase · Vercel

---

## What This App Does

APJ TRUE LIFE is a full-stack digital health platform for an Ayurvedic Medical Centre in India. It lets patients book appointments, track treatments, and chat with doctors — all from a Flutter mobile app. Doctors and admins manage everything through a Next.js web dashboard.

---

## Project Structure

```
APJ-True-Life/
├── apps/
│   ├── mobile/              # Flutter 3.x — Patient app (Riverpod, Dio, go_router)
│   └── web/                 # Next.js 14+ — Doctor & Admin dashboard (Tailwind, shadcn/ui)
├── services/                # Spring Boot 3.x microservices (Java 21, Gradle)
│   ├── api-gateway/         # Port 8080 — JWT routing (Firebase + Spring JWT)
│   ├── auth-service/        # Port 8081 — Doctor/Admin login (RS256 JWT)
│   ├── patient-service/     # Port 8082 — Patient profile, sync, deletion
│   ├── doctor-service/      # Port 8083
│   ├── treatment-service/   # Port 8084
│   ├── appointment-service/ # Port 8085
│   ├── chat-service/        # Port 8086 — STOMP WebSocket
│   ├── notification-service/# Port 8087 — Firebase FCM push
│   └── media-service/       # Port 8088 — Supabase Storage signed URLs
├── firebase/
│   └── functions/           # Firebase blocking functions (custom claims for Supabase RLS)
├── docs/
│   └── APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md   ← Full AI agent build spec
├── docker-compose.dev.yml   # Local Postgres 16 + Adminer
└── .github/workflows/       # CI — Spring Boot + Flutter
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Patient Mobile App | Flutter 3.x, Dart 3.x, Riverpod 2.x, Dio, go_router |
| Doctor Web Dashboard | Next.js 14+ (App Router), TypeScript 5.x, Tailwind CSS, shadcn/ui |
| Backend Services | Spring Boot 3.x, Java 21, Gradle 8.x |
| **Patient Auth** | **Firebase Auth — Google Sign-In + Phone OTP → Supabase Third-Party JWT** |
| **Doctor/Admin Auth** | **Custom Spring Boot auth-service — bcrypt + RS256 JWT** |
| Database | Supabase Postgres (`bwozwxrzotnlajutxupm`) · 9 migrations applied |
| File Storage | Supabase Storage — 3 private buckets · signed URLs via media-service |
| Push Notifications | Firebase Cloud Messaging (FCM) — notification-service only |
| Backend Hosting | Railway |
| Frontend Hosting | Vercel — `apps/web/` auto-deploys on push to `main` |
| DNS / DDoS | Cloudflare |
| Error Tracking | Sentry |
| Legal Compliance | DPDP Act 2023 (India) — consent audit log, right to erasure, data minimisation |

---

## How Auth Works

```
PATIENTS (Flutter app)
  └─ Firebase Auth (Google Sign-In OR Phone OTP)
       └─ Firebase ID Token (JWT, 1hr TTL)
            └─ Passed to Supabase client via accessToken callback
                 └─ Supabase RLS uses auth.jwt()->>'sub' as patient identity

DOCTORS / ADMINS (Next.js dashboard)
  └─ Spring Boot auth-service (email + password)
       └─ RS256 JWT (15min TTL) stored in httpOnly cookie
            └─ API Gateway validates by checking iss = 'apj-auth'

API GATEWAY
  └─ Reads iss claim from Bearer token
       ├─ iss starts with 'https://securetoken.google.com/' → Firebase path (PATIENT)
       └─ iss = 'apj-auth' → Spring JWT path (DOCTOR/ADMIN)
```

---

## Database — Live on Supabase

**Project:** `bwozwxrzotnlajutxupm` · **URL:** `https://bwozwxrzotnlajutxupm.supabase.co`

All 9 migrations are applied and live:

| Migration | Table / Object | Notes |
|---|---|---|
| 001 | `is_valid_auth_jwt()` function | RLS guard — blocks non-Firebase/Supabase tokens |
| 002 | `public.patients` | Firebase UID as identity, DPDP consent fields, soft delete |
| 003 | `public.doctors` | Service-role only — no Supabase client access |
| 004 | `public.appointments` | Patient sees own only via RLS |
| 005 | `public.treatments` | Patient sees own only via RLS |
| 006 | `public.chat_messages` | One sender constraint, indexed |
| 007 | `public.consent_audit_log` | Immutable DPDP Act 2023 compliance log |
| 008 | `public.storage_bucket_registry` | Documents 3 private storage buckets |
| 009 | Security hardening | search_path locked, deny-all policies, revoke on unsafe functions |

**RLS is enabled on every table.** Every table has a `RESTRICTIVE` policy that calls `is_valid_auth_jwt()` — meaning tokens from any other Firebase project or unknown issuer are rejected at the DB level.

---

## Storage Buckets

Create these 3 buckets manually in [Supabase Dashboard → Storage](https://supabase.com/dashboard/project/bwozwxrzotnlajutxupm/storage/buckets):

| Bucket | Public | Max Size | Allowed Types |
|---|---|---|---|
| `patient-documents` | ❌ Private | 10 MB | PDF, JPG, PNG, WebP |
| `patient-avatars` | ❌ Private | 2 MB | JPG, PNG, WebP |
| `doctor-avatars` | ❌ Private | 2 MB | JPG, PNG, WebP |

All file access is via `media-service` which generates signed URLs using the `SUPABASE_SERVICE_ROLE_KEY`. No direct client access to storage is allowed.

---

## Vercel Setup (Next.js Dashboard)

**Project:** [apj-true-life on Vercel](https://vercel.com/arhanpgs-projects/apj-true-life)
**Root Directory:** `apps/web`
**Framework:** Next.js (auto-detected)
**Auto-deploy:** Every push to `main`

### Required Vercel Environment Variables

Add these in [Vercel Dashboard → Settings → Environment Variables](https://vercel.com/arhanpgs-projects/apj-true-life/settings/environment-variables):

```env
NEXT_PUBLIC_SUPABASE_URL=https://bwozwxrzotnlajutxupm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Supabase Dashboard → Settings → API>
API_GATEWAY_BASE_URL=https://api.apjtrue.life
NEXT_PUBLIC_SENTRY_DSN=<your sentry dsn>
```

> ⚠️ Never add `SUPABASE_SERVICE_ROLE_KEY` to Vercel. It belongs only in Railway (media-service).

---

## Local Development

### Prerequisites

```bash
java --version      # Java 21 (Temurin)
flutter --version   # Flutter 3.x
node --version      # Node 20+
docker --version    # Docker Desktop running
firebase --version  # npm install -g firebase-tools
```

### Start local database

```bash
docker compose -f docker-compose.dev.yml up -d
# Postgres → localhost:5432
# Adminer UI → http://localhost:8081
```

### Run the Next.js dashboard

```bash
cd apps/web
cp .env.local.example .env.local   # fill in values
npm install
npm run dev
# Runs at http://localhost:3000
```

### Run a Spring Boot service

```bash
cd services/auth-service
cp .env.example .env   # fill in values
./gradlew bootRun --args='--spring.profiles.active=local'
```

### Run the Flutter app

```bash
cd apps/mobile
flutter pub get
flutter run
```

---

## Development Phases

| Phase | What Gets Built | Status |
|---|---|---|
| **0** | Repo scaffold, Docker, CI, env files, Supabase DB schema | ✅ **Complete** |
| **1** | Firebase Auth in Flutter + Supabase Third-Party Auth config | 🔜 **Next** |
| **2** | Doctor auth-service (Spring Boot) + API Gateway dual-JWT | ⏳ Pending |
| **3** | Patient profile-sync endpoint + DPDP consent screen in Flutter | ⏳ Pending |
| **4** | Appointment, treatment, doctor services | ⏳ Pending |
| **5** | Media service (Supabase Storage signed URLs) | ⏳ Pending |
| **6** | Chat service (STOMP WebSocket) | ⏳ Pending |
| **7** | Notification service (FCM push) | ⏳ Pending |
| **8** | Flutter app full data wiring (Riverpod + Dio) | ⏳ Pending |
| **9** | Next.js dashboard full data wiring | ⏳ Pending |
| **10** | DPDP compliance audit + security VAPT + launch | ⏳ Pending |

---

## Security Rules

| Rule | What It Means |
|---|---|
| `.env` files | Never committed. Use `.env.example` as the template only. |
| `SUPABASE_SERVICE_ROLE_KEY` | Lives only in `media-service` Railway env. Nowhere else. |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Lives only in `api-gateway` + `notification-service` Railway env. |
| `JWT RS256 keypair` | Lives only in `auth-service` Railway env. |
| `google-services.json` | Never committed. Listed in `.gitignore`. Local machine only. |
| Supabase Storage | All buckets private. No direct client access. Signed URLs only. |
| RLS | Every table has `is_valid_auth_jwt()` as a RESTRICTIVE policy. |
| Passwords | bcrypt cost 12 for doctor accounts. |

---

## India Legal Compliance (DPDP Act 2023)

- Explicit **unchecked** consent checkbox shown at first sign-up
- Separate consent for medical data vs marketing
- `consent_audit_log` table records every consent event — immutable
- **Right to erasure** — soft-delete + Firebase `deleteUser()` + storage cleanup
- **Right to access** — data export endpoint in patient-service
- Data retained 3 years post last appointment (Indian medical law)
- Children under 18 blocked from registration
- Grievance officer contact required in Privacy Policy

---

## Full Build Specification

See [`docs/APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md`](docs/APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md) — this is the authoritative AI agent build prompt. Every architecture decision, code snippet, user flow, and compliance requirement is documented there.
