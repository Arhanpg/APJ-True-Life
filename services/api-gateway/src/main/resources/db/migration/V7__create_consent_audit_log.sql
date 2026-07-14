-- V7__create_consent_audit_log.sql
-- APJ TRUE LIFE — DPDP Act 2023 compliance: immutable consent log
-- Inserts only via service role (backend) — no direct client inserts.

CREATE TABLE IF NOT EXISTS public.consent_audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES public.patients(id),
  action          TEXT NOT NULL CHECK (action IN ('consent_given','consent_withdrawn','data_deleted','data_accessed')),
  policy_version  TEXT NOT NULL,
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consent_audit_log ENABLE ROW LEVEL SECURITY;

-- Patient can read their own consent log
CREATE POLICY "Patient reads own consent log"
ON public.consent_audit_log FOR SELECT TO authenticated
USING (
  patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

-- Restrictive guard
CREATE POLICY "Restrict to valid auth JWT"
ON public.consent_audit_log AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_consent_audit_patient ON public.consent_audit_log(patient_id);
CREATE INDEX idx_consent_audit_action ON public.consent_audit_log(action);
CREATE INDEX idx_consent_audit_created ON public.consent_audit_log(created_at DESC);
