import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { DiscordSDK, DiscordSDKMock } from '@discord/embedded-app-sdk'
import { authenticateDiscordUser, type DiscordUser } from '../lib/discordAuth'
import { syncDiscordUserToSupabase, type AppUser } from '../lib/userSync'

interface AuthContextType {
  // Authentication state
  authenticated: boolean
  loading: boolean
  error: string | null

  // User data
  discordUser: DiscordUser | null
  appUser: AppUser | null
  discordSdk: DiscordSDK | DiscordSDKMock | null

  // Methods
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [discordSdk, setDiscordSdk] = useState<DiscordSDK | DiscordSDKMock | null>(null)

  const authenticateUser = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('[Auth] Starting authentication flow...')

      // Step 1: Authenticate with Discord
      const authResult = await authenticateDiscordUser()

      console.log('[Auth] Discord authentication successful')

      // Step 2: Sync to Supabase database
      const user = await syncDiscordUserToSupabase(authResult.discordUser)

      console.log('[Auth] User synced to database')

      // Step 3: Set state
      setDiscordUser(authResult.discordUser)
      setAppUser(user)
      setDiscordSdk(authResult.discordSdk)
      setAuthenticated(true)

      console.log('[Auth] Authentication complete!')
    } catch (err) {
      console.error('[Auth] Authentication failed:', err)
      setError(err instanceof Error ? err.message : 'Authentication failed')
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    if (!discordUser) return

    try {
      const user = await syncDiscordUserToSupabase(discordUser)
      setAppUser(user)
    } catch (err) {
      console.error('[Auth] Failed to refresh user:', err)
    }
  }

  // Authenticate on mount
  useEffect(() => {
    authenticateUser()
  }, [])

  const value: AuthContextType = {
    authenticated,
    loading,
    error,
    discordUser,
    appUser,
    discordSdk,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
