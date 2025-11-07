import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS, USERNAME_EDIT_COOLDOWN, USERNAME_EDIT_COST } from '../data/constants';
import { MAX_LEVEL, XP_PER_MINUTE, getXPNeeded } from '../data/levels';

interface SettingsStore extends Settings {
  // Timer actions
  setPomodoroDuration: (minutes: number) => void;
  setShortBreakDuration: (minutes: number) => void;
  setLongBreakDuration: (minutes: number) => void;
  setPomodorosBeforeLongBreak: (count: number) => void;
  setAutoStartBreaks: (enabled: boolean) => void;
  setAutoStartPomodoros: (enabled: boolean) => void;

  // Audio actions
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setAmbientVolume: (soundId: string, volume: number) => void;

  // Visual actions
  setBackground: (background: string) => void;
  setPlaylist: (playlist: 'lofi' | 'synthwave') => void;

  // Level system actions
  addXP: (minutes: number) => void;
  setUsername: (username: string, forceWithXP?: boolean) => void;
  setLevelPath: (path: 'elf' | 'human') => void;
  setLevelSystemEnabled: (enabled: boolean) => void;
  resetProgress: () => void;
  prestige: () => void;

  // Computed
  canEditUsername: () => boolean;
  getXPCost: () => number;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      // Initial state from defaults
      ...DEFAULT_SETTINGS,

      // Timer actions
      setPomodoroDuration: (minutes) =>
        set((state) => ({
          timers: { ...state.timers, pomodoro: minutes },
        })),

      setShortBreakDuration: (minutes) =>
        set((state) => ({
          timers: { ...state.timers, shortBreak: minutes },
        })),

      setLongBreakDuration: (minutes) =>
        set((state) => ({
          timers: { ...state.timers, longBreak: minutes },
        })),

      setPomodorosBeforeLongBreak: (count) =>
        set({ pomodorosBeforeLongBreak: count }),

      setAutoStartBreaks: (enabled) => set({ autoStartBreaks: enabled }),

      setAutoStartPomodoros: (enabled) => set({ autoStartPomodoros: enabled }),

      // Audio actions
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setVolume: (volume) => set({ volume }),

      setMusicVolume: (volume) => set({ musicVolume: volume }),

      setAmbientVolume: (soundId, volume) =>
        set((state) => ({
          ambientVolumes: { ...state.ambientVolumes, [soundId]: volume },
        })),

      // Visual actions
      setBackground: (background) => set({ background }),
      setPlaylist: (playlist) => set({ playlist }),

      // Level system actions
      addXP: (minutes) => {
        const state = get();
        const xpGained = minutes * XP_PER_MINUTE;
        let newXP = state.xp + xpGained;
        let newLevel = state.level;
        let newPrestigeLevel = state.prestigeLevel;

        // Check for level ups
        while (newLevel < MAX_LEVEL && newXP >= getXPNeeded(newLevel)) {
          newXP -= getXPNeeded(newLevel);
          newLevel++;
        }

        // Check for prestige
        if (newLevel >= MAX_LEVEL && newXP > 0) {
          newPrestigeLevel++;
          newLevel = 1;
          // XP continues to accumulate
        }

        set({
          xp: newXP,
          level: newLevel,
          prestigeLevel: newPrestigeLevel,
          totalPomodoros: state.totalPomodoros + 1,
          totalStudyMinutes: state.totalStudyMinutes + minutes,
        });
      },

      setUsername: (username, forceWithXP = false) => {
        const state = get();

        if (forceWithXP) {
          // Spend XP to change username early
          if (state.xp >= USERNAME_EDIT_COST) {
            set({
              username,
              xp: state.xp - USERNAME_EDIT_COST,
              lastUsernameChange: Date.now(),
            });
          }
        } else {
          // Normal username change (cooldown must have passed)
          set({
            username,
            lastUsernameChange: Date.now(),
          });
        }
      },

      setLevelPath: (path) => set({ levelPath: path }),

      setLevelSystemEnabled: (enabled) => set({ levelSystemEnabled: enabled }),

      resetProgress: () =>
        set({
          xp: 0,
          level: 1,
          prestigeLevel: 0,
          totalPomodoros: 0,
          totalStudyMinutes: 0,
        }),

      prestige: () => {
        const state = get();
        set({
          level: 1,
          xp: 0,
          prestigeLevel: state.prestigeLevel + 1,
        });
      },

      // Computed
      canEditUsername: () => {
        const state = get();
        if (!state.lastUsernameChange) return true;
        return Date.now() - state.lastUsernameChange >= USERNAME_EDIT_COOLDOWN;
      },

      getXPCost: () => USERNAME_EDIT_COST,
    }),
    {
      name: 'pomodoroSettings',
    }
  )
);
