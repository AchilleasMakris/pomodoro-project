# Pomodoro Lofi - Discord Activity

A Pomodoro timer application built as a Discord Activity, featuring study tracking, XP/leveling system, and persistent user data across devices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Key Features](#key-features)
5. [Authentication System](#authentication-system)
6. [Database Schema](#database-schema)
7. [Security Implementation](#security-implementation)
8. [API & RPC Functions](#api--rpc-functions)
9. [File Structure](#file-structure)
10. [Environment Variables](#environment-variables)
11. [Development Workflow](#development-workflow)
12. [Deployment](#deployment)

---

## Project Overview

**Pomodoro Lofi** is a productivity timer application embedded as a Discord Activity (iframe). Users can:
- Run Pomodoro study sessions with customizable durations
- Earn XP and level up through consistent study
- Track statistics (total pomodoros, study time, login streaks)
- Choose between Elf and Human level paths with prestige system
- Listen to lofi background music while studying
- Authenticate with Discord OAuth to sync data across devices

**Key Differentiator**: This is NOT a standard web app - it runs inside Discord's iframe as an Activity, requiring special handling for OAuth redirects and Discord SDK integration.

---

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Discord Integration**: `@discord/embedded-app-sdk`
- **UI Components**: Custom components + Lucide React icons

### Backend
- **Database**: PostgreSQL (via Supabase)
- **Auth**: Supabase Auth with Discord OAuth provider
- **Edge Functions**: Deno-based Supabase Edge Functions
- **Real-time**: Supabase Realtime (for future features)

### Infrastructure
- **Hosting**: Vercel (frontend) + Supabase (backend/database)
- **Database**: Supabase PostgreSQL
- **Edge Runtime**: Deno Deploy (via Supabase)
- **Version Control**: Git + GitHub

### Security
- **Row Level Security (RLS)**: PostgreSQL RLS policies
- **JWT Authentication**: Supabase Auth tokens
- **Discord OAuth**: OAuth 2.0 Authorization Code Flow
- **SECURITY DEFINER Functions**: PostgreSQL functions with explicit authorization checks

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Discord Client (Desktop/Mobile)           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Discord Activity (iframe)                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         React App (Vite + TypeScript)          │  │  │
│  │  │                                                 │  │  │
│  │  │  Components:                                    │  │  │
│  │  │  - PomodoroTimer                                │  │  │
│  │  │  - Stats Dashboard                              │  │  │
│  │  │  - Settings Panel                               │  │  │
│  │  │  - Level System                                 │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                          ↓                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │      Supabase Client (supabase-js)             │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
              ┌───────────────────────────────┐
              │      Supabase Backend         │
              │                               │
              │  ┌─────────────────────────┐  │
              │  │   PostgreSQL Database   │  │
              │  │   - users               │  │
              │  │   - completed_pomodoros │  │
              │  │   - RLS Policies        │  │
              │  └─────────────────────────┘  │
              │                               │
              │  ┌─────────────────────────┐  │
              │  │   Supabase Auth         │  │
              │  │   - Discord OAuth       │  │
              │  │   - JWT Management      │  │
              │  └─────────────────────────┘  │
              │                               │
              │  ┌─────────────────────────┐  │
              │  │   Edge Functions        │  │
              │  │   - discord-token       │  │
              │  └─────────────────────────┘  │
              └───────────────────────────────┘
                              ↓
                  ┌──────────────────────┐
                  │   Discord API        │
                  │   - OAuth Provider   │
                  └──────────────────────┘
```

### Data Flow

1. **Authentication Flow**:
   ```
   User opens Activity → Check session → No session found
   → Redirect to Discord OAuth → User authorizes
   → Discord redirects back with code → Supabase Auth exchanges code
   → JWT token issued → User session established
   → Fetch/create user profile → App ready
   ```

2. **Pomodoro Session Flow**:
   ```
   User starts timer → Timer counts down → Session completes
   → Calculate XP earned → Call atomic_save_completed_pomodoro RPC
   → RPC inserts pomodoro + updates user stats (atomic transaction)
   → UI updates with new XP/level → Achievement unlocked (if any)
   ```

3. **Data Persistence Flow**:
   ```
   All API calls → Supabase Client → JWT in Authorization header
   → Supabase validates JWT → RLS policies check auth.uid()
   → If authorized: execute query → Return data
   → If unauthorized: reject with 403
   ```

---

## Key Features

### 1. Pomodoro Timer
- **Customizable Duration**: 15, 25, 30, 45, 60 minute sessions
- **Visual Timer**: Circular progress indicator with time remaining
- **Sound Notifications**: Optional sound effects on completion
- **Background Music**: Lofi music player with volume control
- **Pause/Resume**: Ability to pause and resume sessions
- **Task Notes**: Optional task name and notes for each pomodoro

**Implementation**: `src/components/PomodoroTimer.tsx`

### 2. XP & Leveling System
- **XP Earning**: 10 XP per minute of focused study
- **Level Progression**: Exponential XP requirements (100 * level² XP per level)
- **Level Paths**: Choose between Elf (blue theme) or Human (red theme)
- **Prestige System**: Reset level at 50 to earn prestige stars
- **Visual Feedback**: Animated XP bar, level-up celebrations

**Implementation**:
- UI: `src/components/LevelSystem.tsx`
- Logic: `src/lib/levelSystem.ts`
- Database: `users.level`, `users.xp`, `users.prestige_level`

### 3. Statistics Dashboard
- **Total Pomodoros**: Lifetime completed sessions
- **Total Study Time**: Minutes spent studying
- **Login Streaks**: Consecutive days of app usage
- **Unique Study Days**: Total unique days with completed pomodoros
- **Average Per Day**: Pomodoros per unique study day
- **Visual Charts**: Progress visualization (future enhancement)

**Implementation**: `src/components/StatsDashboard.tsx`, `src/lib/userSyncAuth.ts`

### 4. Settings Panel
- **Sound Toggle**: Enable/disable completion sounds
- **Volume Control**: Adjust sound effect volume (0-100%)
- **Music Volume**: Adjust background music volume (0-100%)
- **Level System Toggle**: Show/hide level system UI
- **Level Path Selection**: Switch between Elf and Human themes
- **Persistent Settings**: All settings saved to database

**Implementation**: `src/components/Settings.tsx`

### 5. Discord Integration
- **Activity SDK**: Discord Embedded App SDK for iframe communication
- **OAuth Authentication**: Discord as OAuth provider
- **User Identity**: Discord username, avatar, and ID
- **Query Params**: Preserves `frame_id` and `instance_id` for Discord context
- **Responsive**: Works on Discord desktop and mobile

**Implementation**: `src/lib/discordSdk.ts`, `src/lib/supabaseAuth.ts`

---

## Authentication System

### Overview
The app uses **Supabase Auth with Discord OAuth** for authentication. This provides secure, JWT-based authentication with proper RLS enforcement.

### Authentication Flow (Detailed)

```typescript
// 1. App initialization
authenticateWithSupabase() called on mount

// 2. Check for Discord context
if (!isInDiscord()) {
  throw new Error('Must be launched from Discord Activities')
}

// 3. Check existing session
const { session } = await supabase.auth.getSession()

// 4a. If session exists:
if (session?.user) {
  // Fetch or create user profile
  const appUser = await fetchOrCreateAppUser(session.user)
  return { user: session.user, session, appUser }
}

// 4b. If no session:
// Redirect to Discord OAuth (preserving frame_id/instance_id)
await signInWithDiscord()

// 5. Discord OAuth redirect
// User authorizes on Discord → redirects back with code
// Supabase Auth exchanges code for JWT token
// Session established

// 6. Fetch or create user profile
async function fetchOrCreateAppUser(authUser: User) {
  // Try to find existing user by auth_user_id
  const existingUser = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', authUser.id)
    .maybeSingle()

  if (existingUser) {
    // Update last login via sync_discord_user_data RPC
    return updatedUser
  }

  // Check for legacy account (discord_id exists, auth_user_id is NULL)
  const { data: backfilled } = await supabase.rpc('backfill_auth_user_id', {
    p_discord_id: discordId,
    p_auth_user_id: authUser.id
  })

  if (backfilled === true) {
    // Legacy account linked, fetch and return
    return linkedUser
  }

  // No existing user - create new
  const newUser = await supabase.from('users').insert({
    auth_user_id: authUser.id,
    discord_id: discordId,
    username,
    avatar
  })

  return newUser
}
```

### OAuth Configuration

**Discord Application Settings**:
- **Redirect URI**: `https://your-project.supabase.co/auth/v1/callback`
- **Scopes**: `identify guilds` (email is optional)

**Supabase Auth Settings**:
- **Provider**: Discord OAuth
- **Skip nonce check**: ✅ Enabled (required for Discord Activities)
- **Allow users without email**: ✅ Enabled (not all Discord users share email)

### Session Management

- **JWT Tokens**: Stored in localStorage by Supabase client
- **Token Refresh**: Automatic refresh before expiration
- **Session Persistence**: Users stay logged in across page reloads
- **Auth State Changes**: Monitored via `supabase.auth.onAuthStateChange()`

### Legacy Account Migration

For users who used the app before Supabase Auth:
1. User authenticates with Discord OAuth
2. Supabase Auth creates auth identity
3. App calls `backfill_auth_user_id` RPC
4. RPC verifies Discord ID ownership (prevents hijacking)
5. RPC links legacy account (sets auth_user_id)
6. User regains access to their XP, stats, and pomodoros

**Security**: The backfill function verifies Discord ID ownership by checking JWT metadata - prevents attackers from claiming other users' accounts.

---

## Database Schema

### Tables

#### `users`
Primary table for user profiles and statistics.

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  discord_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  prestige_level INTEGER DEFAULT 0,
  level_path TEXT DEFAULT 'elf' CHECK (level_path IN ('elf', 'human')),
  consecutive_login_days INTEGER DEFAULT 0,
  total_unique_days INTEGER DEFAULT 0,
  total_pomodoros INTEGER DEFAULT 0,
  total_study_minutes INTEGER DEFAULT 0,
  sound_enabled BOOLEAN DEFAULT true,
  volume INTEGER DEFAULT 80 CHECK (volume BETWEEN 0 AND 100),
  music_volume INTEGER DEFAULT 50 CHECK (music_volume BETWEEN 0 AND 100),
  level_system_enabled BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX idx_users_discord_id ON public.users(discord_id);
```

**Key Fields**:
- `auth_user_id`: Links to Supabase Auth identity (NULL for legacy users)
- `discord_id`: Discord user ID (unique identifier)
- `level`, `xp`, `prestige_level`: Leveling system state
- `consecutive_login_days`: Current login streak
- `total_unique_days`: Total unique days with activity (for averages)
- `total_pomodoros`, `total_study_minutes`: Aggregate statistics

#### `completed_pomodoros`
Stores individual completed Pomodoro sessions.

```sql
CREATE TABLE public.completed_pomodoros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  discord_id TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  xp_earned INTEGER NOT NULL CHECK (xp_earned >= 0),
  task_name TEXT,
  notes TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_completed_pomodoros_user_id ON public.completed_pomodoros(user_id);
CREATE INDEX idx_completed_pomodoros_completed_at ON public.completed_pomodoros(completed_at);
```

**Key Fields**:
- `user_id`: References users.id (enforced by foreign key + RLS)
- `discord_id`: Denormalized for backwards compatibility
- `duration_minutes`: Session length (15, 25, 30, 45, or 60)
- `xp_earned`: XP gained from this session (10 XP/min)
- `completed_at`: Timestamp for session completion

### Row Level Security (RLS)

All tables have RLS enabled with strict policies:

#### Users Table Policies

```sql
-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT TO authenticated
  USING (auth.uid() = auth_user_id);

-- Users can only insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = auth_user_id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE TO authenticated
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);
```

#### Completed Pomodoros Policies

```sql
-- Users can only view their own pomodoros
CREATE POLICY "Users can view own pomodoros"
  ON public.completed_pomodoros FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = completed_pomodoros.user_id
      AND users.auth_user_id = auth.uid()
    )
  );

-- Users can only insert their own pomodoros
CREATE POLICY "Users can insert own pomodoros"
  ON public.completed_pomodoros FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = user_id
      AND users.auth_user_id = auth.uid()
    )
  );
```

**Security Guarantees**:
- Users can ONLY access their own data
- `auth.uid()` provides the authenticated user's UUID
- RLS is enforced at the database level (can't be bypassed from client)
- Anonymous users have NO access to data

---

## Security Implementation

### Security Principles

1. **Defense in Depth**: Multiple layers of security
2. **Principle of Least Privilege**: Users can only access their own data
3. **Zero Trust**: All requests verified, no implicit trust
4. **Fail Secure**: Errors deny access by default

### Security Measures

#### 1. Row Level Security (RLS)
- **Enabled on all tables**: No table access without matching policy
- **auth.uid() verification**: All policies verify caller identity
- **Strict policies**: No NULL allowances, no anonymous access
- **Enforced at DB level**: Cannot be bypassed from application code

#### 2. SECURITY DEFINER Functions
Functions that bypass RLS MUST have explicit authorization checks:

```sql
CREATE OR REPLACE FUNCTION public.sync_discord_user_data(...)
RETURNS public.users AS $$
BEGIN
  -- SECURITY: Verify caller is updating their own profile
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF auth.uid() != p_auth_user_id THEN
    RAISE EXCEPTION 'Unauthorized: Cannot update another user''s profile';
  END IF;

  -- Safe to proceed...
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**All SECURITY DEFINER functions**:
- `handle_new_user()` - Auto-creates profile on OAuth signup
- `sync_discord_user_data()` - Updates user profile with auth check
- `backfill_auth_user_id()` - Links legacy accounts with Discord ID verification
- `atomic_save_completed_pomodoro()` - Saves pomodoro with ownership verification
- `increment_user_xp()` - Updates XP with auth check
- `increment_pomodoro_totals()` - Updates stats with auth check

#### 3. Discord ID Ownership Verification

**Critical Security Feature**: Prevents account hijacking during legacy account migration.

```sql
-- In backfill_auth_user_id function:

-- Extract Discord ID from JWT metadata
SELECT raw_user_meta_data INTO v_user_metadata
FROM auth.users
WHERE id = auth.uid();

v_jwt_discord_id := COALESCE(
  v_user_metadata->>'provider_id',
  v_user_metadata->>'sub',
  auth.uid()::text
);

-- Verify Discord ID matches
IF v_jwt_discord_id IS NULL OR v_jwt_discord_id != p_discord_id THEN
  RAISE EXCEPTION 'Unauthorized: discord_id does not match authenticated Discord identity';
END IF;
```

**Why this matters**: Without this check, an attacker could call:
```sql
SELECT backfill_auth_user_id('victim_discord_id', auth.uid());
```
And steal the victim's entire account (XP, stats, pomodoros). The Discord ID verification prevents this.

#### 4. Atomic Transactions

**Problem**: Saving a pomodoro requires 3 operations:
1. Insert into `completed_pomodoros`
2. Update `users.total_pomodoros`
3. Update `users.xp`

If any operation fails, data becomes inconsistent.

**Solution**: `atomic_save_completed_pomodoro()` wraps all operations in a single transaction:

```sql
CREATE OR REPLACE FUNCTION public.atomic_save_completed_pomodoro(...)
RETURNS UUID AS $$
BEGIN
  -- Authorization check
  IF NOT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = p_user_id AND auth_user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Insert pomodoro
  INSERT INTO public.completed_pomodoros (...) RETURNING id INTO v_pomodoro_id;

  -- Update user stats (in same transaction)
  UPDATE public.users
  SET
    total_pomodoros = total_pomodoros + 1,
    total_study_minutes = total_study_minutes + p_duration_minutes,
    xp = xp + p_xp_earned
  WHERE id = p_user_id;

  RETURN v_pomodoro_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Guarantees**: Either ALL operations succeed, or ALL are rolled back. No partial failures.

#### 5. JWT Token Security

- **HttpOnly cookies**: Not used (Supabase uses localStorage, acceptable for this use case)
- **Short expiration**: Tokens expire after 1 hour
- **Automatic refresh**: Supabase client refreshes before expiration
- **Secure transmission**: HTTPS only in production

#### 6. Edge Function Security

The `discord-token` edge function is **intentionally public** (no JWT verification):

```toml
# supabase/config.toml
[functions.discord-token]
verify_jwt = false
```

**Why public?**: OAuth code exchange happens BEFORE user has a JWT token. This is standard OAuth flow.

**Why safe?**:
- Only exchanges Discord OAuth codes (single-use, short-lived)
- Returns Discord access token (not Supabase JWT)
- No sensitive data exposed
- Cannot be used to impersonate users

### Attack Vectors Blocked

| Attack | Prevention |
|--------|-----------|
| **Account Hijacking** | Discord ID ownership verification in backfill function |
| **Data Exposure** | Strict RLS policies with auth.uid() checks |
| **XP Manipulation** | All update functions have authorization checks |
| **Stats Manipulation** | Atomic functions with ownership verification |
| **Duplicate Accounts** | Backfill checked before account creation |
| **SQL Injection** | Parameterized queries via Supabase client |
| **CSRF** | JWT tokens in headers (not cookies) |
| **Session Hijacking** | Short-lived tokens with automatic refresh |

---

## API & RPC Functions

### Supabase RPC Functions

#### 1. `sync_discord_user_data()`
Updates user profile with Discord data.

```typescript
await supabase.rpc('sync_discord_user_data', {
  p_auth_user_id: authUser.id,
  p_discord_id: discordId,
  p_username: username,
  p_avatar: avatar
})
```

**Returns**: Updated user record
**Authorization**: Verifies `auth.uid() == p_auth_user_id`
**Use Case**: Called on login to update username/avatar

#### 2. `backfill_auth_user_id()`
Links legacy account to Supabase Auth identity.

```typescript
const { data: linked } = await supabase.rpc('backfill_auth_user_id', {
  p_discord_id: discordId,
  p_auth_user_id: authUser.id
})
// Returns: true if legacy account linked, false if none exists
```

**Returns**: Boolean (true = linked, false = no legacy account)
**Authorization**: Verifies auth.uid() == p_auth_user_id AND Discord ID ownership
**Use Case**: Migration from old auth system to Supabase Auth

#### 3. `atomic_save_completed_pomodoro()`
Saves pomodoro and updates user stats in single transaction.

```typescript
const { data: pomodoroId } = await supabase.rpc('atomic_save_completed_pomodoro', {
  p_user_id: userId,
  p_discord_id: discordId,
  p_duration_minutes: 25,
  p_xp_earned: 250,
  p_task_name: 'Study React',
  p_notes: 'Learned hooks'
})
```

**Returns**: UUID of created pomodoro
**Authorization**: Verifies user_id belongs to authenticated user
**Use Case**: Called when pomodoro session completes

#### 4. `increment_user_xp()`
Atomically increments user XP.

```typescript
await supabase.rpc('increment_user_xp', {
  p_user_id: userId,
  p_xp_amount: 50
})
```

**Returns**: void
**Authorization**: Verifies user_id belongs to authenticated user
**Use Case**: Bonus XP, achievements, corrections

#### 5. `increment_pomodoro_totals()`
Atomically increments pomodoro statistics.

```typescript
await supabase.rpc('increment_pomodoro_totals', {
  p_user_id: userId,
  p_pomodoro_count: 1,
  p_minutes: 25
})
```

**Returns**: void
**Authorization**: Verifies user_id belongs to authenticated user
**Use Case**: Manual stat corrections, bulk imports

### Edge Functions

#### `discord-token`
Exchanges Discord OAuth code for access token.

**Endpoint**: `https://your-project.supabase.co/functions/v1/discord-token`

**Request**:
```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/discord-token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code: oauthCode })
})
const { access_token } = await response.json()
```

**Response**:
```json
{
  "access_token": "discord_access_token",
  "token_type": "Bearer",
  "expires_in": 604800,
  "refresh_token": "discord_refresh_token",
  "scope": "identify guilds"
}
```

**Environment Variables**:
- `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_ID_STAGING`
- `DISCORD_CLIENT_SECRET` / `DISCORD_CLIENT_SECRET_STAGING`

**Note**: Function is public (no JWT verification) - this is standard OAuth flow.

---

## File Structure

```
pomodoro-staging/
├── public/
│   ├── sounds/               # Sound effect assets
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── PomodoroTimer.tsx       # Main timer component
│   │   ├── StatsDashboard.tsx      # User statistics display
│   │   ├── Settings.tsx            # Settings panel
│   │   ├── LevelSystem.tsx         # XP/level UI
│   │   └── MusicPlayer.tsx         # Background music player
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Auth state management
│   │   └── SettingsContext.tsx     # User settings state
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client initialization
│   │   ├── supabaseAuth.ts         # Auth functions (Discord OAuth)
│   │   ├── userSyncAuth.ts         # User data sync functions
│   │   ├── levelSystem.ts          # Level/XP calculation logic
│   │   └── discordSdk.ts           # Discord Embedded App SDK setup
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles (Tailwind)
├── supabase/
│   ├── functions/
│   │   ├── discord-token/
│   │   │   └── index.ts            # OAuth token exchange function
│   │   └── _shared/
│   │       └── cors.ts             # CORS headers
│   ├── migrations/
│   │   ├── 20251110170000_add_supabase_auth_integration.sql
│   │   ├── 20251110171000_update_atomic_functions_for_auth.sql
│   │   ├── 20251110173000_fix_null_auth_user_id_lockout.sql
│   │   └── 20251110174000_atomic_save_pomodoro.sql
│   └── config.toml                 # Supabase configuration
├── .env                            # Environment variables (gitignored)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── PROJECT.md                      # This file
└── README.md
```

### Key Files Explained

#### `src/lib/supabaseAuth.ts`
Central authentication module. Handles:
- Discord OAuth initiation
- Session management
- User profile fetching/creation
- Legacy account migration (backfill)

**Key Functions**:
- `authenticateWithSupabase()` - Main auth entry point
- `signInWithDiscord()` - Initiates OAuth flow
- `fetchOrCreateAppUser()` - Gets/creates user profile
- `getAvatarUrl()` - Generates Discord avatar URLs

#### `src/lib/userSyncAuth.ts`
User data synchronization functions. Handles:
- Fetching user stats
- Saving completed pomodoros
- Updating user settings
- XP/level calculations

**Key Functions**:
- `getUserStats()` - Fetches user statistics
- `saveCompletedPomodoro()` - Saves pomodoro (calls RPC)
- `updateUserSettings()` - Updates user preferences

#### `src/lib/levelSystem.ts`
Level and XP calculation logic.

**Key Functions**:
- `calculateLevel()` - Determines level from XP
- `getXpForLevel()` - Calculates XP required for level
- `getXpProgress()` - Calculates % progress to next level
- `calculateXpEarned()` - XP earned for session (10 XP/min)

**Formula**: `XP for level N = 100 * N²`

Example:
- Level 1: 100 XP
- Level 2: 400 XP (cumulative: 500 XP)
- Level 3: 900 XP (cumulative: 1,400 XP)

#### `src/components/PomodoroTimer.tsx`
Main timer component. Features:
- Countdown timer with visual progress
- Start/pause/reset controls
- Duration selection
- Task name input
- Completion handling (saves to DB)
- Sound effects

#### `src/contexts/AuthContext.tsx`
Auth state management via React Context.

**Provides**:
- `user`: Current authenticated user
- `session`: Supabase session
- `appUser`: User profile data
- `loading`: Auth loading state
- `signOut()`: Sign out function

---

## Environment Variables

### Frontend (.env)

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Discord Application ID (for SDK)
VITE_DISCORD_CLIENT_ID=your_discord_client_id
```

### Edge Functions (Supabase Secrets)

Set via Supabase CLI:

```bash
# Production Discord OAuth
supabase secrets set DISCORD_CLIENT_ID="your_production_client_id"
supabase secrets set DISCORD_CLIENT_SECRET="your_production_secret"

# Staging Discord OAuth (optional)
supabase secrets set DISCORD_CLIENT_ID_STAGING="your_staging_client_id"
supabase secrets set DISCORD_CLIENT_SECRET_STAGING="your_staging_secret"
```

**Access in Edge Functions**:
```typescript
const clientId = Deno.env.get('DISCORD_CLIENT_ID')
const clientSecret = Deno.env.get('DISCORD_CLIENT_SECRET')
```

---

## Development Workflow

### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd pomodoro-staging

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Link to Supabase project (if using Supabase CLI)
supabase link --project-ref your-project-ref

# 5. Run migrations (if needed)
supabase db push

# 6. Start development server
npm run dev
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Supabase CLI Commands

```bash
# Link to project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Create new migration
supabase migration new migration_name

# Deploy edge function
supabase functions deploy discord-token --no-verify-jwt

# Set edge function secrets
supabase secrets set KEY=value

# View logs
supabase functions logs discord-token

# Generate TypeScript types from database
supabase gen types typescript --local > src/types/database.ts
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, commit frequently
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/your-feature-name

# After review, merge to main
git checkout main
git merge feature/your-feature-name
git push origin main
```

### Testing Discord Activity Locally

1. **Enable HTTPS locally** (Discord requires HTTPS):
   ```bash
   # Use ngrok or similar
   ngrok http 5173
   ```

2. **Update Discord Activity URL**:
   - Go to Discord Developer Portal
   - Update Activity URL to your ngrok URL

3. **Test in Discord**:
   - Open Discord
   - Start your Activity from Activities menu
   - Should see app in iframe

---

## Deployment

### Frontend (Vercel)

1. **Connect Repository**:
   - Import project from GitHub in Vercel dashboard
   - Select `main` branch for production

2. **Configure Environment Variables**:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**:
   - Push to `main` branch triggers automatic deployment
   - Or manually deploy from Vercel dashboard

### Backend (Supabase)

#### Database Migrations

```bash
# Push local migrations to production
supabase db push --db-url "postgresql://..."

# Or run in Supabase Dashboard SQL Editor
# Copy migration SQL and execute
```

#### Edge Functions

```bash
# Deploy discord-token function
supabase functions deploy discord-token --no-verify-jwt --project-ref your-project-ref

# Verify deployment
curl https://your-project.supabase.co/functions/v1/discord-token
```

#### Secrets Management

```bash
# Set production secrets
supabase secrets set DISCORD_CLIENT_ID="..." --project-ref your-project-ref
supabase secrets set DISCORD_CLIENT_SECRET="..." --project-ref your-project-ref

# List secrets
supabase secrets list --project-ref your-project-ref
```

### Discord Application Setup

1. **Update OAuth2 Redirect URLs**:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

2. **Update Activity URL**:
   ```
   https://your-vercel-app.vercel.app
   ```

3. **Verify Activity Settings**:
   - HTTPS enabled
   - Proper scopes (`identify guilds`)
   - Age rating configured

### Post-Deployment Checklist

- [ ] Frontend deployed successfully
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Edge functions deployed
- [ ] Secrets configured
- [ ] Discord OAuth redirect URLs updated
- [ ] Discord Activity URL updated
- [ ] Test authentication flow in Discord
- [ ] Test pomodoro session completion
- [ ] Verify stats are updating
- [ ] Check error logs in Supabase

---

## Common Issues & Solutions

### Issue: "Not running in Discord context"
**Cause**: Missing `frame_id` or `instance_id` query parameters
**Solution**: Ensure app is launched from Discord Activities menu, not direct URL

### Issue: "Invalid JWT" error
**Cause**: Edge function deployed with JWT verification enabled
**Solution**: Redeploy with `--no-verify-jwt` flag

### Issue: "Authentication required" error
**Cause**: User not authenticated, RLS policies blocking access
**Solution**: This is expected behavior - user must authenticate first

### Issue: Duplicate accounts created
**Cause**: Backfill logic not working correctly
**Solution**: Check `backfill_auth_user_id` function is deployed and has Discord ID verification

### Issue: Stats not updating
**Cause**: `atomic_save_completed_pomodoro` RPC failing
**Solution**: Check function logs in Supabase, verify authorization checks passing

### Issue: OAuth redirect loses Discord context
**Cause**: OAuth redirect URL not preserving query parameters
**Solution**: Verify `signInWithDiscord()` constructs redirectTo with `window.location.search`

---

## Performance Considerations

### Frontend Optimizations
- **React.memo**: Wrap components that render frequently
- **useMemo/useCallback**: Memoize expensive calculations
- **Code Splitting**: Lazy load routes/components
- **Asset Optimization**: Compress images, use WebP format
- **Tree Shaking**: Vite automatically removes unused code

### Database Optimizations
- **Indexes**: All foreign keys and frequently queried columns indexed
- **Atomic Functions**: Reduce round trips by combining operations
- **Connection Pooling**: Supabase handles automatically
- **Query Optimization**: Use `select()` to fetch only needed columns

### Caching Strategy
- **Client-side**: React Context caches user data
- **Supabase Client**: Automatically caches auth session
- **CDN**: Vercel CDN caches static assets
- **Edge Functions**: Consider adding caching headers for read operations

---

## Future Enhancements

### Planned Features
- [ ] **Achievements System**: Unlock badges for milestones
- [ ] **Leaderboards**: Compare stats with friends
- [ ] **Study Groups**: Collaborative pomodoro sessions
- [ ] **Custom Themes**: User-selectable color schemes
- [ ] **Charts & Analytics**: Visualize study patterns
- [ ] **Break Timer**: Enforce breaks between pomodoros
- [ ] **Task Management**: Built-in todo list
- [ ] **Notifications**: Discord notifications for session completion
- [ ] **Mobile App**: Native iOS/Android apps
- [ ] **Widget**: Discord server widget showing online users

### Technical Improvements
- [ ] **Testing**: Add Jest + React Testing Library
- [ ] **E2E Tests**: Playwright for critical flows
- [ ] **Error Tracking**: Sentry integration
- [ ] **Analytics**: PostHog or similar
- [ ] **Performance Monitoring**: Vercel Analytics
- [ ] **Database Backups**: Automated backup strategy
- [ ] **Rate Limiting**: Protect edge functions
- [ ] **Webhook Events**: Discord webhooks for notifications

---

## Contributing

When contributing to this project:

1. **Read this document**: Understand architecture and security measures
2. **Follow conventions**: TypeScript, ESLint, Prettier
3. **Test thoroughly**: Especially auth and data flows
4. **Security first**: Never bypass RLS, always verify ownership
5. **Document changes**: Update this file for major changes
6. **Commit messages**: Use conventional commits (feat:, fix:, docs:, etc.)

### Security Checklist for Contributors

Before submitting changes:
- [ ] No direct database updates that bypass RLS
- [ ] All SECURITY DEFINER functions have authorization checks
- [ ] No sensitive data logged to console
- [ ] No API keys/secrets in code
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention via parameterized queries
- [ ] XSS prevention (React handles automatically, but verify)
- [ ] CSRF prevention (JWT in headers, not cookies)

---

## Support & Resources

### Documentation
- [Discord Activities Guide](https://discord.com/developers/docs/activities/overview)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Community
- Discord Activities Developer Server
- Supabase Discord Community
- GitHub Issues for this repository

### Contact
For questions or issues, create a GitHub issue or reach out via Discord.

---

## License

[Your License Here]

---

**Last Updated**: 2025-01-10
**Version**: 2.0.0 (Supabase Auth Migration)
