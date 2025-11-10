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

  // Get the current URL for redirect, preserving Discord query params
  // Discord Activities require frame_id/instance_id to be preserved
  const redirectTo = window.location.origin + window.location.pathname + window.location.search

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo,
      scopes: 'identify guilds', // Email is optional - not all users share it
      skipBrowserRedirect: false,
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
  // Discord OAuth may use different field names
  const discordId = authUser.user_metadata?.provider_id ||
                    authUser.user_metadata?.sub
  
  if (!discordId) {
    console.error('[Supabase Auth] Missing Discord ID in user metadata:', authUser.user_metadata)
    throw new Error('Discord authentication failed: missing Discord user ID')
  }

  const username = authUser.user_metadata?.full_name ||
                   authUser.user_metadata?.name ||
                   authUser.user_metadata?.user_name ||
                   authUser.user_metadata?.username ||
                   authUser.email?.split('@')[0] ||
                   `Discord User ${discordId.substring(0, 8)}`

  const avatar = authUser.user_metadata?.avatar_url ||
                 authUser.user_metadata?.picture ||
                 null

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

    // Update last login and Discord data using RPC (maintains auth checks)
    const { data: updatedUser, error: updateError } = await supabase.rpc(
      'sync_discord_user_data',
      {
        p_auth_user_id: authUser.id,
        p_discord_id: discordId,
        p_username: username,
        p_avatar: avatar
      }
    )

    if (updateError) {
      console.error('[Supabase Auth] Error updating user:', updateError)
      // Non-fatal - return existing user
      return existingUser as AppUser
    }

    return updatedUser as AppUser
  }

  // User doesn't exist by auth_user_id - check for legacy account with discord_id
  console.log('[Supabase Auth] No user found by auth_user_id, checking for legacy account...')

  // Try to backfill legacy account (discord_id exists but auth_user_id is NULL)
  const { data: backfilled, error: backfillError } = await supabase.rpc(
    'backfill_auth_user_id',
    {
      p_discord_id: discordId,
      p_auth_user_id: authUser.id
    }
  )

  // All errors from backfill are authorization/security related - throw them
  if (backfillError) {
    console.error('[Supabase Auth] Backfill RPC error:', backfillError)
    throw new Error(`Failed to backfill legacy account: ${backfillError.message}`)
  }

  // RPC returns boolean: true if legacy account was linked, false if none exists
  if (backfilled === true) {
    console.log('[Supabase Auth] Successfully linked legacy account')

    // Fetch the newly linked user
    const { data: linkedUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', authUser.id)
      .single()

    if (fetchError || !linkedUser) {
      console.error('[Supabase Auth] Error fetching linked user:', fetchError)
      throw new Error('Failed to fetch linked user profile')
    }

    return linkedUser as AppUser
  }

  // backfilled === false means no legacy account exists - proceed to create new user
  console.log('[Supabase Auth] No legacy account found, will create new user')

  // No existing user found - create new profile
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
    // Default Discord avatar (Discord has 6 default avatars: 0-5)
    const discriminator = parseInt(user.discord_id) % 6
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
