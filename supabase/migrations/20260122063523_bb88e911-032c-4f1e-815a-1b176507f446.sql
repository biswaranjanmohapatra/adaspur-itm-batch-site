
-- Allow users to insert their own registration during signup
CREATE POLICY "Users can insert their own registration"
  ON public.registered_students FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own role during signup
CREATE POLICY "Users can insert their own role"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id AND role = 'student');
