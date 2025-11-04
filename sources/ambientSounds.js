import { AMBIENT_SOUNDS } from './ambientSoundsConfig.js';

class AmbientSoundsManager {
  constructor() {
    this.sounds = new Map(); // Map<soundId, {audio: Audio, volume: number, config: object}>
    this.mainVolume = 1.0;
    this.musicVolume = 1.0;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;

    console.log('🎵 Initializing Ambient Sounds Manager...');

    // Initialize all audio objects
    Object.values(AMBIENT_SOUNDS).forEach(category => {
      category.sounds.forEach(soundConfig => {
        const audio = new Audio(soundConfig.file);
        audio.loop = soundConfig.loop;
        audio.volume = 0; // Start muted
        audio.preload = 'metadata';

        this.sounds.set(soundConfig.id, {
          audio,
          volume: soundConfig.defaultVolume,
          config: soundConfig
        });
      });
    });

    // Load saved volumes from localStorage
    this.loadVolumesFromStorage();

    // Set up event listeners for sliders in settings panel
    this.setupEventListeners();

    // Make volume button open settings to Sounds tab
    this.setupVolumeButtonShortcut();

    this.isInitialized = true;
    console.log('✓ Ambient Sounds Manager initialized with', this.sounds.size, 'sounds');
  }

  setupVolumeButtonShortcut() {
    // Find the volume button in music player and make it open settings to Sounds tab
    const checkVolumeButton = () => {
      const volumeBtn = document.getElementById('ambient-volume-btn');
      if (volumeBtn) {
        volumeBtn.addEventListener('click', () => {
          console.log('🎵 Volume button clicked, opening Settings > Sounds tab...');

          // Open settings modal
          const settingsModal = document.getElementById('settings-modal');
          if (settingsModal) {
            settingsModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
          }

          // Switch to Sounds tab
          const soundsTab = document.querySelector('.tab-btn[data-tab="sounds"]');
          if (soundsTab) {
            // Remove active from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Activate Sounds tab
            soundsTab.classList.add('active');
            document.getElementById('sounds-tab').classList.add('active');
          }
        });
        console.log('✓ Volume button shortcut configured');
      } else {
        // Try again in 500ms
        setTimeout(checkVolumeButton, 500);
      }
    };

    checkVolumeButton();
  }

  setupEventListeners() {
    // Wait for DOM to be ready
    setTimeout(() => {
      // Main volume slider
      const mainVolumeSlider = document.getElementById('main-volume-setting');
      if (mainVolumeSlider) {
        const updateMainVolume = (e) => {
          this.setMainVolume(e.target.value / 100);
          document.getElementById('main-volume-percentage').textContent = e.target.value + '%';
        };
        mainVolumeSlider.addEventListener('input', updateMainVolume);
        mainVolumeSlider.addEventListener('change', updateMainVolume);
      }

      // Music volume slider
      const musicVolumeSlider = document.getElementById('music-volume-setting');
      if (musicVolumeSlider) {
        const updateMusicVolume = (e) => {
          this.setMusicVolume(e.target.value / 100);
          document.getElementById('music-volume-percentage').textContent = e.target.value + '%';
        };
        musicVolumeSlider.addEventListener('input', updateMusicVolume);
        musicVolumeSlider.addEventListener('change', updateMusicVolume);
      }

      // Individual sound sliders
      document.querySelectorAll('.sound-slider[data-sound-id]').forEach(slider => {
        const updateVolume = (e) => {
          const soundId = e.target.dataset.soundId;
          const volume = e.target.value / 100;
          this.setSoundVolume(soundId, volume);

          // Update percentage display
          const percentageEl = document.getElementById(`${soundId}-percentage`);
          if (percentageEl) {
            percentageEl.textContent = e.target.value + '%';
          }
        };

        slider.addEventListener('input', updateVolume);
        slider.addEventListener('change', updateVolume);
      });

      console.log('✓ Event listeners set up for sound sliders');
    }, 100);
  }

