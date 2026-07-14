# APJ TRUE LIFE — v2.0 Full Build Prompt Guide (Firebase Auth + Supabase Edition)
### Authoritative Specification · Single-Branch Monorepo · Flutter + Next.js + Spring Boot

> **This document is a self-contained AI agent build prompt. An AI agent reading this file must be able to implement the entire system end-to-end without any additional clarification. Every decision is final. No open questions remain.**

---

## 0. Document Metadata

| Field | Value |
|---|---|
| App Name | APJ TRUE LIFE |
| Version | 2.0 |
| Prepared For | APJ TRUE LIFE Ayurvedic Medical Centre — Digital Health Platform |
| Supabase Project ID | bwozwxrzotnlajutxupm |
| Firebase Auth Mode | Third-Party Auth via JWT (Firebase Auth → Supabase RLS) |
| Auth Strategy | **Firebase Auth (Google Sign-In + Phone OTP) for patients · Custom Spring Boot for Doctors/Admins** |
| Status | Final — Execute Immediately |
| Jurisdiction | India (DPDP Act 2023 compliant) |
| Last Updated | July 2026 |

---

## 1. Architecture Overview

```
APJ-True-Life/
├── apps/
│   ├── mobile/          # Flutter 3.x — Patient-facing app (Riverpod, Dio, go_router)
│   └── web/             # Next.js 14+ — Doctor/Admin dashboard (TanStack Query, Tailwind, shadcn/ui)
├── services/            # Spring Boot 3.x microservices (Java 21, Gradle)
│   ├── api-gateway/     # Port 8080 — JWT validation (Firebase + Spring JWT), rate limiting, routing
│   ├── auth-service/    # Port 8081 — Doctor/Admin login (password + RS256 JWT). NOT for patients.
│   ├── patient-service/ # Port 8082
│   ├── doctor-service/  # Port 8083
│   ├── treatment-service/  # Port 8084
│   ├── appointment-service/ # Port 8085
│   ├── chat-service/    # Port 8086 — STOMP WebSocket
│   ├── notification-service/ # Port 8087 — FCM push (Firebase Admin SDK)
│   └── media-service/   # Port 8088 — Supabase Storage signed URLs
├── docs/
│   └── APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE.md  ← This file (source of truth)
├── firebase/
│   └── functions/       # Firebase Cloud Functions (blocking auth functions for custom claims)
├── docker-compose.dev.yml
└── .github/workflows/ci.yml
```

---

## 2. Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Patient App | Flutter 3.x / Dart 3.x, Riverpod 2.x, Dio, go_router | Primary patient interface |
| Doctor Dashboard | Next.js 14+ (App Router), TypeScript 5.x, Tailwind CSS, shadcn/ui | Doctor + Admin portal |
| Backend | Spring Boot 3.x, Java 21, Gradle 8.x | Multi-project monorepo |
| **Patient Auth** | **Firebase Auth (Google Sign-In + Phone OTP)** | **Third-party JWT trusted by Supabase** |
| **Doctor/Admin Auth** | **Custom Spring Boot auth-service (password + RS256 JWT)** | **No Firebase Auth for staff** |
| Database | Supabase Postgres (project: bwozwxrzotnlajutxupm) | Flyway migrations |
| File Storage | Supabase Storage (private buckets, signed URLs via media-service) | |
| OTP/SMS Delivery | **Firebase Auth Phone OTP** (for patients) + DLT-registered MSG91 (for future doctor SMS) | |
| Push Notifications | Firebase Cloud Messaging (FCM only — notification-service) | |
| Backend Hosting | Railway | |
| Frontend Hosting | Vercel | |
| DNS/DDoS | Cloudflare | |
| Error Tracking | Sentry | |

---

## 3. Authentication Architecture — COMPLETE SPECIFICATION

> **CRITICAL DECISION:** The previous architecture used a fully custom Spring Boot auth for patients. This is now CHANGED. Patient authentication uses **Firebase Auth** (Google Sign-In + Phone OTP). Doctor and Admin authentication remains **custom Spring Boot auth-service** (password-based, RS256 JWT). The Supabase project is configured to trust Firebase JWTs as a Third-Party Auth provider.

