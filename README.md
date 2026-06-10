# APJ TRUE LIFE — Digital Health Platform

> 🏆 Award-winning Ayurvedic Medical Centre · AYUSH TV National Health Award 2024

A full-stack digital health platform built for APJ TRUE LIFE Ayurvedic Medical Centre — digitising the complete patient-doctor experience from OTP-based registration through multi-phase Ayurvedic treatment management, appointment scheduling, real-time chat, and treatment archival.

---

## 📋 Project Overview

| Component | Technology | Branch | Status |
|---|---|---|---|
| Flutter Mobile App (Patient) | Flutter 3.x / Dart 3.x | `master` | ✅ Frontend Complete |
| Next.js Web Dashboard (Doctor) | Next.js 14 / TypeScript / Tailwind CSS | `main` | ✅ Frontend Complete |
| Spring Boot Microservices (Backend) | Java 21 / Spring Boot 3.x | `main` | 🔶 Scaffold Only |
| NeonDB PostgreSQL | PostgreSQL 16 / Flyway | `main` | 🔶 Migrations Written |
| Firebase Auth | Phone OTP + Email/Password | — | ⏳ Needs Config |
| Cloudinary Media | CDN + Signed URLs | — | ⏳ Needs Config |
| Railway Deployment | Docker containers | — | ⏳ Needs Deploy |
| Vercel Deployment | Next.js edge hosting | — | ⏳ Needs Deploy |

---

## 🏗️ Repository Structure

```
APJ-True-Life/
├── apps/
│   ├── mobile/                    ← Flutter patient app (master branch)
│   │   └── lib/
│   │       ├── core/              ← theme, router, network, storage, DI
│   │       └── features/
│   │           ├── auth/          ← splash, onboarding, OTP, profile creation
│   │           ├── home/          ← home screen, physician card, treatment card
│   │           ├── treatment/     ← treatment overview, phase detail, archive
│   │           ├── appointments/  ← booking form, time slots, upcoming list
│   │           ├── chat/          ← STOMP WebSocket chat, image sharing
│   │           ├── profile/       ← profile screen, settings, notifications
│   │           ├── shell/         ← main scaffold with bottom navigation
│   │           └── main/          ← app entry
│   └── web/                       ← Next.js doctor dashboard (main branch)
│       └── src/
│           ├── app/
│           │   ├── login/         ← Firebase email/password login
│           │   └── (dashboard)/
│           │       ├── dashboard/ ← KPI cards, schedule, quick actions
│           │       ├── patients/  ← patient list + [id] profile + new
│           │       ├── treatments/← treatment list + [id] detail + new
│           │       ├── appointments/ ← calendar + list view
│           │       ├── chat/      ← conversation list + active chat
│           │       ├── archive/   ← completed treatments
│           │       ├── prescriptions/ ← prescriptions across all plans
│           │       └── settings/  ← clinic info, services, doctor profile
│           └── components/        ← layout, dashboard, patients, treatments,
│                                    appointments, chat, settings, shared
├── services/                      ← Spring Boot microservices (main branch)
│   ├── api-gateway/               ← Spring Cloud Gateway, port 8080
│   ├── auth-service/              ← Firebase token verify + JWT, port 8081
│   ├── patient-service/           ← Patient CRUD, port 8082
│   ├── doctor-service/            ← Doctor + Clinic + Services, port 8083
│   ├── treatment-service/         ← Treatment plans + phases, port 8084
│   ├── appointment-service/       ← Appointments + Calendar, port 8085
│   ├── chat-service/              ← STOMP WebSocket + message store, port 8086
│   ├── notification-service/      ← FCM push notifications, port 8087
│   └── media-service/             ← Cloudinary upload/delete, port 8088
└── docs/                          ← SRS document, ADRs
```

---

## ✅ Work Completed (As of June 2026)

