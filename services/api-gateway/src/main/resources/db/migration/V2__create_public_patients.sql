-- V2__create_public_patients.sql
-- APJ TRUE LIFE — Public patients table with Firebase UID + RLS
-- This is the Supabase-accessible patients table (public schema).
-- The patient-service internal schema (patients.patients) is separate.

CREATE TABLE IF NOT EXISTS public.patients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid  TEXT UNIQUE NOT NULL,
  name          TEXT,
  email         TEXT,
  phone         TEXT,
  photo_url     TEXT,
  date_of_birth DATE,
  gender        TEXT CHECK (gender IN ('male','female','other','prefer_not_to_say')),
  blood_group   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  consent_at    TIMESTAMPTZ,
  consent_version TEXT,
  deleted_at    TIMESTAMPTZ,
  is_deleted    BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Patient can only read their own row
CREATE POLICY "Patient reads own profile"
ON public.patients FOR SELECT TO authenticated
USING (firebase_uid = auth.jwt()->>'sub');

-- Patient can update their own row
CREATE POLICY "Patient updates own profile"
ON public.patients FOR UPDATE TO authenticated
USING (firebase_uid = auth.jwt()->>'sub');

-- Patient can insert their own row (profile sync)
CREATE POLICY "Patient inserts own profile"
ON public.patients FOR INSERT TO authenticated
WITH CHECK (firebase_uid = auth.jwt()->>'sub');

-- Restrictive guard (Firebase project isolation)
CREATE POLICY "Restrict to valid auth JWT"
ON public.patients AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_public_patients_firebase_uid ON public.patients(firebase_uid);
CREATE INDEX idx_public_patients_phone ON public.patients(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_public_patients_email ON public.patients(email) WHERE email IS NOT NULL;

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_patients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_patients_updated_at
    BEFORE UPDATE ON public.patients
    FOR EACH ROW
    EXECUTE FUNCTION public.update_patients_updated_at();
