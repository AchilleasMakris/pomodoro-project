// Base URL for R2 assets
const R2_BASE_URL = 'https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev';

// Base URL for R2 effects folder
export const R2_EFFECTS_BASE_URL = `${R2_BASE_URL}/effects`;
export const R2_MUSIC_BASE_URL = `${R2_BASE_URL}/music`;
export const R2_BACKGROUNDS_BASE_URL = `${R2_BASE_URL}/backgrounds`;

export const AMBIENT_SOUNDS = {
  nature: {
    label: 'Sounds From In The Woods',
    icon: '🌲',
    sounds: [
      {
        id: 'rain',
        name: 'Rain',
        file: `${R2_EFFECTS_BASE_URL}/rain.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'birds',
        name: 'Bird Chirping',
        file: `${R2_EFFECTS_BASE_URL}/birds.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'forest',
        name: 'Forest',
        file: `${R2_EFFECTS_BASE_URL}/forest.mp3`,
        loop: true,
        defaultVolume: 0
      }
    ]
  },
  allSounds: {
    label: 'All Sounds',
    icon: '🔊',
    sounds: [
      {
        id: 'brown-noise',
        name: 'Brown Noise',
        file: `${R2_EFFECTS_BASE_URL}/brown-noise.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'keyboard',
        name: 'Keyboard',
        file: `${R2_EFFECTS_BASE_URL}/keyboard-sound.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'campfire',
        name: 'Campfire',
        file: `${R2_EFFECTS_BASE_URL}/campfire.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'waves',
        name: 'Waves',
        file: `${R2_EFFECTS_BASE_URL}/waves.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'wind',
        name: 'Wind',
        file: `${R2_EFFECTS_BASE_URL}/wind.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'underwater',
        name: 'Underwater',
        file: `${R2_EFFECTS_BASE_URL}/underwater.mp3`,
        loop: true,
        defaultVolume: 0
      }
    ]
  }
};