### Phase 0 — Foundation & Infrastructure ✅
- Monorepo structure created with `apps/` and `services/` layout
- Flutter project scaffolded with full folder structure
- Next.js 14 project scaffolded with TypeScript + Tailwind CSS
- All 8 Spring Boot service skeletons created with `build.gradle` and `Dockerfile`
- NeonDB Flyway migration files written (V1–V8 schemas for all domains)
- GitHub Actions CI workflow set up
- `apps/web/.env.local.example` with all required environment variables documented

### Phase 1 — Backend Microservices Scaffold ✅ (Scaffold)
All 8 services have: `Application.java`, `build.gradle`, `Dockerfile`, `application.yml`, full Java package structure (`model/`, `repository/`, `service/`, `controller/`, `dto/`, `config/`, `exception/`), and Flyway SQL migrations.

> ⚠️ **Important**: Services are scaffolded with structure and Flyway migrations but need full controller/service/repository logic implemented. They cannot yet process real API calls.

### Phase 2 — Flutter App: Auth & Onboarding ✅ COMPLETE
| Screen | File | Status |
|---|---|---|
| Splash Screen | `auth/screens/splash_screen.dart` | ✅ Logo animation, 2s delay, auto-nav |
| Welcome / Onboarding | `auth/screens/onboarding_screen.dart` | ✅ 3-screen PageView carousel |
| Mobile Number Entry | `auth/screens/phone_entry_screen.dart` | ✅ +91 prefix, Firebase Phone Auth |
| OTP Verification | `auth/screens/otp_screen.dart` | ✅ 6-box, 45s countdown, auto-submit |
| Profile Creation | `auth/screens/profile_creation_screen.dart` | ✅ All fields, Cloudinary photo upload, consent |

### Phase 3 — Doctor Web Dashboard ✅ COMPLETE
| Page | Route | Status |
|---|---|---|
| Doctor Login | `/login` | ✅ Firebase email/password, Remember me, Forgot Password |
| Dashboard Home | `/dashboard` | ✅ KPI cards, today's schedule, recent messages, quick actions |
| Patient List & Search | `/patients` | ✅ Search, filter tabs (All/Active/In Treatment/Completed), sortable table |
| New Patient Form | `/patients/new` | ✅ All fields, Prakriti selection, DPDP consent, SMS invite notice |
| Patient Profile (Doctor) | `/patients/[id]` | ✅ Full profile, treatments, appointments, document vault |
| Create Treatment Plan | `/treatments/new` | ✅ Plan form, TipTap rich text editor, internal notes |
| Treatment Detail & Management | `/treatments/[id]` | ✅ Phase tabs, medicines, diet, clinical notes, Complete Treatment modal |
| Appointments Calendar | `/appointments` | ✅ FullCalendar week view + list toggle, confirm/cancel actions |
| Doctor Chat Dashboard | `/chat` | ✅ Conversation list, active chat panel, image attachments, read receipts |
| Completed Treatments Archive | `/archive` | ✅ Full archive, read-only, chat-deleted notice |
| Prescriptions Section | `/prescriptions` | ✅ Search, patient filter, medicines table, PDF download button |
| Clinic Settings | `/settings` | ✅ Clinic info, doctor profile, services CRUD, live preview |

### Phase 4 — Treatment Management UI ✅ COMPLETE (Flutter)
| Screen | File | Status |
|---|---|---|
| My Treatment (Active Overview) | `treatment/screens/my_treatment_screen.dart` | ✅ Progress bar, phase timeline, current phase card |
| Phase Detail Screen | `treatment/screens/phase_detail_screen.dart` | ✅ Medicines, diet (consume/avoid), documents, procedures |
| Completed Treatments Archive | `treatment/screens/completed_treatments_screen.dart` | ✅ 100% bars, chat-deleted notice, read-only |

### Phase 5 — Appointments System ✅ COMPLETE (Flutter)
| Screen | File | Status |
|---|---|---|
| Appointments (Upcoming + Booking) | `appointments/screens/appointments_screen.dart` | ✅ Upcoming list, inline booking form, 12-slot time grid, consultation type |

