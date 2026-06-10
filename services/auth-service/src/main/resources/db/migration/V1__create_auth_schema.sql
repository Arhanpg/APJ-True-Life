-- V1: Create auth schema and users table
-- APJ TRUE LIFE Auth Service - Initial Migration

CREATE SCHEMA IF NOT EXISTS auth;

CREATE TYPE auth.user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    role auth.user_role NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high-frequency queries
CREATE INDEX idx_users_firebase_uid ON auth.users(firebase_uid);
CREATE INDEX idx_users_phone ON auth.users(phone_number) WHERE phone_number IS NOT NULL;
CREATE INDEX idx_users_email ON auth.users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_role ON auth.users(role);
CREATE INDEX idx_users_active ON auth.users(is_active);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION auth.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auth.update_updated_at_column();

COMMENT ON TABLE auth.users IS 'Core identity table linking Firebase UID to system user and role';
COMMENT ON COLUMN auth.users.firebase_uid IS 'Firebase Authentication UID - primary link to Firebase';
COMMENT ON COLUMN auth.users.role IS 'User role: PATIENT uses mobile app, DOCTOR uses web dashboard';
COMMENT ON COLUMN auth.users.phone_number IS 'Patient phone number in +91XXXXXXXXXX format';
