-- Fix Row Level Security for Discord OAuth (anon key access)
-- Discord Activities use the anon key without Supabase Auth,
-- so we need to allow anon role access instead of authenticated role

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
DROP POLICY IF EXISTS "Users can read own pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Users can insert own pomodoros" ON public.completed_pomodoros;

-- Create policies for anon role (Discord Activities access)
-- Since we're using Discord OAuth and the anon key is our authentication,
-- we allow anon users full access to the tables

CREATE POLICY "Allow anon read on users"
  ON public.users
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon insert on users"
  ON public.users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update on users"
  ON public.users
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon read on pomodoros"
  ON public.completed_pomodoros
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon insert on pomodoros"
  ON public.completed_pomodoros
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also keep policies for authenticated role if you want to support Supabase Auth later
CREATE POLICY "Allow authenticated read on users"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on users"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on users"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read on pomodoros"
  ON public.completed_pomodoros
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on pomodoros"
  ON public.completed_pomodoros
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

COMMENT ON POLICY "Allow anon read on users" ON public.users IS 'Discord Activities use anon key for authentication';
COMMENT ON POLICY "Allow anon insert on users" ON public.users IS 'Allow Discord users to create accounts';
COMMENT ON POLICY "Allow anon update on users" ON public.users IS 'Allow Discord users to update their profiles';
