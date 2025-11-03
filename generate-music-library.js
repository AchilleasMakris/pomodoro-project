#!/usr/bin/env node
/**
 * Music Library Generator
 *
 * This script scans the /music directory and generates JavaScript code
 * for the MUSIC_LIBRARY array that you can copy into musicPlayer.js
 *
 * Usage:
 *   node generate-music-library.js
 *
 * Or to save to a file:
 *   node generate-music-library.js > music-library-generated.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MUSIC_DIR = './music';
const MAX_TRACKS = 50; // Limit to first 50 tracks (change as needed)

// Function to generate a safe ID from filename
function generateId(filename) {
  return filename
    .replace(/\.mp3$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .substring(0, 50); // Limit length
}

// Function to parse artist and title from filename
function parseFilename(filename) {
  // Remove .mp3 extension
  let name = filename.replace(/\.mp3$/i, '');

  // Try various patterns to extract artist and title

  // Pattern: "Artist - Title"
  if (name.includes(' - ')) {
    const parts = name.split(' - ');
    if (parts.length >= 2) {
      // Remove track numbers from artist
      let artist = parts[0].replace(/^\d+\.?\s*/, '').replace(/^\(\d+\)\s*/, '').trim();
      let title = parts.slice(1).join(' - ').trim();
      return { artist, title };
    }
  }

  // Pattern: "Artist x Artist - Title"
  const xMatch = name.match(/^(.*?)\s+x\s+(.*?)\s+-\s+(.+)$/);
  if (xMatch) {
    return {
      artist: `${xMatch[1]} x ${xMatch[2]}`,
      title: xMatch[3]
    };
  }

  // Pattern: "## Title (feat. Artist)"
  const featMatch = name.match(/^\d+\.?\s*(.+?)\s*\((?:feat|ft|with)\.?\s+(.+?)\)/i);
  if (featMatch) {
    return {
      artist: featMatch[2],
      title: `${featMatch[1]} (feat. ${featMatch[2]})`
    };
  }

  // Pattern: "## Title w/ Artist"
  const withMatch = name.match(/^\d+\.?\s*(.+?)\s+w[/_]\s+(.+?)$/i);
  if (withMatch) {
    return {
      artist: withMatch[2],
      title: `${withMatch[1]} (with ${withMatch[2]})`
    };
  }

  // Default: Remove track numbers and use as title
  let cleanName = name.replace(/^\d+\.?\s*/, '').replace(/^\(\d+\)\s*/, '').trim();

  return {
    artist: 'Various Artists',
    title: cleanName
  };
}

// Main function
function generateMusicLibrary() {
  try {
    // Read all files from music directory
    const files = fs.readdirSync(MUSIC_DIR)
      .filter(file => file.toLowerCase().endsWith('.mp3'))
      .sort()
      .slice(0, MAX_TRACKS); // Limit to MAX_TRACKS

    if (files.length === 0) {
      console.error('No MP3 files found in ' + MUSIC_DIR);
      process.exit(1);
    }

    console.log('// Generated Music Library');
    console.log(`// Found ${files.length} MP3 files (showing first ${MAX_TRACKS})`);
    console.log('// Copy this array into sources/musicPlayer.js\n');
    console.log('const MUSIC_LIBRARY = [');

    files.forEach((file, index) => {
      const { artist, title } = parseFilename(file);
      const id = generateId(file);

      console.log('  {');
      console.log(`    id: '${id}',`);
      console.log(`    title: '${title.replace(/'/g, "\\'")}',`);
      console.log(`    artist: '${artist.replace(/'/g, "\\'")}',`);
      console.log(`    file: '/music/${file.replace(/'/g, "\\'")}',`);
      console.log(`    credits: 'Royalty-free lofi music'`);
      console.log(`  }${index < files.length - 1 ? ',' : ''}`);
    });

    console.log('];\n');
    console.log('// Make library globally accessible for credits display');
    console.log('window.MUSIC_LIBRARY = MUSIC_LIBRARY;');

    console.error(`\n✅ Generated ${files.length} track entries!`);
    console.error(`\n📝 Instructions:`);
    console.error(`1. Copy the generated code above`);
    console.error(`2. Open sources/musicPlayer.js`);
    console.error(`3. Replace the existing MUSIC_LIBRARY array`);
    console.error(`4. Save the file and reload your app\n`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateMusicLibrary();
