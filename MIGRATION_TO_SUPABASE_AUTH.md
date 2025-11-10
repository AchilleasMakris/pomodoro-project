# Migration to Supabase Auth + Discord OAuth

This guide will help you migrate from anon key authentication to proper Supabase Auth with Discord OAuth provider.

## Benefits

- ✅ **Proper JWT tokens** - Each user gets a unique, secure session token
- ✅ **Full user isolation** - RLS policies work correctly with auth.uid()
- ✅ **Built-in security** - Supabase handles token refresh, revocation, etc.
- ✅ **No custom edge function** - Supabase manages the OAuth flow
- ✅ **Better audit trail** - See all auth events in Supabase dashboard

---

## Step 1: Configure Discord OAuth in Supabase

### 1.1 Get Discord OAuth Credentials

You already have these:
- **Client ID**: `1437441890713604096`
- **Client Secret**: (from Discord Developer Portal)

### 1.2 Add Redirect URI to Discord

1. Go to: https://discord.com/developers/applications/1437441890713604096/oauth2
2. Add this redirect URI:
   ```
   https://btjhclvebbtjxmdnprwz.supabase.co/auth/v1/callback
   ```
3. Click **Save Changes**

### 1.3 Enable Discord Auth in Supabase

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/auth/providers
2. Find **Discord** in the list
3. Click **Enable**
4. Enter your Discord credentials:
   - **Client ID**: `1437441890713604096`
   - **Client Secret**: (your secret)
5. Click **Save**

---

## Step 2: Update Database Schema

We need to link Supabase Auth users with Discord data.

### 2.1 Run Migration

Apply the new migration that:
- Adds `auth_user_id` column to users table
- Links to Supabase Auth's user table
- Updates RLS policies to use auth.uid()

```bash
supabase db push
```

Or run the SQL in Supabase Dashboard → SQL Editor.

---

## Step 3: Update Frontend Code

The authentication flow changes significantly with Supabase Auth.

### Key Changes:
1. ❌ Remove Discord SDK's authorize/authenticate flow
2. ✅ Use Supabase's `signInWithOAuth()` method
3. ✅ Store Discord data in user metadata
4. ✅ Use Supabase session for API calls

---

## Step 4: Test Authentication

1. Clear browser storage (localStorage/cookies)
2. Open Discord Activity
3. Click login
4. Authorize with Discord
5. Should redirect back and create user in database

---

## Step 5: Verify Security

Check that RLS policies are working:

1. Go to Supabase Dashboard → Table Editor → users
2. Try to manually edit another user's row
3. Should be denied by RLS

---

## Rollback Plan

If something goes wrong:

1. Revert code changes
2. Run: `git checkout HEAD~1 -- src/lib/`
3. Keep the database migrations (they're backward compatible)

---

## Implementation Steps

I'll now create the necessary files:
1. Database migration for auth integration
2. Updated authentication module
3. Updated Supabase client configuration
4. Updated auth context

Ready to proceed?
