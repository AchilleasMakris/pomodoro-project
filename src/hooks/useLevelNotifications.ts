import { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { getLevelName } from '../data/levels';

export function useLevelNotifications() {
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [lastXPGained, setLastXPGained] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ level: 1, levelName: '' });

  const level = useSettingsStore((state) => state.level);
  const levelPath = useSettingsStore((state) => state.levelPath);
  const xp = useSettingsStore((state) => state.xp);

  // Watch for XP changes
  useEffect(() => {
    const prevXP = parseInt(localStorage.getItem('prevXP') || '0');
    const prevLevel = parseInt(localStorage.getItem('prevLevel') || '1');

    if (xp !== prevXP) {
      // XP changed - show popup
      const gained = xp > prevXP ? xp - prevXP : 50; // Approximate if wrapped
      setLastXPGained(gained);
      setShowXPPopup(true);

      setTimeout(() => setShowXPPopup(false), 2000);

      localStorage.setItem('prevXP', xp.toString());
    }

    if (level !== prevLevel && level > prevLevel) {
      // Level up!
      setLevelUpData({
        level,
        levelName: getLevelName(level, levelPath)
      });
      setShowLevelUp(true);

      setTimeout(() => setShowLevelUp(false), 3000);

      localStorage.setItem('prevLevel', level.toString());
    }
  }, [xp, level, levelPath]);

  return {
    showXPPopup,
    lastXPGained,
    showLevelUp,
    levelUpData
  };
}