### 3.1 Patient Auth Flow (Firebase Auth → Supabase Third-Party JWT)

```
PATIENT SIGN-UP / SIGN-IN FLOW:

1. Flutter app initialises Firebase SDK (google-services.json)
2. Patient taps "Continue with Google" OR "Sign in with Phone"

   ── Google Sign-In path ──────────────────────────────────────
   3a. FirebaseAuth.instance.signInWithGoogle()
   4a. Firebase issues ID Token (RS256 signed, aud = Firebase Project ID)
   5a. Firebase blocking function runs → injects role: 'authenticated' custom claim
   6a. Flutter calls FirebaseAuth.instance.currentUser.getIdToken(forceRefresh: false)
   7a. Token is passed to Supabase client via accessToken async callback

   ── Phone OTP path ───────────────────────────────────────────
   3b. FirebaseAuth.instance.verifyPhoneNumber(phoneNumber)
   4b. Firebase sends OTP SMS via its DLT-compliant pipeline
   5b. User enters OTP → FirebaseAuth.instance.signInWithCredential()
   6b. Firebase issues ID Token with role: 'authenticated' claim
   7b. Flutter passes token to Supabase client

8. Supabase client configured with accessToken: async () => await FirebaseAuth.instance.currentUser?.getIdToken()
9. Supabase verifies Firebase JWT against Google JWKS: https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
10. auth.jwt()->>'sub' is the Firebase UID → used as auth.uid() in RLS
11. Supabase RLS policies authorise row-level access
12. POST /api/patients/profile-sync called once after first sign-in (Spring Boot patient-service)
    - Creates/updates patient profile in public.patients linked to firebase_uid
```

### 3.2 Doctor / Admin Auth Flow (Custom Spring Boot)

```
DOCTOR / ADMIN SIGN-IN FLOW:

1. Doctor opens Next.js dashboard → enters email + password
2. POST /api/auth/login (auth-service, port 8081)
3. auth-service validates credentials against DB (bcrypt hash)
4. auth-service issues RS256 JWT {sub: doctor_id, role: 'doctor'|'admin', iss: 'apj-auth'}
5. Next.js stores JWT in httpOnly cookie (Secure, SameSite=Strict)
6. All subsequent API requests include JWT in Authorization: Bearer header
7. api-gateway validates JWT — if iss = 'apj-auth' → routes to backend services
8. If iss = Firebase → treated as patient call (separate routing path)
```

### 3.3 Token Validation at API Gateway

The api-gateway (Spring Boot, port 8080) must validate TWO types of tokens:

| Token Type | Issuer (iss claim) | Validation Method | Mapped Role |
|---|---|---|---|
| Firebase (patient) | `https://securetoken.google.com/<firebase-project-id>` | Firebase Admin SDK / JWKS | PATIENT |
| Spring Boot (doctor/admin) | `apj-auth` | RS256 public key (local) | DOCTOR or ADMIN |

**Implementation in api-gateway:**
```java
// TokenValidatorService.java
public AuthContext validate(String bearerToken) {
    DecodedJWT jwt = JWT.decode(bearerToken);
    String issuer = jwt.getIssuer();
    
    if (issuer.startsWith("https://securetoken.google.com/")) {
        return validateFirebaseToken(bearerToken); // Firebase Admin SDK
    } else if ("apj-auth".equals(issuer)) {
        return validateSpringJwt(bearerToken);      // RS256 local key
    }
    throw new UnauthorizedException("Unknown token issuer");
}
```

### 3.4 Supabase Third-Party Auth Configuration

**Step 1 — Supabase Dashboard:**
- Navigate to Authentication → Third-Party Auth
- Add Firebase integration
- Enter Firebase Project ID

**Step 2 — Firebase Blocking Function (deploy to firebase/functions/):**
```javascript
// firebase/functions/index.js
import { beforeUserCreated, beforeUserSignedIn } from 'firebase-functions/v2/identity';

export const beforecreated = beforeUserCreated((event) => {
  return {
    customClaims: {
      role: 'authenticated', // Required by Supabase to use 'authenticated' Postgres role
    },
  };
});

export const beforesignedin = beforeUserSignedIn((event) => {
  return {
    customClaims: {
      role: 'authenticated',
    },
  };
});
```
Deploy with: `firebase deploy --only functions`

