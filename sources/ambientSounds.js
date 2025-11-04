import { AMBIENT_SOUNDS } from './ambientSoundsConfig.js';

class AmbientSoundsManager {
  constructor() {
    this.sounds = new Map(); // Map<soundId, {audio: Audio, sourceNode, gainNode, volume: number, config: object}>
    this.mainVolume = 1.0;
    this.musicVolume = 1.0;
    this.isInitialized = false;
    this.audioContext = null;
    this.mainGainNode = null;
    this.isIOSAudioUnlocked = false;
  }

  // Detect iOS devices
  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Initialize Web Audio API (required for iOS volume control)
  async initAudioContext() {
    if (this.audioContext) return;

    console.log('🎧 Initializing Web Audio API for iOS compatibility...');

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();

      // Create master gain node
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.gain.value = this.mainVolume;
      this.mainGainNode.connect(this.audioContext.destination);

      // Resume if suspended (iOS requirement)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
        console.log('✓ iOS AudioContext resumed from suspended state');
      }

      this.isIOSAudioUnlocked = true;
      console.log('✓ Web Audio API initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Web Audio API:', error);
    }
  }

  // Re-initialize existing sounds with Web Audio API
  reinitializeSoundsWithWebAudio() {
    if (!this.audioContext) return;

    console.log('🔄 Converting sounds to Web Audio API...');
    console.log(`Main volume is set to: ${this.mainVolume}`);
    console.log(`Main gain node value: ${this.mainGainNode.gain.value}`);

    this.sounds.forEach((sound, id) => {
      if (!sound.sourceNode && sound.audio) {
        try {
          // Create Web Audio nodes
          sound.audio.crossOrigin = 'anonymous'; // Required for createMediaElementSource
          sound.sourceNode = this.audioContext.createMediaElementSource(sound.audio);
          sound.gainNode = this.audioContext.createGain();

          // Connect: audio → source → gain → mainGain → speakers
          sound.sourceNode.connect(sound.gainNode);
          sound.gainNode.connect(this.mainGainNode);

          // Set current volume (individual sound volume)
          // The mainGainNode will multiply this by mainVolume
          sound.gainNode.gain.value = sound.volume;

          console.log(`✓ Converted ${id} to Web Audio API (volume: ${sound.volume})`);
        } catch (error) {
          console.error(`Failed to convert ${id} to Web Audio API:`, error);
        }
      }
    });

    console.log(`✓ All sounds converted. Main gain: ${this.mainGainNode.gain.value}`);
  }

  async init() {
    if (this.isInitialized) return;

    console.log('🎵 Initializing Ambient Sounds Manager...');

    // Initialize Web Audio API eagerly on iOS (required for volume control)
    // On desktop, we'll use it only if a sound tries to play before initialization
    if (this.isIOS()) {
      console.log('📱 iOS detected - will initialize Web Audio API on first interaction');
    }

    // Initialize all audio objects
    Object.values(AMBIENT_SOUNDS).forEach(category => {
      category.sounds.forEach(soundConfig => {
        const audio = new Audio(soundConfig.file);
        audio.loop = soundConfig.loop;
        audio.volume = 0; // Start muted
        audio.preload = 'metadata';
        audio.crossOrigin = 'anonymous'; // Required for Web Audio API on iOS

        this.sounds.set(soundConfig.id, {
          audio,
          sourceNode: null, // Will be created when Web Audio API is initialized
          gainNode: null,   // Will be created when Web Audio API is initialized
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
        const updateVolume = async (e) => {
          // Initialize Web Audio API on first interaction (iOS requirement ONLY)
          if (!this.audioContext && this.isIOS()) {
            console.log('🎧 iOS: First user interaction detected - initializing Web Audio API...');
            await this.initAudioContext();
            this.reinitializeSoundsWithWebAudio();
          }

          const soundId = e.target.dataset.soundId;
          const volume = e.target.value / 100;
          await this.setSoundVolume(soundId, volume);

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

    // iOS: Use master GainNode
    if (this.mainGainNode) {
      this.mainGainNode.gain.value = this.mainVolume;
    } else {
      // Fallback for non-Web Audio API: Update each sound individually
      this.updateAllVolumes();
    }

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

  async setSoundVolume(soundId, volume) {
    const sound = this.sounds.get(soundId);
    if (!sound) {
      console.warn(`Sound not found: ${soundId}`);
      return;
    }

    sound.volume = Math.max(0, Math.min(1, volume));

    // iOS: Use GainNode (the ONLY way that works on iOS Safari)
    if (sound.gainNode) {
      sound.gainNode.gain.value = sound.volume;
    }
    // Fallback for non-iOS: Use audio.volume
    else {
      sound.audio.volume = sound.volume * this.mainVolume;
    }

    // Resume AudioContext if suspended (iOS requirement)
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    if (sound.volume > 0) {
      if (sound.audio.paused) {
        sound.audio.play().catch(e => {
          console.log(`Autoplay prevented for ${soundId} - will play on user interaction`);
        });
      }
      // If already playing, volume was just updated above
    } else {
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
      // iOS: Use GainNode
      if (sound.gainNode) {
        sound.gainNode.gain.value = sound.volume;
      }
      // Fallback: Use audio.volume
      else {
        sound.audio.volume = sound.volume * this.mainVolume;
      }
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
            // Don't set audio.volume here - it will be set via GainNode on iOS
            // or via setSoundVolume() when user interacts
            if (sound.gainNode) {
              sound.gainNode.gain.value = volume;
            }
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
