#!/usr/bin/env python3
"""
Upload files to R2 bucket
Uses boto3 (same as migration script)
"""

import boto3
from botocore.client import Config
from botocore.exceptions import ClientError
import os
import sys
import argparse
from pathlib import Path

# R2 Configuration
ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID", "6a264e55d4016fdbd8d2ede53d93b6c5")
ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID", "c287bd79b1f2ca36bfea2df43003aeb5")
SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY", "4f1082b193c14b7c619f9245e667ffa4f61705a40c4b1a27e95dfaa0563d16a6")
BUCKET_NAME = "pomodoro-music"

def create_r2_client():
    """Create and return an R2 client using boto3"""
    try:
        client = boto3.client(
            's3',
            endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
            aws_access_key_id=ACCESS_KEY_ID,
            aws_secret_access_key=SECRET_ACCESS_KEY,
            config=Config(signature_version='s3v4'),
            region_name='auto'
        )
        return client
    except Exception as e:
        print(f"❌ Failed to create R2 client: {e}")
        sys.exit(1)

def upload_file(client, local_path, r2_key, index, total):
    """Upload a single file to R2"""
    try:
        file_size = os.path.getsize(local_path)
        size_mb = file_size / (1024 * 1024)

        print(f"⬆️  [{index}/{total}] Uploading: {os.path.basename(local_path)} ({size_mb:.1f} MB)...")

        client.upload_file(
            local_path,
            BUCKET_NAME,
            r2_key
        )

        print(f"✅ [{index}/{total}] Uploaded: {r2_key}")
        return True

    except Exception as e:
        print(f"❌ [{index}/{total}] Failed: {os.path.basename(local_path)} - {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Upload files to R2 bucket')
    parser.add_argument('local_dir', help='Local directory to upload')
    parser.add_argument('r2_path', help='R2 path (e.g., music/synthwave)')
    parser.add_argument('--yes', '-y', action='store_true',
                       help='Skip confirmation prompt')
    args = parser.parse_args()

    print("=" * 70)
    print("☁️  R2 UPLOAD TOOL")
    print("=" * 70)
    print()

    local_dir = os.path.expanduser(args.local_dir)
    r2_path = args.r2_path.strip('/')

    if not os.path.exists(local_dir):
        print(f"❌ Directory not found: {local_dir}")
        return

    if not os.path.isdir(local_dir):
        print(f"❌ Not a directory: {local_dir}")
        return

    # Find all files
    files = []
    for root, dirs, filenames in os.walk(local_dir):
        for filename in filenames:
            if filename.lower().endswith('.mp3'):
                local_path = os.path.join(root, filename)
                # Calculate relative path
                rel_path = os.path.relpath(local_path, local_dir)
                r2_key = f"{r2_path}/{rel_path}".replace('\\', '/')
                files.append((local_path, r2_key))

    if not files:
        print(f"❌ No MP3 files found in: {local_dir}")
        return

    print(f"📂 Local directory: {local_dir}")
    print(f"☁️  R2 destination: s3://{BUCKET_NAME}/{r2_path}/")
    print(f"📦 Found {len(files)} MP3 files\n")

    # Show preview
    print("📋 Files to upload (first 10):")
    print("-" * 70)
    for local_path, r2_key in files[:10]:
        print(f"  {os.path.basename(local_path)}")
        print(f"  → {r2_key}\n")
    if len(files) > 10:
        print(f"  ... and {len(files) - 10} more\n")

    # Confirm
    if not args.yes:
        try:
            response = input(f"Upload {len(files)} files to R2? (y/n): ").strip().lower()
            if response not in ['y', 'yes']:
                print("❌ Cancelled")
                return
        except (EOFError, KeyboardInterrupt):
            print("\n❌ Cancelled")
            return
        print()
    else:
        print("⚠️  Auto-confirming upload (--yes flag)\n")

    # Create R2 client
    print("🔗 Connecting to R2...")
    client = create_r2_client()
    print("✅ Connected\n")

    # Upload files
    success_count = 0
    fail_count = 0

    for i, (local_path, r2_key) in enumerate(files, 1):
        if upload_file(client, local_path, r2_key, i, len(files)):
            success_count += 1
        else:
            fail_count += 1

    # Summary
    print("\n" + "=" * 70)
    print("📊 UPLOAD SUMMARY")
    print("=" * 70)
    print(f"✅ Successfully uploaded: {success_count} files")
    print(f"❌ Failed: {fail_count} files")
    print(f"☁️  R2 location: s3://{BUCKET_NAME}/{r2_path}/")
    print()

    if success_count > 0:
        print("🔗 Files accessible at:")
        print(f"   https://{BUCKET_NAME}.r2.dev/{r2_path}/")
        print()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Upload interrupted by user (Ctrl+C)")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
