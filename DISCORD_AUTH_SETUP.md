# Discord Authentication Setup Guide

This guide will help you complete the Discord authentication setup for your Pomodoro Discord Activity.

## 📋 Overview

The authentication system uses:
- **Discord Embedded SDK** for OAuth authorization
- **Supabase Edge Function** for secure token exchange
- **Supabase Database** for user data persistence
- **Auto-login** for returning users with `prompt: "none"`

---

## ✅ What's Already Done

✅ Discord SDK installed (`@discord/embedded-app-sdk`)
✅ Authentication modules created (`discordAuth.ts`, `userSync.ts`)
✅ Auth context created (`AuthContext.tsx`)
✅ App.tsx updated with auth flow
✅ Supabase edge function created (`discord-token`)
✅ Database migration created (`users` and `completed_pomodoros` tables)
✅ Environment variables template created

---

## 🚀 Setup Steps

### Step 1: Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it (e.g., "Pomodoro Study Timer")
4. Go to **OAuth2** tab
5. Copy your **Client ID** and **Client Secret**

### Step 2: Configure Discord Activity

1. In your Discord Application, go to **Activities** tab
2. Enable Activity
3. Add your development URL (e.g., your tunnel URL)
4. Configure OAuth2 redirect URIs:
   - Add your development URL
   - Add production URL (when deployed)

### Step 3: Add Environment Variables

Update `.env` with your Discord credentials:

```bash
# Discord Application Credentials
VITE_DISCORD_CLIENT_ID=your_actual_client_id_here
```

**⚠️ Important:** Keep your Client Secret secure! Never commit it to version control.

### Step 4: Set Up Supabase Edge Function

1. **Install Supabase CLI** (if not already installed):
   ```bash
   brew install supabase/tap/supabase
   # or
   npm install -g supabase
   ```

2. **Login to Supabase:**
   ```bash
   supabase login
   ```

3. **Link to your project:**
   ```bash
   supabase link --project-ref btjhclvebbtjxmdnprwz
   ```

4. **Push config to disable JWT verification:**
   ```bash
   supabase functions deploy discord-token --no-verify-jwt
   ```

   **Note:** The `--no-verify-jwt` flag allows the function to be called without authentication headers, which is necessary for Discord Activities. The config.toml already has `verify_jwt = false` configured for this function.

5. **Set Edge Function secrets:**
   ```bash
   # Production credentials
   supabase secrets set DISCORD_CLIENT_ID=your_client_id_here
   supabase secrets set DISCORD_CLIENT_SECRET=your_client_secret_here

   # Optional: Staging credentials (if you have separate staging Discord app)
   supabase secrets set DISCORD_CLIENT_ID_STAGING=your_staging_client_id_here
   supabase secrets set DISCORD_CLIENT_SECRET_STAGING=your_staging_client_secret_here
   ```

6. **Deploy the edge function with --no-verify-jwt flag:**
   ```bash
   supabase functions deploy discord-token --no-verify-jwt
   ```

### Step 5: Run Database Migrations

Apply the database schema to create `users` and `completed_pomodoros` tables:

```bash
supabase db push
```

**Or manually run the SQL:**

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `supabase/migrations/20250110_create_users_table.sql`
3. Run the SQL

### Step 6: Verify Setup

Check that everything is configured:

```bash
# Check if edge function is deployed
supabase functions list

# Check database tables
supabase db diff
```

---

## 🧪 Testing the Authentication Flow

### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser or Discord Activity iframe

3. Expected flow:
   - You should see "Connecting to Discord..." loading screen
   - Discord SDK will request authorization (first time only)
   - After approval, you'll be auto-logged in on subsequent visits
   - Your Discord username and avatar should appear in the Level Display

### Debugging

Enable console logs to track authentication:

1. Open browser DevTools (F12)
2. Look for logs prefixed with:
   - `[Discord Auth]` - Authentication flow
   - `[User Sync]` - Database synchronization
   - `[Auth]` - Auth context state

### Common Issues

#### Issue: "Failed to exchange authorization code"
**Solution:** Check that:
- Edge function is deployed: `supabase functions list`
- Secrets are set: `supabase secrets list`
- Client ID and Secret are correct

#### Issue: "Authentication Failed"
**Solution:**
- Verify `.env` has correct `VITE_DISCORD_CLIENT_ID`
- Check Discord Application OAuth2 settings
- Ensure redirect URI is configured

#### Issue: Database errors
**Solution:**
- Run migrations: `supabase db push`
- Check table exists: `supabase db diff`
- Verify RLS policies in Supabase Dashboard

---

## 📊 Database Schema

### users table
```sql
- id (UUID, primary key)
- discord_id (TEXT, unique) - Discord user ID
- username (TEXT) - Discord username
- avatar (TEXT) - Discord avatar hash
- level, xp, prestige_level - Gamification data
- consecutive_login_days, total_unique_days - Streak tracking
- total_pomodoros, total_study_minutes - Statistics
- Settings (sound_enabled, volume, etc.)
- Timestamps (last_login, created_at, updated_at)
```

### completed_pomodoros table
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key → users.id)
- discord_id (TEXT)
- duration_minutes (INTEGER)
- xp_earned (INTEGER)
- task_name (TEXT, nullable)
- notes (TEXT, nullable)
- completed_at (TIMESTAMP)
```

---

## 🔐 Security Notes

1. **Never commit secrets:**
   - `.env` is in `.gitignore`
   - Client Secret is only in Supabase secrets

2. **Row Level Security (RLS):**
   - Enabled on both tables
   - Users can only access their own data

3. **Edge Function Security:**
   - CORS configured for your domain only
   - OAuth code validated before token exchange

---

## 🎯 Next Steps

After authentication is working, you can:

1. **Migrate localStorage data** to database:
   - Update `useSettingsStore` to read/write from Supabase
   - Sync level, XP, streaks to database

2. **Implement session history:**
   - Log completed pomodoros to `completed_pomodoros` table
   - Build analytics dashboard

3. **Add group features:**
   - Use Discord SDK to detect voice channel participants
   - Create group pomodoro sessions

4. **Build leaderboards:**
   - Query top users by XP, total pomodoros, streaks
   - Filter by server/guild

---

## 🐛 Troubleshooting Commands

```bash
# Check Supabase connection
supabase status

# View edge function logs
supabase functions logs discord-token

# Test edge function locally
supabase functions serve discord-token

# Reset database (⚠️ destroys all data)
supabase db reset

# Check environment variables
cat .env

# Restart dev server
npm run dev
```

---

## 📚 Additional Resources

- [Discord Embedded SDK Docs](https://discord.com/developers/docs/developer-tools/embedded-app-sdk)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Discord Activities Guide](https://discord.com/developers/docs/activities/building-an-activity)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)

---

## ✨ Features Enabled

Once authentication is working, you unlock:

- ✅ **Auto-login** - Returning users authenticate silently
- ✅ **Discord profile** - Username and avatar from Discord
- ✅ **Cloud sync** - Data accessible from any device
- ✅ **Multi-user** - Each Discord user gets their own account
- ✅ **Session history** - Track all completed pomodoros
- ✅ **Analytics** - Visualize productivity over time
- ✅ **Social features** - Friend lists, leaderboards, group sessions
- ✅ **Voice integration** - Detect who's in voice channel

---

**Need help?** Check the troubleshooting section or review the console logs for specific error messages.
