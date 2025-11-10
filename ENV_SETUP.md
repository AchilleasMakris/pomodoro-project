# Environment Variables Setup Guide

## 📍 Two Places to Set Variables

### 1️⃣ **Frontend Environment Variables** (Local `.env` file)
### 2️⃣ **Supabase Edge Function Secrets** (Supabase Dashboard or CLI)

---

## 1️⃣ Frontend Environment Variables

### Where: Create a `.env` file in the project root

**File location:** `/home/user/pomodoro-staging/.env`

**Copy this template:**
```bash
# Discord Application Credentials (Frontend)
VITE_DISCORD_CLIENT_ID=your_discord_client_id_here

# Supabase Project Credentials (Frontend)
VITE_SUPABASE_URL=https://btjhclvebbtjxmdnprwz.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### How to Get These Values:

#### `VITE_DISCORD_CLIENT_ID`
1. Go to: https://discord.com/developers/applications
2. Select your Pomodoro application
3. Copy the **Application ID** (this is your Client ID)

#### `VITE_SUPABASE_URL`
Already filled in: `https://btjhclvebbtjxmdnprwz.supabase.co`

#### `VITE_SUPABASE_ANON_KEY`
1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/settings/api
2. Copy the **anon public** key (starts with `eyJ...`)

---

## 2️⃣ Supabase Edge Function Secrets

### Where: Supabase Dashboard or CLI

These secrets are **server-side only** and used by your edge function.

### Required Secrets:

| Secret Name | Where to Get It |
|-------------|----------------|
| `DISCORD_CLIENT_ID` | Discord Developer Portal → Your App → OAuth2 → Client ID |
| `DISCORD_CLIENT_SECRET` | Discord Developer Portal → Your App → OAuth2 → Client Secret |
| `DISCORD_CLIENT_ID_STAGING` | (Optional) Separate Discord app for staging |
| `DISCORD_CLIENT_SECRET_STAGING` | (Optional) Separate Discord app for staging |

### Option A: Set via Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/functions
2. Click on `discord-token` function
3. Click **Secrets** tab
4. Add each secret:
   - Click **Add Secret**
   - Enter name (e.g., `DISCORD_CLIENT_ID`)
   - Enter value
   - Click **Save**

### Option B: Set via Supabase CLI

```bash
# If you have Supabase CLI installed:
supabase secrets set DISCORD_CLIENT_ID=your_client_id_here
supabase secrets set DISCORD_CLIENT_SECRET=your_client_secret_here

# Optional: Staging credentials
supabase secrets set DISCORD_CLIENT_ID_STAGING=your_staging_client_id
supabase secrets set DISCORD_CLIENT_SECRET_STAGING=your_staging_client_secret
```

---

## ⚠️ IMPORTANT: Deploy After Setting Secrets

After setting the Supabase secrets, you MUST redeploy the edge function **with the --no-verify-jwt flag**:

### Option A: Via Supabase CLI
```bash
supabase functions deploy discord-token --no-verify-jwt
```

**Why --no-verify-jwt?** This flag disables JWT authentication for the function, allowing Discord Activities to call it without authentication headers. This is safe for OAuth code exchange because Discord validates the code server-side.

### Option B: Via Supabase Dashboard (Recommended if you don't have CLI)
1. Go to: https://supabase.com/dashboard/project/btjhclvebbtjxmdnprwz/functions
2. Click `discord-token` function
3. Go to **Settings** tab
4. Find **JWT Verification** setting
5. **Disable** JWT verification (uncheck the box)
6. Save settings
7. Go to **Code** tab and redeploy the function

---

## 🚀 Quick Checklist

- [ ] Create `.env` file in project root with 3 variables
- [ ] Get Discord Client ID from Discord Developer Portal
- [ ] Get Supabase anon key from Supabase Dashboard
- [ ] Set 2 Supabase secrets (DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
- [ ] Deploy the edge function
- [ ] Deploy your frontend (npm run build + upload)
- [ ] Test authentication in Discord Activity

---

## 📝 Summary

**Frontend (.env file):**
- `VITE_DISCORD_CLIENT_ID` - Discord app ID (public)
- `VITE_SUPABASE_URL` - Supabase project URL (public)
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key (public)

**Backend (Supabase secrets):**
- `DISCORD_CLIENT_ID` - Discord app ID (server-side)
- `DISCORD_CLIENT_SECRET` - Discord secret (KEEP SECRET!)

---

**Need help?** Check the detailed setup guide in `DISCORD_AUTH_SETUP.md`
