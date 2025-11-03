# Music Credits & Guide

This document lists all music tracks used in this Pomodoro Timer application and provides guidance on how to add your own royalty-free music.

## Current Music Tracks

> **Note:** No music tracks are currently included. Follow the guide below to add your own!

---

## How to Add Music Tracks

### Step 1: Create the Music Directory

```bash
mkdir music
```

### Step 2: Find Royalty-Free Music

Here are the best sources for free, royalty-free music suitable for a Pomodoro timer:

#### Recommended Sources (Creative Commons / CC0)

1. **Chosic** - https://www.chosic.com/free-music/all/
   - Filter by "Royalty Free" and "Creative Commons"
   - Large selection of lofi, ambient, and focus music
   - Clear licensing information

2. **Free Music Archive (FMA)** - https://freemusicarchive.org/
   - Search for "lofi", "ambient", "study music"
   - Filter by license: CC0 or CC BY
   - High-quality curated tracks

3. **Incompetech (Kevin MacLeod)** - https://incompetech.com/music/
   - Massive library of music
   - Requires attribution: "Music by Kevin MacLeod (incompetech.com)"
   - Licensed under CC BY 4.0

4. **Bensound** - https://www.bensound.com/
   - Quality royalty-free music
   - Free with attribution
   - Great for background/focus music

5. **Pixabay Music** - https://pixabay.com/music/
   - CC0 (no attribution required)
   - Good selection of ambient and chill tracks

6. **YouTube Audio Library** - https://www.youtube.com/audiolibrary/music
   - Many tracks available for use
   - Check individual licenses (most are free to use with attribution)

#### Music Types Best for Pomodoro

- **Lofi Hip Hop** - Chill beats, non-distracting
- **Ambient** - Atmospheric, minimal
- **Classical** - Focus-friendly instrumentals
- **Nature Sounds** - Rain, ocean, forest
- **White/Brown Noise** - Pure focus

### Step 3: Download and Convert Music

1. Download MP3 files (recommended format)
2. If needed, convert to MP3 using:
   - **FFmpeg** (command line): `ffmpeg -i input.wav output.mp3`
   - **Online converters**: CloudConvert, Online-Convert
3. Optimize file size (aim for 128-192 kbps for web)

### Step 4: Add Files to the Project

1. Place MP3 files in the `music/` directory
2. Use descriptive filenames: `lofi-study-1.mp3`, `ambient-rain.mp3`, etc.

### Step 5: Update the Music Library

Edit `sources/musicPlayer.js` and add your tracks to the `MUSIC_LIBRARY` array:

```javascript
const MUSIC_LIBRARY = [
  {
    id: 'lofi-study-1',
    title: 'Lofi Study Session',
    artist: 'Artist Name',
    file: '/music/lofi-study-1.mp3',
    credits: 'Licensed under CC BY 3.0 - https://source-url.com'
  },
  {
    id: 'ambient-rain',
    title: 'Ambient Rain Sounds',
    artist: 'Nature Sounds',
    file: '/music/ambient-rain.mp3',
    credits: 'CC0 - Public Domain'
  },
  // Add more tracks here...
];
```

### Step 6: Update This Credits File

Add proper attribution below for each track:

---

## Music Attribution

### Track 1: [Track Title]
- **Artist:** [Artist Name]
- **Source:** [URL where you found it]
- **License:** [CC0 / CC BY 3.0 / CC BY 4.0 / etc.]
- **License URL:** [Link to license, e.g., https://creativecommons.org/licenses/by/4.0/]
- **Changes:** [None / Trimmed to 3:00 / etc.]

### Track 2: [Track Title]
- **Artist:** [Artist Name]
- **Source:** [URL]
- **License:** [License type]
- **License URL:** [URL]
- **Changes:** [None / Edited / etc.]

---

## Example Attribution (Kevin MacLeod)

If you use music from Incompetech (Kevin MacLeod), use this format:

### Carefree
- **Artist:** Kevin MacLeod (incompetech.com)
- **Source:** https://incompetech.com/music/royalty-free/music.html
- **License:** Licensed under Creative Commons: By Attribution 4.0
- **License URL:** https://creativecommons.org/licenses/by/4.0/
- **Changes:** None

---

## Example Attribution (CC0 / Public Domain)

For CC0 music (no attribution required, but good practice):

### Peaceful Piano
- **Artist:** [Artist Name]
- **Source:** Free Music Archive / Pixabay / etc.
- **License:** CC0 (Public Domain)
- **License URL:** https://creativecommons.org/publicdomain/zero/1.0/
- **Changes:** None

---

## Legal Notes

1. **Always verify the license** before using music
2. **Provide proper attribution** as required by the license
3. **Keep records** of where you got each track
4. **Check for commercial use restrictions** if you plan to monetize
5. **YouTube/TikTok use**: Verify the music is cleared for these platforms if sharing

## Discord Activity Considerations

- Keep file sizes reasonable (under 5MB per track recommended)
- Test playback in Discord's embedded browser
- Ensure all files are served from your domain (no external CDN restrictions)
- Consider providing a "No Music" option for users who prefer silence

## Recommended Track Lengths

- **Optimal:** 3-5 minutes (matches typical Pomodoro sessions)
- **Maximum:** 10 minutes (to avoid huge file sizes)
- **Minimum:** 2 minutes (to avoid too-frequent repetition)

---

## Questions?

If you're unsure about licensing, err on the side of caution:
- Only use music explicitly marked as "Royalty Free" or "Creative Commons"
- Always provide attribution when required
- Keep this file updated as you add tracks

---

**Last Updated:** [Date you add tracks]
