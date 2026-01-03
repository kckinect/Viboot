# 🚀 AutoPlay Analytics Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in (free)
3. Click **"New Project"**
4. Fill in:
   - Name: `autoplay-analytics`
   - Database Password: (save this!)
   - Region: Choose closest to you
5. Wait 2 minutes for setup

### Step 2: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Open the file `/Users/kc/Desktop/AutoPlay/server/supabase-setup.sql`
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click **"Run"** (bottom right)
6. You should see: ✅ Success. No rows returned

### Step 3: Get Your API Keys

1. In Supabase, go to **Settings** > **API** (left sidebar)
2. Copy these two values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 4: Configure Your Server

1. In `/Users/kc/Desktop/AutoPlay/server/`, create a file named `.env`:

```bash
cd /Users/kc/Desktop/AutoPlay/server
touch .env
```

2. Edit `.env` and paste:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-key-here

# Admin Token (make this a random string)
ADMIN_TOKEN=your-secret-token-123
```

3. Replace:
   - `SUPABASE_URL` with your Project URL
   - `SUPABASE_ANON_KEY` with your anon key
   - `ADMIN_TOKEN` with any random string (this protects your metrics)

### Step 5: Test Locally

```bash
cd /Users/kc/Desktop/AutoPlay/server
npm start
```

You should see:
```
AutoPlay Server running on port 3000
Analytics: ENABLED ✓
```

### Step 6: Test Telemetry

In another terminal:

```bash
curl -X POST http://localhost:3000/api/telemetry \
  -H "Content-Type: application/json" \
  -d '{
    "event": "test_event",
    "data": {
      "success": true,
      "duration": 123,
      "platform": "netflix"
    },
    "extensionVersion": "2.0.0"
  }'
```

Expected response: `{"success":true}`

### Step 7: View Dashboard

1. Open `/Users/kc/Desktop/AutoPlay/server/dashboard.html` in your browser
2. Enter:
   - API URL: `http://localhost:3000`
   - Admin Token: (the token from your `.env` file)
3. Click **Access Dashboard**

You should see your test event!

---

## 🌐 Deploy to Render.com

### Update Environment Variables

1. Go to [Render.com Dashboard](https://dashboard.render.com)
2. Select your `autoplay-server` service
3. Go to **Environment** tab
4. Add these variables:
   - `SUPABASE_URL` = (your Supabase URL)
   - `SUPABASE_ANON_KEY` = (your Supabase anon key)
   - `ADMIN_TOKEN` = (your secret token)
5. Click **Save Changes**
6. Server will auto-redeploy

### Test Production

```bash
curl https://autoplay.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "analytics": "enabled",
  "timestamp": "2026-01-02T..."
}
```

---

## 📊 Using the Dashboard

### Access Your Dashboard

**Option A: Local Development**
- Open `dashboard.html` in browser
- API URL: `http://localhost:3000`
- Token: Your admin token

**Option B: Production**
- Open `dashboard.html` in browser
- API URL: `https://autoplay.onrender.com`
- Token: Your admin token

### What You'll See

1. **Quick Stats (24 hours)**
   - Total sync attempts
   - Success rate percentage
   - Failed syncs count
   - Average response time

2. **Platform Statistics (7 days)**
   - Per-platform success rates
   - Request counts
   - Performance metrics
   - Health status badges

3. **Recent Errors (7 days)**
   - Timestamp of each error
   - Event type
   - Platform affected
   - Error details
   - Retry attempts

---

## 🔍 Understanding the Data

### Events Tracked

| Event | When It Fires | What It Means |
|-------|---------------|---------------|
| `config_sync_success` | Config synced successfully | Extension got latest selectors |
| `config_sync_failure` | Config sync failed | Network or server issue |

### Key Metrics

- **Success Rate**: Should be >95% for healthy operation
- **Avg Duration**: Should be <2000ms (2 seconds)
- **Retry Count**: Higher = network issues

### Troubleshooting

**"Analytics: DISABLED"**
- Check `.env` file exists
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- Restart server

**"Failed to load data"**
- Check API URL is correct
- Verify admin token matches
- Check server is running

**No data showing**
- Extension hasn't synced yet
- Wait 5 minutes or trigger manual sync
- Check browser console for errors

---

## 🔒 Security Notes

1. **Never commit `.env`** - Already in `.gitignore`
2. **Keep ADMIN_TOKEN secret** - Don't share publicly
3. **SUPABASE_ANON_KEY is safe** - It's meant to be public, protected by RLS
4. **Dashboard has no authentication** - Protect with admin token

---

## 📈 Next Steps

Once data is flowing:

1. **Monitor daily** - Check success rates
2. **Watch for patterns** - Certain platforms failing?
3. **Track after updates** - Did selector changes work?
4. **Set up alerts** - (Future: email on high failure rate)

---

## 🆘 Common Issues

### "ECONNREFUSED" errors
- Supabase project is paused (free tier sleeps after 1 week)
- Go to Supabase dashboard → Click "Restore" → Wait 1 minute

### "Invalid API key"
- Check you copied the **anon** key, not the **service_role** key
- Anon key starts with `eyJhbG...`

### Data not persisting
- Check RLS policies in Supabase
- Go to **Authentication** → **Policies** → Verify "Allow public insert" exists

---

## 💡 Pro Tips

1. **Bookmark dashboard** - Save with URL parameters:
   ```
   file:///path/to/dashboard.html?api=https://autoplay.onrender.com
   ```

2. **View SQL directly** - Query Supabase with:
   ```sql
   SELECT * FROM telemetry_events 
   ORDER BY created_at DESC 
   LIMIT 10;
   ```

3. **Export data** - Use Supabase dashboard → Table Editor → Export CSV

4. **Custom queries** - Create your own views in SQL Editor

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] SQL tables created (run supabase-setup.sql)
- [ ] `.env` file configured
- [ ] Server shows "Analytics: ENABLED ✓"
- [ ] Test event sent successfully
- [ ] Dashboard loads and shows data
- [ ] Production deployment updated
- [ ] Extension sending real telemetry

---

Need help? Check server logs:
```bash
# Local
npm start

# Render.com
Go to Dashboard → Logs tab
```
