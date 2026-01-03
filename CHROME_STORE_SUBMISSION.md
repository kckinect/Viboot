# Chrome Web Store Submission - Quick Reference

## 🚀 Step-by-Step Submission Guide

### Before You Begin
- ✅ Have `dist/autoplay-v2.0.0.zip` ready
- ✅ Have at least 1 screenshot (1280x800 or 640x400)
- ✅ Have promotional images ready (optional but recommended)
- ✅ Have privacy policy URL ready
- ✅ Have $5 USD for one-time developer registration fee (if first time)

---

## Step 1: Register as Chrome Web Store Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with Google account
3. **First time only:** Pay $5 USD registration fee
4. Accept developer agreement

---

## Step 2: Create New Item

1. Click **"New Item"** button
2. Click **"Choose file"**
3. Select `dist/autoplay-v2.0.0.zip`
4. Click **"Upload"**
5. Wait for upload to complete (should be fast, ~320KB)

---

## Step 3: Store Listing Tab

### Product Details

**Extension Name:**
```
AutoPlay Video Control - Video Sleep Timer
```

**Summary (132 characters max):**
```
Auto-pause videos with smart sleep timers. Perfect for Netflix, YouTube, Disney+ & more. Fall asleep worry-free!
```

**Description (Detailed):**
```
🌙 Never Miss Bedtime Again

AutoPlay Video Control is your personal sleep companion for streaming videos. Set a sleep timer, relax, and let AutoPlay Control automatically pause your video when it's time to rest.

✨ KEY FEATURES

⏰ Customizable Sleep Timers
• Quick presets: 30, 60, or 90 minutes
• Custom timer: Set any duration you need
• Extend timer: Add more time while watching

📺 Universal Streaming Support
• Netflix
• YouTube
• Disney+
• Amazon Prime Video
• HBO Max
• Hulu
• Crunchyroll
• And many more!

🎯 Smart Video Control
• Auto-pauses video when timer ends
• Silent notifications (no loud alarms)
• Visual countdown overlay (optional)
• Context menu quick access

💾 Personalization
• Save custom timer presets
• Quick access to favorite durations
• Remembers your preferences
• Dark/light theme support

🔒 Privacy First
• No data collection
• No tracking
• No ads
• Works completely offline (except for platform detection)
• All settings stored locally

🚀 PERFECT FOR

• Falling asleep to videos
• Limiting screen time before bed
• Preventing auto-play all night
• Saving bandwidth
• Practicing healthy media habits

🎨 SIMPLE & INTUITIVE

One-click timer activation from your browser toolbar. Clean, modern interface that doesn't get in your way. Just set it and forget it!

📱 HOW IT WORKS

1. Navigate to your favorite streaming site
2. Click the AutoPlay Control icon in your browser toolbar
3. Choose a timer preset or set a custom time
4. Start watching your video
5. Relax! AutoPlay Control will pause when time's up

No complicated setup. No confusing settings. Just simple, reliable sleep timers.

💡 TIP: Use the context menu (right-click) for even faster access to your most-used timer durations!

Try AutoPlay Control today and take control of your streaming habits. Sweet dreams! 🌟
```

**Category:**
```
Productivity
```

**Language:**
```
English (United States)
```

---

### Graphic Assets

**Icon (Required):**
- ✅ Already in manifest.json (128x128)
- Auto-detected from ZIP

**Screenshots (Required - minimum 1):**
1. Click **"Add screenshots"**
2. Upload your screenshots (1280x800 recommended):
   - `screenshots/1-main-popup.png`
   - `screenshots/2-active-timer.png`
   - `screenshots/3-settings-panel.png`
   - (Add more if you have them, max 5)
3. Reorder by dragging if needed

**Promotional Tiles (Optional but Recommended):**
1. **Small tile (440x280):**
   - Upload `promotional/small-tile-440x280.png`
2. **Large tile (920x680 or 1400x560):**
   - Upload `promotional/large-tile-920x680.png`

---

### Additional Fields

**Official URL (optional):**
```
https://github.com/kinect3/AutoPlayVideo
```

**Homepage URL:**
```
https://github.com/kinect3/AutoPlayVideo
```

**Support URL (optional):**
```
https://github.com/kinect3/AutoPlayVideo/issues
```

---

## Step 4: Privacy Tab

**Single Purpose:**
```
AutoPlay Video Control is a sleep timer extension that automatically pauses streaming videos after a specified time period.
```

**Permission Justifications:**

**1. activeTab:**
```
Required to interact with the currently active streaming video tab to pause/play video when timer expires.
```

**2. alarms:**
```
Required to create and manage countdown timers that trigger video pause actions at the specified time.
```

**3. contextMenus:**
```
Provides quick access to timer functions via right-click context menu for improved user experience.
```

**4. notifications:**
```
Displays silent notifications to inform users when their sleep timer has ended.
```

**5. scripting:**
```
Required to inject content scripts into streaming platform pages to detect and control video playback.
```

**6. storage:**
```
Stores user preferences and custom timer presets locally for a personalized experience.
```

**7. tabs:**
```
Required to identify and manage streaming video tabs for timer functionality.
```

**8. Host Permissions (streaming sites):**
```
Required to detect video players and control playback on supported streaming platforms (Netflix, YouTube, Disney+, etc.).
```

