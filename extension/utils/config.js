/**
 * AutoPlay Video Control - Configuration
 * Centralized config for easy editing of social links, URLs, and settings
 * 
 * ============================================
 * EDIT THIS FILE TO UPDATE SOCIAL LINKS
 * ============================================
 */

export const AUTOPLAY_CONFIG = {
  // ============================================
  // VERSION INFO
  // ============================================
  version: '2.0',
  
  // ============================================
  // DEFAULT TIMER PRESETS (in seconds)
  // ============================================
  defaultPresets: [
    30 * 60,   // 30 minutes (main clock)
    60 * 60,   // 1 hour
    90 * 60,   // 1.5 hours
    120 * 60   // 2 hours
  ],
  
  // ============================================
  // SOCIAL MEDIA LINKS
  // Set to null or empty string to hide a link
  // Icons are loaded from assets/icons/social/
  // ============================================
  social: {
    twitter: {
      enabled: true,
      url: 'https://x.com/kinectonvy',  // Your Twitter/X profile
      icon: 'twitter.svg',
      label: 'Twitter'
    },
    discord: {
      enabled: true,
      url: 'https://discord.gg/5RVhudjx',  // Your Discord invite link
      icon: 'discord.svg',
      label: 'Discord'
    },
    email: {
      enabled: true,
      address: 'kckinect@gmail.com',  // Contact email
      icon: 'email.svg',
      label: 'Email'
    },
    instagram: {
      enabled: false,  // Set to true when ready
      url: 'https://www.instagram.com/reikinect/',
      icon: 'instagram.svg',
      label: 'Instagram'
    },
    tiktok: {
      enabled: false,  // Set to true when ready
      url: 'https://tiktok.com/@autoplaycontrol',
      icon: 'tiktok.svg',
      label: 'TikTok'
    },
    github: {
      enabled: true,
      url: 'https://github.com/kinect3/AutoPlayVideo',
      icon: 'github.svg',
      label: 'GitHub'
    }
  },
  
  // ============================================
  // ICON PATHS
  // ============================================
  iconBasePath: '../assets/icons/social/', 
  
  // ============================================
  // PLATFORM DISPLAY NAMES
  // Used for "Last timer" display
  // ============================================
  platformNames: {
    'netflix.com': 'Netflix',
    'youtube.com': 'YouTube',
    'disneyplus.com': 'Disney+',
    'hbomax.com': 'HBO Max',
    'max.com': 'Max',
    'amazon.com': 'Prime Video',
    'primevideo.com': 'Prime Video',
    'hulu.com': 'Hulu',
    'crunchyroll.com': 'Crunchyroll',
    'twitch.tv': 'Twitch'
  }
};

/**
 * Get display name for a hostname
 */
export function getSiteDisplayName(hostname) {
  if (!hostname) return 'Unknown';
  
  for (const [domain, name] of Object.entries(AUTOPLAY_CONFIG.platformNames)) {
    if (hostname.includes(domain)) return name;
  }
  
  // Clean up hostname for display
  return hostname.replace(/^www\./, '').split('.')[0];
}

/**
 * Get enabled social links
 */
export function getEnabledSocialLinks() {
  return Object.entries(AUTOPLAY_CONFIG.social)
    .filter(([key, config]) => config.enabled)
    .map(([key, config]) => ({ key, ...config }));
}
