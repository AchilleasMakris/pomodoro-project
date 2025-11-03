# Discord Activity Setup - Quick Guide

## Step 1: Create Discord Application (5 minutes)

1. **Go to:** https://discord.com/developers/applications
2. **Click:** "New Application"
3. **Name it:** "Pomodoro Focus Timer"
4. **Click:** "Create"

---

## Step 2: Configure as Activity

1. In your new application, go to **"Activities"** tab (left sidebar)
2. Click **"Enable Activity"**
3. Under **"URL Mappings"**, add:
   - **Root Mapping:**
     - Prefix: `/`
     - Target: `https://pomodoro-project-psi.vercel.app`

4. **Save Changes**

---

## Step 3: Get Your Application ID

1. Go to **"General Information"** tab
2. Copy your **"Application ID"** (you'll need this)
3. Example: `1234567890123456789`

---

## Step 4: Add Discord SDK to Your Project

We need to add the Discord Embedded App SDK to make it work in Discord.

### Install the SDK:

```bash
npm install @discord/embedded-app-sdk
```

### Create Discord integration file:

Create a new file: `sources/discordSDK.js`

```javascript
import { DiscordSDK } from '@discord/embedded-app-sdk';

let discordSdk;
let auth;

export async function setupDiscordSdk() {
  // Check if running in Discord
  const isEmbedded = window.location.ancestorOrigins?.length > 0;
  
  if (!isEmbedded) {
    console.log('Not running in Discord - using web mode');
    return null;
  }

  // Initialize Discord SDK
  discordSdk = new DiscordSDK(YOUR_CLIENT_ID); // Replace with your Application ID
  
  await discordSdk.ready();
  
  // Authorize with Discord
  const { code } = await discordSdk.commands.authorize({
    client_id: YOUR_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify', 'guilds']
  });

  // Exchange code for access token (you'll need a backend for this in production)
  // For now, we'll skip this and just use the SDK
  
  return discordSdk;
}

export function getDiscordSdk() {
  return discordSdk;
}
```

---

## Step 5: Update Your HTML

Add Discord SDK script to `index.html`:

Add this in the `<head>` section:

```html
<script type="module" src="sources/discordSDK.js"></script>
```

Update your main script to initialize Discord:

```javascript
// At the start of your app
import { setupDiscordSdk } from './sources/discordSDK.js';

async function init() {
  const sdk = await setupDiscordSdk();
  if (sdk) {
    console.log('Running as Discord Activity!');
    // Optional: Show Discord-specific UI
  }
  
  // Start your normal app
  initializePomodoro();
}

init();
```

---

## Step 6: Deploy to Vercel (Already Done! ✅)

Your app is already on Vercel at:
```
https://pomodoro-project-psi.vercel.app
```

---

## Step 7: Test in Discord

### Option A: Test in Development

1. Go to Discord Developer Portal → Your App → Activities
2. Click **"URL Mappings"** 
3. Enable **"Development Build"**
4. Use the test URL: `https://discord.com/activities/YOUR_APP_ID`

### Option B: Test in Voice Channel

1. Join any voice channel in Discord
2. Click the 🎮 **"Activities"** button (rocket icon)
3. Your app should appear if approved (requires Discord verification)

---

## Step 8: Enable in Discord (Important!)

For your Activity to show up in the Activities list:

1. Go to **Activities** tab in Developer Portal
2. Scroll to **"Availability"**
3. Toggle **"Make this Activity publicly available"**
4. Submit for review (if you want it public)

---

## Simplified Version (No SDK - Just Embed)

If you want to skip the SDK for now:

1. **Create Discord App** ✅
2. **Add URL Mapping** to your Vercel URL ✅  
3. **Test URL**: Share this in Discord:
   ```
   https://discord.com/activities/YOUR_APP_ID
   ```

Users can open it, and it will load your Vercel site in an iframe!

---

## Quick Checklist:

- [ ] Discord Application created
- [ ] Activities enabled
- [ ] URL mapping added (Vercel URL)
- [ ] Application ID copied
- [ ] Discord SDK installed (optional)
- [ ] Tested in development mode

---

## Current Status:

✅ Your Pomodoro app is ready at: `https://pomodoro-project-psi.vercel.app`  
✅ Music hosted on R2  
✅ All features working  

**Next:** Just add the Discord SDK and configure the Activity!

---

## Need Help?

Let me know which step you're on, and I'll guide you through it! 🎯
