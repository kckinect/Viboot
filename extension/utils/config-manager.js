// Hardcoded defaults in case the server is down
const DEFAULT_CONFIG = {
  netflix: {
    nextButton: "[data-uia='next-episode-seamless-button']",
    skipIntroButton: "[data-uia='player-skip-intro']"
  },
  youtube: {
    skipAdButton: ".ytp-ad-skip-button"
  }
};

const API_URL = "https://viboot.onrender.com/api/selectors";
const FETCH_TIMEOUT = 10000; // 10 seconds

export class ConfigManager {
  /**
   * Fetch with timeout to prevent hanging requests
   */
  static async fetchWithTimeout(url, timeout = FETCH_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
  }

  static async syncConfig() {
    try {
      console.log("[Viboot] Syncing remote selectors...");
      
      const response = await this.fetchWithTimeout(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const remoteConfig = await response.json();
      
      if (!remoteConfig || !remoteConfig.platforms) {
        throw new Error('Invalid config format');
      }
      
      await chrome.storage.local.set({ 
        selectorConfig: remoteConfig.platforms,
        lastSynced: Date.now()
      });
      
      console.log("[Viboot] Config synced successfully.");
      return remoteConfig.platforms;
    } catch (error) {
      console.warn("[Viboot] Sync failed, using defaults:", error.message);
      return null; 
    }
  }

  static async getSelectors(platformKey) {
    try {
      const data = await chrome.storage.local.get(['selectorConfig']);
      
      if (data.selectorConfig && data.selectorConfig[platformKey]) {
        return data.selectorConfig[platformKey];
      }
      
      return DEFAULT_CONFIG[platformKey] || {};
    } catch (error) {
      console.warn('[Viboot] Failed to get selectors:', error.message);
      return DEFAULT_CONFIG[platformKey] || {};
    }
  }

  /**
   * Check if config needs refresh (older than 24 hours)
   */
  static async needsRefresh() {
    try {
      const data = await chrome.storage.local.get(['lastSynced']);
      if (!data.lastSynced) return true;
      const dayInMs = 24 * 60 * 60 * 1000;
      return (Date.now() - data.lastSynced) > dayInMs;
    } catch {
      return true;
    }
  }
}