**9. autoplay-api.onrender.com:**
```
Required to fetch platform-specific video player selectors for optimal compatibility across streaming services.
```

**Are you using remote code?**
```
No ❌
```

**Privacy Policy (REQUIRED):**
```
https://github.com/kinect3/AutoPlayVideo/blob/main/PRIVACY_POLICY.md
```
*(Or use your hosted URL: e.g., https://yourdomain.com/autoplay-privacy)*

**Data Usage:**
- ✅ Check "I do not use or collect user data"
- Or explain if you collect any data (we don't)

---

## Step 5: Pricing & Distribution Tab

**Pricing:**
```
Free ✅
```

**Distribution:**
```
🌍 Publish in all regions ✅
```
*(Or select specific countries if needed)*

**Visibility:**
```
Public ✅
```
*(Public = anyone can find it, Unlisted = only with direct link)*

---

## Step 6: Review & Publish

1. Review all tabs for completeness
2. Click **"Submit for Review"** (top right)
3. Confirm submission

---

## 📊 After Submission

### What Happens Next?

1. **Automated Checks (Immediate)**
   - Virus scan
   - Malware detection
   - Manifest validation

2. **Manual Review (1-3 business days, sometimes up to 2 weeks)**
   - Google team reviews your extension
   - Checks compliance with policies
   - Verifies functionality

3. **Possible Outcomes:**
   - ✅ **Approved:** Your extension goes live immediately!
   - ⚠️ **Rejected:** You'll receive an email with reasons. Fix issues and resubmit.
   - 🔄 **More Info Needed:** Google may request clarification or changes.

### Status Tracking

- Check status in [Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- Look for email notifications
- Status indicators:
  - 🟡 **Pending Review** - Waiting for Google to review
  - 🟢 **Published** - Live on Chrome Web Store!
  - 🔴 **Rejected** - Needs changes

---

## 🚨 Common Rejection Reasons & How to Avoid

### 1. Missing/Invalid Privacy Policy
- ✅ **Fix:** Ensure privacy policy URL is accessible and covers all data practices

### 2. Permissions Not Justified
- ✅ **Fix:** We provided clear justifications for each permission

### 3. Single Purpose Violation
- ✅ **Fix:** AutoPlay Control has one clear purpose: sleep timer for videos

### 4. Misleading Description
- ✅ **Fix:** Our description accurately reflects functionality

### 5. Poor Quality Screenshots
- ✅ **Fix:** Use high-resolution, clear screenshots showing actual features

### 6. Trademark Issues
- ✅ **Fix:** "AutoPlay Control" is original; we don't use trademarked platform names in branding

### 7. Remote Code Execution
- ✅ **Fix:** We don't use remote code, eval(), or external scripts

---

## 📈 Post-Approval Best Practices

### Monitoring

1. **Check Reviews Regularly**
   - Respond to user reviews
   - Address bugs and feature requests

2. **Monitor Analytics (optional)**
   - Track installs and uninstalls
   - Monitor usage trends

3. **Watch for Policy Updates**
   - Google updates policies regularly
   - Ensure continued compliance

### Maintenance

1. **Bug Fixes**
   - Release patches as needed
   - Test on multiple platforms

2. **Feature Updates**
   - Add new streaming platform support
   - Enhance existing features
   - Increment version number in manifest.json

3. **Version Updates**
   - Test thoroughly before uploading
   - Write clear changelog
   - Upload new ZIP to dashboard

---

## 🔗 Important Links

- **Developer Dashboard:** https://chrome.google.com/webstore/devconsole
- **Program Policies:** https://developer.chrome.com/docs/webstore/program-policies/
- **Review Status Help:** https://support.google.com/chrome_webstore/answer/2664769
- **Branding Guidelines:** https://developer.chrome.com/docs/webstore/branding/
- **Best Practices:** https://developer.chrome.com/docs/extensions/mv3/quality_guidelines/

---

## 💰 Pricing Info

- **Developer Registration:** $5 USD (one-time, lifetime)
- **Extension Hosting:** FREE
- **Updates:** FREE
- **Analytics:** FREE

---

## 📞 Support Contacts

**If Rejected or Need Help:**
- Review rejection email for specific reasons
- Check policies: https://developer.chrome.com/docs/webstore/program-policies/
- Contact support: https://support.google.com/chrome_webstore/
- Developer forum: https://groups.google.com/a/chromium.org/g/chromium-extensions

---

## ✅ Final Pre-Submission Checklist

- [ ] ZIP file uploaded successfully
- [ ] Store listing description complete
- [ ] Category selected (Productivity)
- [ ] At least 1 screenshot uploaded
- [ ] Privacy policy URL added
- [ ] All permissions justified
- [ ] Single purpose statement clear
- [ ] Pricing set to Free
- [ ] Distribution regions selected
- [ ] Reviewed all tabs
- [ ] Ready to click "Submit for Review"

---

## 🎉 Once Published

Your extension will be available at:
```
https://chrome.google.com/webstore/detail/autoplay-control/[UNIQUE_EXTENSION_ID]
```

Update your README.md and marketing materials with the Chrome Web Store link!

---

**Good luck with your submission! 🚀**

*Expected approval time: 1-3 business days (sometimes up to 2 weeks during busy periods)*
