import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useTimer } from 'react-timer-hook';
import { useSettingsStore } from '../../store/useSettingsStore';
import { BELL_SOUND } from '../../data/constants';
import type { TimerType } from '../../types';

export const PomodoroTimer = memo(function PomodoroTimer() {
  const [timerType, setTimerType] = useState<TimerType>('pomodoro');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isFlashing, setIsFlashing] = useState(false);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const {
    timers,
    pomodorosBeforeLongBreak,
    autoStartBreaks,
    autoStartPomodoros,
    addXP,
    soundEnabled,
    volume,
  } = useSettingsStore();

  const getTimerDuration = useCallback((type: TimerType) => {
    switch (type) {
      case 'pomodoro':
        return timers.pomodoro * 60;
      case 'shortBreak':
        return timers.shortBreak * 60;
      case 'longBreak':
        return timers.longBreak * 60;
    }
  }, [timers]);

  const getExpiryTimestamp = useCallback((seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  }, []);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(getTimerDuration('pomodoro')),
    onExpire: () => handleTimerComplete(),
    autoStart: false,
  });

  const switchTimer = useCallback((type: TimerType, autoStart = false) => {
    setTimerType(type);
    const duration = getTimerDuration(type);
    restart(getExpiryTimestamp(duration), autoStart);
  }, [getTimerDuration, getExpiryTimestamp, restart]);

  const handleReset = useCallback(() => {
    const duration = getTimerDuration(timerType);
    restart(getExpiryTimestamp(duration), false);
  }, [timerType, getTimerDuration, getExpiryTimestamp, restart]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);

      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  // Update timer display when settings change
  useEffect(() => {
    if (!isRunning) {
      const duration = getTimerDuration(timerType);
      restart(getExpiryTimestamp(duration), false);
    }
  }, [timers, getTimerDuration, getExpiryTimestamp, restart, isRunning, timerType]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          if (isRunning) {
            pause();
          } else {
            start();
          }
          break;
        case 'r':
          e.preventDefault();
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, start, pause, handleReset]);

  // Cleanup flash timeout on unmount
  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  const showNotification = (type: TimerType) => {
    if ('Notification' in window && notificationPermission === 'granted') {
      const titles = {
        pomodoro: '🍅 Pomodoro Complete!',
        shortBreak: '☕ Short Break Over!',
        longBreak: '🎉 Long Break Over!'
      };

      const bodies = {
        pomodoro: 'Great work! Time for a break.',
        shortBreak: 'Break time is over. Ready to focus?',
        longBreak: 'Feeling refreshed? Let\'s get back to work!'
      };

      new Notification(titles[type], {
        body: bodies[type],
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: 'pomodoro-timer'
      });
    }
  };

  const handleTimerComplete = () => {
    // Show notification
    showNotification(timerType);

    // Play completion sound
    if (soundEnabled) {
      const audio = new Audio(BELL_SOUND);
      audio.volume = volume / 100;
      audio.play().catch(e => console.log('Audio playback failed:', e));
    }

    // Visual flash effect
    setIsFlashing(true);
    // Clear any existing flash timeout
    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }
    flashTimeoutRef.current = setTimeout(() => setIsFlashing(false), 1000);

    // Award XP if it was a Pomodoro
    if (timerType === 'pomodoro') {
      addXP(timers.pomodoro);
      setPomodoroCount((prev) => prev + 1);
    }

    // Determine next timer type
    let nextType: TimerType;
    if (timerType === 'pomodoro') {
      // Check if it's time for a long break
      if ((pomodoroCount + 1) % pomodorosBeforeLongBreak === 0) {
        nextType = 'longBreak';
      } else {
        nextType = 'shortBreak';
      }

      // Auto-start break if enabled
      if (autoStartBreaks) {
        switchTimer(nextType, true);
      } else {
        switchTimer(nextType, false);
      }
    } else {
      // After a break, start Pomodoro
      nextType = 'pomodoro';

      if (autoStartPomodoros) {
        switchTimer(nextType, true);
      } else {
        switchTimer(nextType, false);
      }
    }
  };

  const formatTime = (mins: number, secs: number) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Timer Type Selector */}
      <div className="flex gap-3" role="tablist" aria-label="Timer type selector">
        <button
          onClick={() => switchTimer('pomodoro')}
          role="tab"
          aria-selected={timerType === 'pomodoro'}
          aria-label="Pomodoro timer"
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            timerType === 'pomodoro'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => switchTimer('shortBreak')}
          role="tab"
          aria-selected={timerType === 'shortBreak'}
          aria-label="Short break timer"
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            timerType === 'shortBreak'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => switchTimer('longBreak')}
          role="tab"
          aria-selected={timerType === 'longBreak'}
          aria-label="Long break timer"
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            timerType === 'longBreak'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div
        className={`text-6xl md:text-9xl font-bold text-white tracking-wider transition-all duration-300 ${
          isFlashing ? 'scale-110 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]' : ''
        }`}
        role="timer"
        aria-live="off"
        aria-label={`${formatTime(minutes, seconds)} remaining`}
      >
        {formatTime(minutes, seconds)}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <button
          onClick={isRunning ? pause : start}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          aria-label="Reset timer"
          className="px-8 py-3 bg-white/20 text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
});
