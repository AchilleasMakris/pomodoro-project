import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DAILY_GIFT_REWARDS } from '../../data/constants';

interface DailyGiftGridProps {
  show: boolean;
  onClose: () => void;
  currentDay: number; // 1-12, which day of consecutive visits
}

type GiftType = 'xp' | 'reward' | 'special' | 'gift';

interface GiftBox {
  id: number;
  type: GiftType;
  value: string;
  isRevealed: boolean;
  isSelected: boolean;
}

export function DailyGiftGrid({ show, onClose, currentDay }: DailyGiftGridProps) {
  // Initialize 12 gift boxes (6x2 grid)
  // Days 1-9 are regular XP, day 10 is special tomato with bonus, days 11-12 are bonus gifts
  const initializeGifts = (day: number): GiftBox[] => {
    const baseGifts: Omit<GiftBox, 'isRevealed' | 'isSelected'>[] = [
      { id: 1, type: 'xp', value: DAILY_GIFT_REWARDS[1].label },
      { id: 2, type: 'xp', value: DAILY_GIFT_REWARDS[2].label },
      { id: 3, type: 'xp', value: DAILY_GIFT_REWARDS[3].label },
      { id: 4, type: 'xp', value: DAILY_GIFT_REWARDS[4].label },
      { id: 5, type: 'xp', value: DAILY_GIFT_REWARDS[5].label },
      { id: 6, type: 'xp', value: DAILY_GIFT_REWARDS[6].label },
      { id: 7, type: 'xp', value: DAILY_GIFT_REWARDS[7].label },
      { id: 8, type: 'xp', value: DAILY_GIFT_REWARDS[8].label },
      { id: 9, type: 'xp', value: DAILY_GIFT_REWARDS[9].label },
      { id: 10, type: 'special', value: '🍅' },
      { id: 11, type: 'gift', value: DAILY_GIFT_REWARDS[11].label },
      { id: 12, type: 'reward', value: DAILY_GIFT_REWARDS[12].label },
    ];

    return baseGifts.map(gift => ({
      ...gift,
      // Mark previous days as revealed, current day as selected but not revealed yet
      isRevealed: gift.id < day,
      isSelected: gift.id === day,
    }));
  };

  const [gifts, setGifts] = useState<GiftBox[]>(() => initializeGifts(currentDay));

  // Reinitialize gifts when show becomes true with updated currentDay
  useEffect(() => {
    if (show) {
      setGifts(initializeGifts(currentDay));
    }
  }, [show, currentDay]);

  // Auto-reveal current day's gift and auto-close after 2.5 seconds
  useEffect(() => {
    if (show && currentDay >= 1 && currentDay <= 12) {
      // Wait 0.5s for entrance animation, then reveal current day's gift
      const revealTimer = setTimeout(() => {
        setGifts(prev => prev.map(g => ({
          ...g,
          isRevealed: g.id <= currentDay,
        })));
      }, 500);

      // Auto-close after 2.5 seconds total
      const closeTimer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => {
        clearTimeout(revealTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [show, currentDay, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none"
          />

          {/* Main container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10"
          >
            {/* Title */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white text-center mb-8"
            >
              Daily Gift
            </motion.h2>

            {/* Grid of gifts */}
            <div className="grid grid-cols-6 gap-3 max-w-3xl">
              {gifts.map((gift, index) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface GiftCardProps {
  gift: GiftBox;
  index: number;
}

function GiftCard({ gift, index }: GiftCardProps) {
  const isSpecialRevealed = gift.type === 'special' && gift.isRevealed;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
      className={`
        relative aspect-square rounded-2xl
        transition-all duration-300
        ${gift.isSelected
          ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent'
          : ''
        }
      `}
    >
      {/* Card background with gradient */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          transition-all duration-300
          ${isSpecialRevealed
            ? 'bg-gradient-to-br from-red-400 via-red-500 to-rose-600'
            : 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'
          }
          ${gift.isSelected && !isSpecialRevealed
            ? 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800'
            : ''
          }
        `}
      />

      {/* Glow effect for special gift */}
      {isSpecialRevealed && (
        <>
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-2xl bg-red-500/50 blur-xl"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-300 via-red-500 to-rose-600 opacity-50"
          />
        </>
      )}

      {/* Card content */}
      <div className="relative h-full flex items-center justify-center">
        {/* Unrevealed gifts show tomato icon */}
        {!gift.isRevealed && (
          <span className="text-5xl opacity-80">🍅</span>
        )}

        {/* Revealed XP gifts show the value */}
        {gift.type === 'xp' && gift.isRevealed && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white text-xl font-bold"
          >
            {gift.value}
          </motion.span>
        )}

        {/* Special tomato gift with animation when revealed */}
        {gift.type === 'special' && gift.isRevealed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-4xl"
            >
              {gift.value}
            </motion.span>
            <span className="text-white text-sm font-bold">
              {DAILY_GIFT_REWARDS[10].label}
            </span>
          </motion.div>
        )}

        {/* Revealed gift boxes (day 11) show gift icon with XP */}
        {gift.type === 'gift' && gift.isRevealed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Gift className="w-8 h-8 text-yellow-400" />
            <span className="text-white text-sm font-bold">{gift.value}</span>
          </motion.div>
        )}

        {/* Revealed reward boxes (day 12) show special gift with large XP */}
        {gift.type === 'reward' && gift.isRevealed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center justify-center gap-1"
          >
            <Gift className="w-10 h-10 text-yellow-400" />
            <span className="text-white text-lg font-bold">{gift.value}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
