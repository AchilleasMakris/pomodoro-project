#!/usr/bin/env python3
"""
Download MP3s from HAR file (no external dependencies)
Uses only Python standard library
"""

import json
import urllib.request
import urllib.parse
import os
import re
import sys
import argparse
from pathlib import Path

DOWNLOAD_DIR = os.path.expanduser("~/Downloads/Synthwave")

def create_download_dir():
    """Create download directory if it doesn't exist"""
    Path(DOWNLOAD_DIR).mkdir(parents=True, exist_ok=True)
    print(f"✅ Directory: {DOWNLOAD_DIR}/")

def sanitize_filename(filename):
    """Remove invalid characters from filename"""
    filename = re.sub(r'[<>:"/\\|?*]', '', filename)
    filename = re.sub(r'\s+', '_', filename)
    return filename

def extract_filename_from_url(url):
    """Extract filename from URL"""
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path)
    filename = os.path.basename(path)

    # Remove query parameters from filename
    filename = filename.split('?')[0]

    # If no extension or wrong extension, add .mp3
    if not filename.lower().endswith(('.mp3', '.wav', '.ogg', '.m4a')):
        filename += '.mp3'

    return filename

def parse_har_file(har_path):
    """Extract MP3 URLs and metadata from HAR file"""
    try:
        with open(har_path, 'r', encoding='utf-8') as f:
            har_data = json.load(f)

        tracks = []
        entries = har_data.get('log', {}).get('entries', [])

        for entry in entries:
            request = entry.get('request', {})
            response = entry.get('response', {})

            url = request.get('url', '')
            content_type = response.get('content', {}).get('mimeType', '')

            # Check if it's an audio file
            is_audio = False
            if any(ext in url.lower() for ext in ['.mp3', '.wav', '.ogg', '.m4a', '/audio/', '/music/', '/track/']):
                is_audio = True
            elif 'audio' in content_type or 'mpeg' in content_type:
                is_audio = True

            if is_audio and url.startswith('http'):
                # Try to extract title from response headers or URL
                title = None
                headers = response.get('headers', [])
                for header in headers:
                    if header.get('name', '').lower() == 'content-disposition':
                        value = header.get('value', '')
                        filename_match = re.search(r'filename="?([^"]+)"?', value)
                        if filename_match:
                            title = filename_match.group(1)

                if not title:
                    title = extract_filename_from_url(url)

                tracks.append({
                    'url': url,
                    'filename': sanitize_filename(title)
                })

        return tracks

    except Exception as e:
        print(f"❌ Error parsing HAR file: {e}")
        return []

def download_track(url, filename, index, total):
    """Download a single track"""
    filepath = os.path.join(DOWNLOAD_DIR, filename)

    # Skip if already downloaded
    if os.path.exists(filepath):
        print(f"⏭️  [{index}/{total}] Already exists: {filename}")
        return True

    print(f"⬇️  [{index}/{total}] Downloading: {filename}...")

    try:
        # Create request with headers
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'audio/*,*/*;q=0.8',
        }

        req = urllib.request.Request(url, headers=headers)

        # Download file
        with urllib.request.urlopen(req, timeout=30) as response:
            total_size = int(response.headers.get('Content-Length', 0))

            with open(filepath, 'wb') as f:
                downloaded = 0
                chunk_size = 8192

                while True:
                    chunk = response.read(chunk_size)
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)

        size_kb = os.path.getsize(filepath) // 1024
        print(f"✅ [{index}/{total}] Downloaded: {filename} ({size_kb} KB)")
        return True

    except Exception as e:
        print(f"❌ [{index}/{total}] Failed: {filename} - {e}")
        if os.path.exists(filepath):
            os.remove(filepath)
        return False

def main():
    parser = argparse.ArgumentParser(description='Download music from HAR file')
    parser.add_argument('har_file', help='Path to HAR file')
    parser.add_argument('--yes', '-y', action='store_true',
                       help='Skip confirmation prompt')
    args = parser.parse_args()

    print("=" * 70)
    print("🎵 HAR FILE DOWNLOADER")
    print("=" * 70)
    print()

    har_file = args.har_file

    if not os.path.exists(har_file):
        print(f"❌ File not found: {har_file}")
        return

    create_download_dir()

    print(f"📂 Parsing HAR file: {har_file}")
    tracks = parse_har_file(har_file)

    if not tracks:
        print("❌ No audio files found in HAR file!")
        print()
        print("💡 Make sure you:")
        print("   1. Played/loaded music before saving HAR")
        print("   2. Saved with 'all' content (not just structure)")
        return

    print(f"📦 Found {len(tracks)} audio files\n")

    # Show tracks
    print("📋 Files to download:")
    print("-" * 70)
    for i, track in enumerate(tracks[:10], 1):
        print(f"{i}. {track['filename']}")
    if len(tracks) > 10:
        print(f"   ... and {len(tracks) - 10} more")
    print()

    # Confirm
    if not args.yes:
        try:
            response = input("Download all files? (y/n): ").strip().lower()
            if response not in ['y', 'yes']:
                print("❌ Cancelled")
                return
        except (EOFError, KeyboardInterrupt):
            print("\n❌ Cancelled")
            return
        print()
    else:
        print("⚠️  Auto-confirming download (--yes flag)\n")

    # Download
    success_count = 0
    fail_count = 0

    for i, track in enumerate(tracks, 1):
        if download_track(track['url'], track['filename'], i, len(tracks)):
            success_count += 1
        else:
            fail_count += 1

    # Summary
    print("\n" + "=" * 70)
    print("📊 DOWNLOAD SUMMARY")
    print("=" * 70)
    print(f"✅ Successfully downloaded: {success_count} tracks")
    print(f"❌ Failed: {fail_count} tracks")
    print(f"📁 Location: {DOWNLOAD_DIR}/")
    print()

    if success_count > 0:
        print("📝 Next step:")
        print("   python3 create_music_library_from_files.py")
        print()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
