// Settings Manager Module
// Handles all settings, localStorage persistence, and UI interactions

// Default Settings
const DEFAULT_SETTINGS = {
  timers: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  },
  pomodorosBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  volume: 50,
  background: 'room-video',
  timerSize: 'medium',
  musicVolume: 70, // Separate volume for music player
  // Level system
  xp: 0,
  level: 1,
  prestigeLevel: 0,
  totalPomodoros: 0,
  username: 'User',
  lastUsernameChange: null
};

// Current settings (loaded from localStorage or defaults)
let currentSettings = { ...DEFAULT_SETTINGS };

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeSettings();
  setupEventListeners();
  loadSettings();
  applySettings();
});

function initializeSettings() {
  // Load settings from localStorage
  const saved = localStorage.getItem('pomodoroSettings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      currentSettings = { ...DEFAULT_SETTINGS, ...parsed };
      // Ensure nested objects are properly merged
      currentSettings.timers = { ...DEFAULT_SETTINGS.timers, ...parsed.timers };
    } catch (e) {
      console.error('Failed to parse settings:', e);
      currentSettings = { ...DEFAULT_SETTINGS };
    }
  }
}

function saveMusicVolume() {
  try {
    localStorage.setItem('pomodoroSettings', JSON.stringify(currentSettings));
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    return false;
  }
}

// ===== SETTINGS I/O =====
function saveSettings() {
  try {
    localStorage.setItem('pomodoroSettings', JSON.stringify(currentSettings));
    showToast('Settings saved successfully!');
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    showToast('Failed to save settings');
    return false;
  }
}

function loadSettings() {
  // Load settings into UI
  document.getElementById('pomodoro-duration').value = currentSettings.timers.pomodoro;
  document.getElementById('shortbreak-duration').value = currentSettings.timers.shortBreak;
  document.getElementById('longbreak-duration').value = currentSettings.timers.longBreak;
  document.getElementById('pomodoro-count').value = currentSettings.pomodorosBeforeLongBreak;
  document.getElementById('auto-start-breaks').checked = currentSettings.autoStartBreaks;
  document.getElementById('auto-start-pomodoros').checked = currentSettings.autoStartPomodoros;
  document.getElementById('sound-enabled').checked = currentSettings.soundEnabled;
  document.getElementById('volume-slider').value = currentSettings.volume;
  document.getElementById('volume-value').textContent = currentSettings.volume + '%';
  document.getElementById('timer-size').value = currentSettings.timerSize;

  // Load music volume
  const musicVolumeSlider = document.getElementById('music-volume-setting');
  if (musicVolumeSlider) {
    musicVolumeSlider.value = currentSettings.musicVolume;
  }
  const musicVolumePercentage = document.getElementById('music-volume-percentage');
  if (musicVolumePercentage) {
    musicVolumePercentage.textContent = currentSettings.musicVolume + '%';
  }


  // Load background selection
  document.querySelectorAll('.background-option').forEach(option => {
    if (option.dataset.background === currentSettings.background) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });
}

function resetToDefaults() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    currentSettings = { ...DEFAULT_SETTINGS };
    currentSettings.timers = { ...DEFAULT_SETTINGS.timers };
    saveSettings();
    loadSettings();
    applySettings();
    showToast('Settings reset to defaults');
  }
}

function applySettings() {
  // Apply background
  applyBackground();

  // Apply timer size
  applyTimerSize();

  // Apply volume to audio elements
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    // Exclude music player audio, as it has its own volume control
    if (!audio.closest || !audio.closest('#music-player-container')) {
      audio.volume = currentSettings.volume / 100;
    }
  });

  // Notify other modules that settings have changed
  window.dispatchEvent(new CustomEvent('settingsChanged', { detail: currentSettings }));
}

function applyBackground() {
  const backgroundMap = {
    'wood': { type: 'image', value: '/r2-backgrounds/wood.jpg' },
    'sakura': { type: 'image', value: '/r2-backgrounds/sakura4.jpg' },
    'dark-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)' },
    'purple-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)' },
    'forest-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' },
    'sunset-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)' },
    'road-video': { type: 'video', value: '/r2-backgrounds/road.mp4' },
    'room-video': { type: 'video', value: '/r2-backgrounds/room.mp4' }
  };

  const bg = backgroundMap[currentSettings.background] || backgroundMap['room-video'];

  // FORCE CLEAN UP - Remove ALL video elements and overlays
  // Remove video by ID
  const videoById = document.getElementById('background-video');
  if (videoById) {
    videoById.remove();
  }
  
  // Remove ALL videos (in case there are orphaned ones)
  document.querySelectorAll('video[id="background-video"]').forEach(v => v.remove());
  
  // Remove overlay by ID
  const overlayById = document.getElementById('video-overlay');
  if (overlayById) {
    overlayById.remove();
  }
  
  // Remove ALL overlays (in case there are orphaned ones)
  document.querySelectorAll('div[id="video-overlay"]').forEach(o => o.remove());

  // Clear background image
  document.body.style.backgroundImage = 'none';

  if (bg.type === 'video') {
    // Create video background element
    const video = document.createElement('video');
    video.id = 'background-video';
    video.src = bg.value;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.zIndex = '-1';
    video.style.pointerEvents = 'none';
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'video-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.3)';
    overlay.style.zIndex = '-1';
    overlay.style.pointerEvents = 'none';
    
    document.body.prepend(overlay);
    document.body.prepend(video);
    
    // Play video
    video.play().catch(e => console.log('Video autoplay prevented:', e));
  } else {
    // For images and gradients, just set the background image
    if (bg.type === 'image') {
      document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${bg.value}")`;
    } else if (bg.type === 'gradient') {
      document.body.style.backgroundImage = bg.value;
    }
  }
}

