-- Add atomic RPC functions to prevent race conditions in concurrent updates
-- These functions use database-level atomic operations instead of read-modify-write patterns

-- Function to atomically increment user XP
-- Prevents lost XP when multiple pomodoro sessions complete simultaneously
CREATE OR REPLACE FUNCTION public.increment_user_xp(
  p_discord_id TEXT,
  p_xp_delta INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.users
  SET xp = xp + p_xp_delta,
      updated_at = NOW()
  WHERE discord_id = p_discord_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with discord_id % not found', p_discord_id;
  END IF;
END;
$$;

-- Function to atomically increment pomodoro totals
-- Prevents lost counts when multiple sessions complete simultaneously
CREATE OR REPLACE FUNCTION public.increment_pomodoro_totals(
  p_discord_id TEXT,
  p_duration_minutes INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.users
  SET
    total_pomodoros = total_pomodoros + 1,
    total_study_minutes = total_study_minutes + p_duration_minutes,
    updated_at = NOW()
  WHERE discord_id = p_discord_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with discord_id % not found', p_discord_id;
  END IF;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.increment_user_xp(TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_pomodoro_totals(TEXT, INTEGER) TO authenticated;

COMMENT ON FUNCTION public.increment_user_xp IS 'Atomically increment user XP to prevent race conditions';
COMMENT ON FUNCTION public.increment_pomodoro_totals IS 'Atomically increment pomodoro counts and study time to prevent race conditions';
