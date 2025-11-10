# SQL Migration Guide for Supabase Auth

This guide shows you **exactly what SQL to run** and **in what order** to set up secure authentication.

---

## 🎯 Quick Overview

You need to run **2 SQL migrations** in your Supabase database:

1. ✅ **Supabase Auth Integration** - Adds auth_user_id column and secure RLS policies
2. ✅ **Update Atomic Functions** - Updates XP/pomodoro functions to work with auth

---

## 📍 Where To Run SQL

Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/editor

1. Click **SQL Editor** in left sidebar
2. Click **New Query**
3. Paste the SQL
4. Click **Run** (or press Ctrl+Enter)

---

## 🔧 Migration 1: Supabase Auth Integration

### What This Does:
- Adds `auth_user_id` column to link with Supabase Auth
- Creates secure RLS policies using `auth.uid()`
- Adds trigger to auto-create user profiles on signup
- Removes old permissive anon policies

### SQL To Run:

```sql
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
```

### ✅ Expected Result:
You should see: **"Success. No rows returned"**

---

## 🔧 Migration 2: Update Atomic Functions

### What This Does:
- Updates `increment_user_xp()` to use UUID instead of discord_id
- Updates `increment_pomodoro_totals()` to use UUID
- Makes functions work with Supabase Auth and RLS

### SQL To Run:

```sql
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
```

### ✅ Expected Result:
You should see: **"Success. No rows returned"**

---

## ✅ Verification Steps

After running both migrations, verify they worked:

### 1. Check Users Table Structure
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users' AND column_name = 'auth_user_id';
```
**Expected:** Should return one row showing `auth_user_id | uuid`

### 2. Check RLS Policies
```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename = 'users';
```
**Expected:** Should see policies like "Users can view own profile"

### 3. Check Functions Exist
```sql
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN ('increment_user_xp', 'increment_pomodoro_totals', 'handle_new_user');
```
**Expected:** Should return 3 rows

### 4. Check Trigger Exists
```sql
SELECT trigger_name, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```
**Expected:** Should return 1 row

---

## 🚨 Troubleshooting

### Error: "relation auth.users does not exist"
**Solution:** Run this in a new query:
```sql
CREATE SCHEMA IF NOT EXISTS auth;
```
This shouldn't happen in Supabase, but just in case.

### Error: "column auth_user_id already exists"
**Solution:** The migration already ran. Skip to verification steps.

### Error: "policy already exists"
**Solution:** Drop the conflicting policy first:
```sql
DROP POLICY IF EXISTS "policy_name_here" ON public.users;
```

---

## 📊 What Changed

| Before (Anon Key) | After (Supabase Auth) |
|-------------------|----------------------|
| No `auth_user_id` column | ✅ Links to Supabase Auth |
| Permissive anon policies | ✅ Strict auth.uid() policies |
| discord_id-based functions | ✅ UUID-based functions |
| No auto user creation | ✅ Trigger creates profiles |
| Manual user sync | ✅ Automatic on OAuth |

---

## ✨ Success Indicators

You'll know it worked when:

1. ✅ `auth_user_id` column exists in users table
2. ✅ RLS policies reference `auth.uid()`
3. ✅ Trigger `on_auth_user_created` exists
4. ✅ Functions accept UUID parameters
5. ✅ No SQL errors in the editor

---

**Ready to run? Copy each SQL block above into Supabase SQL Editor and click Run!**
