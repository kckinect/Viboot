# Chrome Web Store Deployment Checklist

## ✅ Pre-Submission Checklist

### 1. Code Quality & Security
- [x] All security fixes implemented (innerHTML removed, CSP added, sender validation)
- [x] No JavaScript errors in console
- [x] Content Security Policy configured
- [x] Message validation in place
- [x] No eval() or unsafe code patterns
- [ ] Test on all supported platforms (Netflix, YouTube, Disney+, etc.)
- [ ] Test timer accuracy and reliability
- [ ] Test overlay display and controls
- [ ] Test all settings and presets

### 2. Manifest.json Requirements
- [x] Manifest V3 format
- [x] Version number (2.0.0)
- [x] Name and description (under 132 chars)
- [x] Author field added
- [x] Homepage URL added
- [x] All required permissions documented
- [x] Icons (16x16, 32x32, 48x48, 128x128)
- [x] Valid JSON format

### 3. Privacy & Compliance
- [x] Privacy Policy created (PRIVACY_POLICY.md)
- [ ] Host privacy policy on public URL
- [ ] Review all data collection practices
- [ ] Ensure GDPR compliance
- [ ] No tracking or analytics without disclosure

### 4. Store Listing Materials
- [x] Store listing description written
- [ ] Screenshots (1280x800 or 640x400):
  - [ ] Main popup interface
  - [ ] Active timer with countdown
  - [ ] Settings panel
  - [ ] Video overlay in action
  - [ ] Context menu (optional)
- [ ] Promotional images:
  - [ ] Small tile (440x280)
  - [ ] Large tile (920x680 or 1400x560 marquee)
- [ ] Icon files verified (128x128 PNG required)

### 5. Documentation
- [x] README.md complete
- [x] Privacy Policy complete
- [x] Store listing copy ready
- [ ] Update README with Chrome Web Store link (after approval)

### 6. File Cleanup
- [ ] Remove development files from package:
  - [ ] .DS_Store files
  - [ ] node_modules (if any)
  - [ ] .git folder
  - [ ] BUSINESS_PLAN.md
  - [ ] TESTING.md
  - [ ] REFERRAL_SOCIAL_PLAN.md
  - [ ] Any other internal docs
- [ ] Only include extension/ folder contents
- [ ] Verify all paths in manifest are correct

### 7. Testing Before Zip
- [ ] Load unpacked extension in Chrome
- [ ] Test on Netflix
- [ ] Test on YouTube
- [ ] Test on Disney+
- [ ] Test on Prime Video
- [ ] Test popup UI responsiveness
- [ ] Test timer accuracy (set 1-minute timer)
- [ ] Test extend feature
- [ ] Test stop feature
- [ ] Test settings save/load
- [ ] Test context menu
- [ ] Test notifications
- [ ] Test overlay toggle
- [ ] Test theme switching
- [ ] Test custom timer input
- [ ] Test preset editor

### 8. Create Deployment Package
- [ ] Navigate to extension/ folder
- [ ] Zip only these folders/files:
  ```
  assets/
  background/
  content/
  popup/
  utils/
  manifest.json
  ```
- [ ] Name zip file: autoplay-v2.0.0.zip
- [ ] Verify zip size (should be < 10MB)
- [ ] Test zip by loading in Chrome

### 9. Chrome Web Store Developer Account
- [ ] Create/login to Chrome Web Store Developer Dashboard
- [ ] Pay $5 one-time developer fee (if first time)
- [ ] Verify email address

### 10. Upload & Submit
- [ ] Upload autoplay-v2.0.0.zip
- [ ] Fill in store listing information
- [ ] Add screenshots (at least 1, max 5)
- [ ] Add promotional images
- [ ] Set category: Productivity
- [ ] Add privacy policy URL
- [ ] Set pricing: Free
- [ ] Select regions: All regions or specific countries
- [ ] Review permissions justification
- [ ] Submit for review

---

## 📦 Package Contents (What to Include)

```
autoplay-v2.0.0.zip
├── assets/
│   ├── icons/
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   └── social/ (all SVG files)
│   └── sounds/ (if any)
├── background/
│   ├── service-worker.js
│   └── timer-engine.js
├── content/
│   └── streaming-controller.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── utils/
│   ├── config.js
│   ├── config-manager.js
│   └── storage.js
└── manifest.json
```

---

## 📋 Common Rejection Reasons (Avoid These)

1. ❌ **Missing Privacy Policy** - Must have public URL
2. ❌ **Excessive Permissions** - Already reviewed, should be okay
3. ❌ **Unclear Description** - Already improved
4. ❌ **Missing Screenshots** - Need to create
5. ❌ **Code Obfuscation** - Not applicable (we use plain JS)
6. ❌ **Monetization Violations** - N/A (free extension)
7. ❌ **Trademark Issues** - Using "AutoPlay Control" should be fine
8. ❌ **Deceptive Behavior** - Not applicable

---

## 🚀 Post-Approval Tasks

- [ ] Add Chrome Web Store badge to README
- [ ] Update homepage with store link
- [ ] Share on social media
- [ ] Monitor user reviews
- [ ] Set up support channels (GitHub Issues, Email)
- [ ] Plan future updates

---

## ⏱️ Expected Timeline

- **Submission to Review:** Immediate
- **Review Process:** 1-3 days (sometimes up to 2 weeks)
- **Approval:** Instant once reviewed
- **Live on Store:** Immediate after approval

---

## 📞 Support Contacts

- **Chrome Web Store Support:** https://support.google.com/chrome_webstore/
- **Developer Dashboard:** https://chrome.google.com/webstore/devconsole
- **Policy Questions:** webstore-dev-support@google.com

---

## 🔗 Useful Links

- **Developer Program Policies:** https://developer.chrome.com/docs/webstore/program-policies/
- **Manifest V3 Migration:** https://developer.chrome.com/docs/extensions/mv3/intro/
- **Best Practices:** https://developer.chrome.com/docs/extensions/mv3/quality_guidelines/
- **Branding Guidelines:** https://developer.chrome.com/docs/webstore/branding/

---

**Ready to deploy?** Run through this checklist step by step to ensure a smooth submission process!
