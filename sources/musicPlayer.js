import { R2_MUSIC_BASE_URL, R2_BACKGROUNDS_BASE_URL } from './ambientSoundsConfig.js';

// Music Player Module
// Handles local audio playback with full controls

class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.autoplay = false; // Disable autoplay for Discord compatibility
    this.audio.preload = 'metadata'; // Only preload metadata, not full audio
    this.currentTrack = null;
    this.currentTrackIndex = -1;
    this.isPlaying = false;
    this.playlist = [];
    this.musicLibrary = [];
    this.settings = null;
    this.autoplayPending = false;
    this.userInteractionHandler = null;
    this.previousVolume = 0.7; // Store previous volume for mute/unmute
    this.currentGenre = 'lofi'; // Default genre
    this.availableGenres = ['lofi', 'synthwave']; // Available music genres

    // Bind methods
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
  }

  shufflePlaylist() {
    let currentIndex = this.playlist.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.playlist[currentIndex], this.playlist[randomIndex]] = [
        this.playlist[randomIndex], this.playlist[currentIndex]];
    }
  }

  async init() {
    await this.loadMusicLibrary();
    this.loadSettings();
    this.renderPlayer();
    this.setupEventListeners();

    // Make essential methods globally accessible
    window.musicPlayer = {
      selectGenre: this.selectGenre.bind(this),
      toggleGenreSelector: this.toggleGenreSelector.bind(this),
      closeGenreSelector: this.closeGenreSelector.bind(this)
    };
  }

  async loadMusicLibrary() {
    try {
      const [lofiResponse, synthwaveResponse] = await Promise.all([
        fetch('/sources/music/lofi.json'),
        fetch('/sources/music/synthwave.json')
      ]);
      const lofiTracks = await lofiResponse.json();
      const synthwaveTracks = await synthwaveResponse.json();
      this.musicLibrary = [...lofiTracks, ...synthwaveTracks];
      window.MUSIC_LIBRARY = this.musicLibrary; // Make it globally available for credits page
    } catch (error) {
      console.error('Failed to load music library:', error);
      this.musicLibrary = [];
    }
  }

  // Select a music genre and reshuffle playlist
  selectGenre(genre) {
    if (!this.availableGenres.includes(genre)) {
      console.error(`Invalid genre: ${genre}`);
      return;
    }

    const wasPlaying = this.isPlaying;

    // Pause current track
    if (wasPlaying) {
      this.pause();
    }

    // Update current genre
    this.currentGenre = genre;

    // Save genre preference to localStorage
    localStorage.setItem('musicGenre', genre);

    // Update the playlist
    this.playlist = this.musicLibrary.filter(track => track.genre === this.currentGenre);
    this.shufflePlaylist();

    // Re-render the player in case it was showing "No music available"
    this.renderPlayer();
    
    // Load first track from new genre
    if (this.playlist.length > 0) {
      this.loadTrack(this.playlist[0].id);

      // Resume playing if it was playing before
      if (wasPlaying) {
        this.play();
      }
    }

    // Update genre badge in UI
    this.updateGenreBadge();

    // Dispatch genre changed event for settings panel
    window.dispatchEvent(new CustomEvent('genreChanged', { detail: { genre } }));
  }

  // Update the genre badge in the player UI
  updateGenreBadge() {
    const badge = document.querySelector('.genre-badge');
    if (badge) {
      // Capitalize first letter
      const genreText = this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1);
      badge.textContent = genreText;
      badge.setAttribute('data-genre', this.currentGenre);
    }

    // Also update the genre button text in more options menu
    const genreBtn = document.getElementById('genre-btn-menu');
    if (genreBtn) {
      const genreText = this.currentGenre.charAt(0).toUpperCase() + this.currentGenre.slice(1);
      // Keep the SVG and update only the text
      const svg = genreBtn.querySelector('svg');
      genreBtn.textContent = `Genre: ${genreText}`;
      if (svg) {
        genreBtn.insertBefore(svg, genreBtn.firstChild);
      }
    }
  }

  // Reposition genre selector outside player on mobile
