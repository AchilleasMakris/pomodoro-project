import { useState } from 'react';
import { DailyGiftGrid } from './DailyGiftGrid';

/**
 * Example usage of the DailyGiftGrid component
 *
 * This component demonstrates how to integrate the daily gift UI
 * into your application. You can trigger it when a user visits
 * your site for the first time each day.
 */
export function DailyGiftExample() {
  const [showGiftGrid, setShowGiftGrid] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <button
        onClick={() => setShowGiftGrid(true)}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
      >
        Open Daily Gift
      </button>

      <DailyGiftGrid
        show={showGiftGrid}
        onClose={() => setShowGiftGrid(false)}
      />
    </div>
  );
}

/**
 * Integration Guide:
 *
 * 1. Import the DailyGiftGrid component
 * 2. Add state to control when to show the gift grid
 * 3. Check if user visited today (using localStorage or database)
 * 4. Show the gift grid if it's a new day
 *
 * Example integration in your main App:
 *
 * ```tsx
 * import { DailyGiftGrid } from './components/rewards/DailyGiftGrid';
 * import { useState, useEffect } from 'react';
 *
 * function App() {
 *   const [showDailyGift, setShowDailyGift] = useState(false);
 *
 *   useEffect(() => {
 *     const lastVisit = localStorage.getItem('lastVisitDate');
 *     const today = new Date().toDateString();
 *
 *     if (lastVisit !== today) {
 *       setShowDailyGift(true);
 *       localStorage.setItem('lastVisitDate', today);
 *     }
 *   }, []);
 *
 *   return (
 *     <>
 *       <YourMainContent />
 *       <DailyGiftGrid
 *         show={showDailyGift}
 *         onClose={() => setShowDailyGift(false)}
 *       />
 *     </>
 *   );
 * }
 * ```
 */
