-- V2__v2_auth_schema.sql
-- APJ TRUE LIFE Auth Service v2 — Doctor/Admin custom auth
-- Replaces the v1 Firebase-based user model with password-based doctor auth.

-- Create doctors table in auth schema (internal to auth-service)
CREATE TABLE IF NOT EXISTS auth.doctors (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(20) NOT NULL DEFAULT 'DOCTOR' CHECK (role IN ('DOCTOR', 'ADMIN')),
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Refresh tokens for token rotation
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash  TEXT NOT NULL UNIQUE,
    doctor_id   UUID NOT NULL REFERENCES auth.doctors(id) ON DELETE CASCADE,
    expires_at  TIMESTAMPTZ NOT NULL,
    is_revoked  BOOLEAN NOT NULL DEFAULT FALSE,
    revoked_at  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_auth_doctors_email ON auth.doctors(email);
CREATE INDEX idx_auth_doctors_active ON auth.doctors(is_active);
CREATE INDEX idx_refresh_tokens_hash ON auth.refresh_tokens(token_hash);
CREATE INDEX idx_refresh_tokens_doctor ON auth.refresh_tokens(doctor_id);
CREATE INDEX idx_refresh_tokens_expires ON auth.refresh_tokens(expires_at);
