# 🎯 AutoPlay Video Control - 3 Steps to Chrome Web Store

## Your Extension is 99% Ready! Just 3 Quick Steps Left:

---

## Step 1️⃣: Take Screenshots (30 minutes)

### What you need:
- At least **1 screenshot** (maximum 5)
- Size: **1280x800** or **640x400** pixels
- Format: PNG or JPEG

### Quick How-To:

**A. Load Your Extension:**
1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `extension/` folder in your AutoPlay directory

**B. Take Screenshots:**
1. Go to Netflix or YouTube
2. Click the AutoPlay extension icon (top right of Chrome)
3. **Screenshot 1:** Main popup with timer controls
   - Mac: Press `⌘ + Shift + 4`, drag to select
   - Windows: Press `Windows + Shift + S`, drag to select
4. Set a timer and take more screenshots if desired

**C. Save Screenshots:**
- Save as `screenshot-1.png`, `screenshot-2.png`, etc.
- Keep them somewhere easy to find (Desktop or AutoPlay folder)

📖 **Need more detail?** See [SCREENSHOT_GUIDE.md](SCREENSHOT_GUIDE.md)

---

## Step 2️⃣: Host Privacy Policy (15 minutes)

### What you need:
- Your `PRIVACY_POLICY.md` file accessible at a public URL

### Easiest Option - GitHub:

**If your repo is already public:**
```
https://github.com/kinect3/AutoPlayVideo/blob/main/PRIVACY_POLICY.md
```
✅ Use this URL when Chrome Web Store asks for privacy policy

**If you want a cleaner URL with GitHub Pages:**
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **main branch**
4. Click **Save**
5. Wait 2-3 minutes
6. Your privacy policy will be at:
   ```
   https://github.com/kinect3/AutoPlayVideo/PRIVACY_POLICY.html
   ```

**Alternative - GitHub Gist (even easier):**
1. Go to https://gist.github.com
2. Create new gist
3. Copy content from `PRIVACY_POLICY.md`
4. Paste and save
5. Use the gist URL

---

## Step 3️⃣: Submit to Chrome Web Store (30 minutes)

### Before you start:
- ✅ Have your screenshots ready
- ✅ Have your privacy policy URL ready
- ✅ Have a Google account
- ✅ Have $5 USD (one-time developer fee, if first time)

### Submission Steps:

**A. Register (First Time Only):**
1. Go to: https://chrome.google.com/webstore/devconsole
2. Sign in with your Google account
3. Pay $5 developer registration fee
4. Accept terms

**B. Upload Your Extension:**
1. Click **"New Item"** button
2. Click **"Choose file"**
3. Select: `dist/autoplay-v2.0.0.zip`
4. Click **"Upload"**
5. Wait for upload (should be instant, it's only 320KB)

**C. Fill Out Store Listing:**

Copy and paste these values:

**Extension Name:**
```
AutoPlay Video Control - Sleep Timer
```

**Short Description (132 chars):**
```
Auto-pause videos with smart sleep timers. Perfect for Netflix, YouTube, Disney+ & more. Fall asleep worry-free!
```

**Detailed Description:**
- Open `STORE_LISTING.md`
- Copy the "Detailed Description" section
- Paste into Chrome Web Store

**Category:**
```
Productivity
```

**D. Add Your Screenshots:**
1. Click "Add screenshots"
2. Upload your screenshot files
3. Drag to reorder if you uploaded multiple

**E. Add Privacy Policy:**
Paste your privacy policy URL from Step 2

**F. Justify Permissions:**

When asked why you need each permission, use these:

**activeTab:**
```
Required to pause/play video on the active streaming tab when timer expires.
```

**alarms:**
```
Required to create countdown timers that trigger video pause at specified time.
```

**contextMenus:**
```
Provides quick access to timer functions via right-click menu.
```

**notifications:**
```
Displays notifications when sleep timer ends.
```

**scripting:**
```
Injects content scripts to detect and control video playback on streaming sites.
```

**storage:**
```
Stores user preferences and custom timer presets locally.
```

**tabs:**
```
Required to identify and manage streaming video tabs for timer functionality.
```

**Host permissions (streaming sites):**
```
Required to detect video players and control playback on Netflix, YouTube, Disney+, etc.
```

**autoplay-api.onrender.com:**
```
Fetches platform-specific video selectors for streaming service compatibility.
```

**G. Set Pricing & Distribution:**
- **Pricing:** Free
- **Regions:** All regions (or select specific ones)
- **Visibility:** Public

**H. Submit:**
1. Review all tabs to make sure everything is filled out
2. Click **"Submit for Review"** (top right)
3. Confirm submission

---

## ⏰ What Happens Next?

### Review Timeline:
- **Automated checks:** Immediate (virus scan, manifest validation)
- **Manual review:** 1-3 business days (sometimes up to 2 weeks)
- **Notification:** You'll receive an email when reviewed

### Possible Outcomes:
- ✅ **Approved:** Your extension goes live immediately!
- ⚠️ **Rejected:** Email explains why. Fix issues and resubmit.
- 🔄 **More info needed:** Google requests clarification.

### After Approval:
Your extension will be live at:
```
https://chrome.google.com/webstore/detail/
```

---

## 📞 Quick Reference

| What | Where |
|------|-------|
| **Deployment ZIP** | `dist/autoplay-v2.0.0.zip` ✅ |
| **Store Descriptions** | `STORE_LISTING.md` ✅ |
| **Privacy Policy Text** | `PRIVACY_POLICY.md` ✅ |
| **Full Instructions** | `CHROME_STORE_SUBMISSION.md` ✅ |
| **Screenshot Guide** | `SCREENSHOT_GUIDE.md` ✅ |
| **Developer Dashboard** | https://chrome.google.com/webstore/devconsole |

---

## ✅ Checklist

- [ ] Screenshots taken (at least 1)
- [ ] Privacy policy hosted at public URL
- [ ] Chrome Web Store developer account created ($5 paid)
- [ ] `dist/autoplay-v2.0.0.zip` uploaded
- [ ] Store listing filled out
- [ ] Screenshots uploaded
- [ ] Privacy policy URL added
- [ ] Permissions justified
- [ ] Submitted for review

---

## 🎉 That's It!

**Total time:** ~1.5 hours
**Cost:** $5 (one-time, lifetime)

After submission, just wait for Google's email. Most extensions are approved within 1-3 days!

---

**Questions?** Check these detailed guides:
- 📖 [CHROME_STORE_SUBMISSION.md](CHROME_STORE_SUBMISSION.md) - Complete step-by-step guide
- 📸 [SCREENSHOT_GUIDE.md](SCREENSHOT_GUIDE.md) - How to take great screenshots
- 📋 [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md) - Overview of everything

**Need help?** 
- Chrome Web Store Support: https://support.google.com/chrome_webstore/

---

🚀 **Good luck! Your extension is ready for the world!**
