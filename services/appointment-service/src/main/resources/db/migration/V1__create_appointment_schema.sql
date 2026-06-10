CREATE SCHEMA IF NOT EXISTS appointments;

CREATE TYPE appointments.appt_type   AS ENUM ('IN_CLINIC','ONLINE');
CREATE TYPE appointments.appt_status AS ENUM ('PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED');
CREATE TYPE appointments.created_by  AS ENUM ('PATIENT','DOCTOR');

CREATE TABLE appointments.appointments (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id         UUID NOT NULL,
    doctor_id          UUID NOT NULL,
    treatment_plan_id  UUID,
    service_id         UUID,
    appointment_date   DATE NOT NULL,
    start_time         TIME NOT NULL,
    end_time           TIME NOT NULL,
    type               appointments.appt_type   NOT NULL DEFAULT 'IN_CLINIC',
    status             appointments.appt_status NOT NULL DEFAULT 'PENDING',
    reason             TEXT,
    doctor_notes       TEXT,
    room               VARCHAR(50),
    created_by         appointments.created_by NOT NULL,
    cancelled_reason   TEXT,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_appt_doctor_date ON appointments.appointments(doctor_id, appointment_date);
CREATE INDEX idx_appt_patient_id  ON appointments.appointments(patient_id, status);
CREATE INDEX idx_appt_status      ON appointments.appointments(status);

CREATE OR REPLACE FUNCTION appointments.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_appt_updated_at
    BEFORE UPDATE ON appointments.appointments
    FOR EACH ROW EXECUTE FUNCTION appointments.set_updated_at();
