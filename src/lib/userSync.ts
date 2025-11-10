import { supabase } from './supabase'
import type { DiscordUser } from './discordAuth'

export interface AppUser {
  id: string
  discord_id: string
  username: string
  avatar: string | null

  // Gamification
  level: number
  xp: number
  prestige_level: number
  level_path: 'elf' | 'human'

  // Activity
  consecutive_login_days: number
  total_unique_days: number
  total_pomodoros: number
  total_study_minutes: number

  // Settings
  sound_enabled: boolean
  volume: number
  music_volume: number
  level_system_enabled: boolean

  // Timestamps
  last_login_date: string | null
  last_login: string
  created_at: string
  updated_at: string
}

/**
 * Sync Discord user to Supabase database
 * Creates new user if doesn't exist, updates if exists
 */
export async function syncDiscordUserToSupabase(
  discordUser: DiscordUser
): Promise<AppUser> {
  console.log('[User Sync] Syncing Discord user:', discordUser.username)

  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('discord_id', discordUser.id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116 = no rows returned, which is fine for new users
    console.error('[User Sync] Error fetching user:', fetchError)
    throw new Error('Failed to fetch user from database')
  }

  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  if (existingUser) {
    // User exists - update their info and check login streak
    console.log('[User Sync] Existing user found, updating...')

    const lastLoginDate = existingUser.last_login_date
    let consecutiveDays = existingUser.consecutive_login_days
    let totalUniqueDays = existingUser.total_unique_days

    // Check if this is a new day
    if (lastLoginDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      if (lastLoginDate === yesterdayStr) {
        // Consecutive day - increment streak
        consecutiveDays += 1
      } else {
        // Streak broken - reset to 1
        consecutiveDays = 1
      }

      // Always increment total unique days
      totalUniqueDays += 1
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        username: discordUser.username,
        avatar: discordUser.avatar,
        last_login: new Date().toISOString(),
        last_login_date: today,
        consecutive_login_days: consecutiveDays,
        total_unique_days: totalUniqueDays,
      })
      .eq('discord_id', discordUser.id)
      .select()
      .single()

    if (updateError) {
      console.error('[User Sync] Error updating user:', updateError)
      throw new Error('Failed to update user in database')
    }

    console.log('[User Sync] User updated successfully')
    return updatedUser as AppUser
  } else {
    // New user - create account
    console.log('[User Sync] New user, creating account...')

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        discord_id: discordUser.id,
        username: discordUser.username,
        avatar: discordUser.avatar,
        level: 1,
        xp: 0,
        prestige_level: 0,
        level_path: 'human',
        consecutive_login_days: 1,
        total_unique_days: 1,
        total_pomodoros: 0,
        total_study_minutes: 0,
        sound_enabled: true,
        volume: 80,
        music_volume: 50,
        level_system_enabled: true,
        last_login: new Date().toISOString(),
        last_login_date: today,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[User Sync] Error creating user:', insertError)
      throw new Error('Failed to create user in database')
    }

    console.log('[User Sync] New user created successfully')
    return newUser as AppUser
  }
}

/**
 * Update user XP and level
 */
export async function updateUserProgress(
  discordId: string,
  xpToAdd: number
): Promise<void> {
  const { data: user } = await supabase
    .from('users')
    .select('xp, level')
    .eq('discord_id', discordId)
    .single()

  if (!user) return

  const newXp = user.xp + xpToAdd

  await supabase
    .from('users')
    .update({ xp: newXp })
    .eq('discord_id', discordId)
}

/**
 * Log completed pomodoro to database
 */
export async function logCompletedPomodoro(
  userId: string,
  discordId: string,
  durationMinutes: number,
  xpEarned: number,
  taskName?: string,
  notes?: string
): Promise<void> {
  const { error } = await supabase.from('completed_pomodoros').insert({
    user_id: userId,
    discord_id: discordId,
    duration_minutes: durationMinutes,
    xp_earned: xpEarned,
    task_name: taskName,
    notes: notes,
  })

  if (error) {
    console.error('[User Sync] Error logging pomodoro:', error)
  }

  // Also update user totals
  const { data: user } = await supabase
    .from('users')
    .select('total_pomodoros, total_study_minutes')
    .eq('discord_id', discordId)
    .single()

  if (user) {
    await supabase
      .from('users')
      .update({
        total_pomodoros: user.total_pomodoros + 1,
        total_study_minutes: user.total_study_minutes + durationMinutes,
      })
      .eq('discord_id', discordId)
  }
}

/**
 * Get user's pomodoro history
 */
export async function getUserPomodoroHistory(
  discordId: string,
  limit: number = 50
) {
  const { data, error } = await supabase
    .from('completed_pomodoros')
    .select('*')
    .eq('discord_id', discordId)
    .order('completed_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[User Sync] Error fetching history:', error)
    return []
  }

  return data
}