**Step 3 — Supabase RLS helper function (run as migration):**
```sql
-- migration: 001_firebase_auth_jwt_guard.sql
CREATE OR REPLACE FUNCTION public.is_valid_auth_jwt()
RETURNS bool
LANGUAGE sql
STABLE
RETURNS NULL ON NULL INPUT
AS $$
  SELECT (
    -- Supabase native auth
    auth.jwt()->>'iss' = 'https://bwozwxrzotnlajutxupm.supabase.co/auth/v1'
    OR
    -- Firebase Auth for this specific Firebase project only
    (
      auth.jwt()->>'iss' = 'https://securetoken.google.com/<YOUR_FIREBASE_PROJECT_ID>'
      AND auth.jwt()->>'aud' = '<YOUR_FIREBASE_PROJECT_ID>'
    )
  );
$$;
```
Replace `<YOUR_FIREBASE_PROJECT_ID>` with your actual Firebase project ID from the Firebase Console.

**Step 4 — Apply restrictive RLS policy to ALL public schema tables:**
```sql
-- Apply to every table: patients, appointments, treatments, chat_messages, etc.
CREATE POLICY "Restrict to valid auth JWT only"
ON public.<table_name>
AS RESTRICTIVE
TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

### 3.5 Flutter Supabase Client Initialisation

```dart
// lib/core/supabase_client.dart
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<void> initSupabase() async {
  await Supabase.initialize(
    url: 'https://bwozwxrzotnlajutxupm.supabase.co',
    anonKey: '<SUPABASE_ANON_KEY>', // from env
    authOptions: FlutterAuthClientOptions(
      authFlowType: AuthFlowType.pkce,
    ),
  );
}

// Custom Supabase client that uses Firebase token
SupabaseClient getFirebaseBackedSupabaseClient() {
  return SupabaseClient(
    'https://bwozwxrzotnlajutxupm.supabase.co',
    '<SUPABASE_ANON_KEY>',
    accessToken: () async {
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) return null;
      return await user.getIdToken(false);
    },
  );
}
```

### 3.6 Profile Sync (First Login)

After first Firebase sign-in, call patient-service to create the profile:

```dart
// lib/features/auth/patient_profile_sync.dart
Future<void> syncPatientProfile(User firebaseUser) async {
  final idToken = await firebaseUser.getIdToken();
  await dio.post(
    '/api/patients/profile-sync',
    data: {
      'firebase_uid': firebaseUser.uid,
      'name': firebaseUser.displayName,
      'phone': firebaseUser.phoneNumber,
      'email': firebaseUser.email,
      'photo_url': firebaseUser.photoURL,
    },
    options: Options(headers: {'Authorization': 'Bearer $idToken'}),
  );
}
```

**patient-service endpoint:**
```java
// POST /api/patients/profile-sync
// Validates Firebase JWT via Firebase Admin SDK
// Upserts row in public.patients (firebase_uid as unique key)
// Returns patient profile
```

---

## 4. Database Schema — Supabase Postgres

> Project ID: `bwozwxrzotnlajutxupm`
> All migrations via Flyway. SESSION-mode connection (port 5432) for migrations. TRANSACTION-mode pooler (port 6543) for runtime HikariCP. `prepareThreshold=0` on all JDBC URLs.

### 4.1 Core Tables

```sql
-- V1__create_patients.sql
CREATE TABLE public.patients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid  TEXT UNIQUE NOT NULL,  -- Firebase Auth UID (auth.uid() equivalent)
  name          TEXT,
  email         TEXT,
  phone         TEXT,
  photo_url     TEXT,
  date_of_birth DATE,
  gender        TEXT CHECK (gender IN ('male','female','other','prefer_not_to_say')),
  blood_group   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,   -- DPDP Act 2023 consent
  consent_at    TIMESTAMPTZ,                       -- Timestamp of consent
  consent_version TEXT                             -- Version of privacy policy consented to
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Patient can only read/update their own row
CREATE POLICY "Patient reads own profile"
ON public.patients FOR SELECT TO authenticated
USING (firebase_uid = auth.jwt()->>'sub');

