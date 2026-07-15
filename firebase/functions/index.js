// APJ TRUE LIFE — Firebase Custom Claims via Admin SDK (Free Spark Plan Compatible)
//
// WHY THIS FILE EXISTS:
// Firebase Functions v2 (beforeUserCreated / beforeUserSignedIn blocking functions)
// requires the Blaze (pay-as-you-go) plan because they depend on
// Cloud Build API (cloudbuild.googleapis.com) and
// Artifact Registry API (artifactregistry.googleapis.com).
//
// SOLUTION (No Blaze Required):
// Instead of deploying Firebase Functions, the 'role: authenticated' custom claim
// is set by your Spring Boot api-gateway using Firebase Admin SDK.
// When the api-gateway validates a Firebase ID Token for the first time, it checks
// for the custom claim. If missing, it calls Admin SDK setCustomUserClaims().
// This is 100% free and requires NO Firebase Functions deployment.
//
// This file is intentionally kept as documentation / fallback only.
// DO NOT run: firebase deploy --only functions
// Instead, see: services/api-gateway — ClaimEnrichmentFilter.java

// ─── ALTERNATIVE: If you ever upgrade to Blaze in the future, use this: ───────
//
// import { beforeUserCreated, beforeUserSignedIn } from 'firebase-functions/v2/identity';
//
// export const beforecreated = beforeUserCreated((event) => {
//   return { customClaims: { role: 'authenticated' } };
// });
//
// export const beforesignedin = beforeUserSignedIn((event) => {
//   return { customClaims: { role: 'authenticated' } };
// });
// ─────────────────────────────────────────────────────────────────────────────

console.log(
  'APJ TRUE LIFE: No Firebase Functions needed. ' +
  'Custom claims are set by the Spring Boot api-gateway on first token validation. ' +
  'See services/api-gateway/src/main/java/com/apjtrue/gateway/filter/ClaimEnrichmentFilter.java'
);
