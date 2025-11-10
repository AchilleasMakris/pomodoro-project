-- CRITICAL FIX: Remove insecure anon policies
-- The previous migration granted anon role full access with USING(true)
-- This is a major security vulnerability - anon key is public!

-- Drop all insecure anon policies
DROP POLICY IF EXISTS "Anon can read all users" ON public.users;
DROP POLICY IF EXISTS "Anon can insert users" ON public.users;
DROP POLICY IF EXISTS "Anon can update users" ON public.users;
DROP POLICY IF EXISTS "Anon can read all pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Anon can insert pomodoros" ON public.completed_pomodoros;

-- Drop duplicate authenticated policies if they exist
DROP POLICY IF EXISTS "Allow authenticated read on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated insert on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated update on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated read on pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Allow authenticated insert on pomodoros" ON public.completed_pomodoros;

-- The secure policies from 20251110170000_add_supabase_auth_integration.sql
-- already exist and use auth.uid() checks:
-- - "Users can view own profile"
-- - "Users can insert own profile"
-- - "Users can update own profile"
-- - "Users can view own pomodoros"
-- - "Users can insert own pomodoros"

-- Verify no permissive policies remain
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE tablename IN ('users', 'completed_pomodoros')
    AND (
      qual = 'true'::pg_node_tree
      OR with_check = 'true'::pg_node_tree
    )
  LOOP
    RAISE WARNING 'Found permissive policy: %.%.%',
      policy_record.schemaname,
      policy_record.tablename,
      policy_record.policyname;
  END LOOP;
END $$;

COMMENT ON TABLE public.users IS
  'User accounts with Supabase Auth integration. RLS enforces auth.uid() = auth_user_id.';

COMMENT ON TABLE public.completed_pomodoros IS
  'Pomodoro history. RLS enforces ownership via users.auth_user_id = auth.uid().';
