# Google Analytics 4 Setup Guide for AutoPlay Video Control - Easy Kit

## Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property name: "AutoPlay Video Control Extension"
5. Set timezone and currency
6. Click **Next** → **Create**

## Step 2: Get Measurement ID

1. In your property, go to **Admin** → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter website URL (can be extension URL): `chrome-extension://your-extension-id`
4. Stream name: "AutoPlay Control Extension"
5. Click **Create stream**
6. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## Step 3: Create Measurement Protocol API Secret

1. In the same data stream view, scroll down to **Measurement Protocol API secrets**
2. Click **Create**
3. Enter nickname: "AutoPlay Control Extension"
4. Click **Create**
5. Copy the **Secret value**

## Step 4: Configure Analytics

Open `/extension/utils/analytics.js` and replace:

```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your Measurement ID
const GA_API_SECRET = 'YOUR_API_SECRET'; // Replace with your API Secret
```

## Step 5: Test in Debug Mode

1. In `analytics.js`, set `DEBUG_MODE = true`
2. Open Chrome DevTools Console
3. Trigger some events (start timer, change settings)
4. Check console for `[Analytics] Event tracked:` messages
5. Go to [GA4 DebugView](https://analytics.google.com/analytics/web/#/a0w0p0/debugview) to see events in real-time

## Step 6: Integration Examples

### In Service Worker (background/service-worker.js)
```javascript
import { trackTimerStart, trackTimerComplete, trackTimerStop } from '../utils/analytics.js';

// When timer starts
await trackTimerStart(duration, 'preset');

// When timer completes
await trackTimerComplete(duration);

// When timer is stopped
await trackTimerStop(elapsedSeconds, remainingSeconds);
```

### In Popup (popup/popup.js)
```javascript
import { trackPageView, trackTimerStart, trackPlatform } from '../utils/analytics.js';

// Track popup open
await trackPageView('Popup', 'popup');

// Track platform
await trackPlatform('Netflix');

// Track timer start from custom input
await trackTimerStart(seconds, 'custom');
```

### In Settings (settings/settings.js)
```javascript
import { trackPageView, trackSettingChange } from '../utils/analytics.js';

// Track settings page view
await trackPageView('Settings', 'settings');

// Track setting changes
await trackSettingChange('theme', 'dark');
await trackSettingChange('compactMode', true);
```

## Available Tracking Functions

- `trackEvent(eventName, eventParams)` - Generic event tracking
- `trackPageView(pageTitle, pageLocation)` - Page/screen views
- `trackTimerStart(duration, source)` - Timer started
- `trackTimerComplete(duration)` - Timer completed successfully
- `trackTimerStop(elapsed, remaining)` - Timer stopped early
- `trackSettingChange(settingName, value)` - Settings changed
- `trackPlatform(platform)` - Platform detected/used
- `trackError(errorType, errorMessage)` - Error tracking

## Privacy Considerations

✅ No personal data collected
✅ Anonymous client IDs (UUID)
✅ Session-based tracking
✅ No cross-site tracking
✅ Compliant with Chrome Web Store policies

## Viewing Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. View reports:
   - **Realtime**: See live activity
   - **Reports** → **Events**: See all tracked events
   - **Reports** → **User attributes**: See user segments
   - **Explore**: Create custom reports

## Custom Events in GA4

Your tracked events will appear as:
- `timer_start` - with duration and source
- `timer_complete` - with duration
- `timer_stop` - with elapsed and remaining time
- `setting_change` - with setting name and value
- `platform_use` - with platform name
- `page_view` - with page title
- `error` - with error type and message

## Troubleshooting

**Events not showing up?**
1. Check Measurement ID and API Secret are correct
2. Enable DEBUG_MODE to see console logs
3. Check DebugView in GA4
4. Wait 24-48 hours for first data in standard reports

**CSP errors?**
- Measurement Protocol doesn't require CSP changes
- No inline scripts needed
- All API calls via fetch()

## Go Live

Once tested:
1. Set `DEBUG_MODE = false` in analytics.js
2. Events will appear in GA4 within 24-48 hours
3. Realtime view shows events immediately
