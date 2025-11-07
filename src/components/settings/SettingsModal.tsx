import { useState, useEffect } from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { BACKGROUNDS, AMBIENT_SOUNDS } from '../../data/constants';

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timer' | 'appearance' | 'sounds' | 'music' | 'progress'>('timer');

  const {
    timers,
    setPomodoroDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    pomodorosBeforeLongBreak,
    setPomodorosBeforeLongBreak,
    autoStartBreaks,
    setAutoStartBreaks,
    autoStartPomodoros,
    setAutoStartPomodoros,
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
    musicVolume,
    setMusicVolume,
    ambientVolumes,
    setAmbientVolume,
    background,
    setBackground,
    level,
    xp,
    prestigeLevel,
    totalPomodoros,
    totalStudyMinutes,
    resetProgress,
    levelPath,
    setLevelPath,
    username,
    setUsername,
    canEditUsername,
    levelSystemEnabled,
    setLevelSystemEnabled,
  } = useSettingsStore();

  // Temporary state for settings (only applied on Save)
  const [tempTimers, setTempTimers] = useState(timers);
  const [tempPomodorosBeforeLongBreak, setTempPomodorosBeforeLongBreak] = useState(pomodorosBeforeLongBreak);
  const [tempAutoStartBreaks, setTempAutoStartBreaks] = useState(autoStartBreaks);
  const [tempAutoStartPomodoros, setTempAutoStartPomodoros] = useState(autoStartPomodoros);
  const [tempSoundEnabled, setTempSoundEnabled] = useState(soundEnabled);
  const [tempVolume, setTempVolume] = useState(volume);
  const [tempMusicVolume, setTempMusicVolume] = useState(musicVolume);
  const [tempAmbientVolumes, setTempAmbientVolumes] = useState(ambientVolumes);
  const [tempBackground, setTempBackground] = useState(background);
  const [tempLevelSystemEnabled, setTempLevelSystemEnabled] = useState(levelSystemEnabled);
  const [usernameInput, setUsernameInput] = useState(username);

  // Reset temporary state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempTimers(timers);
      setTempPomodorosBeforeLongBreak(pomodorosBeforeLongBreak);
      setTempAutoStartBreaks(autoStartBreaks);
      setTempAutoStartPomodoros(autoStartPomodoros);
      setTempSoundEnabled(soundEnabled);
      setTempVolume(volume);
      setTempMusicVolume(musicVolume);
      setTempAmbientVolumes(ambientVolumes);
      setTempBackground(background);
      setTempLevelSystemEnabled(levelSystemEnabled);
      setUsernameInput(username);
    }
  }, [isOpen, timers, pomodorosBeforeLongBreak, autoStartBreaks, autoStartPomodoros, soundEnabled, volume, musicVolume, ambientVolumes, background, levelSystemEnabled, username]);

  const handleSaveUsername = () => {
    if (canEditUsername()) {
      setUsername(usernameInput);
    } else if (xp >= 50) {
      if (window.confirm('Changing username early costs 50 XP. Continue?')) {
        setUsername(usernameInput, true);
      }
    }
  };

  const handleSave = () => {
    // Apply all temporary settings to store
    setPomodoroDuration(tempTimers.pomodoro);
    setShortBreakDuration(tempTimers.shortBreak);
    setLongBreakDuration(tempTimers.longBreak);
    setPomodorosBeforeLongBreak(tempPomodorosBeforeLongBreak);
    setAutoStartBreaks(tempAutoStartBreaks);
    setAutoStartPomodoros(tempAutoStartPomodoros);
    setSoundEnabled(tempSoundEnabled);
    setVolume(tempVolume);
    setMusicVolume(tempMusicVolume);
    setBackground(tempBackground);
    setLevelSystemEnabled(tempLevelSystemEnabled);

    // Apply ambient volumes
    Object.keys(tempAmbientVolumes).forEach((soundId) => {
      setAmbientVolume(soundId, tempAmbientVolumes[soundId]);
    });

    setIsOpen(false);
  };

  const handleReset = () => {
    // Reset temporary state to current store values
    setTempTimers(timers);
    setTempPomodorosBeforeLongBreak(pomodorosBeforeLongBreak);
    setTempAutoStartBreaks(autoStartBreaks);
    setTempAutoStartPomodoros(autoStartPomodoros);
    setTempSoundEnabled(soundEnabled);
    setTempVolume(volume);
    setTempMusicVolume(musicVolume);
    setTempAmbientVolumes(ambientVolumes);
    setTempBackground(background);
    setTempLevelSystemEnabled(levelSystemEnabled);
    setUsernameInput(username);
  };

  const tabs = [
    { id: 'timer', label: 'Timer' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'sounds', label: 'Sounds' },
    { id: 'music', label: 'Music' },
    { id: 'progress', label: 'Progress' },
  ] as const;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors border border-white/10 z-40"
      >
        <SettingsIcon size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pt-4 border-b border-white/10 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
          ))}
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'timer' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Timer Durations (minutes)</h3>

                {/* Pomodoro */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Pomodoro</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPomodoroDuration(Math.max(1, timers.pomodoro - 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timers.pomodoro}
                      onChange={(e) => setPomodoroDuration(Number(e.target.value))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setPomodoroDuration(Math.min(60, timers.pomodoro + 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Short Break */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Short Break</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShortBreakDuration(Math.max(1, timers.shortBreak - 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timers.shortBreak}
                      onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setShortBreakDuration(Math.min(60, timers.shortBreak + 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Long Break */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Long Break</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLongBreakDuration(Math.max(1, timers.longBreak - 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timers.longBreak}
                      onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setLongBreakDuration(Math.min(60, timers.longBreak + 1))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-4">Advanced Settings</h3>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Pomodoros before long break</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={pomodorosBeforeLongBreak}
                    onChange={(e) => setPomodorosBeforeLongBreak(Number(e.target.value))}
                    className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Auto-start breaks</label>
                  <input
                    type="checkbox"
                    checked={autoStartBreaks}
                    onChange={(e) => setAutoStartBreaks(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Auto-start pomodoros</label>
                  <input
                    type="checkbox"
                    checked={autoStartPomodoros}
                    onChange={(e) => setAutoStartPomodoros(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Enable sound notifications</label>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Enable leveling system</label>
                  <input
                    type="checkbox"
                    checked={levelSystemEnabled}
                    onChange={(e) => setLevelSystemEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Alarm Bell Volume - {volume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-blue-500
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-blue-500
                    [&::-moz-range-thumb]:border-0"
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Background</h3>
              <div className="grid grid-cols-3 gap-3">
                {BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                      background === bg.id
                        ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <video
                      src={bg.file}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{bg.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sounds' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Volume Controls</h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white text-sm">🔊 Main Volume</label>
                    <span className="text-white text-sm">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-blue-500
                      [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white text-sm">🎵 Music Volume</label>
                    <span className="text-white text-sm">{musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gray-500
                      [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-sm mb-3">🌲 Sounds From In The Woods</h3>
                {AMBIENT_SOUNDS.slice(0, 3).map((sound) => (
                  <div key={sound.id} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white text-sm">{sound.name}</label>
                      <span className="text-white text-sm">{ambientVolumes[sound.id] || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ambientVolumes[sound.id] || 0}
                      onChange={(e) => setAmbientVolume(sound.id, Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-white font-bold text-sm mb-3">🔊 All Sounds</h3>
                {AMBIENT_SOUNDS.slice(3).map((sound) => (
                  <div key={sound.id} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white text-sm">{sound.name}</label>
                      <span className="text-white text-sm">{ambientVolumes[sound.id] || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ambientVolumes[sound.id] || 0}
                      onChange={(e) => setAmbientVolume(sound.id, Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Music Credits</h3>
                <p className="text-gray-400 text-sm mb-4">
                  All music tracks are royalty-free and hosted locally for Discord Activity compatibility.
                </p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors">
                  View All Music Credits (799 Tracks)
                </button>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Copyright Notice</h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you are a copyright holder and believe any song in this collection infringes on your rights,
                  please contact me and I will remove it immediately.
                </p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors">
                  Contact: lexlarisa@protonmail.com
                </button>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Level Progress</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">CURRENT LEVEL</p>
                    <p className="text-white text-2xl font-bold">{level} - Tomato Seed</p>
                    <p className="text-3xl mt-2">🌱</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">CURRENT XP</p>
                    <p className="text-white text-2xl font-bold">{xp} / {level * 100}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">PRESTIGE LEVEL</p>
                    <p className="text-white text-2xl font-bold">{prestigeLevel}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">TOTAL POMODOROS</p>
                    <p className="text-white text-2xl font-bold">{totalPomodoros}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 col-span-2">
                    <p className="text-gray-400 text-xs mb-1">TOTAL STUDY TIME</p>
                    <p className="text-white text-2xl font-bold">
                      {Math.floor(totalStudyMinutes / 60)}h {totalStudyMinutes % 60}m
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 col-span-2">
                    <p className="text-gray-400 text-xs mb-1">CURRENT BADGE</p>
                    <p className="text-5xl">🍅</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">Username</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Change your display name. Free once per week, or costs 50 XP if changed earlier.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value.slice(0, 20))}
                    maxLength={20}
                    className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20"
                    placeholder="User"
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Save Username
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-4">Reset Progress</h3>
                <p className="text-gray-400 text-sm mb-3">
                  This will reset all your progress including level, XP, prestige, and stats.
                  This action cannot be undone.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
                      resetProgress();
                    }
                  }}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                  Reset All Progress
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-white/10 shrink-0">
          <button
            onClick={() => {
              // Reset to defaults logic here
              if (window.confirm('Reset all settings to default?')) {
                window.location.reload();
              }
            }}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
