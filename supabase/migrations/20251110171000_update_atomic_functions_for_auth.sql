-- Update atomic functions to work with Supabase Auth (UUID-based)
-- These replace the discord_id-based versions with auth-compatible UUID versions

-- Drop old discord_id-based functions
DROP FUNCTION IF EXISTS public.increment_user_xp(TEXT, INTEGER);
DROP FUNCTION IF EXISTS public.increment_pomodoro_totals(TEXT, INTEGER);

-- Function to atomically increment user XP (UUID version)
-- Works with Supabase Auth and RLS policies
CREATE OR REPLACE FUNCTION public.increment_user_xp(
  p_user_id UUID,
  p_xp_amount INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update XP for the specified user
  -- RLS policies ensure users can only update their own data
  UPDATE public.users
  SET xp = xp + p_xp_amount,
      updated_at = NOW()
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with id % not found or access denied', p_user_id;
  END IF;
END;
$$;

-- Function to atomically increment pomodoro totals (UUID version)
-- Works with Supabase Auth and RLS policies
CREATE OR REPLACE FUNCTION public.increment_pomodoro_totals(
  p_user_id UUID,
  p_pomodoro_count INTEGER,
  p_minutes INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update pomodoro statistics
  -- RLS policies ensure users can only update their own data
  UPDATE public.users
  SET
    total_pomodoros = total_pomodoros + p_pomodoro_count,
    total_study_minutes = total_study_minutes + p_minutes,
    updated_at = NOW()
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with id % not found or access denied', p_user_id;
  END IF;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_user_xp(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_pomodoro_totals(UUID, INTEGER, INTEGER) TO authenticated;

-- Also grant to anon for backward compatibility during migration
GRANT EXECUTE ON FUNCTION public.increment_user_xp(UUID, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_pomodoro_totals(UUID, INTEGER, INTEGER) TO anon;

COMMENT ON FUNCTION public.increment_user_xp(UUID, INTEGER) IS
  'Atomically increment user XP using UUID. Works with Supabase Auth and RLS.';

COMMENT ON FUNCTION public.increment_pomodoro_totals(UUID, INTEGER, INTEGER) IS
  'Atomically increment pomodoro totals using UUID. Works with Supabase Auth and RLS.';
