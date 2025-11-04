// Ambient Sounds Configuration
// Effects are hosted on R2 bucket in /effects/ folder

// Base URL for R2 effects folder
const R2_EFFECTS_BASE_URL = '/r2-effects';

export const AMBIENT_SOUNDS = {
  nature: {
    label: 'Sounds From In The Woods',
    icon: '🌲',
    sounds: [
      {
        id: 'forest-rain',
        name: 'Forest Rain',
        file: `${R2_EFFECTS_BASE_URL}/forest-rain.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'birds-chirping',
        name: 'Bird Chirping',
        file: `${R2_EFFECTS_BASE_URL}/birds-chirping.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'forest-ambience',
        name: 'Forest',
        file: `${R2_EFFECTS_BASE_URL}/forest-ambience.mp3`,
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
        id: 'pink-noise',
        name: 'Pink Noise',
        file: `${R2_EFFECTS_BASE_URL}/pink-noise.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'white-noise',
        name: 'White Noise',
        file: `${R2_EFFECTS_BASE_URL}/white-noise.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'keyboard',
        name: 'Keyboard',
        file: `${R2_EFFECTS_BASE_URL}/keyboard-typing.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'city-rain',
        name: 'City Rain',
        file: `${R2_EFFECTS_BASE_URL}/city-rain.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'city-traffic',
        name: 'City Traffic',
        file: `${R2_EFFECTS_BASE_URL}/city-traffic.mp3`,
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
        id: 'ocean',
        name: 'Ocean',
        file: `${R2_EFFECTS_BASE_URL}/ocean-waves.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'fireplace',
        name: 'Fireplace',
        file: `${R2_EFFECTS_BASE_URL}/fire-crackling.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'blizzard',
        name: 'Blizzard',
        file: `${R2_EFFECTS_BASE_URL}/blizzard.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'underwater',
        name: 'Underwater',
        file: `${R2_EFFECTS_BASE_URL}/underwater.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'deep-space',
        name: 'Deep Space',
        file: `${R2_EFFECTS_BASE_URL}/deep-space.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'window-rain',
        name: 'Window Rain',
        file: `${R2_EFFECTS_BASE_URL}/window-rain.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'train',
        name: 'Train',
        file: `${R2_EFFECTS_BASE_URL}/train.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'thunder',
        name: 'Thunders',
        file: `${R2_EFFECTS_BASE_URL}/thunder.mp3`,
        loop: true,
        defaultVolume: 0
      },
      {
        id: 'plane',
        name: 'Plane',
        file: `${R2_EFFECTS_BASE_URL}/plane.mp3`,
        loop: true,
        defaultVolume: 0
      }
    ]
  }
};
