CREATE SCHEMA IF NOT EXISTS patients;

CREATE TABLE patients.patients (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL UNIQUE,
    full_name               VARCHAR(255) NOT NULL,
    date_of_birth           DATE NOT NULL,
    gender                  VARCHAR(10) NOT NULL CHECK (gender IN ('MALE','FEMALE','OTHER')),
    blood_group             VARCHAR(5),
    address                 TEXT,
    emergency_contact       VARCHAR(20),
    profile_image_url       TEXT,
    profile_image_public_id VARCHAR(255),
    prakriti                VARCHAR(50),
    allergies               TEXT[] DEFAULT '{}',
    patient_code            VARCHAR(20) NOT NULL UNIQUE,
    created_by_doctor_id    UUID,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE patients.medical_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id  UUID NOT NULL REFERENCES patients.patients(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_patients_user_id    ON patients.patients(user_id);
CREATE INDEX idx_patients_code       ON patients.patients(patient_code);
CREATE INDEX idx_patients_doctor     ON patients.patients(created_by_doctor_id);
CREATE INDEX idx_medical_patient     ON patients.medical_history(patient_id);

CREATE OR REPLACE FUNCTION patients.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_patients_updated_at
    BEFORE UPDATE ON patients.patients
    FOR EACH ROW EXECUTE FUNCTION patients.set_updated_at();
