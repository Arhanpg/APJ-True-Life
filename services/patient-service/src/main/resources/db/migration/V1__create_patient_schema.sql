-- V1: Create patients schema
-- APJ TRUE LIFE Patient Service - Initial Migration

CREATE SCHEMA IF NOT EXISTS patients;

CREATE TYPE patients.gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER');

CREATE TABLE patients.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender patients.gender_type NOT NULL,
    blood_group VARCHAR(5),
    address TEXT,
    emergency_contact VARCHAR(20),
    profile_image_url TEXT,
    profile_image_public_id VARCHAR(255),
    prakriti VARCHAR(50),
    allergies TEXT[] DEFAULT '{}',
    patient_code VARCHAR(20) NOT NULL UNIQUE,
    created_by_doctor_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE patients.medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients.patients(id) ON DELETE CASCADE,
    condition_name VARCHAR(255) NOT NULL,
    description TEXT,
    diagnosed_at DATE,
    is_current BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_patients_user_id ON patients.patients(user_id);
CREATE INDEX idx_patients_code ON patients.patients(patient_code);
CREATE INDEX idx_patients_doctor_id ON patients.patients(created_by_doctor_id) WHERE created_by_doctor_id IS NOT NULL;
CREATE INDEX idx_patients_full_name ON patients.patients USING gin(to_tsvector('english', full_name));
CREATE INDEX idx_medical_history_patient ON patients.medical_history(patient_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION patients.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_patients_updated_at
    BEFORE UPDATE ON patients.patients
    FOR EACH ROW EXECUTE FUNCTION patients.update_updated_at_column();
