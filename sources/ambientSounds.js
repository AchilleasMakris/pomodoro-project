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

    // Set up UI
    this.setupUI();
    this.setupEventListeners();

    this.isInitialized = true;
    console.log('✓ Ambient Sounds Manager initialized with', this.sounds.size, 'sounds');
  }

  setupUI() {
    // Create volume controls modal
    const modal = this.createVolumeControlsModal();
    document.body.appendChild(modal);

    // Add volume button to music player
    this.addVolumeButtonToPlayer();
  }

  createVolumeControlsModal() {
    const modal = document.createElement('div');
    modal.id = 'ambient-volume-modal';
    modal.className = 'modal-overlay hidden';

    modal.innerHTML = `
      <div class="modal-container modal-medium ambient-controls-modal">
        <div class="modal-header">
          <h2>Volume Controls <span class="info-icon" title="Adjust individual sound volumes">ℹ️</span></h2>
          <button id="close-ambient-volume-btn" class="close-btn" aria-label="Close volume controls">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body ambient-volume-body">
          <!-- PERSONAL SECTION -->
          <div class="volume-section">
            <h3 class="volume-section-title">PERSONAL</h3>

            <div class="volume-control-row">
              <div class="volume-control-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                <span>Main Volume</span>
              </div>
              <input type="range" id="main-volume-slider" class="volume-slider" min="0" max="100" value="100">
              <span class="volume-percentage" id="main-volume-value">100%</span>
            </div>
          </div>

          <!-- SHARED SECTION -->
          <div class="volume-section">
            <h3 class="volume-section-title">SHARED</h3>

            <!-- Music Volume -->
            <div class="volume-control-row">
              <div class="volume-control-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <span>Music Volume</span>
              </div>
              <input type="range" id="music-volume-slider" class="volume-slider" min="0" max="100" value="100">
              <span class="volume-percentage" id="music-volume-value">100%</span>
            </div>

            ${this.generateSoundCategoriesHTML()}
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  generateSoundCategoriesHTML() {
    let html = '';

    Object.entries(AMBIENT_SOUNDS).forEach(([categoryKey, category]) => {
      html += `
        <div class="sound-category">
          <div class="sound-category-header">
            <span class="sound-category-icon">${category.icon}</span>
            <span class="sound-category-title">${category.label}</span>
            <button class="category-refresh-btn" data-category="${categoryKey}" title="Reset all sounds in this category">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </button>
          </div>

          <div class="sound-items">
            ${category.sounds.map(sound => `
              <div class="volume-control-row sound-row" data-sound-id="${sound.id}">
                <div class="volume-control-label">
                  <span>${sound.name}</span>
                </div>
                <input type="range"
                  id="sound-${sound.id}-slider"
                  class="volume-slider sound-slider"
                  data-sound-id="${sound.id}"
                  min="0"
                  max="100"
                  value="${sound.defaultVolume}">
                <span class="volume-percentage" id="sound-${sound.id}-value">${sound.defaultVolume}%</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    return html;
  }

  addVolumeButtonToPlayer() {
    // Add volume controls button to music player actions
    const playerActions = document.querySelector('.player-actions');
    if (!playerActions) {
      console.warn('Player actions not found, will retry in 500ms...');
      setTimeout(() => this.addVolumeButtonToPlayer(), 500);
      return;
    }

    // Check if button already exists
    if (document.getElementById('ambient-volume-btn')) {
      console.log('✓ Volume button already exists');
      return;
    }

    const volumeBtn = document.createElement('button');
    volumeBtn.id = 'ambient-volume-btn';
    volumeBtn.className = 'control-btn';
    volumeBtn.title = 'Volume Controls';
    volumeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;

    // Insert before more-options button
    const moreOptionsBtn = document.getElementById('more-options-btn');
    if (moreOptionsBtn) {
      playerActions.insertBefore(volumeBtn, moreOptionsBtn);
      console.log('✓ Volume button added to music player (before more-options)');
    } else {
      playerActions.appendChild(volumeBtn);
      console.log('✓ Volume button added to music player (appended)');
    }

    // Add click event listener immediately
    volumeBtn.addEventListener('click', () => {
      console.log('🎵 Volume button clicked, opening modal...');
      this.openVolumeModal();
    });
  }

  setupEventListeners() {
    // Volume button click
    const volumeBtn = document.getElementById('ambient-volume-btn');
    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => this.openVolumeModal());
    }

    // Close button
    const closeBtn = document.getElementById('close-ambient-volume-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeVolumeModal());
    }

    // Modal overlay click to close
    const modal = document.getElementById('ambient-volume-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeVolumeModal();
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        this.closeVolumeModal();
      }
    });

    // Main volume slider
    const mainVolumeSlider = document.getElementById('main-volume-slider');
    if (mainVolumeSlider) {
      mainVolumeSlider.addEventListener('input', (e) => {
        this.setMainVolume(e.target.value / 100);
        document.getElementById('main-volume-value').textContent = e.target.value + '%';
      });
    }

    // Music volume slider
    const musicVolumeSlider = document.getElementById('music-volume-slider');
    if (musicVolumeSlider) {
      musicVolumeSlider.addEventListener('input', (e) => {
        this.setMusicVolume(e.target.value / 100);
        document.getElementById('music-volume-value').textContent = e.target.value + '%';
      });
    }

    // Individual sound sliders
    document.querySelectorAll('.sound-slider').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const soundId = e.target.dataset.soundId;
        const volume = e.target.value / 100;
        this.setSoundVolume(soundId, volume);
        document.getElementById(`sound-${soundId}-value`).textContent = e.target.value + '%';
      });
    });

    // Category refresh buttons
    document.querySelectorAll('.category-refresh-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        this.resetCategory(category);
      });
    });

    console.log('✓ Event listeners set up');
  }

  openVolumeModal() {
    const modal = document.getElementById('ambient-volume-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  closeVolumeModal() {
    const modal = document.getElementById('ambient-volume-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
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
    if (!sound) return;

    sound.volume = Math.max(0, Math.min(1, volume));
    sound.audio.volume = sound.volume * this.mainVolume;

    // Start playing if volume > 0, stop if volume = 0
    if (sound.volume > 0 && sound.audio.paused) {
      sound.audio.play().catch(e => {
        console.log('Autoplay prevented for', soundId, '- will play on user interaction');
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

  resetCategory(categoryKey) {
    const category = AMBIENT_SOUNDS[categoryKey];
    if (!category) return;

    category.sounds.forEach(soundConfig => {
      const slider = document.getElementById(`sound-${soundConfig.id}-slider`);
      if (slider) {
        slider.value = soundConfig.defaultVolume;
        document.getElementById(`sound-${soundConfig.id}-value`).textContent = soundConfig.defaultVolume + '%';
      }
      this.setSoundVolume(soundConfig.id, soundConfig.defaultVolume / 100);
    });

    console.log('✓ Reset category:', category.label);
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
        const mainSlider = document.getElementById('main-volume-slider');
        if (mainSlider) {
          mainSlider.value = this.mainVolume * 100;
          document.getElementById('main-volume-value').textContent = Math.round(this.mainVolume * 100) + '%';
        }

        const musicSlider = document.getElementById('music-volume-slider');
        if (musicSlider) {
          musicSlider.value = this.musicVolume * 100;
          document.getElementById('music-volume-value').textContent = Math.round(this.musicVolume * 100) + '%';
        }

        this.sounds.forEach((sound, id) => {
          const slider = document.getElementById(`sound-${id}-slider`);
          if (slider) {
            slider.value = sound.volume * 100;
            document.getElementById(`sound-${id}-value`).textContent = Math.round(sound.volume * 100) + '%';
          }
        });
      }, 100);

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
