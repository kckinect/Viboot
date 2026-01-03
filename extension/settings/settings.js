/**
 * AutoPlay Video Control - Easy Kit
 * Settings Page Controller - Optimized for performance with caching and minimal background operations
 */

import { trackPageView, trackSettingChange } from '../utils/analytics.js';
import { parseTimeInput, formatSecondsToDisplay } from '../utils/time-utils.js';
import { AUTOPLAY_CONFIG } from '../utils/config.js';

// ============================================
// CONSTANTS
// ============================================

const TOAST_DURATION = 2000;
const STORAGE_KEYS = [
  'autoplay-theme',
  'timerPresets',
  'showNotifications',
  'showOverlay',
  'autoPauseNext',
  'badgeEnabled',
  'notificationSound',
  'compactMode'
];

// ============================================
// STATE
// ============================================

let currentPresets = [...AUTOPLAY_CONFIG.defaultPresets];
let settings = {
  theme: 'dark',
  showNotifications: true,
  showOverlay: true,
  autoPauseNext: false,
  badgeEnabled: true,
  notificationSound: 'none',
  compactMode: false
};

// Cached audio context (reuse to avoid memory leaks)
let audioContext = null;

// ============================================
// DOM ELEMENTS (Cached)
// ============================================

const elements = {};

function cacheElements() {
  // Header
  elements.backBtn = document.getElementById('backBtn');
  
  // Tabs
  elements.tabBtns = document.querySelectorAll('.tab-btn');
  elements.tabPanels = document.querySelectorAll('.tab-panel');
  
  // General Tab
  elements.showNotifications = document.getElementById('showNotifications');
  elements.showOverlay = document.getElementById('showOverlay');
  elements.autoPauseNext = document.getElementById('autoPauseNext');
  elements.badgeEnabled = document.getElementById('badgeEnabled');
  elements.notificationSound = document.getElementById('notificationSound');
  elements.testSoundBtn = document.getElementById('testSoundBtn');
  
  // Presets Tab
  elements.presetInputs = [
    document.getElementById('preset1'),
    document.getElementById('preset2'),
    document.getElementById('preset3'),
    document.getElementById('preset4')
  ];
  elements.savePresetsBtn = document.getElementById('savePresetsBtn');
  elements.resetPresetsBtn = document.getElementById('resetPresetsBtn');
  
  // Appearance Tab
  elements.themeOptions = document.querySelectorAll('.theme-option');
  elements.themeRadios = document.querySelectorAll('.theme-radio');
  elements.compactMode = document.getElementById('compactMode');
  
  // Advanced Tab
  elements.clearHistoryBtn = document.getElementById('clearHistoryBtn');
  elements.exportConfigBtn = document.getElementById('exportConfigBtn');
  elements.importConfigBtn = document.getElementById('importConfigBtn');
  elements.importFileInput = document.getElementById('importFileInput');
  elements.resetAllBtn = document.getElementById('resetAllBtn');
  
  // Toast
  elements.toast = document.getElementById('toast');
  elements.toastIcon = document.getElementById('toastIcon');
  elements.toastMessage = document.getElementById('toastMessage');
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Cache all DOM elements first
  cacheElements();
  
  // Track page view
  trackPageView('Settings', 'settings').catch(() => {});
  
  // Load saved settings
  await loadSettings();
  
  // Setup event listeners (one-time setup)
  setupEventListeners();
});

// ============================================
// SETTINGS MANAGEMENT
// ============================================

async function loadSettings() {
  try {
    const data = await chrome.storage.local.get(STORAGE_KEYS);
    
    // Apply theme immediately
    settings.theme = data['autoplay-theme'] || 'dark';
    applyTheme(settings.theme);
    
    // Load presets with validation
    if (Array.isArray(data.timerPresets) && data.timerPresets.length === 4) {
      currentPresets = data.timerPresets;
    }
    populatePresetEditor();
    
    // Batch UI updates
    const boolSettings = {
      showNotifications: { default: true, element: elements.showNotifications },
      showOverlay: { default: true, element: elements.showOverlay },
      autoPauseNext: { default: false, element: elements.autoPauseNext },
      badgeEnabled: { default: true, element: elements.badgeEnabled },
      compactMode: { default: false, element: elements.compactMode }
    };
    
    // Apply all boolean settings
    Object.entries(boolSettings).forEach(([key, config]) => {
      settings[key] = data[key] !== undefined ? data[key] : config.default;
      config.element.checked = settings[key];
    });
    
    // Apply string settings
    settings.notificationSound = data.notificationSound || 'none';
    elements.notificationSound.value = settings.notificationSound;
    
  } catch (error) {
    console.error('[AutoPlay Settings] Error loading settings:', error);
    showToast('❌', 'Error loading settings');
  }
}

async function saveSetting(key, value) {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch (error) {
    console.error('[AutoPlay Settings] Error saving setting:', error);
    showToast('❌', 'Error saving setting');
  }
}

// ============================================
// EVENT LISTENERS (Optimized with delegation and reusable handlers)
// ============================================