CREATE POLICY "Patient updates own profile"
ON public.patients FOR UPDATE TO authenticated
USING (firebase_uid = auth.jwt()->>'sub');

-- Restrictive guard (Firebase project isolation)
CREATE POLICY "Restrict to valid auth JWT"
ON public.patients AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

```sql
-- V2__create_doctors.sql
CREATE TABLE public.doctors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  specialisation TEXT,
  phone         TEXT,
  password_hash TEXT NOT NULL,  -- bcrypt, managed by auth-service
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
-- Doctors access controlled exclusively by Spring Boot auth-service (not Supabase client)
```

```sql
-- V3__create_appointments.sql
CREATE TABLE public.appointments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id     UUID NOT NULL REFERENCES public.doctors(id),
  scheduled_at  TIMESTAMPTZ NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient sees own appointments"
ON public.appointments FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

CREATE POLICY "Restrict to valid auth JWT"
ON public.appointments AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

```sql
-- V4__create_treatments.sql
CREATE TABLE public.treatments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id     UUID NOT NULL REFERENCES public.doctors(id),
  name          TEXT NOT NULL,
  description   TEXT,
  started_at    TIMESTAMPTZ,
  ended_at      TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient sees own treatments"
ON public.treatments FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

CREATE POLICY "Restrict to valid auth JWT"
ON public.treatments AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

```sql
-- V5__create_chat_messages.sql
CREATE TABLE public.chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  sender_firebase_uid TEXT,     -- null if sent by doctor
  sender_doctor_id UUID,        -- null if sent by patient
  content       TEXT NOT NULL,
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient reads own chat"
ON public.chat_messages FOR SELECT TO authenticated
USING (
  sender_firebase_uid = auth.jwt()->>'sub'
  OR appointment_id IN (
    SELECT a.id FROM public.appointments a
    JOIN public.patients p ON p.id = a.patient_id
    WHERE p.firebase_uid = auth.jwt()->>'sub'
  )
);

CREATE POLICY "Restrict to valid auth JWT"
ON public.chat_messages AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

```sql
-- V6__create_consent_audit_log.sql
-- DPDP Act 2023 compliance: immutable consent log
CREATE TABLE public.consent_audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES public.patients(id),
  action          TEXT NOT NULL CHECK (action IN ('consent_given','consent_withdrawn','data_deleted','data_accessed')),
  policy_version  TEXT NOT NULL,
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.consent_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient reads own consent log"
ON public.consent_audit_log FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

-- Inserts only via service role (backend) — no direct client inserts
CREATE POLICY "Restrict to valid auth JWT"
ON public.consent_audit_log AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);
```

---

## 5. Security Architecture

### 5.1 Key Security Rules (Non-Negotiable)

| Rule | Detail |
|---|---|
| `.env` files | NEVER committed. `.env.example` is the only template. |
| `SUPABASE_SERVICE_ROLE_KEY` | Lives ONLY in media-service Railway env. Nowhere else. |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Lives ONLY in notification-service and auth-validation at api-gateway. |
| `FIREBASE_ADMIN_SDK` | api-gateway uses it to verify patient Firebase tokens. |
| JWT RS256 keypair | Lives ONLY in auth-service for doctor/admin tokens. |
| All Supabase buckets | PRIVATE. Every file access via media-service signed URL. |
| CORS | api-gateway enforces CORS whitelist. Only APJ domains allowed. |
| Rate limiting | api-gateway enforces per-IP and per-user-ID rate limiting. |
| Token refresh | Firebase tokens auto-refresh (1hr TTL). Spring Boot tokens 15min TTL + refresh token rotation. |
| SQL injection | Parameterised queries only. No string interpolation in SQL. |
| Restrictive RLS | Every public schema table has the Firebase project isolation policy (as restrictive). |

### 5.2 HTTPS and Transport Security

- All traffic via Cloudflare (TLS 1.3 minimum).
- HSTS headers enforced on all domains.
- Firebase tokens transmitted only over HTTPS.
- Supabase connections encrypted in transit.

### 5.3 Data Encryption

- Passwords: bcrypt (cost factor 12) for doctor accounts.
- Sensitive patient health data fields: AES-256 encrypted at application layer before storage.
- Supabase Storage: server-side encryption enabled.

### 5.4 Audit Logging

- Every CRUD on `patients`, `appointments`, `treatments` tables must write to `consent_audit_log` via Postgres trigger or Spring Boot event.
- Firebase Auth events (sign-in, sign-out, password change) logged via Firebase Audit Logs.
- API Gateway logs all 4xx/5xx to Sentry.

### 5.5 Token Security in Flutter

```dart
// DO:
final token = await FirebaseAuth.instance.currentUser?.getIdToken(false);
// Store nothing sensitive in SharedPreferences or local storage
// Firebase SDK manages token persistence securely

