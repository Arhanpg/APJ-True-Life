// APJ TRUE LIFE — Firebase Blocking Functions
// These functions run BEFORE user creation and sign-in events.
// They inject the 'role: authenticated' custom claim required by Supabase
// to map Firebase users to the Postgres 'authenticated' role for RLS.
//
// Deploy with: firebase deploy --only functions
// Prerequisite: Enable "Firebase Authentication with Identity Platform" in Firebase Console.

import { beforeUserCreated, beforeUserSignedIn } from 'firebase-functions/v2/identity';

/**
 * Runs before a new user is created in Firebase Auth.
 * Adds role: 'authenticated' custom claim so Supabase RLS treats
 * the user as an authenticated Postgres role.
 */
export const beforecreated = beforeUserCreated((event) => {
  return {
    customClaims: {
      role: 'authenticated',
    },
  };
});

/**
 * Runs before every sign-in event.
 * Ensures the 'authenticated' role claim is always present,
 * even if it was somehow removed or the user was created before
 * these blocking functions were deployed.
 */
export const beforesignedin = beforeUserSignedIn((event) => {
  return {
    customClaims: {
      role: 'authenticated',
    },
  };
});