repositionGenreSelectorOnMobile() {
    const genreSelector = document.querySelector('.genre-selector-container');
    if (!genreSelector) return;

    const isMobile = window.innerWidth <= 768;
    const trackInfo = document.querySelector('.track-info');
    const genreBtnMenu = document.getElementById('genre-btn-menu');

    if (isMobile) {
      if (genreBtnMenu) {
        genreBtnMenu.style.display = 'none';
      }
      if (genreSelector.parentElement !== document.body) {
        document.body.appendChild(genreSelector);
      }
    } else {
      if (genreBtnMenu) {
        genreBtnMenu.style.display = 'block';
      }
      if (trackInfo && genreSelector.parentElement !== trackInfo) {
        trackInfo.insertBefore(genreSelector, trackInfo.firstChild);
      }
    }
  }

  setupAudioEvents() {
    this.audio.addEventListener('play', this.handlePlay);
    this.audio.addEventListener('pause', this.handlePause);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);

    this.audio.addEventListener('error', this.handleError);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
  }

  loadSettings() {
    this.settings = window.getPomodoroSettings ? window.getPomodoroSettings() : {};

    // Set volume from settings (use musicVolume if available, fallback to volume)
    const volume = this.settings.musicVolume !== undefined ? this.settings.musicVolume : (this.settings.volume || 70);
    this.audio.volume = volume / 100;

    // Load genre preference from localStorage
    const savedGenre = localStorage.getItem('musicGenre');
    if (savedGenre && this.availableGenres.includes(savedGenre)) {
      this.currentGenre = savedGenre;
    }

    // Populate playlist based on the loaded genre
    this.playlist = this.musicLibrary.filter(track => track.genre === this.currentGenre);
    this.shufflePlaylist();

    // Update badge if it exists
    this.updateGenreBadge();

    // Load and apply saved background
    const savedBackground = this.getCurrentBackground();
    if (savedBackground) {
      this.applyBackground(savedBackground);
      this.updateBackgroundSelection(savedBackground);
    }

    // Listen for settings changes
    window.addEventListener('settingsChanged', (event) => {
      this.settings = event.detail;

      // Update volume if changed
      const newVolume = this.settings.musicVolume !== undefined ? this.settings.musicVolume : (this.settings.volume || 70);
      this.audio.volume = newVolume / 100;
      this.updateVolumeUI();
    });
  }

  renderPlayer() {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    if (this.playlist.length === 0) {
      // Keep the no-music message simple
      container.innerHTML = `<p class="no-music-message">No music available.</p>`;
      return;
    }

    container.innerHTML = `
      <div class="progress-bar-container" id="progress-bar">
        <div class="progress-fill" id="progress-fill"></div>
      </div>
      <div class="player-content">
        <div class="track-info">

          <div class="track-details">
            <h3 id="track-title">No Track Selected</h3>
            <p id="track-artist">-</p>
          </div>
        </div>

        <div class="player-controls">
          <button class="control-btn" id="prev-btn" title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button class="control-btn play-pause" id="play-pause-btn" title="Play">
            <svg id="play-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M8 5v14l11-7z"/></svg>
            <svg id="pause-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" style="display: none;"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
          </button>
          <button class="control-btn" id="next-btn" title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M16 18h2V6h-2zm-11-1l8.5-6L5 5z"/></svg>
          </button>
        </div>

        <div class="player-actions">
           <button class="control-btn" id="background-btn" title="Change Background">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </button>
          <div class="background-selector-menu">
            <div class="background-option" data-background="road-video">
              <video src="https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev/backgrounds/road.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Road</span>
            </div>
            <div class="background-option" data-background="room-video">
              <video src="https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev/backgrounds/room.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Room</span>
            </div>
            <div class="background-option" data-background="eyes-video">
              <video src="https://pub-7e068d8c526a459ea67ff46fe3762059.r2.dev/backgrounds/eyes-wallpaper.mp4" muted loop playsinline style="width: 100%; height: 60px; object-fit: cover; pointer-events: none;"></video>
              <span>Eyes</span>
            </div>
          </div>
          <div class="volume-control">
            <button class="control-btn" id="volume-btn" title="Volume">
              <div class="volume-icon" id="volume-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M15.54 8.46a5 5 0 010 7.07"></path>
                </svg>
              </div>
            </button>
            <div class="volume-slider-container">
              <input type="range" class="volume-slider" id="music-volume-slider" min="0" max="100" value="70">
            </div>
          </div>
          <button class="control-btn" id="more-options-btn" title="More options">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </button>
          <div class="more-options-menu">
            
            <button id="settings-btn-menu"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Settings</button>
            <button id="credits-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l2 2"/></svg>Credits</button>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      const id = target.id;

      if (id === 'play-pause-btn') {
        this.togglePlayPause();
      } else if (id === 'prev-btn') {
        this.previousTrack();
      } else if (id === 'next-btn') {
        this.nextTrack();
      } else if (id === 'settings-btn-menu') {
        if (typeof openSettingsModal === 'function') {
          openSettingsModal();
        }
      } else if (id === 'credits-btn') {
        if (typeof openCreditsModal === 'function') {
          openCreditsModal();
        }
      } else if (id === 'more-options-btn') {
        e.stopPropagation();
        this.toggleMoreOptionsMenu();
      } else if (id === 'background-btn') {
        e.stopPropagation();
        this.toggleBackgroundSelector();
      }
    });



    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => this.seek(e));
    }

    const volumeSlider = document.getElementById('music-volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const newVolume = parseInt(e.target.value, 10);
        // Directly set volume on the audio element
        this.audio.volume = newVolume / 100;
        this.updateVolumeUI();
        // Also dispatch event for settings sync
        window.dispatchEvent(new CustomEvent('musicVolumeChanged', { detail: { volume: newVolume } }));
      });
    }

    window.addEventListener('musicVolumeChanged', (event) => {
      const newVolume = event.detail.volume;
      this.audio.volume = newVolume / 100;
      this.updateVolumeUI();
    });

    // Background option click handlers
    const backgroundOptions = document.querySelectorAll('.background-selector-menu .background-option');
    backgroundOptions.forEach(option => {
      option.addEventListener('click', () => {
        const backgroundName = option.dataset.background;
        if (backgroundName) {
          this.selectBackground(backgroundName);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.more-options-menu') && !e.target.closest('#more-options-btn')) {
        this.closeMoreOptionsMenu();
      }
      if (!e.target.closest('.background-selector-menu') && !e.target.closest('#background-btn')) {
        this.closeBackgroundSelector();
      }

    });

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.nextTrack());


  }

  loadTrack(trackId) {
    if (!trackId) {
      console.error('No track ID provided');
      return;
    }

    const track = this.playlist.find(t => t.id === trackId);
    if (!track) {
      console.error('Track not found:', trackId);
      return;
    }

    this.currentTrack = track;
    this.currentTrackIndex = this.playlist.indexOf(track);

    // Set crossOrigin before setting src for CORS
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = track.file.startsWith('/r2-audio/')
      ? `${R2_MUSIC_BASE_URL}${track.file.replace('/r2-audio', '')}`
      : track.file;

    // Track loaded
    
    this.updateTrackInfo(track.title, track.artist);

    // Auto-play if user was already playing music
    if (this.isPlaying) {
      this.play();
    }
  }

  togglePlayPause() {
    if (!this.currentTrack) {
      // If no track selected, load the first one from shuffled playlist
      if (this.playlist.length > 0) {
        this.loadTrack(this.playlist[0].id);
        this.play();
      }
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play(isAutoplay = false) {
    if (!this.currentTrack) return;

    // For Discord/iframe contexts, try to load first if needed
    if (this.audio.readyState < 2 && !isAutoplay) {
      try {
        this.audio.load();
        // Small delay to let it start loading
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (loadErr) {
        console.error('[Music Player] Load error:', loadErr);
      }
    }

    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayPauseButton(true);

      // Resume ambient sounds
      if (window.ambientSoundsManager) {
        window.ambientSoundsManager.resumeAll();
      }

      // Force clear error messages
      setTimeout(() => {
        this.clearErrorMessage();
      }, 100);
    }).catch(err => {
      this.isPlaying = false;
      this.updatePlayPauseButton(false);

      const hasMessage = err && typeof err.message === 'string';
      const message = hasMessage ? err.message.toLowerCase() : '';
      const errorName = err?.name || '';
      const autoplayBlocked = errorName === 'NotAllowedError' || errorName === 'NotSupportedError' || (message.includes('user') && message.includes('interaction')) || message.includes('not allowed');

      if (autoplayBlocked) {
        // Don't show error message for autoplay blocking - it's expected behavior
        return;
      }

      // If we have an audio.error, it's a media loading error
      if (this.audio.error) {
        const errorMessages = {
          1: 'MEDIA_ERR_ABORTED: Loading aborted',
          2: 'MEDIA_ERR_NETWORK: Network error - check URL/rewrites',
          3: 'MEDIA_ERR_DECODE: Decode error - file corrupted',
          4: 'MEDIA_ERR_SRC_NOT_SUPPORTED: Source not supported - check Discord URL mapping'
        };
        const mediaErrorMsg = errorMessages[this.audio.error.code] || `Unknown media error: ${this.audio.error.code}`;
        console.error('[Music Player] Media error:', mediaErrorMsg);
        this.showError(`❌ ${mediaErrorMsg}`, 0);
      } else {
        console.error('[Music Player] Playback failed:', errorName, message);
        this.showError('❌ Failed to play audio. Try again.', 0);
      }
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayPauseButton(false);

    // Pause ambient sounds
    if (window.ambientSoundsManager) {
      window.ambientSoundsManager.pauseAll();
    }
  }

  previousTrack() {
    if (this.playlist.length === 0) return;

    this.currentTrackIndex--;
    if (this.currentTrackIndex < 0) {
      this.currentTrackIndex = this.playlist.length - 1;
    }

    this.loadTrack(this.playlist[this.currentTrackIndex].id);
    if (this.isPlaying) {
      this.play();
    }
  }

  nextTrack() {
    if (this.playlist.length === 0) return;

    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.playlist.length) {
      this.currentTrackIndex = 0;
    }

    this.loadTrack(this.playlist[this.currentTrackIndex].id);
    if (this.isPlaying) {
      this.play();
    }
  }

  seek(event) {
    if (!this.currentTrack || !this.audio.duration) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (event.clientX - rect.left) / rect.width;
    this.audio.currentTime = pos * this.audio.duration;
  }

  setVolume(value) {
    const volume = value / 100;
    this.audio.volume = volume;
    
    // Store previous volume if not muting
    if (volume > 0) {
      this.previousVolume = volume;
    }
    
    this.updateVolumeIcon(volume);
    this.saveVolumeToSettings(value);
  }



  // Event Handlers
  handlePlay() {
    this.isPlaying = true;
    this.updatePlayPauseButton(true);
    this.clearErrorMessage();
  }

  handlePause() {
    this.isPlaying = false;
    this.updatePlayPauseButton(false);
  }

  handleTimeUpdate() {
    if (!this.audio.duration) return;

    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.updateProgress(progress);
    this.updateCurrentTime(this.audio.currentTime);
  }

  handleEnded() {
    // Auto-play next track
    // Set isPlaying to true before calling nextTrack so the next song auto-plays
    this.isPlaying = true;
    this.nextTrack();
  }

  handleError(e) {
    const audioError = this.audio.error;
    let errorMessage = 'Error loading audio file';
    let errorCode = 'UNKNOWN';

    if (audioError) {
      // Provide specific error messages based on error code
      switch (audioError.code) {
        case 1: // MEDIA_ERR_ABORTED
          errorCode = 'MEDIA_ERR_ABORTED';
          errorMessage = '⚠️ Audio loading was aborted. Please try again.';
          break;
        case 2: // MEDIA_ERR_NETWORK
          errorCode = 'MEDIA_ERR_NETWORK';
          errorMessage = '⚠️ Network error loading audio. Check connection.';
          break;
        case 3: // MEDIA_ERR_DECODE
          errorCode = 'MEDIA_ERR_DECODE';
          errorMessage = '⚠️ Audio file is corrupted or unsupported format.';
          break;
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          errorCode = 'MEDIA_ERR_SRC_NOT_SUPPORTED';
          errorMessage = '⚠️ Audio source not supported by browser/Discord.';
          break;
        default:
          errorMessage = `⚠️ Audio error (code ${audioError.code})`;
      }
    }

    // Check environment
    const inIframe = window.self !== window.top;
    const isDiscord = inIframe || new URLSearchParams(window.location.search).has('frame_id');

    if (isDiscord) {
      errorMessage += ' [Discord Activity]';
    }

    console.error('[Music Player] Audio error:', errorCode, '-', this.currentTrack?.title || 'Unknown');

    this.showError(errorMessage, 0); // Don't auto-hide error messages
    this.isPlaying = false;
    this.updatePlayPauseButton(false);
  }

  handleLoadedMetadata() {
    this.updateDuration(this.audio.duration);
  }

  // UI Updates
  updateTrackInfo(title, artist) {
    const titleEl = document.getElementById('track-title');
    const artistEl = document.getElementById('track-artist');
    if (titleEl) {
      titleEl.textContent = title;

      // Add scrolling class for long titles on mobile
      setTimeout(() => {
        const isMobile = window.innerWidth <= 480;
        if (isMobile && titleEl.scrollWidth > titleEl.clientWidth) {
          titleEl.classList.add('scrolling');
        } else {
          titleEl.classList.remove('scrolling');
        }
      }, 100);
    }
    if (artistEl) artistEl.textContent = artist;
  }

  updatePlayPauseButton(isPlaying) {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const btn = document.getElementById('play-pause-btn');

    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? 'none' : 'block';
      pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }

    if (btn) {
      btn.title = isPlaying ? 'Pause' : 'Play';
    }
  }

  updateProgress() {
    if (this.audio.duration) {
      const progressFill = document.getElementById('progress-fill');
      const currentTimeEl = document.getElementById('current-time');
      const durationEl = document.getElementById('duration');

      const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      if (currentTimeEl) {
        currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
      }
      if (durationEl) {
        durationEl.textContent = this.formatTime(this.audio.duration);
      }
    }
  }

  updateCurrentTime(seconds) {
    const currentTimeEl = document.getElementById('current-time');
    if (currentTimeEl) {
      currentTimeEl.textContent = this.formatTime(seconds);
    }
  }

  updateDuration(seconds) {
    const durationEl = document.getElementById('duration-time');
    if (durationEl) {
      durationEl.textContent = this.formatTime(seconds);
    }
  }

  updateVolumeUI() {
    const volumeSlider = document.getElementById('music-volume-slider');
    if (volumeSlider) {
      volumeSlider.value = this.audio.volume * 100;
      // Update CSS variable for gradient
      volumeSlider.style.setProperty('--volume-percent', (this.audio.volume * 100) + '%');
    }
    this.updateVolumeIcon(this.audio.volume);
  }

  updateVolumeIcon(volume) {
    const volumeIcon = document.getElementById('volume-icon');
    if (!volumeIcon) return;

    let iconSVG;
    if (volume === 0) {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    } else if (volume < 0.5) {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 010 7.07"></path>
        </svg>
      `;
    } else {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <path d="M15.54 8.46a5 5 0 010 7.07"></path>
          <path d="M19.07 4.93a10 10 0 010 14.14"></path>
        </svg>
      `;
    }
    volumeIcon.innerHTML = iconSVG;
  }

  showError(message, duration = 5000) {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    let errorEl = container.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      
      // Add special class for autoplay messages
      if (message.toLowerCase().includes('autoplay')) {
        errorEl.classList.add('autoplay-message');
      }
      
      container.appendChild(errorEl);
    }

    errorEl.textContent = message;

    if (duration !== 0) {
      setTimeout(() => {
        if (errorEl && errorEl.parentNode) {
          errorEl.remove();
        }
      }, duration);
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Menu and Volume Slider Management
  toggleMoreOptionsMenu() {
    const menu = document.querySelector('.more-options-menu');
    if (menu) menu.classList.toggle('active');
  }

  closeMoreOptionsMenu() {
    const menu = document.querySelector('.more-options-menu');
    if (menu) menu.classList.remove('active');
  }

  toggleBackgroundSelector() {
    const menu = document.querySelector('.background-selector-menu');
    if (menu) {
      menu.classList.toggle('active');
      // Update selected state when opening
      if (menu.classList.contains('active')) {
        this.updateBackgroundSelection();
      }
    }
  }

  closeBackgroundSelector() {
    const menu = document.querySelector('.background-selector-menu');
    if (menu) menu.classList.remove('active');
  }

  toggleGenreSelector() {
    const menu = document.getElementById('genre-menu-primary');
    if (menu) menu.classList.toggle('active');
    this.closeMoreOptionsMenu();
  }

  closeGenreSelector() {
    const menu = document.getElementById('genre-menu-primary');
    if (menu) menu.classList.remove('active');
  }

  selectBackground(backgroundName) {
    // Update UI to show selected background
    this.updateBackgroundSelection(backgroundName);
    
    // Apply the background immediately
    this.applyBackground(backgroundName);
    
    // Save to settings
    this.saveBackgroundToSettings(backgroundName);
    
    // Close the menu
    this.closeBackgroundSelector();
  }

  updateBackgroundSelection(selectedBg) {
    // Get current background from settings or use the provided one
    const currentBg = selectedBg || this.getCurrentBackground();
    
    // Update selected state for all background options in the music player menu
    const backgroundOptions = document.querySelectorAll('.background-selector-menu .background-option');
    backgroundOptions.forEach(option => {
      if (option.dataset.background === currentBg) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  }

  getCurrentBackground() {
    // Get from localStorage settings
    try {
      const settings = JSON.parse(localStorage.getItem('pomodoroSettings'));
      return settings?.background || 'wood';
    } catch (e) {
      return 'wood';
    }
  }

  applyBackground(backgroundName) {
    const backgroundMap = {
      'dark-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)' },
      'purple-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #581c87 0%, #3b0764 100%)' },
      'forest-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)' },
      'sunset-gradient': { type: 'gradient', value: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)' },
      'road-video': { type: 'video', value: `${R2_BACKGROUNDS_BASE_URL}/road.mp4` },
      'room-video': { type: 'video', value: `${R2_BACKGROUNDS_BASE_URL}/room.mp4` },
      'eyes-video': { type: 'video', value: `${R2_BACKGROUNDS_BASE_URL}/eyes-wallpaper.mp4` }
    };

    const bg = backgroundMap[backgroundName] || backgroundMap['room-video'];

    // Remove any existing video background
    const existingVideo = document.getElementById('background-video');
    if (existingVideo) {
      existingVideo.remove();
    }

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
      overlay.style.background = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = '-1';
      overlay.style.pointerEvents = 'none';
      
      document.body.prepend(overlay);
      document.body.prepend(video);
      
      // Clear background image
      document.body.style.backgroundImage = 'none';
      
      // Play video
      video.play().catch(e => console.log('Video autoplay prevented:', e));
    } else {
      // Remove video overlay if it exists
      const overlay = document.getElementById('video-overlay');
      if (overlay) {
        overlay.remove();
      }
      
      if (bg.type === 'image') {
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${bg.value}")`;
      } else if (bg.type === 'gradient') {
        document.body.style.backgroundImage = bg.value;
      }
      
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
  }

  saveBackgroundToSettings(backgroundName) {
    try {
      const settings = JSON.parse(localStorage.getItem('pomodoroSettings')) || {};
      settings.background = backgroundName;
      localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save background:', e);
    }
  }

  toggleVolumeSlider() {
    const sliderContainer = document.querySelector('.volume-slider-container');
    if (sliderContainer) sliderContainer.classList.toggle('active');
  }

  closeVolumeSlider() {
    const sliderContainer = document.querySelector('.volume-slider-container');
    if (sliderContainer) sliderContainer.classList.remove('active');
  }

  scheduleAutoplayOnInteraction() {
    if (this.autoplayPending) return;

    this.autoplayPending = true;
    const handler = () => {
      document.removeEventListener('pointerdown', handler);
      document.removeEventListener('keydown', handler);
      this.autoplayPending = false;
      this.userInteractionHandler = null;
      if (!this.isPlaying) {
        this.play();
      }
    };

    this.userInteractionHandler = handler;
    document.addEventListener('pointerdown', handler, { once: true });
    document.addEventListener('keydown', handler, { once: true });

    this.showError('Autoplay was blocked. Click anywhere or press a key to start the music.', 0);
  }

  clearErrorMessage() {
    const container = document.getElementById('music-player-container');
    if (!container) return;

    const errorEl = container.querySelector('.error-message');
    if (errorEl && errorEl.parentNode) {
      errorEl.remove();
    }
  }
}

// Initialize music player when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const player = new MusicPlayer();
  await player.init();

  // Make player globally accessible for debugging
  window.musicPlayer = player;
});