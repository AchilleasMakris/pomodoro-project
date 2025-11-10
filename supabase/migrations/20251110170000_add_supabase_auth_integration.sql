-- Integrate Supabase Auth with existing users table
-- This migration adds proper auth integration while maintaining existing Discord data

-- Add auth_user_id column to link with Supabase Auth
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create unique index on auth_user_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);

-- Drop all existing permissive policies
DROP POLICY IF EXISTS "Anon can read all users" ON public.users;
DROP POLICY IF EXISTS "Anon can insert users" ON public.users;
DROP POLICY IF EXISTS "Anon can update users" ON public.users;
DROP POLICY IF EXISTS "Anon can read all pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Anon can insert pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Allow authenticated read on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated insert on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated update on users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated read on pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Allow authenticated insert on pomodoros" ON public.completed_pomodoros;

-- Create secure RLS policies using auth.uid()
-- Users table policies
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);

-- Pomodoros table policies
CREATE POLICY "Users can view own pomodoros"
  ON public.completed_pomodoros
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = completed_pomodoros.user_id
      AND users.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own pomodoros"
  ON public.completed_pomodoros
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = user_id
      AND users.auth_user_id = auth.uid()
    )
  );

-- Function to automatically create user profile on signup
-- Handles Discord OAuth without email requirement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_discord_id TEXT;
  v_username TEXT;
  v_avatar TEXT;
BEGIN
  -- Extract Discord ID from metadata (provider uses different fields)
  v_discord_id := COALESCE(
    NEW.raw_user_meta_data->>'provider_id',
    NEW.raw_user_meta_data->>'sub',
    NEW.id::text
  );

  -- Extract username (Discord users may not have full_name)
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'username',
    'Discord User ' || substring(v_discord_id, 1, 8)
  );

  -- Extract avatar URL
  v_avatar := COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture'
  );

  -- Insert user profile
  INSERT INTO public.users (
    auth_user_id,
    discord_id,
    username,
    avatar,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    v_discord_id,
    v_username,
    v_avatar,
    NOW(),
    NOW()
  )
  ON CONFLICT (auth_user_id) DO UPDATE SET
    username = EXCLUDED.username,
    avatar = EXCLUDED.avatar,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to sync Discord data from auth metadata
CREATE OR REPLACE FUNCTION public.sync_discord_user_data(
  p_auth_user_id UUID,
  p_discord_id TEXT,
  p_username TEXT,
  p_avatar TEXT
)
RETURNS public.users AS $$
DECLARE
  v_user public.users;
BEGIN
  -- Upsert user data
  INSERT INTO public.users (
    auth_user_id,
    discord_id,
    username,
    avatar,
    last_login,
    updated_at
  ) VALUES (
    p_auth_user_id,
    p_discord_id,
    p_username,
    p_avatar,
    NOW(),
    NOW()
  )
  ON CONFLICT (discord_id)
  DO UPDATE SET
    auth_user_id = COALESCE(EXCLUDED.auth_user_id, users.auth_user_id),
    username = EXCLUDED.username,
    avatar = EXCLUDED.avatar,
    last_login = EXCLUDED.last_login,
    updated_at = EXCLUDED.updated_at
  RETURNING * INTO v_user;

  -- Update login streak
  -- (streak logic handled by application)

  RETURN v_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.sync_discord_user_data(UUID, TEXT, TEXT, TEXT) TO authenticated;

COMMENT ON FUNCTION public.handle_new_user() IS
  'Automatically creates user profile when new auth user signs up via Discord OAuth';

COMMENT ON FUNCTION public.sync_discord_user_data(UUID, TEXT, TEXT, TEXT) IS
  'Syncs Discord user data from OAuth into users table';

COMMENT ON COLUMN public.users.auth_user_id IS
  'Foreign key to auth.users - links Discord data with Supabase Auth';
