import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { VideoBackground } from './components/background/VideoBackground';
import { PomodoroTimer } from './components/timer/PomodoroTimer';
import { MusicPlayer } from './components/music/MusicPlayer';
import { AmbientSoundsPlayer } from './components/music/AmbientSoundsPlayer';
import { LevelDisplay } from './components/level/LevelDisplay';
import { LevelUpCelebration } from './components/level/LevelUpCelebration';
import { SettingsModal } from './components/settings/SettingsModal';
import { OnlinePresenceCounter } from './components/presence/OnlinePresenceCounter';
import { DailyGiftGrid } from './components/rewards/DailyGiftGrid';
import { useLevelNotifications } from './hooks/useLevelNotifications';
import { useSettingsStore } from './store/useSettingsStore';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { authenticated, loading, error } = useAuth();
  const { showLevelUp, levelUpData } = useLevelNotifications();
  const trackLogin = useSettingsStore((state) => state.trackLogin);
  const consecutiveLoginDays = useSettingsStore((state) => state.consecutiveLoginDays);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showDailyGift, setShowDailyGift] = useState(false);

  // Check if user visited today and show daily gift
  useEffect(() => {
    const { isNewDay } = trackLogin();

    if (isNewDay) {
      // Show the daily gift for the current day
      setShowDailyGift(true);
    }
  }, [trackLogin]);

  // Loading state
  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <VideoBackground />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-white text-xl font-medium">Connecting to Discord...</p>
            <p className="text-white/60 text-sm mt-2">Please wait while we authenticate your account</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !authenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <VideoBackground />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-white text-2xl font-bold mb-2">Authentication Failed</h1>
            <p className="text-white/80 mb-4">
              {error || 'Unable to connect to Discord. Please try again.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - show main app
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <VideoBackground />

      {/* Level Display (Top Left) */}
      <LevelDisplay />

      {/* Online Presence Counter (Top Right, below settings button) */}
      <div className="fixed top-20 right-4 z-10">
        <OnlinePresenceCounter />
      </div>

      {/* Main Content - Centered Timer */}
      <div className="min-h-screen flex items-center justify-center pb-32 md:pb-20">
        <PomodoroTimer />
      </div>

      {/* Music Player (Bottom) */}
      <MusicPlayer playing={musicPlaying} setPlaying={setMusicPlaying} />

      {/* Ambient Sounds Player (Hidden) */}
      <AmbientSoundsPlayer musicPlaying={musicPlaying} />

      {/* Level Up Celebration */}
      <LevelUpCelebration
        show={showLevelUp}
        level={levelUpData.level}
        levelName={levelUpData.levelName}
      />

      {/* Daily Gift Grid */}
      <DailyGiftGrid
        show={showDailyGift}
        onClose={() => setShowDailyGift(false)}
        currentDay={consecutiveLoginDays}
      />

      {/* Settings Modal */}
      <SettingsModal />

      {/* Toaster for notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

// Wrapper component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
