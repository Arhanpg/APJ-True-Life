# APJ TRUE LIFE — v2.0 Migration & End-to-End Build Prompt Guide
### Supabase Edition · Custom Spring Boot Auth · Single-Branch Monorepo

> **This is the authoritative source of truth for this project. The archived `docs/archive/APJ_TRUE_LIFE_SRS_v1.0.pdf` is superseded by this document.**

See the full guide uploaded to the repo root as `APJ_TRUE_LIFE_V2_BUILD_PROMPT_GUIDE-1.md` or refer to the original document provided to the engineering team. This file is a pointer — the complete 109KB guide is the working specification.

**Status:** Final — Ready for Execution  
**Version:** 2.0  
**Prepared For:** APJ TRUE LIFE Ayurvedic Medical Centre — Digital Health Platform

## Quick Reference

- **Frontend (Flutter):** `apps/mobile/`
- **Frontend (Next.js):** `apps/web/`
- **Backend (Spring Boot):** `services/*/`
- **Phases:** 0–10 (Foundation → Launch)
- **Auth:** Custom Spring Boot Auth Service (NO Firebase Auth)
- **DB:** Supabase Postgres
- **Storage:** Supabase Storage
- **SMS/OTP:** DLT-registered gateway (MSG91 default)
- **Push:** Firebase Cloud Messaging (FCM only)
- **Backend Hosting:** Railway
- **Frontend Hosting:** Vercel
