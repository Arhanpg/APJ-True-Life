-- V2__create_device_tokens.sql
-- Device tokens for FCM push notifications

CREATE TABLE IF NOT EXISTS notifications.device_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     TEXT NOT NULL,
    fcm_token   TEXT NOT NULL UNIQUE,
    device_type VARCHAR(20),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ
);

CREATE INDEX idx_device_tokens_user ON notifications.device_tokens(user_id);
CREATE INDEX idx_device_tokens_active ON notifications.device_tokens(user_id, is_active);
