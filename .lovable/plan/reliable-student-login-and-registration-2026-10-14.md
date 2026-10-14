# Reliable student login and registration

## Goal
Repair registration and login using Lovable Cloud email/password authentication, preserve the existing student information and portal, and handle confirmations and service failures honestly.

## Work
1. Move registration-number validation to the database signup transaction: validate the existing UNITM batch/range rules, reject duplicate numbers, and create the student record and student role together when the account is created. Keep passwords exclusively in Cloud Auth; keep email confirmation enabled.
2. Update the registration and login flows to handle pending email confirmation, duplicate submissions, invalid credentials, network/server failures, successful redirects, session restoration, and logout without confusing failure messages.
3. Add a real forgot-password page and public recovery page, including recovery-link validation and password update.
4. Verify registration rules with focused tests; check the resulting build and app flows. Document the authentication/database structural decisions in the project guidance.

## Boundaries
Reuse the existing `registered_students` and `user_roles` tables and current visual design. Do not add unnecessary tables, expose secrets, enable anonymous users, auto-confirm accounts, or claim production/live tests that cannot be run here.

## Technical details
Use the existing React/Vite and Cloud Auth client. A database trigger on new `auth.users` records will validate signup metadata and atomically create the student and role records, so registration works whether email confirmation returns a session or not. Apply database changes only through the Lovable Database migration tool, with explicit grants and row-level security preserved.
