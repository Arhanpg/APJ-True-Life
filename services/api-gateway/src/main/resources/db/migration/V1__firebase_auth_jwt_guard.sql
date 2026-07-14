-- V1__firebase_auth_jwt_guard.sql
-- APJ TRUE LIFE — Supabase Third-Party Auth: Firebase JWT guard function
-- This MUST be applied before any other table migration.
-- Used as a RESTRICTIVE RLS policy on all public schema tables to ensure
-- only valid Firebase or Supabase-native JWTs can access data.

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
      auth.jwt()->>'iss' = 'https://securetoken.google.com/apj-true-life-firebase'
      AND auth.jwt()->>'aud' = 'apj-true-life-firebase'
    )
  );
$$;

COMMENT ON FUNCTION public.is_valid_auth_jwt() IS 'Guards all public schema tables — ensures only valid Firebase or Supabase-native JWTs can access data via RLS';
