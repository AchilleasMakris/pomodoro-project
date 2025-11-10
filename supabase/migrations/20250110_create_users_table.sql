-- Create users table for Discord authentication
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discord_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT,

  -- Gamification data
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 20),
  xp INTEGER DEFAULT 0 CHECK (xp >= 0),
  prestige_level INTEGER DEFAULT 0 CHECK (prestige_level >= 0),
  level_path TEXT DEFAULT 'human' CHECK (level_path IN ('elf', 'human')),

  -- Activity tracking
  consecutive_login_days INTEGER DEFAULT 1 CHECK (consecutive_login_days >= 0),
  total_unique_days INTEGER DEFAULT 1 CHECK (total_unique_days >= 0),
  total_pomodoros INTEGER DEFAULT 0 CHECK (total_pomodoros >= 0),
  total_study_minutes INTEGER DEFAULT 0 CHECK (total_study_minutes >= 0),

  -- Settings
  sound_enabled BOOLEAN DEFAULT true,
  volume INTEGER DEFAULT 80 CHECK (volume >= 0 AND volume <= 100),
  music_volume INTEGER DEFAULT 50 CHECK (music_volume >= 0 AND music_volume <= 100),
  level_system_enabled BOOLEAN DEFAULT true,

  -- Timestamps
  last_login_date DATE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on discord_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_discord_id ON public.users(discord_id);

-- Create index on last_login for activity queries
CREATE INDEX IF NOT EXISTS idx_users_last_login ON public.users(last_login);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  USING (auth.uid()::text = discord_id OR true); -- Allow read for now, can restrict later

-- Create policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid()::text = discord_id OR true); -- Allow update for now, can restrict later

-- Create policy: System can insert new users
CREATE POLICY "System can insert users"
  ON public.users
  FOR INSERT
  WITH CHECK (true); -- Allow insert for now, can restrict later

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create completed_pomodoros table for session history
CREATE TABLE IF NOT EXISTS public.completed_pomodoros (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  discord_id TEXT NOT NULL,

  -- Session data
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  xp_earned INTEGER NOT NULL DEFAULT 0,
  task_name TEXT,
  notes TEXT,

  -- Timestamps
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for user queries
CREATE INDEX IF NOT EXISTS idx_completed_pomodoros_user_id
  ON public.completed_pomodoros(user_id);

-- Create index on discord_id for Discord-based queries
CREATE INDEX IF NOT EXISTS idx_completed_pomodoros_discord_id
  ON public.completed_pomodoros(discord_id);

-- Create index on completed_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_completed_pomodoros_completed_at
  ON public.completed_pomodoros(completed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.completed_pomodoros ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can read their own pomodoros
CREATE POLICY "Users can read own pomodoros"
  ON public.completed_pomodoros
  FOR SELECT
  USING (discord_id = auth.uid()::text OR true);

-- Create policy: Users can insert their own pomodoros
CREATE POLICY "Users can insert own pomodoros"
  ON public.completed_pomodoros
  FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE public.users IS 'User accounts synced from Discord';
COMMENT ON TABLE public.completed_pomodoros IS 'History of completed pomodoro sessions';