function applyTimerSize() {
  const timerElement = document.querySelector('.timer');
  if (!timerElement) return;

  // Remove existing size classes from timer
  timerElement.classList.remove('timer-small', 'timer-medium', 'timer-large');

  // Add new size class to timer
  timerElement.classList.add(`timer-${currentSettings.timerSize}`);

  // Apply size to all buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-small', 'btn-medium', 'btn-large');
    btn.classList.add(`btn-${currentSettings.timerSize}`);
  });

  // Apply size to form check labels (timer type buttons)
  const formLabels = document.querySelectorAll('.form-check-label');
  formLabels.forEach(label => {
    label.classList.remove('btn-small', 'btn-medium', 'btn-large');
    label.classList.add(`btn-${currentSettings.timerSize}`);
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Settings button - open modal
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', openSettingsModal);
  }

  // Close buttons
  const closeBtn = document.getElementById('close-settings-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSettingsModal);
  }

  // Close modal when clicking outside
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSettingsModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSettingsModal();
      closeCreditsModal();
    }
  });

  // Tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Music volume slider
  const musicVolumeSlider = document.getElementById('music-volume-setting');
  if (musicVolumeSlider) {
    musicVolumeSlider.addEventListener('input', (e) => {
      const newVolume = parseInt(e.target.value, 10);
      window.dispatchEvent(new CustomEvent('musicVolumeChanged', { detail: { volume: newVolume } }));
    });
  }

  window.addEventListener('musicVolumeChanged', (event) => {
    const newVolume = event.detail.volume;
    currentSettings.musicVolume = newVolume;
    const musicVolumeSlider = document.getElementById('music-volume-setting');
    if (musicVolumeSlider) {
      musicVolumeSlider.value = newVolume;
    }
    const musicVolumePercentage = document.getElementById('music-volume-percentage');
    if (musicVolumePercentage) {
      musicVolumePercentage.textContent = newVolume + '%';
    }
    saveMusicVolume();
  });

  // Save button
  const saveBtn = document.getElementById('save-settings-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveSettings);
  }

  // Reset button
  const resetBtn = document.getElementById('reset-settings-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetToDefaults);
  }

  // Increment/Decrement buttons
  document.querySelectorAll('.increment-btn').forEach(btn => {
    btn.addEventListener('click', () => incrementValue(btn.dataset.target));
  });

  document.querySelectorAll('.decrement-btn').forEach(btn => {
    btn.addEventListener('click', () => decrementValue(btn.dataset.target));
  });

  // Volume slider
  const volumeSlider = document.getElementById('volume-slider');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      document.getElementById('volume-value').textContent = e.target.value + '%';
    });
  }

  // Background selection
  document.querySelectorAll('.background-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectBackground(option.dataset.background);
    });

    // Prevent video from opening in fullscreen on mobile
    const video = option.querySelector('video');
    if (video) {
      // Disable all video interactions
      video.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      video.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
      video.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      // Play video preview on hover (desktop only)
      option.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log('Video play prevented:', e));
      });
      option.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  // Music credits button
  const creditsBtn = document.getElementById('music-credits-btn');
  if (creditsBtn) {
    creditsBtn.addEventListener('click', openCreditsModal);
  }

  const closeCreditsBtn = document.getElementById('close-credits-btn');
  if (closeCreditsBtn) {
    closeCreditsBtn.addEventListener('click', closeCreditsModal);
  }

  // Close credits modal when clicking outside
  const creditsModal = document.getElementById('credits-modal');
  if (creditsModal) {
    creditsModal.addEventListener('click', (e) => {
      if (e.target === creditsModal) {
        closeCreditsModal();
      }
    });
  }
}

// ===== MODAL FUNCTIONS =====
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.classList.remove('hidden');
    loadSettings(); // Refresh settings from current state
  }
}

function closeSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function openCreditsModal() {
  const modal = document.getElementById('credits-modal');
  if (modal) {
    loadMusicCredits();
    modal.classList.remove('hidden');
  }
}

function closeCreditsModal() {
  const modal = document.getElementById('credits-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// ===== TAB SWITCHING =====
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === `${tabName}-tab`) {
      content.classList.add('active');
    }
    else {
      content.classList.remove('active');
    }
  });
}

