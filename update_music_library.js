#!/usr/bin/env node
/**
 * Update MUSIC_LIBRARY entries:
 * 1. Add genre: 'lofi' to all tracks
 * 2. Update file paths from /r2-audio/ to /r2-audio/lofi/
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sources', 'musicPlayer.js');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match each track object
// Matches from opening { to closing }, including nested properties
const trackPattern = /{\s*id:\s*'[^']+',\s*title:\s*'[^']+',\s*artist:\s*'[^']+',\s*file:\s*"\/r2-audio\/[^"]+",\s*credits:\s*'[^']+'\s*}/g;

let matchCount = 0;

// Replace each track to add genre and update file path
content = content.replace(trackPattern, (match) => {
  matchCount++;

  // Add genre: 'lofi' before the closing brace
  let updated = match.replace(/(\s*credits:\s*'[^']+')\s*}/, "$1,\n    genre: 'lofi'\n  }");

  // Update file path from /r2-audio/ to /r2-audio/lofi/
  updated = updated.replace(/file:\s*"\/r2-audio\//g, 'file: "/r2-audio/lofi/');

  return updated;
});

console.log(`✅ Updated ${matchCount} tracks`);

// Write the updated content back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ musicPlayer.js has been updated successfully!');
console.log('   - Added genre: "lofi" to all tracks');
console.log('   - Updated paths: /r2-audio/ → /r2-audio/lofi/');
