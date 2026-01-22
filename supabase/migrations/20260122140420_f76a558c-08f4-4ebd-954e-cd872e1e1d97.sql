-- Add mobile_number column to registered_students table
ALTER TABLE public.registered_students
ADD COLUMN mobile_number text;