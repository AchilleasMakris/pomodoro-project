-- Fix Row Level Security Policies
-- Remove overly permissive "OR true" clauses that bypass security

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "System can insert users" ON public.users;
DROP POLICY IF EXISTS "Users can read own pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Users can insert own pomodoros" ON public.completed_pomodoros;

-- Create secure policies for users table
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (discord_id = auth.uid()::text);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (discord_id = auth.uid()::text);

CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (discord_id = auth.uid()::text);

-- Create secure policies for completed_pomodoros table
CREATE POLICY "Users can read own pomodoros"
  ON public.completed_pomodoros
  FOR SELECT
  TO authenticated
  USING (discord_id = auth.uid()::text);

CREATE POLICY "Users can insert own pomodoros"
  ON public.completed_pomodoros
  FOR INSERT
  TO authenticated
  WITH CHECK (discord_id = auth.uid()::text);

COMMENT ON POLICY "Users can read own data" ON public.users IS 'Users can only read their own profile data';
COMMENT ON POLICY "Users can update own data" ON public.users IS 'Users can only update their own profile data';
COMMENT ON POLICY "Users can insert own data" ON public.users IS 'Users can only insert their own profile';
COMMENT ON POLICY "Users can read own pomodoros" ON public.completed_pomodoros IS 'Users can only read their own pomodoro history';
COMMENT ON POLICY "Users can insert own pomodoros" ON public.completed_pomodoros IS 'Users can only insert their own pomodoro sessions';
