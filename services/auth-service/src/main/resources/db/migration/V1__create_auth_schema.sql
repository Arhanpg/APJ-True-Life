CREATE SCHEMA IF NOT EXISTS auth;

CREATE TYPE auth.user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');

CREATE TABLE auth.users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid    VARCHAR(128) NOT NULL UNIQUE,
    role            auth.user_role NOT NULL,
    phone_number    VARCHAR(20)  UNIQUE,
    email           VARCHAR(255) UNIQUE,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_firebase_uid ON auth.users(firebase_uid);
CREATE INDEX idx_users_phone        ON auth.users(phone_number);
CREATE INDEX idx_users_email        ON auth.users(email);
CREATE INDEX idx_users_role         ON auth.users(role);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION auth.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION auth.set_updated_at();
