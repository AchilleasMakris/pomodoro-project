import { useState } from 'react';
import { VideoBackground } from './components/background/VideoBackground';
import { PomodoroTimer } from './components/timer/PomodoroTimer';
import { MusicPlayer } from './components/music/MusicPlayer';
import { AmbientSoundsPlayer } from './components/music/AmbientSoundsPlayer';
import { LevelDisplay } from './components/level/LevelDisplay';
import { XPPopup } from './components/level/XPPopup';
import { LevelUpCelebration } from './components/level/LevelUpCelebration';
import { SettingsModal } from './components/settings/SettingsModal';
import { useLevelNotifications } from './hooks/useLevelNotifications';

function App() {
  const { showXPPopup, lastXPGained, showLevelUp, levelUpData } = useLevelNotifications();
  const [musicPlaying, setMusicPlaying] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <VideoBackground />

      {/* Level Display (Top Left) */}
      <LevelDisplay />

      {/* Main Content - Centered Timer */}
      <div className="min-h-screen flex items-center justify-center pb-20">
        <PomodoroTimer />
      </div>

      {/* Music Player (Bottom) */}
      <MusicPlayer playing={musicPlaying} setPlaying={setMusicPlaying} />

      {/* Ambient Sounds Player (Hidden) */}
      <AmbientSoundsPlayer musicPlaying={musicPlaying} />

      {/* XP Popup Animation */}
      <XPPopup xp={lastXPGained} show={showXPPopup} />

      {/* Level Up Celebration */}
      <LevelUpCelebration
        show={showLevelUp}
        level={levelUpData.level}
        levelName={levelUpData.levelName}
      />

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
}

export default App;