// Reusable toggle handler
function createToggleHandler(settingKey, displayName) {
  return async (e) => {
    settings[settingKey] = e.target.checked;
    await saveSetting(settingKey, settings[settingKey]);
    showToast('✓', `${displayName} ${settings[settingKey] ? 'enabled' : 'disabled'}`);
    
    // Track setting change
    trackSettingChange(settingKey, settings[settingKey]).catch(() => {});
  };
}

// Reusable theme handler
async function handleThemeChange(theme) {
  elements.themeOptions.forEach(opt => opt.classList.remove('active'));
  const activeOption = document.querySelector(`[data-theme="${theme}"]`);
  if (activeOption) activeOption.classList.add('active');
  
  settings.theme = theme;
  await saveSetting('autoplay-theme', theme);
  applyTheme(theme);
  showToast('✓', `Theme: ${theme}`);
  
  // Track theme change
  trackSettingChange('theme', theme).catch(() => {});
}

function setupEventListeners() {
  // Back button
  elements.backBtn.addEventListener('click', () => window.close());
  
  // Tab navigation (event delegation would be better but this is fine for 4 tabs)
  elements.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  // General settings - use reusable handlers
  elements.showNotifications.addEventListener('change', createToggleHandler('showNotifications', 'Notifications'));
  elements.showOverlay.addEventListener('change', createToggleHandler('showOverlay', 'Overlay'));
  elements.autoPauseNext.addEventListener('change', createToggleHandler('autoPauseNext', 'Auto-pause'));
  elements.badgeEnabled.addEventListener('change', createToggleHandler('badgeEnabled', 'Badge counter'));
  elements.compactMode.addEventListener('change', createToggleHandler('compactMode', 'Compact mode'));
  
  // Sound settings
  elements.notificationSound.addEventListener('change', async (e) => {
    settings.notificationSound = e.target.value;
    await saveSetting('notificationSound', settings.notificationSound);
    showToast('✓', `Sound: ${settings.notificationSound}`);
    if (settings.notificationSound !== 'none') {
      playNotificationSound(settings.notificationSound);
    }
  });
  
  elements.testSoundBtn.addEventListener('click', () => {
    if (settings.notificationSound === 'none') {
      showToast('🔇', 'Sound is set to None (Silent)');
    } else {
      playNotificationSound(settings.notificationSound);
      showToast('🔊', `Playing ${settings.notificationSound}`);
    }
  });
  
  // Presets
  elements.savePresetsBtn.addEventListener('click', savePresets);
  elements.resetPresetsBtn.addEventListener('click', resetPresets);
  
  // Theme - unified handler for both click and radio change
  elements.themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.dataset.theme;
      const radio = option.querySelector('.theme-radio');
      if (radio) radio.checked = true;
      handleThemeChange(theme);
    });
  });
  
  elements.themeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) handleThemeChange(e.target.value);
    });
  });
  
  // Advanced
  elements.clearHistoryBtn.addEventListener('click', clearHistory);
  elements.exportConfigBtn.addEventListener('click', exportConfig);
  elements.importConfigBtn.addEventListener('click', () => elements.importFileInput.click());
  elements.importFileInput.addEventListener('change', importConfig);
  elements.resetAllBtn.addEventListener('click', resetAllSettings);
}

// ============================================
// TAB NAVIGATION
// ============================================

function switchTab(tabName) {
  // Deactivate all tabs and panels
  elements.tabBtns.forEach(btn => btn.classList.remove('active'));
  elements.tabPanels.forEach(panel => panel.classList.remove('active'));
  
  // Activate selected tab and panel
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  const selectedPanel = document.getElementById(`${tabName}Tab`);
  
  if (selectedBtn && selectedPanel) {
    selectedBtn.classList.add('active');
    selectedPanel.classList.add('active');
  }
}

// ============================================
// AUDIO (Cached context for performance)
// ============================================

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playNotificationSound(soundName) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Sound configurations
    const sounds = {
      bell: { freq: 800, type: 'sine', gain: 0.3, duration: 0.5 },
      chime: { freq: 1200, type: 'triangle', gain: 0.2, duration: 0.8 },
      alert: { freq: 600, type: 'square', gain: 0.15, duration: 0.3, double: true }
    };
    
    const config = sounds[soundName];
    if (!config) return;
    
    oscillator.frequency.value = config.freq;
    oscillator.type = config.type;
    gainNode.gain.setValueAtTime(config.gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + config.duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + config.duration);
    
    // Double beep for alert
    if (config.double) {
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.value = 700;
        osc2.type = 'square';
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.3);
      }, 200);
    }
  } catch (error) {
    console.error('[AutoPlay Settings] Error playing sound:', error);
  }
}

// ============================================
// THEME
// ============================================

