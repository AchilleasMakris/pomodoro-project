/**
 * Supabase Auth with Discord OAuth Provider
 *
 * This module provides secure authentication using Supabase's built-in
 * Discord OAuth integration. Users get proper JWT tokens and full RLS protection.
 */

import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export interface AppUser {
  id: string
  auth_user_id: string
  discord_id: string
  username: string
  avatar: string | null
  level: number
  xp: number
  prestige_level: number
  level_path: 'elf' | 'human'
  consecutive_login_days: number
  total_unique_days: number
  total_pomodoros: number
  total_study_minutes: number
  sound_enabled: boolean
  volume: number
  music_volume: number
  level_system_enabled: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export interface AuthResult {
  user: User
  session: Session
  appUser: AppUser
}

/**
 * Check if running inside Discord iframe
 */
function isInDiscord(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.has('frame_id') || params.has('instance_id')
}

/**
 * Initialize Supabase Auth session
 * Checks for existing session or redirects to Discord OAuth
 */
export async function authenticateWithSupabase(): Promise<AuthResult> {
  console.log('[Supabase Auth] Checking for existing session...')

  // Check if we're in Discord's iframe context
  if (!isInDiscord()) {
    console.error('[Supabase Auth] Not running in Discord context')
    throw new Error('Discord Activities must be launched from Discord. Please open this app from Discord\'s Activities menu.')
  }

  // Check for existing session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('[Supabase Auth] Error getting session:', sessionError)
    throw new Error('Failed to get authentication session')
  }

  // If we have a valid session, fetch user data
  if (session?.user) {
    console.log('[Supabase Auth] Found existing session for:', session.user.email || session.user.id)

    try {
      const appUser = await fetchOrCreateAppUser(session.user)
      return {
        user: session.user,
        session,
        appUser
      }
    } catch (error) {
      console.error('[Supabase Auth] Error fetching user data:', error)
      throw new Error('Failed to load user profile')
    }
  }

  // No session - need to authenticate
  console.log('[Supabase Auth] No session found, initiating Discord OAuth...')
  await signInWithDiscord()

  // This will not return immediately - the page will redirect to Discord
  throw new Error('Redirecting to Discord authentication...')
}

/**
 * Sign in with Discord OAuth via Supabase Auth
 */
export async function signInWithDiscord(): Promise<void> {
  console.log('[Supabase Auth] Initiating Discord OAuth flow...')

  // Get the current URL for redirect
  const redirectTo = window.location.origin + window.location.pathname

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo,
      scopes: 'identify email guilds',
    }
  })

  if (error) {
    console.error('[Supabase Auth] Discord OAuth error:', error)
    throw new Error(`Failed to initiate Discord authentication: ${error.message}`)
  }

  // Browser will redirect to Discord, then back to our app
  console.log('[Supabase Auth] Redirecting to Discord...')
}

/**
 * Fetch or create app user profile
 */
async function fetchOrCreateAppUser(authUser: User): Promise<AppUser> {
  console.log('[Supabase Auth] Fetching app user for auth ID:', authUser.id)

  // Extract Discord data from user metadata
  const discordId = authUser.user_metadata?.provider_id || authUser.id
  const username = authUser.user_metadata?.full_name ||
                   authUser.user_metadata?.user_name ||
                   authUser.email?.split('@')[0] ||
                   'Discord User'
  const avatar = authUser.user_metadata?.avatar_url || null

  console.log('[Supabase Auth] Discord data:', { discordId, username, avatar })

  // Try to fetch existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', authUser.id)
    .maybeSingle()

  if (fetchError) {
    console.error('[Supabase Auth] Error fetching user:', fetchError)
    throw new Error('Failed to fetch user profile')
  }

  // If user exists, update and return
  if (existingUser) {
    console.log('[Supabase Auth] Found existing user:', existingUser.username)

    // Update last login and Discord data
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        username,
        avatar,
        last_login: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('auth_user_id', authUser.id)
      .select()
      .single()

    if (updateError) {
      console.error('[Supabase Auth] Error updating user:', updateError)
      // Non-fatal - return existing user
      return existingUser as AppUser
    }

    return updatedUser as AppUser
  }

  // User doesn't exist - should have been created by trigger, but create manually if needed
  console.log('[Supabase Auth] Creating new user profile...')

  const { data: newUser, error: createError } = await supabase
    .from('users')
    .insert({
      auth_user_id: authUser.id,
      discord_id: discordId,
      username,
      avatar,
      last_login: new Date().toISOString()
    })
    .select()
    .single()

  if (createError) {
    console.error('[Supabase Auth] Error creating user:', createError)
    throw new Error('Failed to create user profile')
  }

  console.log('[Supabase Auth] Created new user:', newUser.username)
  return newUser as AppUser
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  console.log('[Supabase Auth] Signing out...')

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('[Supabase Auth] Error signing out:', error)
    throw new Error('Failed to sign out')
  }

  console.log('[Supabase Auth] Signed out successfully')
}

/**
 * Get current session
 */
export async function getCurrentSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}

/**
 * Get Discord avatar URL
 */
export function getAvatarUrl(user: AppUser, size: number = 128): string {
  if (!user.avatar) {
    // Default Discord avatar
    const discriminator = parseInt(user.discord_id) % 5
    return `https://cdn.discordapp.com/embed/avatars/${discriminator}.png`
  }

  // Check if avatar is already a full URL
  if (user.avatar.startsWith('http')) {
    return user.avatar
  }

  // Construct Discord CDN URL
  const format = user.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.${format}?size=${size}`
}
