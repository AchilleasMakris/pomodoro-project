#!/usr/bin/env python3
"""
Rename Uppbeat files from URL format to clean "Artist - Title.mp3"
Parses the Uppbeat URL naming format
"""

import os
import re
import argparse
from pathlib import Path

DOWNLOAD_DIR = os.path.expanduser("~/Downloads/Synthwave")

def clean_uppbeat_filename(filename):
    """
    Parse Uppbeat filename format:
    "STREAMING title artist main version ID duration.mp3"
    Example: "STREAMING neon signs simon folwar main version 6833 02 40.mp3"
    Should become: "Simon Folwar - Neon Signs.mp3"
    """

    # Remove .mp3 extension
    name = filename.replace('.mp3', '')

    # Remove "STREAMING " prefix
    name = re.sub(r'^STREAMING\s+', '', name, flags=re.IGNORECASE)

    # Remove "main version" and everything after it (version ID, duration)
    name = re.sub(r'\s+main\s+version.*$', '', name, flags=re.IGNORECASE)

    # Now we have: "title artist"
    # We need to find where title ends and artist begins

    # Split into words
    words = name.split()

    if len(words) < 2:
        # Not enough words, return as-is
        return title_case(name) + " - Unknown.mp3"

    # Try to intelligently split title from artist
    # Common artist names to look for
    known_artists = [
        'simon folwar', 'bach', 'prigida', 'vens adams', 'dan phillipson',
        'bath house', 'ian aisling', 'mountaineer', 'pecan pie', 'tatami',
        'sandia', 'corinne', 'hey pluto', 'kaleidoscope', 'galera', 'tecnosine'
    ]

    # Try to find a known artist
    name_lower = name.lower()
    for artist in known_artists:
        if artist in name_lower:
            # Found the artist, need to figure out if it's at start or end
            artist_index = name_lower.index(artist)

            # Split based on position
            before = name[:artist_index].strip()
            after = name[artist_index + len(artist):].strip()

            # Artist could be at the end (most common) or at the start
            if before and not after:
                # Artist at end: "title artist"
                title = before
                artist_name = artist
            elif after and not before:
                # Artist at start: "artist title"
                title = after
                artist_name = artist
            elif len(before) > len(after):
                # Longer part is probably the title
                title = before
                artist_name = artist
            else:
                # Shorter part at start is probably title
                title = before if before else after
                artist_name = artist

            if title:
                return f"{title_case(artist_name)} - {title_case(title)}.mp3"

    # Fallback: assume last 1-2 words are artist
    # Common pattern: multi-word title + 1-2 word artist
    if len(words) >= 3:
        # Try 2-word artist first
        artist = ' '.join(words[-2:])
        title = ' '.join(words[:-2])
        return f"{title_case(artist)} - {title_case(title)}.mp3"
    else:
        # Single word title + single word artist
        artist = words[-1]
        title = words[0]
        return f"{title_case(artist)} - {title_case(title)}.mp3"

def title_case(text):
    """Convert to title case, handling special cases"""
    # Don't capitalize small words in middle
    small_words = {'a', 'an', 'the', 'in', 'on', 'by', 'to', 'for', 'of', 'and', 'or', 'but'}

    words = text.split()
    result = []

    for i, word in enumerate(words):
        if i == 0 or word.lower() not in small_words:
            # Capitalize first letter, keep rest lowercase
            result.append(word.capitalize())
        else:
            result.append(word.lower())

    return ' '.join(result)

