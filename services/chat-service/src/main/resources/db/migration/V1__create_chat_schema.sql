CREATE SCHEMA IF NOT EXISTS chat;

CREATE TYPE chat.message_type AS ENUM ('TEXT','IMAGE','FILE','SYSTEM');

CREATE TABLE chat.chat_sessions (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    treatment_plan_id UUID NOT NULL UNIQUE,
    patient_id        UUID NOT NULL,
    doctor_id         UUID NOT NULL,
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    closed_at         TIMESTAMPTZ
);

CREATE TABLE chat.chat_messages (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id       UUID NOT NULL REFERENCES chat.chat_sessions(id) ON DELETE CASCADE,
    sender_id        UUID NOT NULL,
    message_type     chat.message_type NOT NULL DEFAULT 'TEXT',
    content          TEXT,
    media_url        TEXT,
    media_public_id  VARCHAR(255),
    media_filename   VARCHAR(255),
    is_read          BOOLEAN NOT NULL DEFAULT FALSE,
    read_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_treatment  ON chat.chat_sessions(treatment_plan_id);
CREATE INDEX idx_sessions_patient    ON chat.chat_sessions(patient_id);
CREATE INDEX idx_msg_session_created ON chat.chat_messages(session_id, created_at DESC);
CREATE INDEX idx_msg_unread          ON chat.chat_messages(session_id, is_read);
