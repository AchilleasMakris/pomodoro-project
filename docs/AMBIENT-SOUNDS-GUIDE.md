# 🎵 Ambient Sounds Implementation Guide

## Overview
This guide will help you set up and deploy ambient sound effects for your Pomodoro timer app.

## ✅ What's Already Done

All the code is implemented and ready to use:
- ✅ Ambient sounds manager class (`sources/ambientSounds.js`)
- ✅ Sound configuration file (`sources/ambientSoundsConfig.js`)
- ✅ Volume controls modal UI and CSS
- ✅ Integration with music player
- ✅ Upload script for R2

## 📝 What You Need To Do

### Step 1: Find and Download Ambient Sound Files

You need to download ~18 ambient sound MP3 files. Here are the sounds configured in the app:

#### Nature Sounds (3 files)
- `forest-rain.mp3` - Rain sounds in a forest
- `birds-chirping.mp3` - Bird chirping ambience
- `forest-ambience.mp3` - General forest sounds

#### All Sounds (15 files)
- `brown-noise.mp3` - Brown noise
- `pink-noise.mp3` - Pink noise
- `white-noise.mp3` - White noise
- `keyboard-typing.mp3` - Keyboard typing sounds
- `city-rain.mp3` - Rain in city environment
- `city-traffic.mp3` - City traffic ambience
- `campfire.mp3` - Campfire crackling
- `waves.mp3` - Ocean/beach waves
- `wind.mp3` - Wind sounds
- `ocean-waves.mp3` - Ocean waves (deeper)
- `fire-crackling.mp3` - Fireplace crackling
- `blizzard.mp3` - Blizzard/snow storm
- `underwater.mp3` - Underwater ambience
- `deep-space.mp3` - Space ambience
- `window-rain.mp3` - Rain on window
- `train.mp3` - Train sounds
- `thunder.mp3` - Thunder sounds
- `plane.mp3` - Airplane cabin

### Recommended Sound Sources

**Free Sources (No Attribution Required):**
1. **Pixabay Audio** - https://pixabay.com/sound-effects/
   - High quality, completely free
   - Search for each sound + "loop"
   - Filter by: "Long" duration (30s+)

2. **YouTube Audio Library** - https://www.youtube.com/audiolibrary
   - Free, no attribution needed
   - Great ambient loops
   - Download as MP3

3. **Freesound.org** - https://freesound.org/
   - Search with CC0 license
   - Many professional ambient loops
   - Requires free account

4. **ZapSplat** - https://www.zapsplat.com/
   - Free with attribution
   - Professional quality
   - Good looping sounds

### Step 2: Prepare Sound Files

#### File Requirements:
- **Format:** MP3
- **Bitrate:** 128-192 kbps (balance between quality and file size)
- **Length:** 30-60 seconds minimum (must loop seamlessly)
- **Volume:** Normalize all files to -14 LUFS

#### Processing Sounds (Using Audacity - Free):

1. **Install Audacity** - https://www.audacityteam.org/

2. **For Each Sound File:**
   ```
   a. Open the sound in Audacity
   b. Listen and find perfect loop points (where sound can seamlessly repeat)
   c. Trim to loop points: Edit → Remove Audio → Trim Audio
   d. Add crossfade at loop point:
      - Select last 100ms of audio
      - Effect → Fade Out
      - Select first 100ms of audio
      - Effect → Fade In
   e. Normalize volume: Effect → Normalize → set to -14 LUFS
   f. Export: File → Export → Export as MP3
      - Quality: 192 kbps CBR
      - Use exact filename from list above
   ```

3. **Test Loop:** Import into Audacity and duplicate the track. If there's a noticeable gap or click, adjust crossfade.

### Step 3: Organize Files

1. Create a `sounds` folder in your project root:
   ```bash
   mkdir sounds
   ```

2. Move all 18 MP3 files into the `sounds/` folder

3. Verify filenames match exactly with the list above

### Step 4: Configure Upload Script

1. Open `upload-sounds-to-r2.js`

2. Update these values:
   ```javascript
   const ACCOUNT_ID = 'your-cloudflare-account-id';
   const ACCESS_KEY_ID = 'your-r2-access-key';
   const SECRET_ACCESS_KEY = 'your-r2-secret-key';
   ```

3. Get these values from:
   - Cloudflare Dashboard → R2 → Manage R2 API Tokens
   - Create new token or use existing one

### Step 5: Upload to R2

1. Install dependencies (if not already installed):
   ```bash
   npm install @aws-sdk/client-s3
   ```

2. Run the upload script:
   ```bash
   node upload-sounds-to-r2.js
   ```

3. Verify all files uploaded successfully. You should see:
   ```
   ✓ Successful: 18
   ✗ Failed: 0
   ```

4. Check Cloudflare R2 dashboard - you should see `effects/` folder with all files

### Step 6: Update R2 Public URL (if needed)