### Phase 6 — Chat & Real-time ✅ COMPLETE (Flutter UI)
| Screen | File | Status |
|---|---|---|
| Patient-Doctor Chat | `chat/screens/chat_screen.dart` | ✅ STOMP WebSocket, message bubbles, image attach, read receipts, warning banner |

### Phase 7 — Advanced Features & Polish ✅ COMPLETE (Flutter)
| Screen | File | Status |
|---|---|---|
| Patient Profile Screen | `profile/screens/profile_screen.dart` | ✅ My Information, My Health, Preferences, notifications toggle, logout |

---

## 🔶 Work Remaining

### 🔴 HIGH PRIORITY — Backend (Phase 1 Completion)
The services folder has scaffolding only. Full implementation is needed for:

| Service | What needs to be built |
|---|---|
| `auth-service` | `POST /auth/verify` — Firebase Admin SDK token validation, JWT issuance, user creation in DB |
| `patient-service` | Full CRUD: create/read/update patients, search, pagination, prakriti update |
| `doctor-service` | Doctor profile GET/PUT, clinic CRUD, service catalog CRUD |
| `treatment-service` | Treatment + phase CRUD, medicines, diet, documents (Cloudinary), clinical notes, complete treatment + chat deletion trigger |
| `appointment-service` | Booking, slot availability logic, confirm/cancel, calendar range query |
| `chat-service` | STOMP WebSocket broker, message persistence, read receipts, session management, deletion on treatment completion |
| `notification-service` | FCM integration, notification dispatch, history, mark-as-read |
| `media-service` | Cloudinary signed upload, delete by public_id |
| `api-gateway` | JWT validation filter, rate limiting (100 req/min), CORS config, route definitions |

### 🟡 MEDIUM PRIORITY — Cloud Account Configuration
- [ ] Firebase project: enable Phone Auth (patients) + Email/Password (doctors), add test numbers
- [ ] NeonDB: provision instance in `aws-ap-south-1` (Mumbai), create `dev` and `main` branches
- [ ] Cloudinary: create account, configure signed upload preset
- [ ] Railway: create project, deploy 8 service containers, set env vars, enable private networking
- [ ] Vercel: connect `apps/web` to GitHub, set production env vars, configure custom domain

### 🟡 MEDIUM PRIORITY — Frontend API Wiring
Currently all frontend data is mock/static. Once backend is running:
- [ ] Replace mock data in Next.js with real API calls via `axios` + React Query
- [ ] Replace mock data in Flutter with real API calls via `Dio` + Riverpod providers
- [ ] Wire Firebase Phone Auth OTP flow in Flutter (currently UI only)
- [ ] Wire Firebase Email/Password login in Next.js (currently UI only)
- [ ] Connect STOMP WebSocket in Flutter and Next.js to real `chat-service`
- [ ] Connect Cloudinary upload in Flutter profile creation and chat image sharing
- [ ] Wire FCM push notifications in Flutter (`firebase_messaging`)

### 🟢 LOW PRIORITY — Phase 8 (Testing & Launch)
- [ ] JUnit 5 + Testcontainers backend test suites (>70% coverage per service)
- [ ] Flutter widget tests + integration tests for auth flow
- [ ] Playwright E2E tests for critical Next.js doctor workflows
- [ ] NeonDB query analysis (`EXPLAIN ANALYZE`) + index optimization
- [ ] OWASP security checklist review
- [ ] iOS App Store: provisioning profiles, App Review submission, store listing
- [ ] Google Play Store: release keystore, Play Console submission
- [ ] Sentry error tracking active on all 3 platforms (Flutter, Next.js, Spring Boot)
- [ ] Post-launch monitoring: Railway metrics dashboards, uptime checks

---

## 📊 Overall Progress

