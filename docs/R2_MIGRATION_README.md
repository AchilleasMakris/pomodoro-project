# R2 Music File Migration Guide

## SECURITY WARNING

**CRITICAL**: The previous version of `migrate_r2_music.py` contained hardcoded API credentials that were exposed. These credentials are now compromised and MUST be revoked immediately.

## Step 1: Revoke Compromised Credentials (URGENT)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to: **R2** → **Manage R2 API Tokens**
3. Find the token with Access Key ID: `88c9f7600a3a594040baccb48b0d05c5`
4. **DELETE/REVOKE this token immediately**

## Step 2: Create New R2 API Token

1. In Cloudflare Dashboard → **R2** → **Manage R2 API Tokens**
2. Click **Create API Token**
3. Configure permissions:
   - **Object Read & Write** (for copying/deleting files)
   - **Bucket: `pub-7e068d8c526a459ea67ff46fe3762059`**
4. Save the generated credentials (you'll need them in Step 4)

## Step 3: Get Your Account ID

1. Go to Cloudflare Dashboard → **R2**
2. Look at the URL in your browser
3. The Account ID is the hexadecimal string in the URL

## Step 4: Set Environment Variables

```bash
export R2_ACCOUNT_ID="your_account_id_here"
export R2_ACCESS_KEY_ID="your_new_access_key_here"
export R2_SECRET_ACCESS_KEY="your_new_secret_key_here"
```

**IMPORTANT**: Never commit these credentials to Git. The migration script is already in `.gitignore`.

## Step 5: Install Dependencies

```bash
pip install boto3
```

## Step 6: Run Migration Script

```bash
python migrate_r2_music.py
```

The script will:
- Scan `/music/` folder for .mp3 files (not already in subfolders)
- Show you how many files will be migrated
- Ask for confirmation before proceeding
- Copy each file to `/music/lofi/`
- Delete the original from `/music/`
- Show progress with percentage completion
- Display a summary of successful/failed migrations

## Step 7: Verify Migration

Test a URL to confirm files are accessible:
```
https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev/music/lofi/(01) beyond the oceans (feat. Hoogway).mp3
```

## Step 8: Upload Synthwave Tracks

1. In R2 Dashboard, create folder: `/music/synthwave/`
2. Upload your synthwave tracks to this folder
3. Provide the track list with metadata (title, artist) to continue with code updates

## What This Migration Does

- **Before**: All 799 music files in `/music/`
- **After**: All 799 files moved to `/music/lofi/`
- **New folder**: `/music/synthwave/` (for you to upload synthwave tracks)

## Next Steps After Migration

Once migration is complete and synthwave tracks are uploaded, the codebase will be updated to:
- Add genre field to all tracks in MUSIC_LIBRARY
- Update file paths from `/r2-audio/` to `/r2-audio/lofi/` and `/r2-audio/synthwave/`
- Add genre selector UI (badge + quick selector + Settings menu)
- Implement genre filtering in music player
- Save user's genre preference to localStorage

## Questions?

If you encounter any errors during migration, check:
1. Environment variables are set correctly
2. API token has proper permissions
3. Bucket name is correct
4. Network connection is stable