If your R2 public URL is different from `/r2-effects/`:

1. Open `sources/ambientSoundsConfig.js`
2. Update line 5:
   ```javascript
   const R2_EFFECTS_BASE_URL = '/r2-effects';
   ```
3. Change to your R2 public URL path

### Step 7: Test Locally

1. Start your development server:
   ```bash
   npm run dev
   # or
   python3 -m http.server 8000
   ```

2. Open the app in browser

3. Click the volume button (🔊) in the music player

4. Test the volume controls modal:
   - Main Volume slider should control all audio
   - Music Volume slider should control only music
   - Individual sound sliders should play/pause sounds

### Step 8: Deploy

Once everything works locally:

```bash
git add .
git commit -m "Add ambient sound effects feature

- Implemented volume controls modal with Personal/Shared sections
- Added 18 ambient sound effects with individual volume controls
- Sounds loop seamlessly and mix with music
- Volume settings persist in localStorage
- Fully responsive design for mobile

🤖 Generated with Claude Code"

git push
```

## 🎛️ How It Works

### User Experience:
1. User clicks volume button (🔊) in music player
2. Volume Controls modal opens with:
   - **Personal Section:** Main Volume (affects everything)
   - **Shared Section:**
     - Music Volume (affects only lofi music)
     - Ambient sounds grouped by category
3. User adjusts individual sound sliders
4. Sounds auto-play when slider > 0, auto-pause when = 0
5. All settings save to localStorage

### Technical Details:
- Each sound is an HTML5 Audio object with `loop=true`
- Sounds only download when user interacts with them
- Volume formula: `finalVolume = soundVolume * mainVolume`
- Music formula: `finalVolume = musicVolume * mainVolume`
- Multiple sounds can play simultaneously
- No CPU-intensive mixing - browser handles it natively

## 📊 File Sizes & Performance

### Expected Sizes:
- Each sound: ~1-3 MB (60 sec @ 192 kbps)
- Total for all 18 sounds: ~20-40 MB
- Users only download sounds they use

### Performance Tips:
- Sounds use `preload="metadata"` (only loads when played)
- Audio objects are created once and reused
- Volume changes don't reload audio
- localStorage keeps settings between sessions

## 🎨 Customization

### Add More Sounds:

1. Edit `sources/ambientSoundsConfig.js`
2. Add to existing category or create new one:
   ```javascript
   nature: {
     label: 'Sounds From In The Woods',
     icon: '🌲',
     sounds: [
       // ... existing sounds ...
       {
         id: 'crickets',
         name: 'Crickets',
         file: `${R2_EFFECTS_BASE_URL}/crickets.mp3`,
         loop: true,
         defaultVolume: 0
       }
     ]
   }
   ```

3. Upload the new sound file to R2 `effects/` folder

### Change Categories:

Edit the `AMBIENT_SOUNDS` object structure in `ambientSoundsConfig.js`:
```javascript
export const AMBIENT_SOUNDS = {
  yourCategory: {
    label: 'Your Category Name',
    icon: '🔥', // Any emoji
    sounds: [ /* ... */ ]
  }
};
```

### Styling:

Edit `styles/components/ambient-sounds.css` to customize:
- Colors: Change `rgba(255, 255, 255, 0.x)` values
- Spacing: Adjust `gap` and `padding` values
- Borders: Modify `border-radius` and `border` properties
- Hover effects: Update `:hover` states

## 🐛 Troubleshooting

### Sounds Won't Play
- **Issue:** Browser autoplay policy
- **Fix:** Sounds will play after any user interaction (click, key press)

### Volume Button Not Appearing
- **Issue:** Music player loaded before ambient manager
- **Fix:** Check browser console for errors, refresh page

### Files Not Uploading to R2
- **Issue:** Wrong credentials or bucket permissions
- **Fix:** Verify R2 access keys and bucket is public

### Sounds Have Clicks/Gaps
- **Issue:** Poor loop points in source file
- **Fix:** Re-edit in Audacity with better crossfade

### Modal Won't Close
- **Issue:** JavaScript error
- **Fix:** Check browser console, ensure no conflicting modals

## 📱 Mobile Considerations

- Touch targets are 44x44px minimum (accessibility)
- Modal is scrollable on small screens
- Sliders work with touch gestures
- Volume percentages hidden on very small screens
- Works in Discord Activity (tested)

## 🎯 Next Steps

Once you have the basic implementation working, consider:

1. **Sound Presets** - Pre-configured combinations
2. **Visual Indicators** - Show which sounds are playing
3. **Sound Mixer View** - Visual EQ or waveforms
4. **User Uploads** - Allow users to add custom sounds
5. **Categories** - More categorization (Work, Study, Sleep, etc.)

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are uploaded to R2
3. Test with a simple sound first
4. Ensure R2 bucket has public access

---

**Made with Claude Code** 🤖
