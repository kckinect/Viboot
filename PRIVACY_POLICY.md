# Privacy Policy for AutoPlay Video Control

**Last Updated:** January 2, 2026

## Overview

AutoPlay Video Control ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Chrome extension.

## Information We Collect

### Data Stored Locally

AutoPlay Video Control stores the following data **locally on your device only** using Chrome's storage API:

- **Timer Preferences**: Your custom timer presets (e.g., 15m, 30m, 1h)
- **Settings**: Your preferences for overlay visibility, notifications, and theme
- **Last Timer Info**: The last time you used a timer (for display purposes only)
- **Referral Code**: A randomly generated 6-character code for share links (optional feature)

### Data We Do NOT Collect

- ❌ We do NOT collect personal information (name, email, phone, etc.)
- ❌ We do NOT track your browsing history
- ❌ We do NOT collect your viewing habits or watch history
- ❌ We do NOT sell your data to third parties
- ❌ We do NOT use analytics or tracking scripts

## How We Use Your Data

Your locally stored data is used solely to:

1. **Provide Timer Functionality**: Start, stop, and manage sleep timers on streaming platforms
2. **Remember Your Preferences**: Save your custom timer presets and settings
3. **Display Last Timer Info**: Show when your last timer expired (optional display)
4. **Enable Social Sharing**: Generate a unique referral code for sharing (optional feature)

## Remote Server Communication

### Configuration Sync (Optional)

AutoPlay Video Control may fetch updated CSS selectors from our remote server (`autoplay-api.onrender.com`) to ensure compatibility with streaming platforms when they update their websites.

**What is sent:**
- An HTTPS GET request to fetch selector configurations

**What is NOT sent:**
- No personal information
- No tracking data
- No usage statistics

**Fallback:** If the server is unavailable, AutoPlay Control uses hardcoded fallback selectors. The extension works offline.

## Third-Party Services

### Streaming Platforms

AutoPlay Video Control interacts with the following streaming platforms to control video playback:

- Netflix
- YouTube
- Disney+
- Prime Video
- HBO Max / Max
- Hulu
- Crunchyroll
- Twitch

**Important:** AutoPlay Video Control does NOT share any data with these platforms. It only controls video playback locally in your browser.

## Data Retention

- **Local Data**: Stored indefinitely on your device until you uninstall the extension or clear browser data
- **Remote Server**: We do NOT store any user data on our servers

## User Rights

You have the right to:

- **Access Your Data**: View all locally stored data via Chrome's Developer Tools (Storage tab)
- **Delete Your Data**: Uninstall the extension or clear browser data
- **Opt-Out**: Disable any optional features (overlay, notifications, sharing)

## Children's Privacy

AutoPlay Video Control does not knowingly collect information from children under 13. The extension is designed for general use and does not require age verification.

## Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on our GitHub repository and reflected in the extension's store listing.

## Contact Us

If you have questions about this Privacy Policy, please contact us:

- **Email:** kckinect@gmail.com
- **GitHub:** https://github.com/kinect3/AutoPlayVideo

## Open Source

AutoPlay Video Control is open source. You can review our code and verify our privacy practices at:
https://github.com/kinect3/AutoPlayVideo

---

**Summary:** AutoPlay Video Control stores minimal data locally on your device, does not collect personal information, does not track you, and does not sell your data. Your privacy is our priority.
