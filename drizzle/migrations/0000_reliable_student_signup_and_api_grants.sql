-- The signup trigger validates and saves the student profile and student role atomically.
CREATE OR REPLACE FUNCTION public.create_student_for_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_registration_number text;
  v_student_name text;
  v_mobile_number text;
  v_batch_id text;
  v_roll_number integer;
BEGIN
  v_registration_number := upper(btrim(coalesce(NEW.raw_user_meta_data ->> 'registration_number', '')));
  v_student_name := btrim(coalesce(NEW.raw_user_meta_data ->> 'student_name', ''));
  v_mobile_number := btrim(coalesce(NEW.raw_user_meta_data ->> 'mobile_number', ''));

  IF NEW.email IS NULL OR btrim(NEW.email) = '' THEN
    RAISE EXCEPTION 'A valid email address is required.' USING ERRCODE = '23514';
  END IF;

  IF v_student_name = '' THEN
    RAISE EXCEPTION 'A student name is required.' USING ERRCODE = '23514';
  END IF;

  IF v_registration_number !~ '^UNITM(21|22|23|24|25)[0-9]{4}$' THEN
    RAISE EXCEPTION 'Registration number is invalid.' USING ERRCODE = '23514';
  END IF;

  v_roll_number := right(v_registration_number, 4)::integer;
  IF v_roll_number < 1 OR v_roll_number > 30 THEN
    RAISE EXCEPTION 'Registration number is outside the allowed student range.' USING ERRCODE = '23514';
  END IF;

  v_batch_id := CASE left(v_registration_number, 7)
    WHEN 'UNITM21' THEN '2021-2024'
    WHEN 'UNITM22' THEN '2022-2025'
    WHEN 'UNITM23' THEN '2023-2026'
    WHEN 'UNITM24' THEN '2024-2027'
    WHEN 'UNITM25' THEN '2025-2028'
  END;

  IF v_mobile_number !~ '^[6-9][0-9]{9}$' THEN
    RAISE EXCEPTION 'A valid 10-digit mobile number is required.' USING ERRCODE = '23514';
  END IF;

  INSERT INTO public.registered_students (
    user_id, registration_number, student_name, batch_id, email, mobile_number
  ) VALUES (
    NEW.id, v_registration_number, v_student_name, v_batch_id, lower(btrim(NEW.email)), v_mobile_number
  );

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student'::public.app_role);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS create_student_after_auth_signup ON auth.users;
CREATE TRIGGER create_student_after_auth_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_student_for_new_auth_user();

-- Registration and role assignment are performed by the trusted signup trigger, not the browser.
DROP POLICY IF EXISTS "Users can insert their own registration" ON public.registered_students;
DROP POLICY IF EXISTS "Users can insert their own role" ON public.user_roles;

-- RLS remains the row-level boundary; grants make permitted operations reachable through the Data API.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.registered_students TO authenticated;
GRANT ALL ON public.registered_students TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.batch_messages TO authenticated;
GRANT ALL ON public.batch_messages TO service_role;

REVOKE ALL ON FUNCTION public.create_student_for_new_auth_user() FROM PUBLIC, anon, authenticated;
