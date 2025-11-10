import { DiscordSDK, type DiscordSDKMock } from '@discord/embedded-app-sdk'

export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  email?: string
}

export interface AuthResult {
  discordUser: DiscordUser
  discordSdk: DiscordSDK | DiscordSDKMock
  accessToken: string
}

/**
 * Check if running inside Discord iframe
 */
function isInDiscord(): boolean {
  const params = new URLSearchParams(window.location.search)
  return params.has('frame_id') || params.has('instance_id')
}

/**
 * Initialize and authenticate with Discord Embedded SDK
 * Implements auto-login for returning users with prompt: "none"
 */
export async function authenticateDiscordUser(): Promise<AuthResult> {
  // Check if we're in Discord's iframe context
  if (!isInDiscord()) {
    console.error('[Discord Auth] Not running in Discord context - authentication will fail')
    throw new Error('Discord Activities must be launched from Discord. Please open this app from Discord\'s Activities menu.')
  }

  // Step 1: Initialize Discord SDK
  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID)

  console.log('[Discord Auth] Initializing SDK...')

  // Step 2: Wait for SDK to be ready
  await discordSdk.ready()

  console.log('[Discord Auth] SDK ready, requesting authorization...')

  // Step 3: Authorize with Discord
  // prompt: "none" enables auto-login for users who have already authorized
  // We need to catch the error and re-prompt with "consent" for first-time users
  const { code } = await discordSdk.commands
    .authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: 'code',
      state: '',
      prompt: 'none', // Auto-login for returning users
      scope: [
        'identify', // User ID, username, avatar
        'guilds', // Server list
        'guilds.members.read', // Member info
      ],
    })
    .catch(async (err) => {
      console.warn('[Discord Auth] `prompt: "none"` failed, re-prompting with `prompt: "consent"`', err)
      // If the user has not authorized before, `prompt: 'none'` will fail.
      // We catch this and re-run with `prompt: 'consent'` to show the auth modal.
      return discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: 'code',
        state: '',
        scope: [
          'identify', // User ID, username, avatar
          'guilds', // Server list
          'guilds.members.read', // Member info
        ],
      })
    })

  console.log('[Discord Auth] Authorization successful, exchanging code...')

  // Step 4: Exchange code for access token
  // Use Discord proxy to avoid CSP blocking
  // Discord URL Mapping: /proxy/supabase → btjhclvebbtjxmdnprwz.supabase.co
  const tokenResponse = await fetch(
    '/proxy/supabase/functions/v1/discord-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ code }),
    }
  )

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text()
    console.error('[Discord Auth] Token exchange failed:', error)
    throw new Error('Failed to exchange authorization code')
  }

  const { access_token } = await tokenResponse.json()

  console.log('[Discord Auth] Token received, authenticating SDK...')

  // Step 5: Authenticate Discord SDK with access token
  await discordSdk.commands.authenticate({
    access_token,
  })

  console.log('[Discord Auth] SDK authenticated, fetching user data...')

  // Step 6: Fetch Discord user data
  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!userResponse.ok) {
    const error = await userResponse.text()
    console.error('[Discord Auth] Failed to fetch user data:', error)
    throw new Error('Failed to fetch Discord user data')
  }

  const discordUser: DiscordUser = await userResponse.json()

  console.log('[Discord Auth] Authentication complete for:', discordUser.username)

  return {
    discordUser,
    discordSdk,
    accessToken: access_token,
  }
}

/**
 * Get Discord user's avatar URL
 */
export function getAvatarUrl(user: DiscordUser, size: number = 128): string {
  if (!user.avatar) {
    // Default avatar based on discriminator
    const defaultAvatarNumber = parseInt(user.discriminator) % 5
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
  }

  const format = user.avatar.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`
}

/**
 * Get current voice channel participants (requires discordSdk)
 */
export async function getVoiceChannelParticipants(discordSdk: DiscordSDK | DiscordSDKMock) {
  try {
    const participants = await discordSdk.commands.getInstanceConnectedParticipants()
    return participants.participants
  } catch (error) {
    console.error('[Discord Auth] Failed to get voice participants:', error)
    return []
  }
}