// ===== FORM INTERACTIONS =====
function incrementValue(targetId) {
  const input = document.getElementById(targetId);
  if (input) {
    const max = parseInt(input.max) || 60;
    const current = parseInt(input.value) || 0;
    if (current < max) {
      input.value = current + 1;
    }
  }
}

function decrementValue(targetId) {
  const input = document.getElementById(targetId);
  if (input) {
    const min = parseInt(input.min) || 1;
    const current = parseInt(input.value) || 0;
    if (current > min) {
      input.value = current - 1;
    }
  }
}

function selectBackground(backgroundName) {
  // Update UI
  document.querySelectorAll('.background-option').forEach(option => {
    if (option.dataset.background === backgroundName) {
      option.classList.add('selected');
    } else {
      option.classList.remove('selected');
    }
  });

  // Update current settings (but don't save yet)
  currentSettings.background = backgroundName;

  // Preview the background immediately
  applyBackground();
}

// ===== SAVE HANDLER =====
function handleSaveSettings() {
  // Collect all values from the form
  currentSettings.timers.pomodoro = parseInt(document.getElementById('pomodoro-duration').value) || 25;
  currentSettings.timers.shortBreak = parseInt(document.getElementById('shortbreak-duration').value) || 5;
  currentSettings.timers.longBreak = parseInt(document.getElementById('longbreak-duration').value) || 15;
  currentSettings.pomodorosBeforeLongBreak = parseInt(document.getElementById('pomodoro-count').value) || 4;
  currentSettings.autoStartBreaks = document.getElementById('auto-start-breaks').checked;
  currentSettings.autoStartPomodoros = document.getElementById('auto-start-pomodoros').checked;
  currentSettings.soundEnabled = document.getElementById('sound-enabled').checked;
  currentSettings.volume = parseInt(document.getElementById('volume-slider').value) || 50;
  currentSettings.timerSize = document.getElementById('timer-size').value;

  // Validate settings
  if (currentSettings.timers.pomodoro < 1 || currentSettings.timers.pomodoro > 60) {
    showToast('Pomodoro duration must be between 1 and 60 minutes');
    return;
  }

  if (currentSettings.timers.shortBreak < 1 || currentSettings.timers.shortBreak > 60) {
    showToast('Short break duration must be between 1 and 60 minutes');
    return;
  }

  if (currentSettings.timers.longBreak < 1 || currentSettings.timers.longBreak > 60) {
    showToast('Long break duration must be between 1 and 60 minutes');
    return;
  }

  // Save to localStorage
  if (saveSettings()) {
    // Apply settings to the page
    applySettings();

    // Close modal
    closeSettingsModal();
  }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== MUSIC CREDITS =====
function loadMusicCredits() {
  const creditsContent = document.getElementById('credits-content');
  if (!creditsContent) return;

  // Get music library from musicPlayer
  const musicLibrary = window.MUSIC_LIBRARY || [];

  if (musicLibrary.length === 0) {
    creditsContent.innerHTML = `
      <div class="credits-list">
        <p style="color: rgba(241, 245, 249, 0.7); font-style: italic;">
          No music tracks have been added yet.
        </p>
      </div>
    `;
    return;
  }

  // Build credits HTML
  let creditsHTML = `
    <div class="credits-list">
      <p style="color: var(--clr-light); margin-bottom: 1.5rem; font-size: 0.95rem;">
        All music tracks are royalty-free and used with proper attribution.
      </p>
  `;

  musicLibrary.forEach((track, index) => {
    creditsHTML += `
      <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(241, 245, 249, 0.05); border-radius: 8px; border-left: 3px solid var(--clr-light);">
        <h4 style="color: var(--clr-light); margin: 0 0 0.5rem 0; font-size: 1rem;">
          ${index + 1}. ${track.title}
        </h4>
        <p style="color: rgba(241, 245, 249, 0.8); margin: 0 0 0.5rem 0; font-size: 0.9rem;">
          <strong>Artist:</strong> ${track.artist}
        </p>
        ${track.credits ? `
          <p style="color: rgba(241, 245, 249, 0.6); margin: 0; font-size: 0.85rem;">
            <strong>License:</strong> ${track.credits}
          </p>
        ` : ''}
      </div>
    `;
  });

  creditsHTML += `</div>`;
  creditsContent.innerHTML = creditsHTML;
}

// ===== EXPORT SETTINGS GETTER =====
// This function can be called by other modules to get current settings
window.getPomodoroSettings = function() {
  return { ...currentSettings };
};

// This function returns the actual currentSettings object (not a copy)
// Used by levelSystem.js to read and write level data
window.loadSettings = function() {
  return currentSettings;
};

// This function saves settings to localStorage
// Used by levelSystem.js to persist level data
window.saveSettings = function(settings) {
  if (settings) {
    currentSettings = settings;
  }
  try {
    localStorage.setItem('pomodoroSettings', JSON.stringify(currentSettings));
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    return false;
  }
};

// This function can be called to open the music credits tab
window.openMusicCredits = function() {
  openCreditsModal();
};

// Export for other modules to save settings
window.savePomodoroSettings = saveSettings;

// Export for other modules
window.pomodoroSettings = currentSettings;
