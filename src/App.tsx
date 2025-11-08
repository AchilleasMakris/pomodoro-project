import { useState } from 'react';
import { Toaster } from 'sonner';
import { VideoBackground } from './components/background/VideoBackground';
import { PomodoroTimer } from './components/timer/PomodoroTimer';
import { MusicPlayer } from './components/music/MusicPlayer';
import { AmbientSoundsPlayer } from './components/music/AmbientSoundsPlayer';
import { LevelDisplay } from './components/level/LevelDisplay';
import { LevelUpCelebration } from './components/level/LevelUpCelebration';
import { SettingsModal } from './components/settings/SettingsModal';
import { OnlinePresenceCounter } from './components/presence/OnlinePresenceCounter';
import { useLevelNotifications } from './hooks/useLevelNotifications';

function App() {
  const { showLevelUp, levelUpData } = useLevelNotifications();
  const [musicPlaying, setMusicPlaying] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center pb-20">
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

      {/* Settings Modal */}
      <SettingsModal />

      {/* Toaster for notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
