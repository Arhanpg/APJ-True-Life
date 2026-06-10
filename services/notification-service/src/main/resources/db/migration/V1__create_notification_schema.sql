CREATE SCHEMA IF NOT EXISTS notifications;

CREATE TYPE notifications.notif_type AS ENUM ('APPOINTMENT','MESSAGE','TREATMENT','SYSTEM');

CREATE TABLE notifications.notifications (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID NOT NULL,
    title          VARCHAR(255) NOT NULL,
    body           TEXT NOT NULL,
    type           notifications.notif_type NOT NULL,
    reference_id   UUID,
    is_read        BOOLEAN NOT NULL DEFAULT FALSE,
    fcm_message_id VARCHAR(255),
    sent_at        TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notif_user_unread ON notifications.notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_notif_type        ON notifications.notifications(type);
