#!/usr/bin/env python3
"""
Download music from HAR file with proper Artist - Title naming
Extracts metadata from page requests in the HAR file
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
    filename = re.sub(r'\s+', ' ', filename).strip()
    return filename

def extract_metadata_from_har(har_data):
    """Extract track metadata from HTML responses in HAR"""
    metadata = {}
    entries = har_data.get('log', {}).get('entries', [])

    for entry in entries:
        response = entry.get('response', {})
        content = response.get('content', {})
        mime_type = content.get('mimeType', '')

        # Look for HTML pages that might contain metadata
        if 'html' in mime_type:
            text = content.get('text', '')
            if not text:
                continue

            # Try to extract track info from JSON-LD structured data
            json_ld_pattern = r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>'
            json_matches = re.findall(json_ld_pattern, text, re.DOTALL | re.IGNORECASE)

            for json_text in json_matches:
                try:
                    data = json.loads(json_text)
                    if isinstance(data, dict):
                        extract_from_json_ld(data, metadata)
                    elif isinstance(data, list):
                        for item in data:
                            extract_from_json_ld(item, metadata)
                except:
                    pass

            # Extract from meta tags
            extract_from_meta_tags(text, metadata)

            # Extract from Uppbeat's data structure
            extract_uppbeat_data(text, metadata)

    return metadata

def extract_from_json_ld(data, metadata):
    """Extract track info from JSON-LD structured data"""
    if data.get('@type') == 'MusicRecording':
        title = data.get('name', '')
        artist = ''

        by_artist = data.get('byArtist')
        if isinstance(by_artist, dict):
            artist = by_artist.get('name', '')
        elif isinstance(by_artist, str):
            artist = by_artist

        audio_url = ''
        if 'audio' in data:
            if isinstance(data['audio'], dict):
                audio_url = data['audio'].get('contentUrl', '')
            elif isinstance(data['audio'], str):
                audio_url = data['audio']

        if title and audio_url:
            metadata[audio_url] = {
                'title': title,
                'artist': artist or 'Various Artists'
            }

def extract_from_meta_tags(html, metadata):
    """Extract metadata from meta tags"""
    # Open Graph tags
    og_title = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', html, re.I)
    og_description = re.search(r'<meta\s+property="og:description"\s+content="([^"]+)"', html, re.I)

    # Music-specific meta tags
    music_song = re.search(r'<meta\s+property="music:song"\s+content="([^"]+)"', html, re.I)
    music_musician = re.search(r'<meta\s+property="music:musician"\s+content="([^"]+)"', html, re.I)

    title = og_title.group(1) if og_title else None
    artist = music_musician.group(1) if music_musician else None

    if title:
        # Sometimes title includes "Artist - Title" format
        if ' - ' in title:
            parts = title.split(' - ', 1)
            if len(parts) == 2:
                artist = parts[0]
                title = parts[1]

        # Store with a generic key (we'll match later)
        metadata['_page_meta'] = {
            'title': title,
            'artist': artist or 'Various Artists'
        }

def extract_uppbeat_data(html, metadata):
    """Extract Uppbeat-specific data structures"""
    # Look for window.__INITIAL_STATE__ or similar
    patterns = [
        r'window\.__INITIAL_STATE__\s*=\s*(\{.*?\});',
        r'window\.__NEXT_DATA__\s*=\s*(\{.*?\});',
        r'"tracks"\s*:\s*\[(.*?)\]',
        r'"music"\s*:\s*\[(.*?)\]',
    ]

    for pattern in patterns:
        matches = re.findall(pattern, html, re.DOTALL)
        for match in matches:
            try:
                # Try to parse as JSON
                if match.startswith('{'):
                    data = json.loads(match)
                    extract_tracks_from_data(data, metadata)
            except:
                pass

    # Look for data-* attributes in HTML
    track_elements = re.findall(
        r'data-track-(?:id|title|artist)="([^"]*)"[^>]*data-track-(?:id|title|artist)="([^"]*)"',
        html,
        re.IGNORECASE
    )

    # Look for track listings in HTML
    track_pattern = r'<[^>]*class="[^"]*track[^"]*"[^>]*>.*?<[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)</.*?<[^>]*class="[^"]*artist[^"]*"[^>]*>([^<]+)<'
    track_matches = re.findall(track_pattern, html, re.DOTALL | re.IGNORECASE)

    for title, artist in track_matches:
        title = title.strip()
        artist = artist.strip()
        if title:
            key = f'track_{len(metadata)}'
            metadata[key] = {
                'title': title,
                'artist': artist or 'Various Artists'
            }

def extract_tracks_from_data(data, metadata):
    """Recursively extract track info from data structure"""
    if isinstance(data, dict):
        # Check if this is a track object
        if 'title' in data or 'name' in data:
            title = data.get('title') or data.get('name', '')
            artist = data.get('artist') or data.get('artist_name') or data.get('artistName', 'Various Artists')
            url = data.get('url') or data.get('audioUrl') or data.get('audio_url', '')

            if title:
                key = url if url else f'track_{len(metadata)}'
                metadata[key] = {
                    'title': title,
                    'artist': artist
                }

        # Recurse into nested structures
        for value in data.values():
            if isinstance(value, (dict, list)):
                extract_tracks_from_data(value, metadata)

    elif isinstance(data, list):
        for item in data:
            if isinstance(item, (dict, list)):
                extract_tracks_from_data(item, metadata)

def match_audio_url_to_metadata(audio_url, all_metadata):
    """Try to match an audio URL to metadata"""
    # Direct match
    if audio_url in all_metadata:
        return all_metadata[audio_url]

    # Try to match by URL pattern
    for key, meta in all_metadata.items():
        if key in audio_url or audio_url in key:
            return meta

    # Use page metadata as fallback
    if '_page_meta' in all_metadata:
        return all_metadata['_page_meta']

    # Try to extract from URL
    url_parts = audio_url.split('/')
    for part in reversed(url_parts):
        if '-' in part:
            cleaned = urllib.parse.unquote(part)
            cleaned = re.sub(r'\.[^.]+$', '', cleaned)  # Remove extension
            cleaned = re.sub(r'[_-]+', ' ', cleaned)
            return {
                'title': cleaned,
                'artist': 'Various Artists'
            }

    return None

def parse_har_file(har_path):
    """Extract MP3 URLs and match with metadata from HAR file"""
    try:
        with open(har_path, 'r', encoding='utf-8') as f:
            har_data = json.load(f)

        # First pass: extract all metadata
        print("🔍 Extracting metadata from HAR file...")
        all_metadata = extract_metadata_from_har(har_data)
        print(f"   Found {len(all_metadata)} metadata entries")

        # Second pass: extract audio URLs and match with metadata
        tracks = []
        entries = har_data.get('log', {}).get('entries', [])

        for entry in entries:
            request = entry.get('request', {})
            response = entry.get('response', {})

            url = request.get('url', '')
            content_type = response.get('content', {}).get('mimeType', '')

            # Check if it's an audio file
            is_audio = False
            if any(ext in url.lower() for ext in ['.mp3', '.wav', '.ogg', '.m4a', '.aac']):
                is_audio = True
            elif any(term in content_type.lower() for term in ['audio', 'mpeg', 'mp3']):
                is_audio = True

            if is_audio and url.startswith('http'):
                # Match with metadata
                meta = match_audio_url_to_metadata(url, all_metadata)

                if meta:
                    artist = sanitize_filename(meta['artist'])
                    title = sanitize_filename(meta['title'])
                    filename = f"{artist} - {title}.mp3"
                else:
                    # Fallback to URL-based naming
                    filename = os.path.basename(urllib.parse.unquote(url.split('?')[0]))
                    if not filename.endswith('.mp3'):
                        filename += '.mp3'

                tracks.append({
                    'url': url,
                    'filename': filename,
                    'metadata': meta
                })

        return tracks

    except Exception as e:
        print(f"❌ Error parsing HAR file: {e}")
        import traceback
        traceback.print_exc()
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
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'audio/*,*/*;q=0.8',
        }

        req = urllib.request.Request(url, headers=headers)

        with urllib.request.urlopen(req, timeout=30) as response:
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
    parser = argparse.ArgumentParser(description='Download music from HAR file with metadata')
    parser.add_argument('har_file', help='Path to HAR file')
    parser.add_argument('--yes', '-y', action='store_true',
                       help='Skip confirmation prompt')
    args = parser.parse_args()

    print("=" * 70)
    print("🎵 HAR FILE DOWNLOADER WITH METADATA")
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
        return

    print(f"📦 Found {len(tracks)} audio files\n")

    # Show tracks with metadata
    print("📋 Files to download:")
    print("-" * 70)
    for i, track in enumerate(tracks[:15], 1):
        if track.get('metadata'):
            print(f"{i}. {track['filename']}")
        else:
            print(f"{i}. {track['filename']} (no metadata)")
    if len(tracks) > 15:
        print(f"   ... and {len(tracks) - 15} more")
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
