import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { BACKGROUNDS, AMBIENT_SOUNDS } from '../../data/constants';
import { useDeviceType } from '../../hooks/useDeviceType';
import {
  ROLE_EMOJI_ELF,
  ROLE_EMOJI_HUMAN,
  getLevelName,
  getBadgeForLevel,
} from '../../data/levels';

export function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timer' | 'appearance' | 'sounds' | 'music' | 'progress'>('timer');
  const [roleChangeMessage, setRoleChangeMessage] = useState<string | null>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss role change message
  useEffect(() => {
    if (roleChangeMessage) {
      const timer = setTimeout(() => {
        setRoleChangeMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [roleChangeMessage]);

  // Focus management: focus modal when opened, return focus when closed
  useEffect(() => {
    if (isOpen) {
      // Focus the modal container when it opens
      modalRef.current?.focus();
    } else {
      // Return focus to trigger button when modal closes
      triggerButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleRoleChange = (newRole: 'elf' | 'human') => {
    setLevelPath(newRole);

    const messages = {
      elf: [
        "You have chosen the path of the Elf! May nature guide your journey.",
        "The forest welcomes you, brave Elf. Your adventure begins anew!",
        "An Elf emerges! The ancient woods await your wisdom.",
        "You walk the Elven path. Grace and focus shall be your companions.",
      ],
      human: [
        "You have chosen the path of the Human! May courage light your way.",
        "A warrior's path chosen! Your legend starts now, brave Human.",
        "The Human spirit awakens within you. Face your challenges head-on!",
        "You walk the Human path. Strength and determination guide you forward.",
      ],
    };

    const randomMessage = messages[newRole][Math.floor(Math.random() * messages[newRole].length)];
    setRoleChangeMessage(randomMessage);
  };

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
    username,
    setUsername,
    canEditUsername,
    levelSystemEnabled,
    setLevelSystemEnabled,
    levelPath,
    setLevelPath,
  } = useSettingsStore();

  const { isMobile } = useDeviceType();

  // Filter backgrounds based on device type
  const targetOrientation = isMobile ? 'vertical' : 'horizontal';
  const filteredBackgrounds = BACKGROUNDS.filter(bg => bg.orientation === targetOrientation);

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
    { id: 'timer', label: 'General' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'sounds', label: 'Sounds' },
    { id: 'music', label: 'Music' },
    { id: 'progress', label: 'Progress' },
  ] as const;

  if (!isOpen) {
    return (
      <button
        ref={triggerButtonRef}
        onClick={() => setIsOpen(true)}
        aria-label="Open settings"
        className="fixed top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors border border-white/10 z-40"
      >
        <SettingsIcon size={24} />
      </button>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ${isMobile ? 'p-2' : 'p-4'}`}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        tabIndex={-1}
        className={`bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl flex flex-col ${isMobile ? 'max-h-[95vh]' : ''}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between ${isMobile ? 'p-4' : 'p-6'} border-b border-white/10 shrink-0`}>
          <h2 id="settings-title" className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close settings"
          >
            <X size={isMobile ? 20 : 24} className="text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Settings categories"
          className={`flex ${isMobile ? 'gap-0 overflow-x-auto' : 'gap-1'} px-4 pt-4 border-b border-white/10 shrink-0`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`${isMobile ? 'px-3 py-2 text-sm whitespace-nowrap' : 'px-4 py-2'} font-medium transition-colors relative ${
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
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
          <AnimatePresence mode="wait">
            {activeTab === 'timer' && (
              <motion.div
                key="timer"
                role="tabpanel"
                id="timer-panel"
                aria-labelledby="timer-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Timer Durations (minutes)</h3>

                {/* Pomodoro */}
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Pomodoro</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTempTimers(t => ({ ...t, pomodoro: Math.max(1, t.pomodoro - 1) }))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={tempTimers.pomodoro}
                      onChange={(e) => setTempTimers(t => ({ ...t, pomodoro: Number(e.target.value) }))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setTempTimers(t => ({ ...t, pomodoro: Math.min(60, t.pomodoro + 1) }))}
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
                      onClick={() => setTempTimers(t => ({ ...t, shortBreak: Math.max(1, t.shortBreak - 1) }))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={tempTimers.shortBreak}
                      onChange={(e) => setTempTimers(t => ({ ...t, shortBreak: Number(e.target.value) }))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setTempTimers(t => ({ ...t, shortBreak: Math.min(60, t.shortBreak + 1) }))}
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
                      onClick={() => setTempTimers(t => ({ ...t, longBreak: Math.max(1, t.longBreak - 1) }))}
                      className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded text-white"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={tempTimers.longBreak}
                      onChange={(e) => setTempTimers(t => ({ ...t, longBreak: Number(e.target.value) }))}
                      className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => setTempTimers(t => ({ ...t, longBreak: Math.min(60, t.longBreak + 1) }))}
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
                    value={tempPomodorosBeforeLongBreak}
                    onChange={(e) => setTempPomodorosBeforeLongBreak(Number(e.target.value))}
                    className="w-16 bg-white/10 text-white text-center px-2 py-1 rounded border border-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Auto-start breaks</label>
                  <input
                    type="checkbox"
                    checked={tempAutoStartBreaks}
                    onChange={(e) => setTempAutoStartBreaks(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Auto-start pomodoros</label>
                  <input
                    type="checkbox"
                    checked={tempAutoStartPomodoros}
                    onChange={(e) => setTempAutoStartPomodoros(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Enable sound notifications</label>
                  <input
                    type="checkbox"
                    checked={tempSoundEnabled}
                    onChange={(e) => setTempSoundEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="text-white">Enable leveling system</label>
                  <input
                    type="checkbox"
                    checked={tempLevelSystemEnabled}
                    onChange={(e) => setTempLevelSystemEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Alarm Bell Volume - {tempVolume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tempVolume}
                  onChange={(e) => setTempVolume(Number(e.target.value))}
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

              <div>
                <h3 className="text-white font-bold text-lg mb-3">🔔 Notifications</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Enable browser notifications to get notified when your timer completes.
                </p>
                {('Notification' in window) ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">Status:</span>
                      <span className={`text-sm font-medium ${
                        Notification.permission === 'granted' ? 'text-green-400' :
                        Notification.permission === 'denied' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {Notification.permission === 'granted' ? '✓ Enabled' :
                         Notification.permission === 'denied' ? '✗ Blocked' :
                         '⚠ Not enabled'}
                      </span>
                    </div>
                    {Notification.permission === 'default' && (
                      <button
                        onClick={() => {
                          Notification.requestPermission();
                        }}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Enable Notifications
                      </button>
                    )}
                    {Notification.permission === 'denied' && (
                      <p className="text-red-400 text-xs">
                        Notifications are blocked. Please enable them in your browser settings.
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Notifications are not supported in this browser.
                  </p>
                )}
              </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                role="tabpanel"
                id="appearance-panel"
                aria-labelledby="appearance-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
              <h3 className="text-white font-bold text-lg">Background</h3>
              <div className="grid grid-cols-3 gap-3">
                {filteredBackgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setTempBackground(bg.id)}
                    className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                      tempBackground === bg.id
                        ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={bg.poster}
                      alt={bg.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{bg.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              </motion.div>
            )}

            {activeTab === 'sounds' && (
              <motion.div
                key="sounds"
                role="tabpanel"
                id="sounds-panel"
                aria-labelledby="sounds-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Volume Controls</h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white text-sm">🔊 Main Volume</label>
                    <span className="text-white text-sm">{tempVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempVolume}
                    onChange={(e) => setTempVolume(Number(e.target.value))}
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
                    <span className="text-white text-sm">{tempMusicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempMusicVolume}
                    onChange={(e) => setTempMusicVolume(Number(e.target.value))}
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
                      <span className="text-white text-sm">{tempAmbientVolumes[sound.id] || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tempAmbientVolumes[sound.id] || 0}
                      onChange={(e) => setTempAmbientVolumes(v => ({ ...v, [sound.id]: Number(e.target.value) }))}
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
                      <span className="text-white text-sm">{tempAmbientVolumes[sound.id] || 0}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tempAmbientVolumes[sound.id] || 0}
                      onChange={(e) => setTempAmbientVolumes(v => ({ ...v, [sound.id]: Number(e.target.value) }))}
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
              </motion.div>
            )}

            {activeTab === 'music' && (
              <motion.div
                key="music"
                role="tabpanel"
                id="music-panel"
                aria-labelledby="music-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
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
              </motion.div>
            )}

            {activeTab === 'progress' && (
              <motion.div
                key="progress"
                role="tabpanel"
                id="progress-panel"
                aria-labelledby="progress-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
              <div>
                <h3 className="text-white font-bold text-lg mb-4">Level Progress</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-4 relative">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-gray-400 text-xs">CURRENT LEVEL</p>
                      {/* Role Toggle Switch */}
                      <label className="relative inline-block w-[75px] h-[37.5px] cursor-pointer shrink-0 ml-2">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0 peer"
                          checked={levelPath === 'human'}
                          onChange={(e) => handleRoleChange(e.target.checked ? 'human' : 'elf')}
                        />
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-300 shadow-lg peer-checked:from-blue-600 peer-checked:to-blue-700"></span>
                        <span className="absolute top-[3.75px] left-[3.75px] w-[30px] h-[30px] bg-white rounded-full transition-all duration-300 flex items-center justify-center text-lg shadow-md peer-checked:translate-x-[37.5px]">
                          {levelPath === 'elf' ? ROLE_EMOJI_ELF : ROLE_EMOJI_HUMAN}
                        </span>
                      </label>
                    </div>
                    <p className="text-white text-2xl font-bold">{level} - {getLevelName(level, levelPath)}</p>
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
                    <p className="text-5xl">{getBadgeForLevel(level, prestigeLevel)}</p>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-white/10 shrink-0">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Role Change Toast Notification */}
      {roleChangeMessage && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-white/20 max-w-sm animate-slide-up z-[100]">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{levelPath === 'elf' ? ROLE_EMOJI_ELF : ROLE_EMOJI_HUMAN}</span>
            <div>
              <p className="font-bold text-sm mb-1">Role Changed!</p>
              <p className="text-sm leading-relaxed">{roleChangeMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
