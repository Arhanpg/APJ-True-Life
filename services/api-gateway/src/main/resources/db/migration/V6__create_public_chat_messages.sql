-- V6__create_public_chat_messages.sql
-- APJ TRUE LIFE — Public chat_messages table with RLS

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  sender_firebase_uid TEXT,
  sender_doctor_id UUID,
  content       TEXT NOT NULL,
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Patient reads own chat messages
CREATE POLICY "Patient reads own chat"
ON public.chat_messages FOR SELECT TO authenticated
USING (
  sender_firebase_uid = auth.jwt()->>'sub'
  OR appointment_id IN (
    SELECT a.id FROM public.appointments a
    JOIN public.patients p ON p.id = a.patient_id
    WHERE p.firebase_uid = auth.jwt()->>'sub'
  )
);

-- Patient can send messages
CREATE POLICY "Patient sends messages"
ON public.chat_messages FOR INSERT TO authenticated
WITH CHECK (
  sender_firebase_uid = auth.jwt()->>'sub'
);

-- Restrictive guard (Firebase project isolation)
CREATE POLICY "Restrict to valid auth JWT"
ON public.chat_messages AS RESTRICTIVE TO authenticated
USING ((SELECT public.is_valid_auth_jwt()) IS TRUE);

-- Indexes
CREATE INDEX idx_public_chat_messages_appointment ON public.chat_messages(appointment_id);
CREATE INDEX idx_public_chat_messages_sender ON public.chat_messages(sender_firebase_uid);
CREATE INDEX idx_public_chat_messages_sent ON public.chat_messages(sent_at DESC);
