# Development Guide

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

This will:
- Start a local server on `http://localhost:8000`
- Disable caching (so changes show immediately)
- Automatically open your browser
- Hot reload when you refresh

---

## Available Commands

### Development
```bash
npm run dev
```
- Port: 8000
- Auto-opens browser
- Cache disabled (for development)
- **Use this for daily development!**

### Start Server (Production-like)
```bash
npm start
```
- Port: 8000
- Caching enabled
- Does not auto-open browser
- Better for testing production behavior

### Preview (Alternative Port)
```bash
npm run preview
```
- Port: 3000
- Auto-opens browser
- Use if port 8000 is busy

---

## Development Workflow

### 1. Start Development
```bash
npm install        # First time only
npm run dev        # Starts server + opens browser
```

### 2. Make Changes
- Edit any file in `/sources/`, `/styles/`, or `index.html`
- Save the file
- Refresh browser (Cmd+R / Ctrl+R)
- Changes appear instantly!

### 3. Test Features
- Open DevTools (F12) to see console logs
- Check for JavaScript errors
- Test responsive design (mobile view)
- Verify music player works
- Test settings persistence

### 4. Stop Server
- Press `Ctrl+C` in terminal

---

## Server Options Explained

### `-p 8000`
Sets the port number (8000)

### `-c-1`
Disables caching (cache-control set to -1)
- Shows code changes immediately
- No need to clear browser cache

### `-o`
Opens browser automatically
- Opens `http://localhost:8000`
- Saves you a step!

---

## Project Structure

```
pomodoro-project/
├── index.html              # Main HTML file
├── package.json            # NPM configuration
├── sources/                # JavaScript modules
│   ├── player.js           # Timer logic
│   ├── settings.js         # Settings management
│   ├── musicPlayer.js      # Music player (799 tracks!)
│   └── fullscreen.js       # Fullscreen toggle
├── styles/                 # CSS stylesheets
│   ├── style.css           # Global styles
│   ├── utils.css           # Utilities
│   └── components/         # Component styles
├── music/                  # MP3 files (799 tracks)
├── img/                    # Images & backgrounds
└── sound/                  # Sound effects
```

---

## Common Development Tasks

### Adding More Music
```bash
# 1. Add MP3 files to /music/ directory
# 2. Regenerate library
node generate-all-music.js > all-music-library.txt

# 3. Copy array from all-music-library.txt
# 4. Replace MUSIC_LIBRARY in sources/musicPlayer.js
# 5. Refresh browser
```

### Testing Settings
1. Open Settings (gear icon)
2. Change timer durations
3. Save settings
4. Open DevTools > Application > Local Storage
5. Check `pomodoroSettings` key

### Testing Music Player
1. Settings > Music
2. Select a track
3. Save
4. Music player should appear
5. Test play/pause/next/prev
6. Check console for shuffle message

### Debugging
```bash
# Open browser DevTools
# Mac: Cmd + Option + I
# Windows/Linux: F12 or Ctrl + Shift + I

# Check Console tab for:
# - JavaScript errors
# - Console.log messages
# - Shuffle confirmation message
```

---

## Browser Compatibility

### Recommended Browsers:
- ✅ Chrome/Edge (Best)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### Features to Test:
- Timer countdown
- Settings persistence
- Music playback
- Background switching
- Mobile responsiveness
- Fullscreen mode

---

## Hot Tips

### Fast Refresh
Instead of stopping/starting server:
- Just refresh browser (Cmd+R / Ctrl+R)
- Caching is disabled in dev mode

### Multiple Devices
Test on different devices:
```bash
npm run dev
# Server shows: http://192.168.x.x:8000
# Use this IP on phone/tablet
```

### Port Already in Use?
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use alternative port
npm run preview  # Uses port 3000
```

### Quick File Changes
```bash
# Edit JS files
code sources/player.js

# Edit CSS files
code styles/style.css

# Edit HTML
code index.html
```

---

## Performance Tips

### Optimize Images
```bash
# If adding new backgrounds
# Keep images under 500KB
# Use online tools: tinypng.com
```

### Check File Sizes
```bash
du -h sources/*.js
# musicPlayer.js should be ~172KB
# Other files should be < 50KB
```

---

## Testing Checklist

### Basic Functionality
- [ ] Page loads without errors
- [ ] Timer starts/pauses/resets
- [ ] Settings modal opens/closes
- [ ] Background switching works
- [ ] Timer size changes work

### Music Player
- [ ] Music player appears
- [ ] Play button works
- [ ] Next/Previous buttons work
- [ ] Progress bar updates
- [ ] Volume control works
- [ ] Credits modal shows all tracks

### Persistence
- [ ] Settings save on refresh
- [ ] Selected background persists
- [ ] Timer durations persist
- [ ] Volume level persists

### Responsive Design
- [ ] Works on desktop (1920px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Settings modal scrolls properly

---

## Deployment

### Local Testing
```bash
npm run dev     # Development mode
npm start       # Production-like mode
```

### Deploy to Vercel
```bash
vercel          # First time
vercel --prod   # Production deployment
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

### Deploy to GitHub Pages
```bash
git add .
git commit -m "Update Pomodoro Timer"
git push origin main
# Enable Pages in repo settings
```

---

## Troubleshooting

### Server won't start
```bash
# Check if port is busy
lsof -i:8000

# Use different port
http-server -p 9000
```

### Changes not showing
```bash
# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Or clear cache manually
# DevTools > Application > Clear Storage
```

### Music not playing
```bash
# Check console for errors
# Verify MP3 files exist
ls -la music/*.mp3 | head -10

# Check file paths in musicPlayer.js
```

### Settings not saving
```bash
# Check localStorage is enabled
# Open DevTools > Application > Local Storage
# Look for pomodoroSettings key
```

---

## Resources

### Documentation
- `README.md` - Project overview
- `IMPLEMENTATION_SUMMARY.md` - Feature details
- `MUSIC_UPDATE_SUMMARY.md` - Music player info
- `DISCORD_ACTIVITY.md` - Discord setup
- `MUSIC_CREDITS.md` - Music attribution guide

### Tools
- [http-server docs](https://github.com/http-party/http-server)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## Support

### Need Help?
1. Check browser console for errors
2. Read relevant documentation
3. Test in different browser
4. Check GitHub issues

---

**Happy Coding! 🍅⏱️🎵**

*Last Updated: November 3, 2025*
