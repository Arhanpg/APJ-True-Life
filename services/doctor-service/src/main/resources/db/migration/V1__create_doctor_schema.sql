CREATE SCHEMA IF NOT EXISTS doctors;

CREATE TABLE doctors.doctors (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID NOT NULL UNIQUE,
    full_name               VARCHAR(255) NOT NULL,
    professional_title      VARCHAR(255),
    bio                     TEXT,
    profile_image_url       TEXT,
    profile_image_public_id VARCHAR(255),
    specializations         TEXT[] DEFAULT '{}',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE doctors.clinics (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id   UUID NOT NULL UNIQUE REFERENCES doctors.doctors(id),
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

CREATE TABLE doctors.clinic_services (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id         UUID NOT NULL REFERENCES doctors.clinics(id) ON DELETE CASCADE,
    name              VARCHAR(255) NOT NULL,
    description       TEXT,
    duration_minutes  INTEGER NOT NULL,
    price             NUMERIC(10,2) NOT NULL,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    display_order     INTEGER DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_doctors_user_id    ON doctors.doctors(user_id);
CREATE INDEX idx_clinics_doctor_id  ON doctors.clinics(doctor_id);
CREATE INDEX idx_services_clinic_id ON doctors.clinic_services(clinic_id);
