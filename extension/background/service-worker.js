import { ConfigManager } from '../utils/config-manager.js';
import { timerEngine } from './timer-engine.js';

// ============================================
// INSTALLATION & STARTUP
// ============================================

// Run immediately when extension is installed/updated
chrome.runtime.onInstalled.addListener(async () => {
  try {
    console.log("[Viboot] Extension installed. Starting initial setup...");
    
    // Sync remote config (non-blocking)
    ConfigManager.syncConfig().catch(e => 
      console.warn('[Viboot] Initial config sync failed:', e.message)
    );
    
    // Schedule daily config sync (every 24 hours)
    await chrome.alarms.create('dailyConfigSync', { periodInMinutes: 1440 });
    
    console.log("[Viboot] Setup complete.");
  } catch (error) {
    console.error('[Viboot] Installation error:', error);
  }
});

// Restore timer when service worker starts (browser restart)
chrome.runtime.onStartup.addListener(async () => {
  console.log("[Viboot] Browser started. Checking for active timer...");
  await timerEngine.restoreTimer();
});

// Also restore on service worker wake-up
(async () => {
  try {
    await timerEngine.restoreTimer();
  } catch (error) {
    console.error('[Viboot] Failed to restore timer on wake:', error);
  }
})();

// ============================================
// ALARMS (Scheduled Tasks)
// ============================================

chrome.alarms.onAlarm.addListener(async (alarm) => {
  try {
    if (alarm.name === 'dailyConfigSync') {
      console.log("[Viboot] Running daily config sync...");
      await ConfigManager.syncConfig();
    } else if (alarm.name.startsWith('viboot')) {
      // Handle timer alarms (vibootTimerTick, vibootTimerExpiry)
      await timerEngine.handleAlarm(alarm.name);
    }
  } catch (error) {
    console.error('[Viboot] Alarm handler error:', error);
  }
});

// ============================================
// MESSAGE HANDLING (Popup & Content Scripts)
// ============================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle async operations
  handleMessage(message, sender)
    .then(response => sendResponse(response))
    .catch(error => sendResponse({ success: false, error: error.message }));
  
  // Return true to indicate async response
  return true;
});

async function handleMessage(message, sender) {
  const { action } = message;
  
  switch (action) {
    // ---- Timer Controls ----
    case 'startTimer': {
      // Support both 'minutes' and 'duration' (seconds) for custom timer
      let minutes = message.minutes;
      if (!minutes && message.duration) {
        minutes = message.duration / 60; // Convert seconds to minutes
      }
      // Get tabId from message or sender
      const tabId = message.tabId || sender?.tab?.id;
      
      if (!tabId) {
        // Get the active tab if no tabId provided
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (activeTab) {
          const timer = await timerEngine.startTimer(minutes, activeTab.id);
          return { success: true, timer };
        }
        return { success: false, error: 'No active tab found' };
      }
      
      const timer = await timerEngine.startTimer(minutes, tabId);
      return { success: true, timer };
    }
    
    case 'stopTimer': {
      await timerEngine.stopTimer();
      return { success: true };
    }
    
    case 'extendTimer': {
      const { minutes } = message;
      const timer = await timerEngine.extendTimer(minutes);
      return { success: true, timer };
    }
    
    case 'getTimerStatus': {
      const status = timerEngine.getTimerStatus();
      return { success: true, status };
    }
    
    // ---- Config Management ----
    case 'syncConfig': {
      const config = await ConfigManager.syncConfig();
      return { success: true, config };
    }
    
    case 'getSelectors': {
      const { platform } = message;
      const selectors = await ConfigManager.getSelectors(platform);
      return { success: true, selectors };
    }
    
    // ---- Settings ----
    case 'getSettings': {
      const result = await chrome.storage.local.get('settings');
      const settings = result.settings || {
        showNotifications: true,
        showOverlay: true,
        defaultTimer: 30
      };
      return { success: true, settings };
    }
    
    case 'saveSettings': {
      const { settings } = message;
      await chrome.storage.local.set({ settings });
      return { success: true };
    }
    
    default:
      return { success: false, error: `Unknown action: ${action}` };
  }
}