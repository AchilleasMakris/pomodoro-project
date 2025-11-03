// Discord SDK Module
// Handles Discord Embedded App SDK initialization and iframe detection

import { DiscordSDK } from '@discord/embedded-app-sdk';

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

      // Detect environment first
      this.detectDiscordEnvironment();

      if (!this.isDiscordEnvironment) {
        console.log('[Discord SDK] Not in Discord environment - skipping initialization');
        return { success: true, skipped: true };
      }

      // Get Client ID from environment or URL params
      const urlParams = new URLSearchParams(window.location.search);
      const clientId = urlParams.get('client_id') || '1290824078832418856'; // Your app's client ID

      // Initialize SDK
      this.discordSdk = new DiscordSDK(clientId);

      console.log('[Discord SDK] Waiting for ready state...');

      // Wait for Discord SDK to be ready
      await this.discordSdk.ready();

      console.log('[Discord SDK] Ready! SDK initialized successfully');
      this.isReady = true;

      // Authenticate (required for some Discord features)
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
        console.log('[Discord SDK] Authentication successful');
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
      console.error('[Discord SDK] Initialization failed:', err);
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

// Export singleton instance
const discordManager = new DiscordManager();

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  discordManager.initialize().then(result => {
    console.log('[Discord SDK] Auto-initialization complete:', result);
  });
}

export default discordManager;
