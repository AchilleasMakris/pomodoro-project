export interface MilestoneReward {
  days: number;
  title: string;
  description: string;
  rewardType: 'background' | 'theme' | 'badge';
  unlockId: string; // ID of the item to unlock (background name, theme name, etc.)
}

export const MILESTONE_REWARDS: MilestoneReward[] = [
  {
    days: 5,
    title: '5 Day Achiever',
    description: 'Completed at least one Pomodoro on 5 different days!',
    rewardType: 'background',
    unlockId: 'milestone_bg_5',
  },
  {
    days: 10,
    title: '10 Day Warrior',
    description: 'Completed at least one Pomodoro on 10 different days!',
    rewardType: 'background',
    unlockId: 'milestone_bg_10',
  },
  {
    days: 15,
    title: '15 Day Champion',
    description: 'Completed at least one Pomodoro on 15 different days!',
    rewardType: 'theme',
    unlockId: 'milestone_theme_15',
  },
  {
    days: 20,
    title: '20 Day Legend',
    description: 'Completed at least one Pomodoro on 20 different days!',
    rewardType: 'badge',
    unlockId: 'milestone_badge_20',
  },
];

/**
 * Get the milestone for a specific day count
 */
export function getMilestoneForDay(days: number): MilestoneReward | undefined {
  return MILESTONE_REWARDS.find((milestone) => milestone.days === days);
}

/**
 * Get all milestones achieved up to a certain day count
 */
export function getAchievedMilestones(days: number): MilestoneReward[] {
  return MILESTONE_REWARDS.filter((milestone) => days >= milestone.days);
}

/**
 * Get the next milestone to achieve
 */
export function getNextMilestone(days: number): MilestoneReward | undefined {
  return MILESTONE_REWARDS.find((milestone) => milestone.days > days);
}
