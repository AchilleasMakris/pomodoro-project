import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'
import { useOnlinePresence } from '../../hooks/useOnlinePresence'

const formatCount = (count: number): string => {
  if (count < 1000) return count.toString()
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
  return `${(count / 1000000).toFixed(1)}M`
}

export const OnlinePresenceCounter = memo(function OnlinePresenceCounter() {
  const { count, status } = useOnlinePresence()

  // Loading state
  if (status === 'connecting') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" />
        <Users size={14} className="opacity-50 text-gray-400" />
        <span className="text-sm text-gray-400 tabular-nums">--</span>
      </div>
    )
  }

  // Error state - gracefully hide
  if (status === 'error') {
    return null
  }

  // Connected state - show animated count
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${count} ${count === 1 ? 'user' : 'users'} online`}
    >
      {/* Pulsing status indicator */}
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
      </div>

      {/* Icon */}
      <Users size={14} className="text-gray-300" aria-hidden="true" />

      {/* Animated count */}
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-sm font-medium text-white tabular-nums"
          aria-hidden="true"
        >
          {formatCount(count)}
        </motion.span>
      </AnimatePresence>

      {/* Screen reader text */}
      <span className="sr-only">
        {count} {count === 1 ? 'user' : 'users'} online
      </span>
    </motion.div>
  )
});
