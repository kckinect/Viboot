const express = require('express');
const cors = require('cors');
const configData = require('./config-data');
const analytics = require('./analytics');

const app = express();
app.use(cors()); // Allow requests from any domain (crucial for extensions)
app.use(express.json()); // Parse JSON bodies

// ============================================
// CONFIG ENDPOINTS
// ============================================

app.get('/api/selectors', (req, res) => {
  // Cache for 5 minutes (300s), but allow serving stale data for 10 mins (600s)
  // while fetching new data in background.
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  res.json(configData);
});

// ============================================
// TELEMETRY ENDPOINTS
// ============================================

// Log telemetry event
app.post('/api/telemetry', async (req, res) => {
  if (!analytics.isConfigured()) {
    return res.status(200).json({ 
      success: false, 
      message: 'Analytics not configured (this is OK for testing)' 
    });
  }

  const { event, data, extensionVersion, timestamp } = req.body;

  if (!event || !data) {
    return res.status(400).json({ error: 'Missing required fields: event, data' });
  }

  // Extract common fields
  const eventData = {
    event,
    extensionVersion: extensionVersion || 'unknown',
    platform: data.platform,
    success: data.success !== undefined ? data.success : true,
    duration: data.duration,
    retryCount: data.retryCount,
    errorType: data.errorType,
    errorMessage: data.errorMessage,
    userAgent: req.headers['user-agent']
  };

  const result = await analytics.logEvent(eventData);
  res.status(result.success ? 200 : 500).json(result);
});

// ============================================
// METRICS ENDPOINTS (Simple Auth)
// ============================================

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  const adminToken = process.env.ADMIN_TOKEN;

  // If no admin token is set, allow access (for initial setup)
  if (!adminToken) {
    console.warn('[Security] ADMIN_TOKEN not set - metrics are publicly accessible!');
    return next();
  }

  if (token !== adminToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Quick stats (last 24 hours)
app.get('/api/metrics/quick', requireAuth, async (req, res) => {
  const result = await analytics.getQuickStats();
  res.json(result);
});

// Detailed metrics summary
app.get('/api/metrics/summary', requireAuth, async (req, res) => {
  const days = parseInt(req.query.days) || 7;
  const result = await analytics.getMetricsSummary(days);
  res.json(result);
});

// Platform statistics
app.get('/api/metrics/platforms', requireAuth, async (req, res) => {
  const result = await analytics.getPlatformStats();
  res.json(result);
});

// Recent errors
app.get('/api/metrics/errors', requireAuth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const result = await analytics.getRecentErrors(limit);
  res.json(result);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: configData.version,
    analytics: analytics.isConfigured() ? 'enabled' : 'disabled',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AutoPlay Server running on port ${PORT}`);
  console.log(`Analytics: ${analytics.isConfigured() ? 'ENABLED ✓' : 'DISABLED (set SUPABASE_URL and SUPABASE_ANON_KEY)'}`);
});