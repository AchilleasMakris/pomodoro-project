export const R2_BASE_URL = 'https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev';
export const R2_MUSIC_BASE_URL = `${R2_BASE_URL}/music`;
export const R2_EFFECTS_BASE_URL = `${R2_BASE_URL}/effects`;
export const R2_BACKGROUNDS_BASE_URL = `${R2_BASE_URL}/backgrounds`;

export const AMBIENT_SOUNDS = [
  { id: 'rain', name: 'Rain', file: `${R2_EFFECTS_BASE_URL}/rain.mp3` },
  { id: 'birds', name: 'Birds', file: `${R2_EFFECTS_BASE_URL}/birds.mp3` },
  { id: 'forest', name: 'Forest', file: `${R2_EFFECTS_BASE_URL}/forest.mp3` },
  { id: 'brown-noise', name: 'Brown Noise', file: `${R2_EFFECTS_BASE_URL}/brown-noise.mp3` },
  { id: 'keyboard', name: 'Keyboard', file: `${R2_EFFECTS_BASE_URL}/keyboard-sound.mp3` },
  { id: 'campfire', name: 'Campfire', file: `${R2_EFFECTS_BASE_URL}/campfire.mp3` },
  { id: 'waves', name: 'Waves', file: `${R2_EFFECTS_BASE_URL}/waves.mp3` },
  { id: 'wind', name: 'Wind', file: `${R2_EFFECTS_BASE_URL}/wind.mp3` },
  { id: 'underwater', name: 'Underwater', file: `${R2_EFFECTS_BASE_URL}/underwater.mp3` },
];

export const BACKGROUNDS = [
  {
    id: 'road-video',
    name: 'Road',
    file: `${R2_BACKGROUNDS_BASE_URL}/road.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_road-poster.webp`,
    type: 'video' as const,
    orientation: 'horizontal' as const
  },
  {
    id: 'room-video',
    name: 'Room',
    file: `${R2_BACKGROUNDS_BASE_URL}/room.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_room-poster.webp`,
    type: 'video' as const,
    orientation: 'horizontal' as const
  },
  {
    id: 'eyes-video',
    name: 'Eyes',
    file: `${R2_BACKGROUNDS_BASE_URL}/eyes-wallpaper.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_eyes-wallpaper-poster.webp`,
    type: 'video' as const,
    orientation: 'horizontal' as const
  },
  {
    id: 'anime-video',
    name: 'Anime',
    file: `${R2_BACKGROUNDS_BASE_URL}/anime.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_anime-poster.webp`,
    type: 'video' as const,
    orientation: 'vertical' as const
  },
  {
    id: 'forest-video',
    name: 'Forest',
    file: `${R2_BACKGROUNDS_BASE_URL}/forest.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_forest-poster.webp`,
    type: 'video' as const,
    orientation: 'vertical' as const
  },
  {
    id: 'landscape-video',
    name: 'Landscape',
    file: `${R2_BACKGROUNDS_BASE_URL}/landscape.mp4`,
    poster: `${R2_BACKGROUNDS_BASE_URL}/backgrounds_landscape-poster.webp`,
    type: 'video' as const,
    orientation: 'vertical' as const
  },
];

// Helper function to get backgrounds by orientation
export const getBackgroundsByOrientation = (orientation: 'vertical' | 'horizontal') => {
  return BACKGROUNDS.filter(bg => bg.orientation === orientation);
};

// Helper function to get device-appropriate default background
export const getDefaultBackground = (isMobile: boolean) => {
  return isMobile ? 'anime-video' : 'room-video';
};

export const BELL_SOUND = `${R2_EFFECTS_BASE_URL}/bell.mp3`;

export const DEFAULT_SETTINGS = {
  timers: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  pomodorosBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  volume: 50,
  musicVolume: 70,
  ambientVolumes: {
    rain: 0,
    birds: 0,
    forest: 0,
    'brown-noise': 0,
    keyboard: 0,
    campfire: 0,
    waves: 0,
    wind: 0,
    underwater: 0,
  },
  background: 'room-video',
  playlist: 'lofi' as const,
  xp: 0,
  level: 1,
  prestigeLevel: 0,
  totalPomodoros: 0,
  totalStudyMinutes: 0,
  username: 'User',
  lastUsernameChange: null,
  levelPath: 'elf' as const,
  levelSystemEnabled: true,
  totalUniqueDays: 0,
  lastPomodoroDate: null,
  totalLoginDays: 0,
  consecutiveLoginDays: 0,
  lastLoginDate: null,
};

export const USERNAME_EDIT_COOLDOWN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
export const USERNAME_EDIT_COST = 50; // XP cost to edit early