```
Phase 0  Foundation & Infrastructure     ████████████████████  100% ✅
Phase 1  Backend Microservices           ████░░░░░░░░░░░░░░░░   20% 🔶 (scaffold only)
Phase 2  Flutter Auth & Onboarding       ████████████████████  100% ✅
Phase 3  Doctor Web Dashboard            ████████████████████  100% ✅
Phase 4  Treatment Management (UI)       ████████████████████  100% ✅
Phase 5  Appointments System (UI)        ████████████████████  100% ✅
Phase 6  Chat & Real-time (UI)           ████████████████████  100% ✅
Phase 7  Advanced Features & Polish (UI) ████████████████████  100% ✅
Phase 8  Testing, Launch & Go-Live       ░░░░░░░░░░░░░░░░░░░░    0% ⏳

Frontend (Flutter + Next.js):   ████████████████████  ~95% complete
Backend (Spring Boot services):  ████░░░░░░░░░░░░░░░░  ~20% complete (scaffold)
Infrastructure & Deployment:    ░░░░░░░░░░░░░░░░░░░░   ~0% (accounts not created)

Overall Project:  ~45% complete
```

---

## 🚀 Getting Started

### Web Dashboard (Next.js)
```bash
git clone https://github.com/Arhanpg/APJ-True-Life.git
cd APJ-True-Life/apps/web
cp .env.local.example .env.local
# Fill in Firebase config + API base URL
npm install
npm run dev
# Open http://localhost:3000
```

### Flutter App
```bash
cd apps/mobile
flutter pub get
flutter run
# Requires: Xcode 15+ (iOS) or Android Studio (Android)
```

### Backend Service (example: auth-service)
```bash
cd services/auth-service
# Set environment variables (see application.yml for full list):
# DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD
# JWT_SECRET, FIREBASE_PROJECT_ID
# FIREBASE_SERVICE_ACCOUNT_KEY (base64 encoded JSON)
./gradlew bootRun
# Health check: GET http://localhost:8081/actuator/health
```

---

## 🔑 Required Environment Variables

### Next.js Web (`apps/web/.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_API_BASE_URL=https://api.apjtruelife.com
```

### Flutter App (`apps/mobile/lib/firebase_options.dart`)
Generated by `flutterfire configure` — requires Firebase project setup.

### Backend Services (Railway env vars per service)
```env
DATABASE_URL=postgresql://...  # NeonDB connection string
JWT_SECRET=                    # 256-bit secret
FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=  # Base64 encoded service account JSON
CLOUDINARY_CLOUD_NAME=         # (media-service only)
CLOUDINARY_API_KEY=            # (media-service only)
CLOUDINARY_API_SECRET=         # (media-service only)
FCM_SERVER_KEY=                # (notification-service only)
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Patient Mobile App | Flutter / Dart | 3.x |
| Doctor Web Dashboard | Next.js / TypeScript / Tailwind CSS | 14+ |
| Backend Services | Java / Spring Boot / Spring Cloud Gateway | 21 LTS / 3.x |
| Database | PostgreSQL (NeonDB serverless) | 16 |
| DB Migrations | Flyway | Versioned SQL |
| Authentication | Firebase Authentication | — |
| File Storage | Cloudinary | — |
| Real-time Chat | STOMP over WebSocket | Spring WebSocket |
| Push Notifications | Firebase Cloud Messaging (FCM) | — |
| Frontend Hosting | Vercel | — |
| Backend Hosting | Railway | — |
| DNS / DDoS | Cloudflare | — |
| Error Tracking | Sentry | Flutter + Next.js + Spring Boot SDKs |

---

## 📄 Documentation

- [`docs/APJ_TRUE_LIFE_SRS_v1.0.pdf`](docs/) — Full Software Requirements Specification (55 pages)
- SRS covers: complete functional requirements (FR-PM-001 to FR-DW-014), all 8 microservice API contracts, full database schema (15 tables with indexes), 9 development phases, design system (Forest & Gold palette, Playfair Display + DM Sans)

---

## 📜 License

Confidential — APJ TRUE LIFE Ayurvedic Medical Centre. Internal development use only. Unauthorized distribution prohibited.
