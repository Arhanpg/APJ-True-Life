-- V10__reconcile_service_schemas.sql
-- APJ TRUE LIFE — Schema Reconciliation Migration
--
-- CONTEXT: Each microservice had its own schema (patients.*, doctors.*,
-- appointments.*, treatments.*, chat.*, notifications.*), but the live
-- Supabase database uses public.* with RLS. This migration adds all
-- columns and tables that the service entities need but public.* was
-- missing, so every service can now use the unified public schema.
--
-- NOTE: This migration is ADDITIVE — it only adds columns/tables. It does
-- not drop or rename existing columns to preserve backward compatibility.

-- ============================================================
-- 1. PATIENTS — add columns service needs but public.patients lacks
-- ============================================================
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(20);
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS prakriti VARCHAR(50);
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS patient_code VARCHAR(20) UNIQUE;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS allergies TEXT[] DEFAULT '{}';
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS created_by_doctor_id UUID;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS profile_image_public_id VARCHAR(255);
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE;

-- full_name mapping: the entity uses full_name but public has name.
-- We keep 'name' as-is — entity will be mapped to column 'name'.

-- Index for patient_code
CREATE INDEX IF NOT EXISTS idx_patients_code ON public.patients(patient_code) WHERE patient_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON public.patients(created_by_doctor_id) WHERE created_by_doctor_id IS NOT NULL;

-- ============================================================
-- 2. PATIENTS — add medical_history table (from patient-service)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.medical_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id      UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    condition_name  VARCHAR(255) NOT NULL,
    description     TEXT,
    diagnosed_at    DATE,
    is_current      BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;

