export interface Track {
  id: string;
  title: string;
  artist: string;
  file: string;
  genre: 'lofi' | 'synthwave';
  credits?: string;
}

export interface Settings {
  // Timer settings
  timers: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
  pomodorosBeforeLongBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;

  // Audio settings
  soundEnabled: boolean;
  volume: number;
  musicVolume: number;
  ambientVolumes: Record<string, number>;

  // Visual settings
  background: string;

  // Level system
  xp: number;
  level: number;
  prestigeLevel: number;
  totalPomodoros: number;
  totalStudyMinutes: number;
  username: string;
  lastUsernameChange: number | null;
  levelPath: 'elf' | 'human';
  levelSystemEnabled: boolean;
}

export interface LevelData {
  level: number;
  xp: number;
  xpNeeded: number;
  levelName: string;
  description: string;
  prestigeLevel: number;
  badge: string;
  roleEmoji: string;
}

export interface AmbientSound {
  id: string;
  name: string;
  file: string;
  volume: number;
}

export type TimerType = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerState {
  type: TimerType;
  isRunning: boolean;
  timeLeft: number;
  pomodoroCount: number;
}
