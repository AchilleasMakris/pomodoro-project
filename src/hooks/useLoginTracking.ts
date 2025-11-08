import { useSettingsStore } from '../store/useSettingsStore';

/**
 * Hook to access login tracking data
 *
 * @example
 * ```tsx
 * const { totalLoginDays, consecutiveLoginDays } = useLoginTracking();
 * console.log(`Total days: ${totalLoginDays}`);
 * console.log(`Streak: ${consecutiveLoginDays}`);
 * ```
 */
export function useLoginTracking() {
  const totalLoginDays = useSettingsStore((state) => state.totalLoginDays);
  const consecutiveLoginDays = useSettingsStore((state) => state.consecutiveLoginDays);
  const lastLoginDate = useSettingsStore((state) => state.lastLoginDate);

  return {
    totalLoginDays,        // Total unique days user visited the site
    consecutiveLoginDays,  // Current login streak (max 12)
    lastLoginDate,         // Last login date (YYYY-MM-DD format)
  };
}
