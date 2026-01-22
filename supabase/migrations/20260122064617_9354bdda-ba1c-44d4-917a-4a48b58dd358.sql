-- Add email column to registered_students for login lookup
ALTER TABLE public.registered_students ADD COLUMN IF NOT EXISTS email TEXT;

-- Create index for email lookup during login
CREATE INDEX IF NOT EXISTS idx_registered_students_email ON public.registered_students(email);

-- Create index for registration number lookup
CREATE INDEX IF NOT EXISTS idx_registered_students_registration_number ON public.registered_students(registration_number);