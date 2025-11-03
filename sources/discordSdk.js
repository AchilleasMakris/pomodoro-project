// Discord SDK Module
// Handles Discord Embedded App SDK initialization and iframe detection

// Use the global DiscordSDK from CDN
const { DiscordSDK, patchUrlMappings } = window.DiscordSDK || {};

// Patch URL mappings BEFORE anything else (critical for Discord Activity audio)
if (patchUrlMappings) {
  patchUrlMappings([
    {
      prefix: '/r2-audio',
      target: 'pub-7e068d8c526a459ea67ff46fe3762059.r2.dev/music'
    }
  ]);
  console.log('[Discord SDK] ✅ URL mappings patched for /r2-audio');
}

class DiscordManager {
  constructor() {
    this.discordSdk = null;
    this.isDiscordEnvironment = false;
    this.isReady = false;
    this.auth = null;
  }

  /**
   * Detect if app is running inside Discord Activity iframe
   */
  detectDiscordEnvironment() {
    try {
      // Check for Discord-specific URL parameters or iframe context
      const urlParams = new URLSearchParams(window.location.search);
      const hasDiscordParams = urlParams.has('frame_id') || urlParams.has('instance_id');

      // Check if running in iframe
      const inIframe = window.self !== window.top;

      // Check for Discord-specific parent origin
      const isDiscordOrigin = document.referrer.includes('discord.com');

      this.isDiscordEnvironment = hasDiscordParams || (inIframe && isDiscordOrigin);

      console.log('[Discord SDK] Environment detected:', {
        isDiscord: this.isDiscordEnvironment,
        inIframe,
        hasDiscordParams,
        isDiscordOrigin
      });

      return this.isDiscordEnvironment;
    } catch (err) {
      console.warn('[Discord SDK] Error detecting Discord environment:', err);
      return false;
    }
  }

  /**
   * Initialize Discord SDK
   */
  async initialize() {
    try {
      console.log('[Discord SDK] Initializing...');

      // Check if SDK is available
      if (!DiscordSDK) {
        console.warn('[Discord SDK] SDK not loaded from CDN - skipping initialization');
        return { success: false, error: 'SDK not loaded' };
      }

      // Detect environment first
      this.detectDiscordEnvironment();

      if (!this.isDiscordEnvironment) {
        console.log('[Discord SDK] Not in Discord environment - skipping initialization');
        return { success: true, skipped: true };
      }

      // Get Client ID from environment or URL params
      const urlParams = new URLSearchParams(window.location.search);
      const clientId = urlParams.get('client_id') || '1290824078832418856'; // Your app's client ID

      console.log('[Discord SDK] Using client ID:', clientId);

      // Initialize SDK
      this.discordSdk = new DiscordSDK(clientId);

      console.log('[Discord SDK] Waiting for ready state...');

      // Wait for Discord SDK to be ready
      await this.discordSdk.ready();

      console.log('[Discord SDK] ✅ Ready! SDK initialized successfully');
      this.isReady = true;

      // Authenticate (optional - some features require it)
      try {
        const { code } = await this.discordSdk.commands.authorize({
          client_id: clientId,
          response_type: 'code',
          state: '',
          prompt: 'none',
          scope: [
            'identify',
            'guilds',
          ],
        });

        this.auth = { code };
        console.log('[Discord SDK] ✅ Authentication successful');
      } catch (authErr) {
        console.warn('[Discord SDK] Authentication skipped or failed:', authErr);
        // Non-critical - app can still work without auth
      }

      return {
        success: true,
        isDiscord: true,
        isReady: this.isReady,
        auth: this.auth
      };

    } catch (err) {
      console.error('[Discord SDK] ❌ Initialization failed:', err);
      return {
        success: false,
        error: err.message,
        isDiscord: this.isDiscordEnvironment
      };
    }
  }

  /**
   * Get Discord SDK instance (if initialized)
   */
  getSDK() {
    return this.discordSdk;
  }

  /**
   * Check if running in Discord
   */
  isDiscord() {
    return this.isDiscordEnvironment;
  }

  /**
   * Check if SDK is ready
   */
  isSDKReady() {
    return this.isReady;
  }

  /**
   * Get user info (if authenticated)
   */
  async getUserInfo() {
    if (!this.isReady || !this.discordSdk) {
      console.warn('[Discord SDK] SDK not ready or not initialized');
      return null;
    }

    try {
      const user = await this.discordSdk.commands.getUser();
      return user;
    } catch (err) {
      console.error('[Discord SDK] Failed to get user info:', err);
      return null;
    }
  }
}

// Create singleton instance and expose globally
const discordManager = new DiscordManager();
window.discordManager = discordManager;

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready, then initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      discordManager.initialize().then(result => {
        console.log('[Discord SDK] Auto-initialization complete:', result);
      });
    });
  } else {
    discordManager.initialize().then(result => {
      console.log('[Discord SDK] Auto-initialization complete:', result);
    });
  }
}