def main():
    parser = argparse.ArgumentParser(description='Rename Uppbeat music files')
    parser.add_argument('--yes', '-y', action='store_true',
                       help='Skip confirmation prompt')
    parser.add_argument('--dir', '-d', default=DOWNLOAD_DIR,
                       help=f'Directory to process (default: {DOWNLOAD_DIR})')
    parser.add_argument('--remove-duplicates', '--rm-dup', action='store_true',
                       help='Remove duplicate files (keeps first occurrence)')
    args = parser.parse_args()

    directory = args.dir

    print("=" * 70)
    print("🎵 UPPBEAT FILE RENAMER")
    print("=" * 70)
    print(f"Directory: {directory}\n")

    if not os.path.exists(directory):
        print(f"❌ Directory not found: {directory}")
        return

    # Find all MP3 files
    files = [f for f in os.listdir(directory) if f.endswith('.mp3')]

    if not files:
        print("❌ No MP3 files found!")
        return

    print(f"📦 Found {len(files)} MP3 files\n")

    # Process files
    renames = []
    for old_name in files:
        # Always process if it has "Various Artists" or "STREAMING"
        if old_name.startswith('Various Artists'):
            # Remove "Various Artists - STREAMING " prefix
            new_name = re.sub(r'^Various Artists - STREAMING\s+', '', old_name)
            new_name = clean_uppbeat_filename(new_name)
        elif 'STREAMING' in old_name.upper():
            new_name = clean_uppbeat_filename(old_name)
        elif ' - ' in old_name and not old_name.startswith('Various Artists'):
            # Already in correct format
            continue
        else:
            # Try to clean it anyway
            new_name = clean_uppbeat_filename(old_name)

        # Avoid duplicates
        counter = 1
        base_new_name = new_name
        while any(r[1] == new_name for r in renames) or (
            os.path.exists(os.path.join(directory, new_name)) and new_name != old_name
        ):
            name_part, ext = os.path.splitext(base_new_name)
            new_name = f"{name_part} ({counter}){ext}"
            counter += 1

        if old_name != new_name:
            renames.append((old_name, new_name))

    if not renames:
        print("✅ All files already have correct names!")

        # Still check for duplicates even if no renames
        if not args.remove_duplicates:
            return

    # Check for duplicates
    if args.remove_duplicates:
        print("🔍 Checking for duplicates...\n")

        # Group files by their cleaned name (after potential rename)
        seen_names = {}
        duplicates = []

        for old_name in files:
            # Get the name it would have after renaming (or current name)
            new_name = None
            for old, new in renames:
                if old == old_name:
                    new_name = new
                    break

            if not new_name:
                new_name = old_name

            # Normalize for comparison (lowercase, remove extra spaces)
            normalized = new_name.lower().strip()

            if normalized in seen_names:
                duplicates.append((old_name, seen_names[normalized]))
            else:
                seen_names[normalized] = old_name

        if duplicates:
            print(f"📦 Found {len(duplicates)} duplicate files:\n")
            print("-" * 70)
            for dup_file, original_file in duplicates[:15]:
                print(f"  ❌ {dup_file}")
                print(f"     (duplicate of: {original_file})\n")
            if len(duplicates) > 15:
                print(f"  ... and {len(duplicates) - 15} more\n")

            if not args.yes:
                try:
                    response = input(f"Delete {len(duplicates)} duplicate files? (y/n): ").strip().lower()
                    if response not in ['y', 'yes']:
                        print("❌ Skipping duplicate removal")
                        duplicates = []
                except (EOFError, KeyboardInterrupt):
                    print("\n❌ Skipping duplicate removal")
                    duplicates = []
            else:
                print("⚠️  Auto-confirming duplicate removal (--yes flag)\n")
        else:
            print("✅ No duplicates found!\n")
    else:
        duplicates = []

    if not renames and not duplicates:
        return

    print(f"📋 Will rename {len(renames)} files:\n")
    print("-" * 70)
    for old, new in renames[:15]:
        print(f"  {old}")
        print(f"  → {new}\n")
    if len(renames) > 15:
        print(f"  ... and {len(renames) - 15} more\n")

    # Confirm
    if not args.yes:
        try:
            response = input("Proceed with renaming? (y/n): ").strip().lower()
            if response not in ['y', 'yes']:
                print("❌ Cancelled")
                return
        except (EOFError, KeyboardInterrupt):
            print("\n❌ Cancelled")
            return
        print()
    else:
        print("⚠️  Auto-confirming rename (--yes flag)\n")

    # Rename files
    rename_success = 0
    rename_fail = 0

    for old_name, new_name in renames:
        old_path = os.path.join(directory, old_name)
        new_path = os.path.join(directory, new_name)

        try:
            os.rename(old_path, new_path)
            print(f"✅ Renamed: {new_name}")
            rename_success += 1
        except Exception as e:
            print(f"❌ Failed: {old_name} - {e}")
            rename_fail += 1

    # Delete duplicates
    delete_success = 0
    delete_fail = 0

    if duplicates:
        print("\n🗑️  Deleting duplicates...\n")
        for dup_file, original_file in duplicates:
            dup_path = os.path.join(directory, dup_file)

            try:
                os.remove(dup_path)
                print(f"✅ Deleted: {dup_file}")
                delete_success += 1
            except Exception as e:
                print(f"❌ Failed to delete: {dup_file} - {e}")
                delete_fail += 1

    # Summary
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    if renames:
        print(f"✅ Successfully renamed: {rename_success} files")
        print(f"❌ Failed to rename: {rename_fail} files")
    if duplicates:
        print(f"🗑️  Successfully deleted: {delete_success} duplicates")
        print(f"❌ Failed to delete: {delete_fail} duplicates")
    print(f"📁 Location: {directory}/")
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
