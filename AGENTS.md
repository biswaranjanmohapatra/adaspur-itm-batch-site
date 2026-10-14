# Architecture decisions

- Use Lovable Cloud Auth for email/password identity and keep passwords exclusively in managed Auth; create the student profile and student role atomically from validated signup metadata in a trusted database trigger, because email confirmation may leave the browser without a session.
- Keep student records and authorization roles in the existing `registered_students` and `user_roles` tables with row-level security; reuse these records for batch access instead of introducing parallel profile or credential storage.
- Keep password recovery on public React routes and only change a password from a validated Auth recovery session, because recovery links must remain usable without normal sign-in.