# Local Development Setup

## Quick Start

```bash
npm run dev
```

This will start a live-server on `http://localhost:8000` with hot-reload enabled.

## Features

### 🔥 Hot Reload
The development server automatically watches for changes in:
- `sources/` - JavaScript files
- `styles/` - CSS files
- `index.html` - Main HTML file

**No manual restart needed!** Just save your file and the browser will auto-refresh.

### 🎨 Asset Fallbacks

Since music files and background videos are hosted on Cloudflare R2 (production), the local development environment has fallback handling:

#### Background Options
When background images/videos can't load (in local development), you'll see:
- 🖼️ Beautiful gradient placeholders for images
- 🎬 Colorful gradient placeholders for videos
- Professional styling with hover effects

The backgrounds will work perfectly in production where R2 assets are available.

#### Music Player
The music player loads from `/r2-audio/lofi/` which points to your R2 bucket. In local development:
- Music will load if R2 URLs are accessible
- Otherwise, the player UI will still work (just without audio)

## Development Commands

```bash
# Start development server with hot reload (recommended)
npm run dev

# Start basic HTTP server (no hot reload)
npm start

# Preview build
npm run preview
```

## Mobile-Friendly Development

All UI components are mobile-responsive by default:
- Background gallery adapts to screen size
- Settings modal optimized for touch
- Music player scales beautifully

Test on mobile by accessing `http://[your-local-ip]:8000` from your phone.

## Tips

1. **Hard Refresh**: If styles don't update, press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

2. **Cache Versions**: Cache versions in `index.html` are automatically set. Only increment manually if browser cache issues persist.

3. **Asset Loading**: Background options show gradient placeholders in local dev - this is expected behavior!

## Troubleshooting

### Browser not auto-refreshing?
- Check that `live-server` is running (terminal should show "Serving at http://localhost:8000")
- Make sure you're editing files in the watch paths: `sources/`, `styles/`, or `index.html`

### Black boxes in background settings?
- This is fixed! You should now see gradient placeholders with icons
- Hard refresh the page to clear old cache: `Ctrl+Shift+R`

### Music not playing?
- In local development, music loads from R2 bucket (production URLs)
- This is expected - music will work in production
- For true local testing, you'd need to download files or set up a local proxy

## Production vs Development

| Feature | Development | Production |
|---------|------------|------------|
| Hot Reload | ✅ Yes | ❌ No |
| R2 Assets | ⚠️ Via CDN | ✅ Full access |
| Background Images | 🎨 Fallback gradients | 🖼️ Real images/videos |
| Music Player | ⚠️ Limited | 🎵 Full library |

---

**Happy coding! 🚀**