// DO NOT:
// SharedPreferences.setString('firebase_token', token); // NEVER
// Store tokens in plain text anywhere
```

---

## 6. User Flows — Patient (Firebase Auth)

### 6.1 First-Time Sign-Up Flow

```
1. App launch → Splash screen (check FirebaseAuth.instance.currentUser)
2. If null → Onboarding screen shown
3. Patient taps "Continue with Google"
   → Google Sign-In sheet opens
   → User selects Google account
   → Firebase issues ID token (blocking function adds role: 'authenticated')
   OR
   Patient taps "Sign in with Phone"
   → Phone number input (with +91 country code default for India)
   → Firebase sends OTP SMS
   → OTP input screen (6-digit, 60-second resend timer)
   → signInWithCredential() → Firebase ID token issued
4. MANDATORY: Consent screen shown (DPDP Act 2023 requirement)
   → Displays Privacy Policy and Terms of Service (India-compliant)
   → Patient must explicitly tap "I Agree" checkbox (not pre-checked)
   → Consent timestamp + policy version saved to DB via patient-service
5. Profile completion screen (name, DOB, gender — optional but encouraged)
6. POST /api/patients/profile-sync (creates row in public.patients)
7. Home screen
```

### 6.2 Returning User Flow

```
1. App launch → FirebaseAuth.instance.currentUser is not null
2. getIdToken(false) — returns cached or auto-refreshed token
3. Supabase client uses token → direct to Home screen
4. If token expired (1hr) → Firebase SDK auto-refreshes silently
```

### 6.3 Sign-Out Flow

```
1. Patient taps Sign Out
2. FirebaseAuth.instance.signOut()
3. Supabase client accessToken callback returns null → Supabase treats as anon
4. Navigate to Onboarding screen
5. Clear any local Riverpod state
```

### 6.4 Account Deletion (DPDP Act — Right to Erasure)

```
1. Patient requests account deletion in app settings
2. Display "Are you sure?" confirmation dialog + reason selection
3. POST /api/patients/delete-account (patient-service)
   → patient-service writes 'data_deleted' to consent_audit_log
   → Soft-delete patient row (set deleted_at, anonymise PII fields)
   → Firebase Admin SDK: deleteUser(firebase_uid) — removes Firebase account
   → Supabase Storage: delete patient media files
