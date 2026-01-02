/**
 * Viboot Configuration
 * Centralized config for easy editing of social links, URLs, and settings
 * 
 * ============================================
 * EDIT THIS FILE TO UPDATE SOCIAL LINKS
 * ============================================
 */

export const VIBOOT_CONFIG = {
  // ============================================
  // VERSION INFO
  // ============================================
  version: '2.0',
  
  // ============================================
  // SOCIAL MEDIA LINKS
  // Set to null or empty string to hide a link
  // Icons are loaded from assets/icons/social/
  // ============================================
  social: {
    twitter: {
      enabled: false,
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
      url: 'https://tiktok.com/@viboot',
      icon: 'tiktok.svg',
      label: 'TikTok'
    },
    github: {
      enabled: true,
      url: 'https://github.com/kckinect/Viboot',
      icon: 'github.svg',
      label: 'GitHub'
    }
  },
  
  // ============================================
  // ICON PATHS
  // ============================================
  iconBasePath: '../assets/icons/social/',
  
  // ============================================
  // REFERRAL SETTINGS
  // ============================================
  referral: {
    enabled: true,
    // Base URL for referral links (update when domain is ready)
    baseUrl: 'https://chromewebstore.google.com/detail/viboot/',  // Add extension ID
    // Future: 'https://viboot.io/get'
    
    // Pre-filled share messages
    shareMessages: {
      twitter: 'I stopped binge-watching with this free Chrome extension 😴\n\nSet a timer → Video auto-pauses → Better sleep\n\nTry Viboot:',
      email: {
        subject: 'Check out Viboot - Sleep Timer for Streaming',
        body: 'Hey!\n\nI\'ve been using this free Chrome extension called Viboot. It adds a sleep timer to Netflix, YouTube, and other streaming sites.\n\nYou set a timer, and when it expires, your video automatically pauses. No more waking up at 3am with Netflix still playing!\n\nGet it here:'
      }
    }
  },
  
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
  
  for (const [domain, name] of Object.entries(VIBOOT_CONFIG.platformNames)) {
    if (hostname.includes(domain)) return name;
  }
  
  // Clean up hostname for display
  return hostname.replace(/^www\./, '').split('.')[0];
}

/**
 * Generate referral link with user's code
 */
export function getReferralLink(referralCode) {
  if (!referralCode) return VIBOOT_CONFIG.referral.baseUrl;
  return `${VIBOOT_CONFIG.referral.baseUrl}?ref=${referralCode}`;
}

/**
 * Get enabled social links
 */
export function getEnabledSocialLinks() {
  return Object.entries(VIBOOT_CONFIG.social)
    .filter(([key, config]) => config.enabled)
    .map(([key, config]) => ({ key, ...config }));
}
