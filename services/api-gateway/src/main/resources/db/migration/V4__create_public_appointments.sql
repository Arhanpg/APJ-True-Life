-- V4__create_public_appointments.sql
-- APJ TRUE LIFE — Public appointments table with RLS

CREATE TABLE IF NOT EXISTS public.appointments (
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

-- Patient sees own appointments
CREATE POLICY "Patient sees own appointments"
ON public.appointments FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

-- Restrictive guard (Firebase project isolation)
CREATE POLICY "Restrict to valid auth JWT"
ON public.appointments AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_public_appointments_patient ON public.appointments(patient_id);
CREATE INDEX idx_public_appointments_doctor ON public.appointments(doctor_id);
CREATE INDEX idx_public_appointments_status ON public.appointments(status);
CREATE INDEX idx_public_appointments_scheduled ON public.appointments(scheduled_at);
