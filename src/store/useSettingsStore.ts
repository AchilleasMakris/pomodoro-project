import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '../types';
import { DEFAULT_SETTINGS, USERNAME_EDIT_COOLDOWN, USERNAME_EDIT_COST, getDefaultBackground, BACKGROUNDS } from '../data/constants';
import { MAX_LEVEL, XP_PER_MINUTE, getXPNeeded } from '../data/levels';
import { getMilestoneForDay, type MilestoneReward } from '../data/milestones';

// Helper to detect device type
const getIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || window.matchMedia('(orientation: portrait)').matches;
};

// Helper to validate background compatibility
const getValidBackgroundForDevice = (backgroundId: string, isMobile: boolean): string => {
  const background = BACKGROUNDS.find(bg => bg.id === backgroundId);
  if (!background) return getDefaultBackground(isMobile);

  const requiredOrientation = isMobile ? 'vertical' : 'horizontal';
  if (background.orientation !== requiredOrientation) {
    return getDefaultBackground(isMobile);
  }

  return backgroundId;
};

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

  // Milestone system actions
  unlockMilestoneReward: (milestone: MilestoneReward) => void;
  simulateUniqueDay: () => void; // Dev-only function to test milestones

  // Login tracking
  trackLogin: () => { isNewDay: boolean; currentDay: number };

  // Computed
  canEditUsername: () => boolean;
  getXPCost: () => number;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      // Initial state from defaults with device-aware background
      ...DEFAULT_SETTINGS,
      background: getValidBackgroundForDevice(DEFAULT_SETTINGS.background, getIsMobile()),

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

        // Check for daily milestone progress
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        let newTotalUniqueDays = state.totalUniqueDays;

        if (state.lastPomodoroDate !== today) {
          // This is the first Pomodoro of a new day
          newTotalUniqueDays = state.totalUniqueDays + 1;

          // Check if this new day count matches a milestone
          const milestone = getMilestoneForDay(newTotalUniqueDays);
          if (milestone) {
            // Unlock the milestone reward
            get().unlockMilestoneReward(milestone);
          }
        }

        set({
          xp: newXP,
          level: newLevel,
          prestigeLevel: newPrestigeLevel,
          totalPomodoros: state.totalPomodoros + 1,
          totalStudyMinutes: state.totalStudyMinutes + minutes,
          totalUniqueDays: newTotalUniqueDays,
          lastPomodoroDate: today,
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

      // Milestone system actions
      unlockMilestoneReward: (milestone) => {
        console.log(`🎉 Milestone Unlocked: ${milestone.title}`);
        console.log(`📝 ${milestone.description}`);
        console.log(`🎁 Reward: ${milestone.rewardType} - ${milestone.unlockId}`);

        // TODO: In the future, this will unlock actual backgrounds, themes, or badges
        // For now, just logging to console
        // Example future implementation:
        // - Add to unlockedBackgrounds array
        // - Add to unlockedThemes array
        // - Show a notification toast
      },

      simulateUniqueDay: () => {
        const state = get();
        const newTotalUniqueDays = state.totalUniqueDays + 1;

        // Check if this new day count matches a milestone
        const milestone = getMilestoneForDay(newTotalUniqueDays);
        if (milestone) {
          get().unlockMilestoneReward(milestone);
        }

        // Update state with new unique day count and a fake "yesterday" date
        // so the next real Pomodoro will count as today
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        set({
          totalUniqueDays: newTotalUniqueDays,
          lastPomodoroDate: yesterdayStr,
        });
      },

      trackLogin: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Check if this is a new day
        if (state.lastLoginDate === today) {
          // Same day, no updates needed
          return {
            isNewDay: false,
            currentDay: state.consecutiveLoginDays,
          };
        }

        // It's a new day!
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // Check if login is consecutive
        const isConsecutive = state.lastLoginDate === yesterdayStr;
        const newConsecutiveDays = isConsecutive
          ? Math.min(state.consecutiveLoginDays + 1, 12)
          : 1;
        const newTotalLoginDays = state.totalLoginDays + 1;

        set({
          lastLoginDate: today,
          consecutiveLoginDays: newConsecutiveDays,
          totalLoginDays: newTotalLoginDays,
        });

        return {
          isNewDay: true,
          currentDay: newConsecutiveDays,
        };
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
      onRehydrateStorage: () => (state) => {
        // After loading from localStorage, validate background compatibility
        if (state) {
          const isMobile = getIsMobile();
          const validBackground = getValidBackgroundForDevice(state.background, isMobile);
          if (validBackground !== state.background) {
            state.background = validBackground;
          }
        }
      },
    }
  )
);
