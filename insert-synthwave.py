#!/usr/bin/env python3
import sys

# Read the synthwave entries
with open('synthwave-entries-final.txt', 'r') as f:
    synthwave_content = f.read()

# Read the original musicPlayer.js
with open('sources/musicPlayer.js', 'r') as f:
    lines = f.readlines()

# Find the insertion point (after line 8: "  // === SYNTHWAVE TRACKS (88 tracks) ===")
output = []
inserted = False

for i, line in enumerate(lines, 1):
    output.append(line)

    # Insert after the synthwave comment line
    if i == 8 and '// === SYNTHWAVE TRACKS' in line and not inserted:
        # Add the synthwave entries
        output.append(synthwave_content)
        if not synthwave_content.endswith('\n'):
            output.append('\n')
        output.append('  // === LOFI TRACKS (799 tracks) ===\n')
        inserted = True

# Write back
with open('sources/musicPlayer.js', 'w') as f:
    f.writelines(output)

print("✓ Inserted 88 synthwave tracks")
print("✓ Added section markers for Synthwave and Lofi")
