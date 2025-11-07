import { motion, AnimatePresence } from 'framer-motion';

interface LevelUpCelebrationProps {
  show: boolean;
  level: number;
  levelName: string;
}

export function LevelUpCelebration({ show, level, levelName }: LevelUpCelebrationProps) {
  // Generate 12 tomato particles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12;
    const distance = 150;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;
    return { x, y, rotation: Math.random() * 360, delay: i * 0.05 };
  });

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Main celebration box */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.6
            }}
            className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl border-4 border-white"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-4"
            >
              <motion.h2
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 1.2, 1] }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-6xl font-black text-white drop-shadow-lg"
              >
                LEVEL UP!
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <p className="text-3xl font-bold text-white">Level {level}</p>
                <p className="text-xl text-white/90">{levelName}</p>
              </motion.div>
            </motion.div>

            {/* Tomato particles */}
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: [1, 1.5, 0.5],
                  rotate: particle.rotation
                }}
                transition={{
                  duration: 1,
                  delay: particle.delay,
                  ease: 'easeOut'
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
              >
                🍅
              </motion.div>
            ))}
          </motion.div>

          {/* Confetti particles (additional flair) */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.3,
                ease: 'easeOut'
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FCD34D', '#F59E0B', '#EF4444', '#EC4899'][
                  Math.floor(Math.random() * 4)
                ]
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
