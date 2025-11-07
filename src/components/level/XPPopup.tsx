import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XPPopupProps {
  xp: number;
  show: boolean;
}

export function XPPopup({ xp, show }: XPPopupProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: isMobile ? -20 : 0,
            x: isMobile ? 0 : -20
          }}
          animate={{
            opacity: 1,
            y: isMobile ? 0 : 0,
            x: 0
          }}
          exit={{
            opacity: 0,
            y: isMobile ? 20 : 0,
            x: isMobile ? 0 : 20,
            scale: 1.2
          }}
          transition={{ duration: 0.5 }}
          className={`fixed ${
            isMobile
              ? 'top-32 left-1/2 -translate-x-1/2'
              : 'top-4 left-[320px]'
          } bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-2xl border border-white/20 backdrop-blur-sm z-50`}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold"
          >
            +{xp} XP Collected! 🎉
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
