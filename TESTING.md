# Viboot Testing & Quality Assurance Checklist

## Days 18-21: Bug Fixes, Error Handling & Performance

---

## 🔧 Core Functionality Tests

### Timer Engine
- [ ] **Start Timer**: Set 1-minute timer, verify countdown in badge
- [ ] **Stop Timer**: Click stop, verify badge clears and overlay disappears
- [ ] **Extend Timer**: Add time during active countdown
- [ ] **Custom Timer**: Test values from 1 second to 24 hours
- [ ] **Timer Expiry**: Let timer complete, verify video pauses

### Edge Cases
- [ ] **Tab Close**: Close tab with active timer → timer should stop cleanly
- [ ] **Browser Restart**: Start timer, close browser, reopen → timer should restore
- [ ] **Multiple Tabs**: Ensure timer only affects the original tab
- [ ] **Service Worker Sleep**: Let extension idle 5+ mins → timer should continue
- [ ] **Navigate Away**: Navigate to different page on same tab → timer continues
- [ ] **Refresh Page**: Refresh during active timer → overlay should restore

---

## 🎬 Platform-Specific Tests

### Netflix
- [ ] Video detection works
- [ ] Pause command works
- [ ] Overlay displays correctly
- [ ] Timer survives episode change

### YouTube
- [ ] Standard video detection
- [ ] Shorts detection
- [ ] Pause works on both
- [ ] Overlay positioning correct

### Amazon Prime Video
- [ ] Video in player detected
- [ ] Pause command works
- [ ] Shadow DOM traversal working

### Disney+
- [ ] Video detection
- [ ] Pause functionality
- [ ] Works during playback

### Crunchyroll
- [ ] Anime player detection
- [ ] Pause works
- [ ] Overlay visible

### HBO Max / Max
- [ ] Video player found
- [ ] Pause works

### Hulu
- [ ] Video detection
- [ ] Pause command

### Twitch
- [ ] Live stream detection
- [ ] VOD detection
- [ ] Pause works

### Generic Sites
- [ ] Any video element detected
- [ ] Fallback pause works

---

## 🎨 UI/UX Tests

### Popup
- [ ] Opens without errors
- [ ] Shows correct timer status
- [ ] All preset buttons work (15, 30, 45, 60, 90, 120)
- [ ] Custom timer button opens modal
- [ ] Custom time input validates correctly
- [ ] "Save as preset" checkbox works
- [ ] Stop button visible when timer active

### Overlay
- [ ] Appears on streaming sites
- [ ] Shows countdown accurately
- [ ] Drag functionality works
- [ ] Position persists after page reload
- [ ] Disappears when timer stops
- [ ] Only appears in main frame (not iframes)

### Notifications
- [ ] Timer expired notification shows
- [ ] Notification disabled setting works

---

## ⚠️ Error Handling Tests

### Network Issues
- [ ] Extension works offline
- [ ] Remote config fails gracefully
- [ ] No console errors on network timeout

### Permission Issues
- [ ] Handles tabs without permission
- [ ] Content script injection fails gracefully
- [ ] Storage quota exceeded handled

### Invalid Input
- [ ] Custom timer rejects invalid values
- [ ] Negative numbers rejected
- [ ] Values > 24h rejected
- [ ] Empty input handled

---

## ⚡ Performance Tests

### Memory
- [ ] No memory leaks after multiple timer cycles
- [ ] Overlay doesn't duplicate
- [ ] Event listeners cleaned up properly

### CPU
- [ ] Minimal background CPU usage
- [ ] No excessive DOM polling
- [ ] MutationObserver properly disconnected

### Storage
- [ ] Storage writes batched (not every second)
- [ ] Old data cleaned up properly

---

## 🔍 Console Checks

Run these in DevTools to verify no errors:

```javascript
// Background page (service worker)
// Go to chrome://extensions → Viboot → "Service Worker"

// Content script (on streaming page)
// Press F12 → Console
// Should see [Viboot] logs, no errors

// Storage state
chrome.storage.local.get(null, console.log);
// Should show clean state after timer stops
```

---

## 📋 Quick Test Script

1. Load extension in Chrome (`chrome://extensions` → Developer mode → Load unpacked)
2. Go to Netflix or YouTube
3. Click extension icon → Set 1 minute timer
4. Verify badge shows countdown
5. Verify overlay appears on page
6. Wait for timer to expire
7. Verify video pauses
8. Verify notification appears
9. Check console for errors
10. Close tab → Verify no orphaned data in storage

---

## ✅ Sign-Off

| Date | Tester | Platform | Result | Notes |
|------|--------|----------|--------|-------|
|      |        |          |        |       |

---

## Known Issues to Fix

1. _Add issues found during testing here_

---

## Improvements Made

### Day 18 - Timer Engine Upgrade
- [x] Replaced setInterval with chrome.alarms for MV3 compatibility
- [x] Added tab close detection (stops timer when tab closes)
- [x] Added syncTimerState() for service worker wake recovery
- [x] Improved error handling throughout timer-engine.js

### Day 19 - (Planned)
- [ ] Error handling audit
- [ ] Add try-catch blocks where missing
- [ ] Improve user-facing error messages

### Day 20 - (Planned)
- [ ] Performance optimization
- [ ] Reduce storage write frequency
- [ ] Optimize video detection

### Day 21 - (Planned)
- [ ] Final testing on all platforms
- [ ] Edge case verification
- [ ] Ready for production
