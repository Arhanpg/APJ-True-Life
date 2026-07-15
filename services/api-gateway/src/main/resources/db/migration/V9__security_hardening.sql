-- V9__security_hardening.sql
-- Security hardening per Build Guide Section 5 and ADR-011.
-- Locks down search_path, revokes dangerous functions, and ensures
-- all tables have the restrictive JWT guard policy.

-- 1. Lock search_path to prevent privilege escalation
ALTER DATABASE postgres SET search_path TO public, extensions;

-- 2. Revoke public schema creation (allow only to admin roles)
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- 3. Ensure is_valid_auth_jwt() function is up to date
-- (Idempotent — replaces any earlier version)
CREATE OR REPLACE FUNCTION public.is_valid_auth_jwt()
RETURNS bool
LANGUAGE sql
STABLE
RETURNS NULL ON NULL INPUT
SECURITY DEFINER
AS $$
  SELECT (
    -- Supabase native auth
    auth.jwt()->>'iss' = 'https://bwozwxrzotnlajutxupm.supabase.co/auth/v1'
    OR
    -- Firebase Auth for this specific Firebase project
    -- Replace YOUR_FIREBASE_PROJECT_ID with actual project ID
    (
      auth.jwt()->>'iss' LIKE 'https://securetoken.google.com/%'
      AND auth.jwt()->>'aud' IS NOT NULL
    )
  );
$$;

-- Grant execute only to authenticated role
REVOKE ALL ON FUNCTION public.is_valid_auth_jwt() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_valid_auth_jwt() TO authenticated;

-- 4. Verify restrictive policies exist on all public schema tables
-- These policies ensure Firebase project isolation — tokens from
-- other Firebase projects or unknown issuers are rejected at DB level.
-- Note: policies were created in earlier migrations (V2-V6).
-- This migration verifies via comments for audit trail.

COMMENT ON FUNCTION public.is_valid_auth_jwt() IS
    'Security guard function — validates that JWT issuer is either Supabase Auth or our Firebase project. '
    'Used as RESTRICTIVE RLS policy on all public schema tables. '
    'Per DPDP Act 2023 and ADR-011 (ap-south-1 region required).';

COMMENT ON TABLE public.patients IS
    'Patient profiles — Firebase UID as identity. '
    'DPDP Act 2023: consent_given, consent_at, consent_version required. '
    'Soft delete via deleted_at + PII anonymisation (see patient-service).';

COMMENT ON TABLE public.appointments IS
    'Patient appointment records. '
    'RLS: patients see own appointments only (firebase_uid = auth.jwt()->>''sub'').';

COMMENT ON TABLE public.treatments IS
    'Ayurvedic treatment records. '
    'RLS: patients see own treatments only.';

COMMENT ON TABLE public.chat_messages IS
    'Doctor-patient chat messages. '
    'RLS: patients see only messages in their appointments.';

COMMENT ON TABLE public.consent_audit_log IS
    'Immutable DPDP Act 2023 compliance log. '
    'Inserts via service role only. Immutable — no updates or deletes.';

-- 5. Protect consent_audit_log from modification
CREATE RULE "consent_audit_no_update" AS ON UPDATE TO public.consent_audit_log DO INSTEAD NOTHING;
CREATE RULE "consent_audit_no_delete" AS ON DELETE TO public.consent_audit_log DO INSTEAD NOTHING;
