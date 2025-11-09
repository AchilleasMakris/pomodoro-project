import { useState, useEffect } from 'react'

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(() => {
    // Initial detection
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || window.matchMedia('(orientation: portrait)').matches
  })

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(orientation: portrait)').matches
      setIsMobile(mobile)
    }

    // Debounce resize events for performance
    let timeoutId: number
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkDevice, 300) as unknown as number
    }

    // Listen for both resize and orientation change
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', checkDevice)

    // Initial check
    checkDevice()

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', checkDevice)
    }
  }, [])

  return { isMobile }
}
