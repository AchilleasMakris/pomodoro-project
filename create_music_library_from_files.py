#!/usr/bin/env python3
"""
Create MUSIC_LIBRARY entries from downloaded files
After you manually download tracks from Pixabay, run this to generate the JavaScript code
"""

import os
import json
import re

MUSIC_DIR = os.path.expanduser("~/Downloads/Synthwave")

def sanitize_filename(filename):
    """Extract clean title from filename"""
    # Remove file extension
    title = filename.replace('.mp3', '')

    # Remove common prefixes (track numbers, etc)
    title = re.sub(r'^\d+[\s\-_\.]*', '', title)
    title = re.sub(r'^track[\s\-_]*\d+[\s\-_]*', '', title, flags=re.IGNORECASE)

    # Clean up separators
    title = title.replace('_', ' ').replace('-', ' ')
    title = re.sub(r'\s+', ' ', title).strip()

    return title

def create_id_from_title(title):
    """Create URL-safe ID from title"""
    id_str = title.lower()
    id_str = re.sub(r'[^\w\s-]', '', id_str)
    id_str = re.sub(r'[-\s]+', '-', id_str)
    return id_str.strip('-')

def scan_music_files():
    """Scan directory for MP3 files"""
    if not os.path.exists(MUSIC_DIR):
        print(f"❌ Directory not found: {MUSIC_DIR}")
        print("   Please download tracks manually first.")
        return []

    files = []
    for filename in sorted(os.listdir(MUSIC_DIR)):
        if filename.lower().endswith('.mp3'):
            files.append(filename)

    return files

def generate_music_library_entries(files):
    """Generate JavaScript MUSIC_LIBRARY entries"""
    entries = []

    for filename in files:
        title = sanitize_filename(filename)
        track_id = create_id_from_title(title)

        entry = {
            'id': track_id,
            'title': title,
            'artist': 'Various Artists',
            'file': f'/r2-audio/synthwave/{filename}',
            'credits': 'Synthwave / 80\'s',
            'genre': 'synthwave'
        }
        entries.append(entry)

    return entries

def format_as_javascript(entries):
    """Format entries as JavaScript code"""
    js_code = []

    for entry in entries:
        js_code.append("  {")
        js_code.append(f"    id: '{entry['id']}',")
        js_code.append(f"    title: '{entry['title']}',")
        js_code.append(f"    artist: '{entry['artist']}',")
        js_code.append(f"    file: \"{entry['file']}\",")
        js_code.append(f"    credits: '{entry['credits']}',")
        js_code.append(f"    genre: '{entry['genre']}'")
        js_code.append("  },")

    return '\n'.join(js_code)

def main():
    print("=" * 70)
    print("🎵 MUSIC LIBRARY GENERATOR")
    print("=" * 70)
    print(f"Scanning: {MUSIC_DIR}")
    print()

    files = scan_music_files()

    if not files:
        print("❌ No MP3 files found!")
        print()
        print("📝 Instructions:")
        print("   1. Visit: https://pixabay.com/music/search/synthwave%2080's/")
        print("   2. Create free Pixabay account")
        print("   3. Download tracks manually to ~/Downloads/Synthwave/")
        print("   4. Run this script again")
        return

    print(f"📦 Found {len(files)} MP3 files\n")

    # Generate entries
    entries = generate_music_library_entries(files)
    js_code = format_as_javascript(entries)

    # Save to file
    output_file = "synthwave_library.js"
    with open(output_file, 'w') as f:
        f.write("// Add these entries to MUSIC_LIBRARY in sources/musicPlayer.js\n\n")
        f.write(js_code)

    print(f"✅ Generated {len(entries)} entries")
    print(f"📄 Saved to: {output_file}")
    print()

    # Also save metadata as JSON
    json_file = "synthwave_metadata.json"
    with open(json_file, 'w') as f:
        json.dump(entries, f, indent=2)

    print(f"📄 Metadata saved to: {json_file}")
    print()

    # Display preview
    print("📋 Preview (first 5 tracks):")
    print("-" * 70)
    for i, entry in enumerate(entries[:5], 1):
        print(f"{i}. {entry['title']}")
    if len(entries) > 5:
        print(f"   ... and {len(entries) - 5} more")
    print()

    # Show file list for R2 upload
    print("📂 Files to upload to R2 /music/synthwave/:")
    print("-" * 70)
    for filename in files[:10]:
        print(f"   • {filename}")
    if len(files) > 10:
        print(f"   ... and {len(files) - 10} more")
    print()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