-- Patient can read their own medical history
CREATE POLICY "Patient reads own medical history"
ON public.medical_history FOR SELECT TO authenticated
USING (
    patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

-- Restrictive JWT guard
CREATE POLICY "Restrict medical_history to valid auth JWT"
ON public.medical_history AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_medical_history_patient ON public.medical_history(patient_id);

-- ============================================================
-- 3. DOCTORS — add columns service needs but public.doctors lacks
-- ============================================================
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE;
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS professional_title VARCHAR(255);
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS profile_image_public_id VARCHAR(255);
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS specializations TEXT[] DEFAULT '{}';
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ============================================================
-- 4. DOCTORS — add clinics table (from doctor-service)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clinics (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id   UUID NOT NULL UNIQUE REFERENCES public.doctors(id),
    name        VARCHAR(255) NOT NULL,
    tagline     VARCHAR(255),
    address     TEXT,
    phone       VARCHAR(20),
    email       VARCHAR(255),
    website_url TEXT,
    logo_url    TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict clinics to valid auth JWT"
ON public.clinics AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_clinics_doctor_id ON public.clinics(doctor_id);

-- ============================================================
-- 5. DOCTORS — add clinic_services table (from doctor-service)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clinic_services (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id         UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    name              VARCHAR(255) NOT NULL,
    description       TEXT,
    duration_minutes  INTEGER NOT NULL,
    price             NUMERIC(10,2) NOT NULL,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    display_order     INTEGER DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clinic_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict clinic_services to valid auth JWT"
ON public.clinic_services AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_services_clinic_id ON public.clinic_services(clinic_id);

-- ============================================================
-- 6. APPOINTMENTS — add columns service needs
-- ============================================================
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS treatment_plan_id UUID;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS service_id UUID;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS appointment_date DATE;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS end_time TIME;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'IN_CLINIC';
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS doctor_notes TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS room VARCHAR(50);
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS created_by VARCHAR(20);
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS cancelled_reason TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Widen status check to include all appointment statuses
-- (public originally had: pending, confirmed, cancelled, completed)
-- Service also uses: IN_PROGRESS
-- We drop and re-add the check constraint:
ALTER TABLE public.appointments DROP CONSTRAINT IF EXISTS appointments_status_check;
ALTER TABLE public.appointments ADD CONSTRAINT appointments_status_check
    CHECK (status IN ('pending','confirmed','cancelled','completed','in_progress',
                      'PENDING','CONFIRMED','CANCELLED','COMPLETED','IN_PROGRESS'));

-- ============================================================
-- 7. TREATMENTS — replace simple stub with full treatment_plans
-- ============================================================
-- The existing public.treatments table is a simple stub. We create the
-- full treatment_plans table alongside it. Services will use treatment_plans.

CREATE TABLE IF NOT EXISTS public.treatment_plans (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id           UUID NOT NULL,
    doctor_id            UUID NOT NULL,
    plan_name            VARCHAR(255) NOT NULL,
    diagnosis            VARCHAR(500) NOT NULL,
    status               VARCHAR(20) NOT NULL DEFAULT 'DRAFT'
                         CHECK (status IN ('DRAFT','ACTIVE','COMPLETED','CANCELLED')),
    total_phases         INTEGER NOT NULL,
    start_date           DATE NOT NULL,
    end_date             DATE,
    completed_at         TIMESTAMPTZ,
    clinical_notes       TEXT,
    dosha_assessment     TEXT,
    special_instructions TEXT,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.treatment_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient sees own treatment plans"
ON public.treatment_plans FOR SELECT TO authenticated
USING (
    patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

CREATE POLICY "Restrict treatment_plans to valid auth JWT"
ON public.treatment_plans AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_tp_patient_id ON public.treatment_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_tp_doctor_id ON public.treatment_plans(doctor_id, status);

-- Treatment phases
CREATE TABLE IF NOT EXISTS public.treatment_phases (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_plan_id UUID NOT NULL REFERENCES public.treatment_plans(id) ON DELETE CASCADE,
    phase_number      INTEGER NOT NULL,
    name              VARCHAR(255) NOT NULL,
    description       TEXT,
    phase_goal        TEXT,
    status            VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED'
                      CHECK (status IN ('SCHEDULED','IN_PROGRESS','COMPLETED')),
    start_date        DATE,
    end_date          DATE,
    started_at        TIMESTAMPTZ,
    completed_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.treatment_phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict treatment_phases to valid auth JWT"
ON public.treatment_phases AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_phase_plan_id ON public.treatment_phases(treatment_plan_id, phase_number);

-- Phase medicines
CREATE TABLE IF NOT EXISTS public.phase_medicines (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id       UUID NOT NULL REFERENCES public.treatment_phases(id) ON DELETE CASCADE,
    medicine_name  VARCHAR(255) NOT NULL,
    dosage         VARCHAR(100) NOT NULL,
    frequency      VARCHAR(100) NOT NULL,
    timing         VARCHAR(100),
    route          VARCHAR(50),
    instructions   TEXT,
    display_order  INTEGER DEFAULT 0,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.phase_medicines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict phase_medicines to valid auth JWT"
ON public.phase_medicines AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_medicines_phase ON public.phase_medicines(phase_id);

-- Phase procedures
CREATE TABLE IF NOT EXISTS public.phase_procedures (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id      UUID NOT NULL REFERENCES public.treatment_phases(id) ON DELETE CASCADE,
    step_number   INTEGER NOT NULL,
    description   TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.phase_procedures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict phase_procedures to valid auth JWT"
ON public.phase_procedures AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Phase diet guidelines
CREATE TABLE IF NOT EXISTS public.phase_diet_guidelines (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id      UUID NOT NULL REFERENCES public.treatment_phases(id) ON DELETE CASCADE,
    type          VARCHAR(20) NOT NULL CHECK (type IN ('CONSUME','AVOID')),
    item          VARCHAR(255) NOT NULL,
    notes         TEXT,
    display_order INTEGER DEFAULT 0
);

ALTER TABLE public.phase_diet_guidelines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict phase_diet_guidelines to valid auth JWT"
ON public.phase_diet_guidelines AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_diet_phase ON public.phase_diet_guidelines(phase_id);

-- Phase documents
CREATE TABLE IF NOT EXISTS public.phase_documents (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id              UUID NOT NULL REFERENCES public.treatment_phases(id) ON DELETE CASCADE,
    document_name         VARCHAR(255) NOT NULL,
    cloudinary_url        TEXT NOT NULL,
    cloudinary_public_id  VARCHAR(255) NOT NULL,
    document_type         VARCHAR(20) NOT NULL DEFAULT 'OTHER'
                          CHECK (document_type IN ('PRESCRIPTION','DIET_CHART','ASSESSMENT_IMAGE','OTHER')),
    file_size_bytes       INTEGER,
    mime_type             VARCHAR(100),
    uploaded_by_user_id   UUID NOT NULL,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.phase_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict phase_documents to valid auth JWT"
ON public.phase_documents AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_docs_phase ON public.phase_documents(phase_id);

-- Clinical notes
CREATE TABLE IF NOT EXISTS public.clinical_notes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id    UUID NOT NULL REFERENCES public.treatment_phases(id) ON DELETE CASCADE,
    note_text   TEXT NOT NULL,
    created_by  UUID NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clinical_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict clinical_notes to valid auth JWT"
ON public.clinical_notes AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- ============================================================
-- 8. CHAT — add chat_sessions table (from chat-service)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_plan_id UUID NOT NULL UNIQUE,
    patient_id        UUID NOT NULL,
    doctor_id         UUID NOT NULL,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at         TIMESTAMPTZ
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient sees own chat sessions"
ON public.chat_sessions FOR SELECT TO authenticated
USING (
    patient_id = (SELECT id FROM public.patients WHERE firebase_uid = auth.jwt()->>'sub')
);

CREATE POLICY "Restrict chat_sessions to valid auth JWT"
ON public.chat_sessions AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_sessions_treatment ON public.chat_sessions(treatment_plan_id);
CREATE INDEX IF NOT EXISTS idx_sessions_patient ON public.chat_sessions(patient_id);

-- Add columns to existing chat_messages that the service entity needs
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS session_id UUID;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS sender_id UUID;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS message_type VARCHAR(20) DEFAULT 'TEXT';
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS media_url TEXT;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS media_public_id VARCHAR(255);
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS media_filename VARCHAR(255);
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_msg_session_created ON public.chat_messages(session_id, created_at DESC) WHERE session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_msg_unread ON public.chat_messages(session_id, is_read) WHERE session_id IS NOT NULL;

-- ============================================================
-- 9. NOTIFICATIONS — add tables (from notification-service)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID NOT NULL,
    title          VARCHAR(255) NOT NULL,
    body           TEXT NOT NULL,
    type           VARCHAR(20) NOT NULL CHECK (type IN ('APPOINTMENT','MESSAGE','TREATMENT','SYSTEM')),
    reference_id   UUID,
    is_read        BOOLEAN NOT NULL DEFAULT FALSE,
    fcm_message_id VARCHAR(255),
    sent_at        TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict notifications to valid auth JWT"
ON public.notifications AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_notif_user_unread ON public.notifications(user_id, is_read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notif_type ON public.notifications(type);

CREATE TABLE IF NOT EXISTS public.device_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     TEXT NOT NULL,
    fcm_token   TEXT NOT NULL UNIQUE,
    device_type VARCHAR(20),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ
);

ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Restrict device_tokens to valid auth JWT"
ON public.device_tokens AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

CREATE INDEX IF NOT EXISTS idx_device_tokens_user ON public.device_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_device_tokens_active ON public.device_tokens(user_id, is_active);

-- ============================================================
-- 10. AUTH-SERVICE — create apj_auth schema (separate from Supabase's auth)
-- ============================================================
-- The auth-service needs its own schema because Supabase uses `auth` internally.
-- We use `apj_auth` to avoid conflicts.

CREATE SCHEMA IF NOT EXISTS apj_auth;

CREATE TABLE IF NOT EXISTS apj_auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN')),
    phone_number VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apj_auth_users_firebase_uid ON apj_auth.users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_apj_auth_users_email ON apj_auth.users(email) WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS apj_auth.doctors (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(20) NOT NULL DEFAULT 'DOCTOR' CHECK (role IN ('DOCTOR', 'ADMIN')),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apj_auth_doctors_email ON apj_auth.doctors(email);
CREATE INDEX IF NOT EXISTS idx_apj_auth_doctors_active ON apj_auth.doctors(is_active);

CREATE TABLE IF NOT EXISTS apj_auth.refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash  TEXT NOT NULL UNIQUE,
    doctor_id   UUID NOT NULL REFERENCES apj_auth.doctors(id) ON DELETE CASCADE,
    expires_at  TIMESTAMPTZ NOT NULL,
    is_revoked  BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apj_auth_refresh_hash ON apj_auth.refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_apj_auth_refresh_doctor ON apj_auth.refresh_tokens(doctor_id);
