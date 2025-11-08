import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type PresenceStatus = 'connecting' | 'connected' | 'error'

export function useOnlinePresence() {
  const [count, setCount] = useState<number>(0)
  const [status, setStatus] = useState<PresenceStatus>('connecting')

  useEffect(() => {
    // Create a unique channel for presence tracking
    const channel = supabase.channel('pomodoro-online-users')

    // Subscribe to presence events
    channel
      .on('presence', { event: 'sync' }, () => {
        // Get current presence state and count users
        const presenceState = channel.presenceState()
        const onlineCount = Object.keys(presenceState).length
        setCount(onlineCount)
      })
      .subscribe(async (subscriptionStatus) => {
        if (subscriptionStatus === 'SUBSCRIBED') {
          setStatus('connected')
          // Track this user's presence
          await channel.track({
            online_at: new Date().toISOString(),
          })
        } else if (subscriptionStatus === 'CHANNEL_ERROR') {
          setStatus('error')
        }
      })

    // Cleanup on unmount
    return () => {
      channel.unsubscribe()
    }
  }, [])

  return { count, status }
}
