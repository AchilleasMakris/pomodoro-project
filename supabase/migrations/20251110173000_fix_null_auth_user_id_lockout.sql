-- CRITICAL FIX: Secure RLS policies for auth migration
-- Migration handled ONLY via backfill_auth_user_id RPC (SECURITY DEFINER bypasses RLS)
-- This prevents account hijacking and data exposure during migration

-- Drop the strict policies that don't handle NULL
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- Create SECURE policies - no NULL allowances to prevent hijacking/exposure
-- Unmigrated users must use backfill_auth_user_id RPC to link their account first

CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = auth_user_id
  );

CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = auth_user_id
  );

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = auth_user_id
  )
  WITH CHECK (
    auth.uid() = auth_user_id
  );

-- For completed_pomodoros - strict policies with no NULL allowances
DROP POLICY IF EXISTS "Users can view own pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Users can insert own pomodoros" ON public.completed_pomodoros;

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

-- Function to backfill auth_user_id for existing Discord users
-- Call this after users authenticate with Supabase Auth
CREATE OR REPLACE FUNCTION public.backfill_auth_user_id(
  p_discord_id TEXT,
  p_auth_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated BOOLEAN;
  v_jwt_discord_id TEXT;
  v_user_metadata JSONB;
BEGIN
  -- SECURITY: Verify caller is updating their own account
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF auth.uid() != p_auth_user_id THEN
    RAISE EXCEPTION 'Unauthorized: Cannot backfill another user''s auth_user_id';
  END IF;

  -- CRITICAL SECURITY: Verify the discord_id matches the authenticated user's Discord identity
  -- Extract user_metadata from JWT to get the Discord provider ID
  SELECT raw_user_meta_data INTO v_user_metadata
  FROM auth.users
  WHERE id = auth.uid();

  IF v_user_metadata IS NULL THEN
    RAISE EXCEPTION 'User metadata not found';
  END IF;

  -- Try to extract Discord ID from various metadata fields
  v_jwt_discord_id := COALESCE(
    v_user_metadata->>'provider_id',
    v_user_metadata->>'sub',
    auth.uid()::text
  );

  IF v_jwt_discord_id IS NULL OR v_jwt_discord_id != p_discord_id THEN
    RAISE EXCEPTION 'Unauthorized: discord_id does not match authenticated Discord identity (expected: %, got: %)',
      v_jwt_discord_id, p_discord_id;
  END IF;

  -- Update existing user with their auth_user_id
  -- This bypasses RLS (SECURITY DEFINER) but with proper ownership verification
  UPDATE public.users
  SET auth_user_id = p_auth_user_id,
      updated_at = NOW()
  WHERE discord_id = p_discord_id
  AND auth_user_id IS NULL;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.backfill_auth_user_id(TEXT, UUID) TO authenticated;

COMMENT ON POLICY "Users can view own profile" ON public.users IS
  'Users can only view their own profile. Unmigrated users must call backfill_auth_user_id RPC first.';

COMMENT ON FUNCTION public.backfill_auth_user_id(TEXT, UUID) IS
  'SECURITY DEFINER function to backfill auth_user_id for existing users. Verifies Discord ID ownership via JWT metadata before linking. Bypasses RLS with proper verification.';
