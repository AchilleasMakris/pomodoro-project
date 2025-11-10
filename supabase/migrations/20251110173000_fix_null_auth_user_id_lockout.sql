-- CRITICAL FIX: Handle NULL auth_user_id during migration
-- Existing users have NULL auth_user_id and would be locked out by strict RLS policies

-- Drop the strict policies that don't handle NULL
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;

-- Create migration-safe policies that handle NULL auth_user_id
-- These allow access during the transition period

CREATE POLICY "Users can view own profile (migration-safe)"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = auth_user_id
    OR auth_user_id IS NULL -- Allow access to unmigrated users
  );

CREATE POLICY "Users can insert own profile (migration-safe)"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = auth_user_id
  );

CREATE POLICY "Users can update own profile (migration-safe)"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = auth_user_id
    OR auth_user_id IS NULL -- Allow updates during migration
  )
  WITH CHECK (
    auth.uid() = auth_user_id
  );

-- For completed_pomodoros, also handle users table NULL references
DROP POLICY IF EXISTS "Users can view own pomodoros" ON public.completed_pomodoros;
DROP POLICY IF EXISTS "Users can insert own pomodoros" ON public.completed_pomodoros;

CREATE POLICY "Users can view own pomodoros (migration-safe)"
  ON public.completed_pomodoros
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = completed_pomodoros.user_id
      AND (
        users.auth_user_id = auth.uid()
        OR users.auth_user_id IS NULL -- Allow during migration
      )
    )
  );

CREATE POLICY "Users can insert own pomodoros (migration-safe)"
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
BEGIN
  -- Update existing user with their auth_user_id
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

COMMENT ON POLICY "Users can view own profile (migration-safe)" ON public.users IS
  'Allows access during auth migration. Remove NULL check after all users migrated.';

COMMENT ON FUNCTION public.backfill_auth_user_id(TEXT, UUID) IS
  'Backfills auth_user_id for existing users during Supabase Auth migration.';