  setMainVolume(volume) {
    this.mainVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    this.saveVolumesToStorage();
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));

    // Update music player volume
    if (window.musicPlayer && window.musicPlayer.audio) {
      window.musicPlayer.audio.volume = this.musicVolume * this.mainVolume;
    }

    this.saveVolumesToStorage();
  }

  setSoundVolume(soundId, volume) {
    const sound = this.sounds.get(soundId);
    if (!sound) {
      console.warn(`Sound not found: ${soundId}`);
      return;
    }

    sound.volume = Math.max(0, Math.min(1, volume));
    sound.audio.volume = sound.volume * this.mainVolume;

    // Start playing if volume > 0, stop if volume = 0
    if (sound.volume > 0 && sound.audio.paused) {
      sound.audio.play().catch(e => {
        console.log(`Autoplay prevented for ${soundId} - will play on user interaction`);
      });
    } else if (sound.volume === 0 && !sound.audio.paused) {
      sound.audio.pause();
      sound.audio.currentTime = 0; // Reset to start
    }

    this.saveVolumesToStorage();
  }

  updateAllVolumes() {
    // Update music player
    if (window.musicPlayer && window.musicPlayer.audio) {
      window.musicPlayer.audio.volume = this.musicVolume * this.mainVolume;
    }

    // Update all ambient sounds
    this.sounds.forEach((sound) => {
      sound.audio.volume = sound.volume * this.mainVolume;
    });
  }

  saveVolumesToStorage() {
    try {
      const volumeData = {
        mainVolume: this.mainVolume,
        musicVolume: this.musicVolume,
        sounds: {}
      };

      this.sounds.forEach((sound, id) => {
        volumeData.sounds[id] = sound.volume;
      });

      localStorage.setItem('ambientSoundsVolumes', JSON.stringify(volumeData));
    } catch (e) {
      console.error('Failed to save volumes:', e);
    }
  }

  loadVolumesFromStorage() {
    try {
      const saved = localStorage.getItem('ambientSoundsVolumes');
      if (!saved) return;

      const volumeData = JSON.parse(saved);

      this.mainVolume = volumeData.mainVolume || 1.0;
      this.musicVolume = volumeData.musicVolume || 1.0;

      if (volumeData.sounds) {
        Object.entries(volumeData.sounds).forEach(([id, volume]) => {
          const sound = this.sounds.get(id);
          if (sound) {
            sound.volume = volume;
            sound.audio.volume = volume * this.mainVolume;
          }
        });
      }

      // Update UI sliders after DOM is ready
      setTimeout(() => {
        // Main volume
        const mainSlider = document.getElementById('main-volume-setting');
        if (mainSlider) {
          mainSlider.value = this.mainVolume * 100;
          const percentageEl = document.getElementById('main-volume-percentage');
          if (percentageEl) {
            percentageEl.textContent = Math.round(this.mainVolume * 100) + '%';
          }
        }

        // Music volume
        const musicSlider = document.getElementById('music-volume-setting');
        if (musicSlider) {
          musicSlider.value = this.musicVolume * 100;
          const percentageEl = document.getElementById('music-volume-percentage');
          if (percentageEl) {
            percentageEl.textContent = Math.round(this.musicVolume * 100) + '%';
          }
        }

        // Individual sounds
        this.sounds.forEach((sound, id) => {
          const slider = document.getElementById(`${id}-volume`);
          if (slider) {
            slider.value = sound.volume * 100;
            const percentageEl = document.getElementById(`${id}-percentage`);
            if (percentageEl) {
              percentageEl.textContent = Math.round(sound.volume * 100) + '%';
            }
          }
        });
      }, 500);

      console.log('✓ Loaded saved volumes from localStorage');

    } catch (e) {
      console.error('Failed to load volumes:', e);
    }
  }

  // Public method to pause all ambient sounds
  pauseAll() {
    this.sounds.forEach(sound => {
      if (!sound.audio.paused) {
        sound.audio.pause();
      }
    });
  }

  // Public method to resume ambient sounds that were playing
  resumeAll() {
    this.sounds.forEach(sound => {
      if (sound.volume > 0 && sound.audio.paused) {
        sound.audio.play().catch(e => console.log('Resume prevented:', e));
      }
    });
  }

  // Public method to stop all sounds and reset
  stopAll() {
    this.sounds.forEach(sound => {
      sound.audio.pause();
      sound.audio.currentTime = 0;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const ambientManager = new AmbientSoundsManager();
  ambientManager.init();

  // Make globally accessible
  window.ambientSoundsManager = ambientManager;

  console.log('🎵 Ambient Sounds Manager ready!');
});

export default AmbientSoundsManager;
