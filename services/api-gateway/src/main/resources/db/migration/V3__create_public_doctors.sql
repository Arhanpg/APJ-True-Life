-- V3__create_public_doctors.sql
-- APJ TRUE LIFE — Public doctors table
-- Doctor access is controlled exclusively by Spring Boot auth-service (not Supabase client).
-- This table is accessed by the backend services using the service role.

CREATE TABLE IF NOT EXISTS public.doctors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  specialisation TEXT,
  phone         TEXT,
  password_hash TEXT NOT NULL,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Doctors access controlled exclusively by Spring Boot auth-service (not Supabase client)
-- No permissive policies for authenticated role — backend uses service role key

-- Restrictive guard still applied for completeness
CREATE POLICY "Restrict to valid auth JWT"
ON public.doctors AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_public_doctors_email ON public.doctors(email);
CREATE INDEX idx_public_doctors_active ON public.doctors(is_active);
