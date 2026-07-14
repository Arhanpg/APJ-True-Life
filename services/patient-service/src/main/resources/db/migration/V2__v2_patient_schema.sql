-- V2__v2_patient_schema.sql
-- APJ TRUE LIFE Patient Service v2 — firebase_uid based, DPDP consent fields

-- Add v2 columns to patients table
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS consent_version TEXT;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE patients.patients ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Make user_id optional (v1 compatibility) and full_name nullable for sync
ALTER TABLE patients.patients ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE patients.patients ALTER COLUMN full_name DROP NOT NULL;
ALTER TABLE patients.patients ALTER COLUMN date_of_birth DROP NOT NULL;
ALTER TABLE patients.patients ALTER COLUMN gender DROP NOT NULL;
ALTER TABLE patients.patients ALTER COLUMN patient_code DROP NOT NULL;

-- Index for firebase_uid lookup
CREATE INDEX IF NOT EXISTS idx_patients_firebase_uid ON patients.patients(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_patients_deleted ON patients.patients(is_deleted);
