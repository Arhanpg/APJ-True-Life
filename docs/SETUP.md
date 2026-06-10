# APJ TRUE LIFE — Developer Setup Guide

## Prerequisites
- Node.js 20+
- Java 21 LTS
- Flutter 3.x
- Docker

## Quick Start — Web Dashboard

```bash
cd apps/web
cp .env.local.example .env.local
# Fill in your Firebase and API keys in .env.local
npm install
npm run dev
# Opens at http://localhost:3000
```

## Environment Variables (apps/web/.env.local)

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Services (Phase 1 — Coming)
Each Spring Boot microservice lives in `services/`. Start with:
```bash
cd services/auth-service
./gradlew bootRun
```

## Firebase Setup
1. Create project at console.firebase.google.com
2. Enable Email/Password auth (doctors)
3. Enable Phone Auth (patients)
4. Add test phone numbers for development
5. Copy config to `.env.local`

## NeonDB Setup
1. Create project at neon.tech (region: ap-south-1 Mumbai)
2. Create `dev` branch for local development
3. Copy connection string to each service's `application.yml`

## Vercel Deployment
1. Connect GitHub repo to Vercel
2. Set root directory to `apps/web`
3. Add all env vars in Vercel dashboard
4. Push to main → auto-deploys
