# Discord Activity Integration Guide

This guide explains how to configure and deploy your Pomodoro Timer as a Discord Activity.

## Table of Contents

1. [What is a Discord Activity?](#what-is-a-discord-activity)
2. [Prerequisites](#prerequisites)
3. [Project Preparation](#project-preparation)
4. [Discord Developer Setup](#discord-developer-setup)
5. [Deployment](#deployment)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## What is a Discord Activity?

Discord Activities are interactive web applications that run embedded within Discord. Users can launch them from voice channels or DMs to enjoy shared experiences.

### Key Features of This Pomodoro Timer for Discord:

- **Shared focus sessions** in voice channels
- **Local music playback** (no Spotify Premium required!)
- **Fully customizable** timer durations
- **No external API dependencies**
- **Works in Discord's embedded browser**

---

## Prerequisites

Before you begin:

- [ ] Discord Developer Account
- [ ] Node.js installed (v16+ recommended)
- [ ] A hosting service (Vercel, Netlify, CloudFlare Pages, or similar)
- [ ] HTTPS-enabled domain (required for Discord Activities)
- [ ] Basic knowledge of Git and command line

---

## Project Preparation

### 1. Ensure All Assets Are Relative Paths

✅ **Already configured!** This project uses relative paths for all assets.

Verify these are relative (no absolute URLs):
- Image paths: `/img/...`
- Music paths: `/music/...`
- Script paths: `/sources/...`
- Style paths: `/styles/...`

### 2. Add Music Files (Recommended)

While not required, adding background music enhances the experience:

```bash
# See MUSIC_CREDITS.md for sources
mkdir music
# Add MP3 files to music directory
# Update sources/musicPlayer.js with track info
```

### 3. Test Locally

```bash
# Using Python (simplest method)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Or using PHP
php -S localhost:8000
```

Visit `http://localhost:8000` and verify:
- Settings modal opens/closes
- Timer starts/stops/resets
- Background switching works
- Music player appears (with tracks or "No music" message)
- All features work on mobile screen sizes

---

## Discord Developer Setup

### Step 1: Create a Discord Application

1. Go to https://discord.com/developers/applications
2. Click **"New Application"**
3. Name it: `Pomodoro Timer` (or your preferred name)
4. Accept the Developer ToS

### Step 2: Configure Application

#### General Information Tab:

- **Name:** Pomodoro Timer
- **Description:** Stay focused with customizable Pomodoro sessions and chill music
- **App Icon:** Upload a 512x512 icon (create one using your pomodoro.svg)
- **Tags:** Add relevant tags (productivity, timer, focus)

#### OAuth2 Tab:

1. Go to **OAuth2 > General**
2. Add your **Redirects URI**:
   ```
   https://your-domain.com/oauth-callback
   ```
   (Replace with your actual deployment URL)

#### Activities Tab:

1. Go to **Activities**
2. Click **"Add Activity"**
3. Configure:
   - **Activity Name:** Pomodoro Timer
   - **Activity URL:** `https://your-domain.com`
   - **Shelf Image:** Upload a 1920x1080 showcase image
   - **Default Orientation:** Landscape (recommended)
   - **Min Size:** 800 x 600
   - **Max Size:** 1920 x 1080

4. **Activity Platforms:**
   - ✅ Desktop
   - ✅ Mobile (if your UI is responsive)

5. **Activity Preview:**
   - Upload 3-5 screenshots showing:
     - Main timer interface
     - Settings panel
     - Music player (if applicable)

### Step 3: Enable Activity for Testing

1. In the **Activities** tab, find **"URL Mappings"**
2. Add your development URL if testing locally:
   - **Root:** `/`
   - **Target:** `https://your-ngrok-url.com` (or your test server)

3. Copy your **Application ID** - you'll need this

### Step 4: Add Test Users

1. Go to **OAuth2 > URL Generator**
2. Select scopes:
   - `applications.commands`
   - `activities.write`
3. Generate URL and share with test users

---

## Deployment

### Option 1: Vercel (Recommended)

✅ **Best for static sites, free tier available**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd pomodoro-project
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: pomodoro-timer
# - Directory: ./
# - Build command: [leave empty]
# - Output directory: [leave empty]

# Vercel will give you a URL: https://pomodoro-timer-xyz.vercel.app
```

**Configure Vercel:**
1. Go to your Vercel dashboard
2. Settings > Domains > Add your custom domain (optional)
3. HTTPS is automatic ✓

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd pomodoro-project
netlify deploy --prod

# Drag & drop the entire folder
# Or use: netlify deploy --dir=. --prod
```

### Option 3: GitHub Pages

```bash
# Create a new repo on GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/pomodoro-timer.git
git push -u origin main

# Enable GitHub Pages
# Repo Settings > Pages > Source: main branch
```

**Note:** GitHub Pages may require a `404.html` for proper routing.

### Option 4: Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Connect your GitHub repo
3. Build settings:
   - Build command: [leave empty]
   - Build output directory: `/`
4. Deploy

---

## Testing

### Local Testing with ngrok

For testing before public deployment:

```bash
# Install ngrok: https://ngrok.com/download
# Start local server
python3 -m http.server 8000

# In another terminal, expose it
ngrok http 8000

# Use the HTTPS URL in Discord Developer Portal
```

### Testing in Discord

1. Open Discord Desktop App
2. Join a voice channel
3. Click the **Activity** button (rocket icon)
4. If your activity doesn't appear:
   - Go to User Settings > Activity Status
   - Enable "Display current activity"
5. Launch your Pomodoro Timer activity

### Test Checklist

- [ ] Activity loads in Discord's embedded view
- [ ] Settings modal opens and works
- [ ] Timer counts down correctly
- [ ] Audio plays (if music tracks added)
- [ ] Responsive on different Discord window sizes
- [ ] No console errors
- [ ] HTTPS certificate valid
- [ ] Background images load
- [ ] Local Storage persists settings

---

## Troubleshooting

### Activity Won't Load

**Problem:** Black screen or "Failed to load" error

**Solutions:**
1. Verify HTTPS is enabled (required by Discord)
2. Check Discord Developer Portal URL matches deployment
3. Verify no mixed content (HTTP resources on HTTPS page)
4. Check browser console for errors: Right-click > Inspect > Console

### Audio Not Playing

**Problem:** Music player shows error or doesn't play

**Solutions:**
1. Verify music files are in `/music/` directory
2. Check `MUSIC_LIBRARY` in `musicPlayer.js` is populated
3. Ensure MP3 files are properly encoded
4. Test audio in a regular browser first
5. Check Discord permissions allow audio

### Settings Not Saving

**Problem:** Settings reset on page reload

**Solutions:**
1. Verify localStorage is enabled in Discord's embedded browser
2. Check browser console for localStorage errors
3. Test in Discord Desktop (more reliable than web)

### UI Issues / Layout Problems

**Problem:** UI looks broken or overlaps

**Solutions:**
1. Test in responsive mode (800x600 minimum)
2. Verify media queries in CSS work
3. Check z-index conflicts
4. Test with Discord's light and dark themes

### CORS Errors

**Problem:** Resources failing to load

**Solutions:**
1. Ensure all resources are served from the same domain
2. Check server CORS headers (most static hosts handle this)
3. Verify no external CDN restrictions

### Slow Loading

**Problem:** Activity takes too long to load

**Solutions:**
1. Optimize images (compress with TinyPNG or similar)
2. Minify CSS/JS files
3. Reduce music file sizes (128kbps is sufficient)
4. Use CDN if available

---

## Discord Activity Best Practices

### Performance

- Keep total asset size under 5MB
- Optimize images (WebP format recommended)
- Lazy load non-critical resources
- Use efficient CSS animations

### User Experience

- Provide clear onboarding (consider a "?" help button)
- Support Discord's light and dark themes (if desired)
- Test on both desktop and mobile
- Handle offline/slow connection gracefully

### Audio Considerations

- Start audio muted or paused (avoid autoplaying music)
- Provide clear volume controls
- Use appropriate bitrates (128-192kbps for web)
- Consider Discord's voice chat (users may be talking)

### Privacy & Data

- Store data locally (localStorage) only
- Don't require user accounts
- Don't collect personal information
- Be transparent about data usage

---

## Going Live

Once testing is complete:

### 1. Submit for Review (Optional)

If you want your activity in Discord's Activity Shelf:

1. Go to Discord Developer Portal
2. Activities > Submit for Review
3. Fill out required information:
   - Detailed description
   - Screenshots/video
   - Privacy policy (if collecting data)
   - Terms of service

4. Wait for Discord approval (can take weeks)

### 2. Share with Friends

Don't want to submit? You can still share:

1. Generate invite link from OAuth2 section
2. Send to friends/server members
3. They can use it without public approval

### 3. Monitor Usage

- Check Vercel/Netlify analytics for errors
- Monitor Discord feedback
- Update as needed

---

## Additional Resources

### Discord Documentation

- Activities Overview: https://discord.com/developers/docs/activities/overview
- Building Activities: https://discord.com/developers/docs/activities/building-an-activity
- Activities SDK: https://github.com/discord/embedded-app-sdk

### Hosting Providers

- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Cloudflare Pages: https://pages.cloudflare.com
- GitHub Pages: https://pages.github.com

### Tools

- ngrok (local testing): https://ngrok.com
- Image optimization: https://tinypng.com
- Icon generator: https://favicon.io

---

## Support

Having issues? Check:

1. This project's GitHub Issues
2. Discord Developer Portal documentation
3. Discord Developers server: https://discord.gg/discord-developers

---

## Changelog

### Current Version (v2.0)

- ✅ Removed Spotify dependency
- ✅ Added local music player
- ✅ Fully customizable settings
- ✅ Discord Activity ready
- ✅ No external API dependencies
- ✅ Responsive design optimized

---

**Good luck with your Discord Activity! Happy focusing! 🍅⏱️**