function applyTheme(theme) {
  // Resolve auto theme
  if (theme === 'auto') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update active theme option (only if needed to avoid unnecessary DOM manipulation)
  const currentActive = document.querySelector('.theme-option.active');
  const shouldBeActive = document.querySelector(`[data-theme="${settings.theme}"]`);
  
  if (currentActive !== shouldBeActive) {
    if (currentActive) currentActive.classList.remove('active');
    if (shouldBeActive) shouldBeActive.classList.add('active');
  }
}

// ============================================
// PRESETS
// ============================================

function populatePresetEditor() {
  currentPresets.forEach((seconds, index) => {
    const input = elements.presetInputs[index];
    if (input) input.value = formatSecondsToDisplay(seconds);
  });
}

async function savePresets() {
  const newPresets = [];
  const errors = [];
  
  for (let i = 0; i < 4; i++) {
    const input = elements.presetInputs[i];
    const value = input.value.trim();
    
    // Use default if empty
    if (!value) {
      newPresets.push(AUTOPLAY_CONFIG.defaultPresets[i]);
      input.value = formatSecondsToDisplay(AUTOPLAY_CONFIG.defaultPresets[i]);
      continue;
    }
    
    const seconds = parseTimeInput(value);
    const maxSeconds = 24 * 60 * 60;
    
    // Validate
    if (!seconds || seconds < 1 || seconds > maxSeconds) {
      input.style.borderColor = 'var(--danger)';
      errors.push(i);
    } else {
      input.style.borderColor = '';
      newPresets.push(seconds);
      input.value = formatSecondsToDisplay(seconds);
    }
  }
  
  if (errors.length > 0) {
    showToast('❌', 'Invalid time format');
    setTimeout(() => {
      errors.forEach(i => elements.presetInputs[i].style.borderColor = '');
    }, 2000);
    return;
  }
  
  try {
    await chrome.storage.local.set({ timerPresets: newPresets });
    currentPresets = newPresets;
    chrome.runtime.sendMessage({ action: 'refreshContextMenus' }).catch(() => {});
    showToast('✓', 'Presets saved');
  } catch (error) {
    console.error('[AutoPlay Settings] Error saving presets:', error);
    showToast('❌', 'Error saving presets');
  }
}

async function resetPresets() {
  if (!confirm('Reset all presets to default values?')) return;
  
  try {
    await chrome.storage.local.set({ timerPresets: AUTOPLAY_CONFIG.defaultPresets });
    currentPresets = [...AUTOPLAY_CONFIG.defaultPresets];
    populatePresetEditor();
    chrome.runtime.sendMessage({ action: 'refreshContextMenus' }).catch(() => {});
    showToast('✓', 'Presets reset');
  } catch (error) {
    console.error('[AutoPlay Settings] Error resetting presets:', error);
    showToast('❌', 'Error resetting presets');
  }
}

// ============================================
// DATA MANAGEMENT
// ============================================

async function clearHistory() {
  if (!confirm('Clear all timer history? This cannot be undone.')) return;
  
  try {
    await chrome.storage.local.remove('lastTimer');
    showToast('✓', 'History cleared');
  } catch (error) {
    console.error('[AutoPlay Settings] Error clearing history:', error);
    showToast('❌', 'Error clearing history');
  }
}

async function exportConfig() {
  try {
    const data = await chrome.storage.local.get(null);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `autoplay-settings-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showToast('✓', 'Settings exported');
  } catch (error) {
    console.error('[AutoPlay Settings] Error exporting config:', error);
    showToast('❌', 'Error exporting settings');
  }
}

async function importConfig(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!confirm('Import these settings? Current settings will be overwritten.')) {
      elements.importFileInput.value = '';
      return;
    }
    
    await chrome.storage.local.set(data);
    await loadSettings();
    showToast('✓', 'Settings imported');
  } catch (error) {
    console.error('[AutoPlay Settings] Error importing config:', error);
    showToast('❌', 'Error importing settings');
  } finally {
    elements.importFileInput.value = '';
  }
}

async function resetAllSettings() {
  if (!confirm('Reset ALL settings to defaults? This cannot be undone.')) return;
  
  try {
    await chrome.storage.local.clear();
    
    // Reset local state
    Object.assign(settings, {
      theme: 'dark',
      showNotifications: true,
      showOverlay: true,
      autoPauseNext: false,
      badgeEnabled: true,
      notificationSound: 'none',
      compactMode: false
    });
    currentPresets = [...AUTOPLAY_CONFIG.defaultPresets];
    
    await loadSettings();
    showToast('✓', 'All settings reset');
  } catch (error) {
    console.error('[AutoPlay Settings] Error resetting settings:', error);
    showToast('❌', 'Error resetting settings');
  }
}

// ============================================
// TOAST
// ============================================

let toastTimeout = null;

function showToast(icon, message) {
  // Clear any existing timeout
  if (toastTimeout) clearTimeout(toastTimeout);
  
  elements.toastIcon.textContent = icon;
  elements.toastMessage.textContent = message;
  elements.toast.classList.remove('hidden');
  
  toastTimeout = setTimeout(() => {
    elements.toast.classList.add('hidden');
    toastTimeout = null;
  }, TOAST_DURATION);
}
