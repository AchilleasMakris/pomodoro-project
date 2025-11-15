// Standalone version for Supabase Dashboard deployment
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

/**
 * Get required environment variable or throw error
 */
function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name)
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

/**
 * Get credentials based on server-side environment configuration
 */
function getCredentials(): { clientId: string; clientSecret: string; environment: string } {
  // Determine environment from server-side configuration
  // Defaults to 'production' if not set
  const environment = Deno.env.get('SUPABASE_ENV') || Deno.env.get('DENO_DEPLOYMENT_ID') ? 'production' : 'production'

  // Check if staging credentials are configured
  const stagingClientId = Deno.env.get('DISCORD_CLIENT_ID_STAGING')
  const stagingClientSecret = Deno.env.get('DISCORD_CLIENT_SECRET_STAGING')

  // If SUPABASE_ENV is explicitly set to 'staging' and staging credentials exist, use them
  const isStaging = Deno.env.get('SUPABASE_ENV') === 'staging' && stagingClientId && stagingClientSecret

  if (isStaging) {
    return {
      clientId: stagingClientId!,
      clientSecret: stagingClientSecret!,
      environment: 'staging'
    }
  }

  // Otherwise use production credentials (required)
  return {
    clientId: getRequiredEnv('DISCORD_CLIENT_ID'),
    clientSecret: getRequiredEnv('DISCORD_CLIENT_SECRET'),
    environment: 'production'
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code } = await req.json()

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization code' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get credentials from server-side environment configuration
    const { clientId, clientSecret, environment } = getCredentials()

    console.log('[Discord Token] Using', environment.toUpperCase(), 'credentials')

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Discord token exchange failed:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to exchange authorization code' }),
        {
          status: tokenResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const tokens = await tokenResponse.json()

    return new Response(JSON.stringify(tokens), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in discord-token function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
