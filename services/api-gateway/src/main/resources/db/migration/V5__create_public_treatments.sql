-- V5__create_public_treatments.sql
-- APJ TRUE LIFE — Public treatments table with RLS

CREATE TABLE IF NOT EXISTS public.treatments (
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

-- Patient sees own treatments
CREATE POLICY "Patient sees own treatments"
ON public.treatments FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

-- Restrictive guard (Firebase project isolation)
CREATE POLICY "Restrict to valid auth JWT"
ON public.treatments AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_public_treatments_patient ON public.treatments(patient_id);
CREATE INDEX idx_public_treatments_doctor ON public.treatments(doctor_id);
