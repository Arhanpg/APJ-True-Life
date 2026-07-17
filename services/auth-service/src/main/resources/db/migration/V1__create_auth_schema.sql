-- V1: Create apj_auth schema and users table
-- APJ TRUE LIFE Auth Service - Initial Migration
-- NOTE: Uses apj_auth (not auth) to avoid conflict with Supabase's built-in auth schema.

CREATE SCHEMA IF NOT EXISTS apj_auth;

CREATE TYPE apj_auth.user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

CREATE TABLE apj_auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    role apj_auth.user_role NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for high-frequency queries
CREATE INDEX idx_users_firebase_uid ON apj_auth.users(firebase_uid);
CREATE INDEX idx_users_phone ON apj_auth.users(phone_number) WHERE phone_number IS NOT NULL;
CREATE INDEX idx_users_email ON apj_auth.users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_role ON apj_auth.users(role);
CREATE INDEX idx_users_active ON apj_auth.users(is_active);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION apj_auth.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON apj_auth.users
    FOR EACH ROW
    EXECUTE FUNCTION apj_auth.update_updated_at_column();

COMMENT ON TABLE apj_auth.users IS 'Core identity table linking Firebase UID to system user and role';
COMMENT ON COLUMN apj_auth.users.firebase_uid IS 'Firebase Authentication UID - primary link to Firebase';
COMMENT ON COLUMN apj_auth.users.role IS 'User role: PATIENT uses mobile app, DOCTOR uses web dashboard';
COMMENT ON COLUMN apj_auth.users.phone_number IS 'Patient phone number in +91XXXXXXXXXX format';
