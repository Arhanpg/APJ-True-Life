CREATE SCHEMA IF NOT EXISTS treatments;

CREATE TYPE treatments.treatment_status AS ENUM ('DRAFT','ACTIVE','COMPLETED','CANCELLED');
CREATE TYPE treatments.phase_status     AS ENUM ('SCHEDULED','IN_PROGRESS','COMPLETED');
CREATE TYPE treatments.diet_type        AS ENUM ('CONSUME','AVOID');
CREATE TYPE treatments.doc_type         AS ENUM ('PRESCRIPTION','DIET_CHART','ASSESSMENT_IMAGE','OTHER');

CREATE TABLE treatments.treatment_plans (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id           UUID NOT NULL,
    doctor_id            UUID NOT NULL,
    plan_name            VARCHAR(255) NOT NULL,
    diagnosis            VARCHAR(500) NOT NULL,
    status               treatments.treatment_status NOT NULL DEFAULT 'DRAFT',
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

CREATE TABLE treatments.treatment_phases (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_plan_id UUID NOT NULL REFERENCES treatments.treatment_plans(id) ON DELETE CASCADE,
    phase_number      INTEGER NOT NULL,
    name              VARCHAR(255) NOT NULL,
    description       TEXT,
    phase_goal        TEXT,
    status            treatments.phase_status NOT NULL DEFAULT 'SCHEDULED',
    start_date        DATE,
    end_date          DATE,
    started_at        TIMESTAMPTZ,
    completed_at      TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE treatments.phase_procedures (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id      UUID NOT NULL REFERENCES treatments.treatment_phases(id) ON DELETE CASCADE,
    step_number   INTEGER NOT NULL,
    description   TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE treatments.phase_medicines (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id       UUID NOT NULL REFERENCES treatments.treatment_phases(id) ON DELETE CASCADE,
    medicine_name  VARCHAR(255) NOT NULL,
    dosage         VARCHAR(100) NOT NULL,
    frequency      VARCHAR(100) NOT NULL,
    timing         VARCHAR(100),
    route          VARCHAR(50),
    instructions   TEXT,
    display_order  INTEGER DEFAULT 0,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE treatments.phase_diet_guidelines (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id      UUID NOT NULL REFERENCES treatments.treatment_phases(id) ON DELETE CASCADE,
    type          treatments.diet_type NOT NULL,
    item          VARCHAR(255) NOT NULL,
    notes         TEXT,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE treatments.phase_documents (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id              UUID NOT NULL REFERENCES treatments.treatment_phases(id) ON DELETE CASCADE,
    document_name         VARCHAR(255) NOT NULL,
    cloudinary_url        TEXT NOT NULL,
    cloudinary_public_id  VARCHAR(255) NOT NULL,
    document_type         treatments.doc_type NOT NULL DEFAULT 'OTHER',
    file_size_bytes       INTEGER,
    mime_type             VARCHAR(100),
    uploaded_by_user_id   UUID NOT NULL,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE treatments.clinical_notes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id    UUID NOT NULL REFERENCES treatments.treatment_phases(id) ON DELETE CASCADE,
    note_text   TEXT NOT NULL,
    created_by  UUID NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tp_patient_id   ON treatments.treatment_plans(patient_id);
CREATE INDEX idx_tp_doctor_id    ON treatments.treatment_plans(doctor_id, status);
CREATE INDEX idx_phase_plan_id   ON treatments.treatment_phases(treatment_plan_id, phase_number);
CREATE INDEX idx_medicines_phase ON treatments.phase_medicines(phase_id);
CREATE INDEX idx_diet_phase      ON treatments.phase_diet_guidelines(phase_id);
CREATE INDEX idx_docs_phase      ON treatments.phase_documents(phase_id);
