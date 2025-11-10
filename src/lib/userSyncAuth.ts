/**
 * User Synchronization with Supabase Auth
 *
 * Handles syncing user data from Supabase Auth to the users table
 * with proper security via RLS policies
 */

import { supabase } from './supabase'
import type { AppUser } from './supabaseAuth'

/**
 * Update user's XP atomically
 */
export async function incrementUserXP(userId: string, xpToAdd: number): Promise<void> {
  console.log(`[User Sync] Incrementing XP for user ${userId} by ${xpToAdd}`)

  const { error } = await supabase.rpc('increment_user_xp', {
    p_user_id: userId,
    p_xp_amount: xpToAdd
  })

  if (error) {
    console.error('[User Sync] Error incrementing XP:', error)
    throw new Error('Failed to update XP')
  }

  console.log('[User Sync] XP updated successfully')
}

/**
 * Update user's pomodoro totals atomically
 */
export async function incrementPomodoroTotals(
  userId: string,
  pomodoroCount: number,
  minutes: number
): Promise<void> {
  console.log(`[User Sync] Incrementing pomodoro totals for user ${userId}`)

  const { error } = await supabase.rpc('increment_pomodoro_totals', {
    p_user_id: userId,
    p_pomodoro_count: pomodoroCount,
    p_minutes: minutes
  })

  if (error) {
    console.error('[User Sync] Error incrementing pomodoro totals:', error)
    throw new Error('Failed to update pomodoro statistics')
  }

  console.log('[User Sync] Pomodoro totals updated successfully')
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  settings: {
    sound_enabled?: boolean
    volume?: number
    music_volume?: number
    level_system_enabled?: boolean
    level_path?: 'elf' | 'human'
  }
): Promise<void> {
  console.log(`[User Sync] Updating settings for user ${userId}`, settings)

  const { error } = await supabase
    .from('users')
    .update({
      ...settings,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {
    console.error('[User Sync] Error updating settings:', error)
    throw new Error('Failed to update settings')
  }

  console.log('[User Sync] Settings updated successfully')
}

/**
 * Get user by auth user ID
 */
export async function getUserByAuthId(authUserId: string): Promise<AppUser | null> {
  console.log(`[User Sync] Fetching user by auth ID: ${authUserId}`)

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', authUserId)
    .maybeSingle()

  if (error) {
    console.error('[User Sync] Error fetching user:', error)
    throw new Error('Failed to fetch user')
  }

  return data as AppUser | null
}

/**
 * Update user login streak
 */
export async function updateLoginStreak(userId: string): Promise<void> {
  console.log(`[User Sync] Updating login streak for user ${userId}`)

  // Fetch current user to check last login date
  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('last_login_date, consecutive_login_days, total_unique_days')
    .eq('id', userId)
    .single()

  if (fetchError) {
    console.error('[User Sync] Error fetching user for streak:', fetchError)
    return // Non-fatal
  }

  const today = new Date().toISOString().split('T')[0]
  const lastLoginDate = user.last_login_date

  let updates: any = {
    last_login_date: today,
    last_login: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  if (!lastLoginDate) {
    // First login
    updates.consecutive_login_days = 1
    updates.total_unique_days = 1
  } else if (lastLoginDate === today) {
    // Already logged in today - no streak change
    console.log('[User Sync] User already logged in today')
    return
  } else {
    const lastDate = new Date(lastLoginDate)
    const currentDate = new Date(today)
    const dayDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

    if (dayDiff === 1) {
      // Consecutive day
      updates.consecutive_login_days = user.consecutive_login_days + 1
      updates.total_unique_days = user.total_unique_days + 1
    } else {
      // Streak broken
      updates.consecutive_login_days = 1
      updates.total_unique_days = user.total_unique_days + 1
    }
  }

  const { error: updateError } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)

  if (updateError) {
    console.error('[User Sync] Error updating streak:', updateError)
    // Non-fatal - continue
  } else {
    console.log('[User Sync] Login streak updated:', updates)
  }
}

/**
 * Save completed pomodoro atomically
 * Uses atomic database function to prevent inconsistent state
 */
export async function saveCompletedPomodoro(
  userId: string,
  discordId: string,
  data: {
    duration_minutes: number
    xp_earned: number
    task_name?: string
    notes?: string
  }
): Promise<string> {
  console.log(`[User Sync] Saving pomodoro for user ${userId}`)

  // Use atomic RPC function to save pomodoro and update stats in one transaction
  const { data: pomodoroId, error } = await supabase.rpc(
    'atomic_save_completed_pomodoro',
    {
      p_user_id: userId,
      p_discord_id: discordId,
      p_duration_minutes: data.duration_minutes,
      p_xp_earned: data.xp_earned,
      p_task_name: data.task_name || null,
      p_notes: data.notes || null
    }
  )

  if (error) {
    console.error('[User Sync] Error saving pomodoro:', error)
    throw new Error(`Failed to save pomodoro: ${error.message}`)
  }

  console.log('[User Sync] Pomodoro saved successfully:', pomodoroId)
  return pomodoroId as string
}

/**
 * Get user's recent pomodoros
 */
export async function getRecentPomodoros(
  userId: string,
  limit: number = 10
): Promise<any[]> {
  const { data, error } = await supabase
    .from('completed_pomodoros')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[User Sync] Error fetching pomodoros:', error)
    throw new Error('Failed to fetch pomodoro history')
  }

  return data || []
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string): Promise<{
  totalPomodoros: number
  totalMinutes: number
  averagePerDay: number
  currentStreak: number
}> {
  const { data: user, error } = await supabase
    .from('users')
    .select('total_pomodoros, total_study_minutes, consecutive_login_days, total_unique_days')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[User Sync] Error fetching stats:', error)
    throw new Error('Failed to fetch statistics')
  }

  // Calculate average based on total unique days (not consecutive days)
  const averagePerDay = user.total_pomodoros > 0
    ? Math.round(user.total_pomodoros / Math.max(1, user.total_unique_days))
    : 0

  return {
    totalPomodoros: user.total_pomodoros,
    totalMinutes: user.total_study_minutes,
    averagePerDay,
    currentStreak: user.consecutive_login_days
  }
}
