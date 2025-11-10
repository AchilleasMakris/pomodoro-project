# Implementing Secure Authentication with Supabase Auth

This guide walks you through implementing proper security with Supabase Auth + Discord OAuth.

## 📋 Prerequisites

- Discord Application ID: `1437441890713604096`
- Discord Client Secret
- Supabase Project: `btjhclvebbtjxmdnprwz`

---

## 🔧 Step 1: Configure Discord OAuth Redirect

### Add Supabase Callback URL to Discord

1. Go to: https://discord.com/developers/applications/1437441890713604096/oauth2
2. Find **Redirects** section
3. Click **Add Redirect**
4. Add this URL:
   ```
   https://btjhclvebbtjxmdnprwz.supabase.co/auth/v1/callback
   ```
5. Also add your Activity URL if not already there:
   ```
   https://1437441890713604096.discordsays.com
   ```
6. Click **Save Changes**

---

## 🔐 Step 2: Enable Discord Auth in Supabase

### Configure Discord Provider

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/auth/providers
2. Scroll down and find **Discord**
3. Toggle it **ON**
4. Enter your credentials:
   - **Discord Client ID**: `1437441890713604096`
   - **Discord Client Secret**: (paste your secret from Discord)
5. **⚠️ CRITICAL: Check "Skip nonce check"** - Required for Discord Activities
6. **⚠️ CRITICAL: Check "Allow users without email"** - Discord doesn't always provide email
7. **Scopes**: `identify guilds` (email is optional)
8. Click **Save**

### Configure Auth Settings

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/auth/configuration
2. Find **Email Auth** section:
   - **Enable email confirmations**: ❌ **DISABLE** (Discord handles verification)
   - **Confirm email**: ❌ **DISABLE**
3. Click **Save**

### Configure URL Settings

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/auth/url-configuration
2. **Site URL**: Set to `https://1437441890713604096.discordsays.com`
3. **Redirect URLs**: Add:
   - `https://1437441890713604096.discordsays.com`
   - `https://1437441890713604096.discordsays.com/**`
4. Click **Save**

---

## 🗄️ Step 3: Run Database Migration

### Apply Schema Updates

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/editor
2. Click **SQL Editor** in sidebar
3. Click **New Query**
4. Copy and paste the contents of:
   ```
   supabase/migrations/20251110170000_add_supabase_auth_integration.sql
   ```
5. Click **Run** (Ctrl+Enter)
6. Should see "Success" message

**Option B: Via CLI**

```bash
supabase db push
```

### Verify Migration

1. Go to **Table Editor** → `users` table
2. Should see new column: `auth_user_id`
3. Go to **Database** → **Policies**
4. Should see new policies with `auth.uid()`

---

## 💻 Step 4: Update Frontend Code

### Files to Update

The following files have been created with the new secure implementation:

1. ✅ **`src/lib/supabaseAuth.ts`** - New auth module (replaces discordAuth.ts)
2. ✅ **`src/lib/userSyncAuth.ts`** - Updated user sync with RLS
3. **`src/contexts/AuthContext.tsx`** - Needs update to use new auth
4. **`src/App.tsx`** - Needs update to use new auth context

### Update AuthContext.tsx

Replace the authentication logic to use Supabase Auth:

```typescript
import { authenticateWithSupabase, onAuthStateChange, signOut } from '../lib/supabaseAuth'
import type { AppUser } from '../lib/supabaseAuth'
import type { Session } from '@supabase/supabase-js'

// In your auth effect:
useEffect(() => {
  const initAuth = async () => {
    try {
      setLoading(true)
      const result = await authenticateWithSupabase()
      setAuthenticated(true)
      setAppUser(result.appUser)
      setError(null)
    } catch (error) {
      console.error('[Auth] Failed:', error)
      setError(error.message)
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  initAuth()

  // Listen for auth state changes
  const { data: { subscription } } = onAuthStateChange(async (session) => {
    if (session) {
      // User signed in
      setAuthenticated(true)
      // Fetch app user...
    } else {
      // User signed out
      setAuthenticated(false)
      setAppUser(null)
    }
  })

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

---

## 🧪 Step 5: Test the New Authentication

### Testing Checklist

1. **Clear browser data**:
   - Open DevTools → Application → Storage
   - Clear all localStorage, sessionStorage, and cookies
   - Or use incognito mode

2. **Launch Activity**:
   - Open your Discord server
   - Start the Activity
   - Should redirect to Discord OAuth page

3. **Verify OAuth**:
   - Grant permissions
   - Should redirect back to Activity
   - Should see loading then your app

4. **Check Database**:
   - Go to Supabase Table Editor → `users`
   - Should see your user with `auth_user_id` filled
   - Go to **Authentication** → **Users**
   - Should see your Discord account linked

5. **Test RLS**:
   - In Table Editor, try to edit another user's row
   - Should be denied
   - Try to read your own data - should work

---

## 🎯 Step 6: Remove Old Code (After Testing)

Once the new auth is working:

### Files to Remove/Replace:
- ❌ `supabase/functions/discord-token/` (no longer needed)
- ❌ `src/lib/discordAuth.ts` (replaced by supabaseAuth.ts)
- ❌ `src/lib/userSync.ts` (replaced by userSyncAuth.ts)

### Supabase Secrets to Remove:
The edge function secrets are no longer needed since Supabase handles OAuth:
- ~~`DISCORD_CLIENT_ID`~~
- ~~`DISCORD_CLIENT_SECRET`~~

(They're now in Auth Provider settings)

---

## 🔒 Security Improvements

After this migration:

✅ **Proper JWT Tokens**: Each user gets a unique, secure session token
✅ **Full User Isolation**: RLS policies enforce `auth.uid()` checks
✅ **No Anon Key Exposure**: Anon key still used but with proper RLS
✅ **Automatic Token Refresh**: Supabase handles token rotation
✅ **Built-in Session Management**: No manual token handling
✅ **Audit Trail**: All auth events logged in Supabase

---

## 🔄 Rollback Plan

If something goes wrong:

### Keep Old Code Branch

```bash
git checkout -b backup-old-auth
git add .
git commit -m "Backup before Supabase Auth migration"
git checkout main
```

### Restore Old Implementation

```bash
git checkout backup-old-auth -- src/lib/discordAuth.ts
git checkout backup-old-auth -- src/lib/userSync.ts
git checkout backup-old-auth -- src/contexts/AuthContext.tsx
```

---

## 📞 Need Help?

Common issues:

**"Redirect URI mismatch"**
- Check Discord OAuth settings have correct callback URL
- Verify Supabase Auth URL Configuration

**"User not found after OAuth"**
- Check database trigger is working
- Check RLS policies allow INSERT for authenticated users
- Look at Supabase Auth → Users to see if account was created

**"Invalid credentials"**
- Verify Discord Client ID and Secret in Supabase Auth Providers
- Check they match your Discord application

---

## ✅ Success Criteria

You'll know it's working when:

1. ✅ User can click "Login with Discord"
2. ✅ Redirects to Discord OAuth page
3. ✅ After approving, redirects back to Activity
4. ✅ User profile appears with stats
5. ✅ Data saves to database
6. ✅ User can only see/modify their own data
7. ✅ Session persists across page refreshes

---

**Ready to implement? Let me know if you want me to update the Auth Context and App.tsx files!**
