-- V8__storage_bucket_registry.sql
-- Documents the 3 private Supabase Storage buckets.
-- Buckets must be created manually in Supabase Dashboard → Storage.
-- This table serves as an audit record of bucket configuration.

CREATE TABLE IF NOT EXISTS public.storage_bucket_registry (
    bucket_name     TEXT PRIMARY KEY,
    description     TEXT NOT NULL,
    is_public       BOOLEAN NOT NULL DEFAULT FALSE,
    max_file_size   INTEGER NOT NULL, -- bytes
    allowed_types   TEXT[] NOT NULL,
    path_pattern    TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert bucket registry entries
INSERT INTO public.storage_bucket_registry (bucket_name, description, is_public, max_file_size, allowed_types, path_pattern)
VALUES
    ('patient-documents',
     'Patient medical documents — prescriptions, lab reports, treatment records',
     FALSE,
     10485760, -- 10 MB
     ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
     'patient-documents/{patient_id}/'),
    ('patient-avatars',
     'Patient profile photos',
     FALSE,
     2097152, -- 2 MB
     ARRAY['image/jpeg', 'image/png', 'image/webp'],
     'patient-avatars/{patient_id}/'),
    ('doctor-avatars',
     'Doctor profile photos',
     FALSE,
     2097152, -- 2 MB
     ARRAY['image/jpeg', 'image/png', 'image/webp'],
     'doctor-avatars/{doctor_id}/')
ON CONFLICT (bucket_name) DO NOTHING;

-- RLS: only service role can read bucket registry
ALTER TABLE public.storage_bucket_registry ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON public.storage_bucket_registry AS RESTRICTIVE TO authenticated
    USING (FALSE); -- No patient/doctor direct access to registry
