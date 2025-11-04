// Upload ambient sound effects to Cloudflare R2
// Run with: node upload-sounds-to-r2.js

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// R2 Configuration
const ACCOUNT_ID = 'YOUR_ACCOUNT_ID';
const ACCESS_KEY_ID = 'YOUR_ACCESS_KEY_ID'; // Paste your Access Key ID here
const SECRET_ACCESS_KEY = 'YOUR_SECRET_ACCESS_KEY'; // Paste your Secret Access Key here
const BUCKET_NAME = 'pomodoro-music'; // Same bucket, different folder

// Configure S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `effects/${key}`, // Upload to effects/ folder
    Body: fileContent,
    ContentType: 'audio/mpeg',
  });

  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error(`Error uploading ${key}:`, error.message);
    return false;
  }
}

async function uploadAllSounds() {
  const soundsDir = path.join(__dirname, 'sounds');

  // Check if sounds directory exists
  if (!fs.existsSync(soundsDir)) {
    console.error(`\n❌ Error: 'sounds' directory not found!`);
    console.log(`\nPlease create a 'sounds' folder in the project root and add your .mp3 files there.`);
    console.log(`Expected location: ${soundsDir}\n`);
    return;
  }

  const files = fs.readdirSync(soundsDir).filter(f => f.endsWith('.mp3'));

  if (files.length === 0) {
    console.error(`\n❌ No .mp3 files found in the sounds directory!`);
    console.log(`\nPlease add ambient sound .mp3 files to: ${soundsDir}\n`);
    return;
  }

  console.log(`\n🎵 Found ${files.length} sound files to upload\n`);
  console.log(`Uploading to: ${BUCKET_NAME}/effects/\n`);

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(soundsDir, file);
    const fileSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);

    process.stdout.write(`Uploading: ${file} (${fileSize} MB)... `);

    const success = await uploadFile(filePath, file);

    if (success) {
      uploaded++;
      console.log('✓ Done');
    } else {
      failed++;
      console.log('✗ Failed');
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✓ Successful: ${uploaded}`);
  console.log(`   ✗ Failed: ${failed}`);
  console.log(`   📁 Total: ${files.length}\n`);

  if (uploaded > 0) {
    console.log(`✅ Successfully uploaded ${uploaded} sound files to R2!`);
    console.log(`   They will be accessible at: /r2-effects/<filename>.mp3\n`);
  }
}

// Run the upload
console.log('\n🚀 Starting ambient sounds upload to R2...\n');
uploadAllSounds().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