4. Sign out locally (FirebaseAuth.instance.signOut())
5. Navigate to Onboarding screen
6. Patient receives email confirmation of data deletion
```

---

## 7. User Flows — Doctor / Admin (Custom Auth)

### 7.1 Doctor Login

```
1. Doctor opens Next.js dashboard → /login page
2. Enters email + password
3. POST /api/auth/login → auth-service validates → returns RS256 JWT + refresh token
4. JWT stored in httpOnly Secure SameSite=Strict cookie
5. Refresh token stored in httpOnly cookie (separate, longer-lived)
6. Dashboard loaded (TanStack Query fetches via api-gateway)
```

### 7.2 Doctor Session Management

```
- JWT TTL: 15 minutes
- Refresh token TTL: 7 days
- On 401 from api-gateway: automatic silent refresh via POST /api/auth/refresh
- If refresh token expired: redirect to /login
- Doctor logout: POST /api/auth/logout → clears httpOnly cookies, invalidates refresh token in DB
```

---

## 8. India Legal Compliance — DPDP Act 2023

### 8.1 What the App Must Implement

| Requirement | Implementation |
|---|---|
| **Explicit consent before data collection** | Consent screen shown at first sign-up. Unchecked checkbox. Cannot proceed without consent. |
| **Notice at point of collection** | In-app notice screen (not just a link) explains: what data, why, retention period, withdrawal method. |
| **Purpose-specific consent** | Separate consent for: (a) appointment management, (b) treatment history, (c) marketing communications |
| **Consent withdrawal** | Settings → Privacy → Withdraw Consent → triggers soft delete workflow |
| **Right to access** | Settings → Privacy → Download My Data → returns JSON export |
| **Right to erasure** | Settings → Privacy → Delete Account (Section 6.4 above) |
| **Right to correction** | Settings → Edit Profile → corrects inaccurate data |
| **Breach notification** | Monitored via Sentry + Supabase alerts; manual 72-hour notification workflow documented |
| **Data minimisation** | Collect only: name, phone, DOB, gender, health notes. No unnecessary fields. |
| **Retention policy** | Patient data retained for 3 years after last appointment (as per Indian medical record guidelines). Auto-deleted after. |
| **Children under 18** | DOB field mandatory. If age < 18: block registration, display "please use with guardian" message |
| **Cross-border transfer** | Supabase project region must be in India (ap-south-1/Mumbai) or data processing agreement required |

### 8.2 Privacy Policy — Required Sections (India)

The app must link to a Privacy Policy hosted at a public URL. The Privacy Policy must cover:

1. **Identity of Data Fiduciary** — Name, address, grievance officer contact of APJ TRUE LIFE
2. **Data collected** — Exact list of personal data fields
3. **Purpose of collection** — Appointment booking, treatment tracking, communication
4. **Legal basis** — Consent (Section 4, DPDP Act 2023)
5. **Retention period** — 3 years post last appointment
6. **Third-party processors** — Firebase (Google LLC), Supabase (Supabase Inc.), Railway, Vercel, MSG91
7. **Data transfers** — Details of any cross-border transfers
8. **User rights** — Access, correction, erasure, nomination, grievance
9. **How to withdraw consent** — In-app steps
10. **Grievance officer** — Name + email (mandatory under DPDP Act)
11. **Data Protection Board complaints** — Link to DPB complaint portal
12. **Policy version + last updated date**

### 8.3 Terms of Service — Required Clauses (India)

1. Governing law: Laws of India, jurisdiction: [City of APJ TRUE LIFE's registered office]
2. Dispute resolution: Arbitration first, courts second
3. Consumer rights under Consumer Protection Act 2019
4. Limitation of liability clauses
5. Intellectual property ownership
6. Prohibited uses
7. Health disclaimer (app is not a substitute for in-person medical care)

### 8.4 In-App Consent UI Specification

```
┌─────────────────────────────────────────┐
│  Before we continue...                  │
│                                         │
│  APJ TRUE LIFE collects your name,      │
│  phone number, and health information   │
│  to manage your appointments and        │
│  treatment records.                     │
│                                         │
│  ► What we collect: [tap to expand]     │
│  ► Why we collect it: [tap to expand]   │
│  ► How long we keep it: [tap to expand] │
│  ► Your rights: [tap to expand]         │
│                                         │
│  ☐ I agree to the Privacy Policy and   │  ← NOT pre-checked
│    Terms of Service                     │
│                                         │
│  ☐ I agree to receive appointment       │  ← Separate, optional
│    reminders and health tips (optional) │
│                                         │
│  [Read Privacy Policy] [Read Terms]     │
│                                         │
│  [Continue]  ← DISABLED until main      │
│               checkbox checked          │
└─────────────────────────────────────────┘
```

---

## 9. Supabase Storage — Media Service

- **All buckets: PRIVATE**
- Bucket structure:
  - `patient-documents/{patient_id}/` — prescriptions, reports
  - `patient-avatars/{patient_id}/` — profile photos
  - `doctor-avatars/{doctor_id}/` — doctor profile photos
- `SUPABASE_SERVICE_ROLE_KEY` used ONLY in media-service (Railway env var)
- Every file access: media-service generates signed URL (TTL: 5 minutes for documents, 1 hour for avatars)
- No direct Supabase Storage URLs exposed to client

---

## 10. Environment Variables — Complete List

### 10.1 api-gateway (.env.example)

```env
PORT=8080
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_SERVICE_ACCOUNT_JSON=<path-to-json-or-json-string>
AUTH_SERVICE_RS256_PUBLIC_KEY=<RS256-public-key-pem>
SUPABASE_URL=https://bwozwxrzotnlajutxupm.supabase.co
ALLOWED_ORIGINS=https://apjtrue.life,https://dashboard.apjtrue.life
SENTRY_DSN=<sentry-dsn>
RATE_LIMIT_REQUESTS_PER_MINUTE=60
```

### 10.2 auth-service (.env.example)

```env
PORT=8081
SPRING_DATASOURCE_URL=jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres?prepareThreshold=0
SPRING_DATASOURCE_USERNAME=<supabase-user>
SPRING_DATASOURCE_PASSWORD=<supabase-password>
JWT_RS256_PRIVATE_KEY=<RS256-private-key-pem>
JWT_RS256_PUBLIC_KEY=<RS256-public-key-pem>
JWT_ACCESS_TOKEN_TTL_SECONDS=900
JWT_REFRESH_TOKEN_TTL_SECONDS=604800
```

### 10.3 patient-service (.env.example)

```env
PORT=8082
SPRING_DATASOURCE_URL=jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres?prepareThreshold=0
SPRING_DATASOURCE_USERNAME=<supabase-user>
SPRING_DATASOURCE_PASSWORD=<supabase-password>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_SERVICE_ACCOUNT_JSON=<path-or-json-string>
```

### 10.4 media-service (.env.example)

```env
PORT=8088
SUPABASE_URL=https://bwozwxrzotnlajutxupm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # ONLY HERE
SIGNED_URL_TTL_SECONDS_DOCUMENTS=300
SIGNED_URL_TTL_SECONDS_AVATARS=3600
```

### 10.5 notification-service (.env.example)

```env
PORT=8087
FIREBASE_SERVICE_ACCOUNT_JSON=<path-or-json-string>  # ONLY HERE for FCM
```

### 10.6 Flutter app (dart-define or .env via flutter_dotenv)

```env
SUPABASE_URL=https://bwozwxrzotnlajutxupm.supabase.co
SUPABASE_ANON_KEY=<supabase-anon-key>
API_GATEWAY_BASE_URL=https://api.apjtrue.life
SENTRY_DSN=<sentry-dsn>
# Firebase config is in google-services.json / GoogleService-Info.plist (NOT in .env)
```

### 10.7 Next.js dashboard (.env.example)

```env
NEXT_PUBLIC_SUPABASE_URL=https://bwozwxrzotnlajutxupm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
API_GATEWAY_BASE_URL=https://api.apjtrue.life
NEXT_PUBLIC_SENTRY_DSN=<sentry-dsn>
```

---

## 11. Firebase Setup Checklist

- [ ] Create Firebase project (if not already)
- [ ] Enable Authentication → Google Sign-In provider
- [ ] Enable Authentication → Phone provider (DLT registered number for India)
- [ ] Enable "Firebase Authentication with Identity Platform" (required for blocking functions)
- [ ] Deploy blocking functions (`beforeUserCreated`, `beforeUserSignedIn`) that add `role: 'authenticated'`
- [ ] Add Android app → download `google-services.json` → place in `apps/mobile/android/app/`
- [ ] Add iOS app → download `GoogleService-Info.plist` → place in `apps/mobile/ios/Runner/`
- [ ] Add Firebase project to Supabase Third-Party Auth (Dashboard → Authentication → Third-Party Auth)
- [ ] Never commit `google-services.json` or `GoogleService-Info.plist` — use `.gitignore`

---

## 12. Development Phases (Updated)

| Phase | Focus | Status |
|---|---|---|
| 0 | Foundation: repo, docker, CI, env scaffolding | ✅ In Progress |
| 1 | Firebase Auth integration (Flutter) + Supabase Third-Party Auth config + RLS setup | 🔜 Next |
| 2 | Doctor/Admin auth-service (Spring Boot) + api-gateway dual-JWT validation | ⏳ Pending |
| 3 | Patient profile sync endpoint (patient-service) + DPDP consent screen | ⏳ Pending |
| 4 | API Gateway hardening + patient/doctor/treatment/appointment services | ⏳ Pending |
| 5 | Media service (Supabase Storage signed URLs) | ⏳ Pending |
| 6 | Chat service (STOMP WebSocket) | ⏳ Pending |
| 7 | Notification service (FCM push) | ⏳ Pending |
| 8 | Flutter app: full data wiring (Riverpod + Dio) | ⏳ Pending |
| 9 | Next.js dashboard: full data wiring (TanStack Query) | ⏳ Pending |
| 10 | Security hardening + DPDP compliance audit + launch | ⏳ Pending |

---

## 13. Security Checklist — Pre-Launch

- [ ] All `.env` files excluded by `.gitignore` — verified
- [ ] `SUPABASE_SERVICE_ROLE_KEY` only in media-service Railway env — verified
- [ ] `FIREBASE_SERVICE_ACCOUNT_JSON` only in api-gateway + notification-service Railway env — verified
- [ ] RS256 keypair only in auth-service Railway env — verified
- [ ] All public schema tables have `is_valid_auth_jwt()` restrictive RLS policy — verified
- [ ] All Supabase Storage buckets are PRIVATE — verified
- [ ] Supabase advisors run (security + performance) — reviewed
- [ ] Firebase App Check enabled (Android SafetyNet / Play Integrity + iOS DeviceCheck)
- [ ] Cloudflare WAF enabled with OWASP ruleset
- [ ] Sentry alerts configured for 5xx spikes
- [ ] Data breach response procedure documented and tested
- [ ] Penetration test or VAPT completed
- [ ] Privacy Policy URL live and linked from app store listing
- [ ] Grievance officer contact live and responsive
- [ ] DPDP consent flow tested end-to-end with real users

---

## 14. Known Limitations and ADRs

| ID | Decision | Reason |
|---|---|---|
| ADR-001 | Firebase Phone OTP for patients (not custom SMS OTP) | Firebase handles DLT compliance for OTP delivery; simpler implementation |
| ADR-002 | Custom Spring Boot auth for doctors | Doctors are staff accounts; Firebase Auth is patient-facing only |
| ADR-003 | Supabase Third-Party Auth (not Supabase Auth for patients) | Avoids dual identity systems; Firebase UID is source of truth |
| ADR-004 | `prepareThreshold=0` on all JDBC URLs | Required for Supavisor transaction-mode pooling |
| ADR-005 | Flyway SESSION-mode (5432), HikariCP TRANSACTION-mode (6543) | Flyway needs session for DDL; app queries use pooler |
| ADR-006 | All Supabase Storage buckets private | Security-first; all files via signed URLs only |
| ADR-007 | Firebase tokens NOT stored in SharedPreferences | Firebase SDK manages token storage securely; no manual persistence |
| ADR-008 | Soft delete for patients (not hard delete) | Medical record retention obligation (Indian medical law, 3 years) — PII fields anonymised |
| ADR-009 | Separate consent for marketing communications | DPDP Act 2023 requires purpose-specific consent; marketing is optional |
| ADR-010 | Firebase App Check enabled in production | Prevents abuse from non-app clients calling Firebase Auth |
| ADR-011 | Supabase project region: ap-south-1 (Mumbai) | DPDP Act cross-border data transfer restrictions; patient health data must remain in India |
| ADR-012 | `prepareThreshold=0` | See ADR-004 |

---

*This document is the single source of truth for APJ TRUE LIFE v2.0. All implementation decisions are final. The AI agent executing this prompt must implement all sections faithfully with no deviation.*
