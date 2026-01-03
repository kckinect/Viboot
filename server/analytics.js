require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Check if Supabase is configured
const isConfigured = () => {
  return process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;
};

// Log telemetry event
async function logEvent(eventData) {
  if (!isConfigured()) {
    console.warn('[Analytics] Supabase not configured, skipping telemetry');
    return { success: false, error: 'Not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('telemetry_events')
      .insert([{
        event_name: eventData.event,
        extension_version: eventData.extensionVersion,
        platform: eventData.platform,
        success: eventData.success,
        duration_ms: eventData.duration,
        retry_count: eventData.retryCount || 0,
        error_type: eventData.errorType,
        error_message: eventData.errorMessage,
        user_agent: eventData.userAgent
      }]);

    if (error) {
      console.error('[Analytics] Failed to log event:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('[Analytics] Exception logging event:', error);
    return { success: false, error: error.message };
  }
}

// Get metrics summary
async function getMetricsSummary(days = 7) {
  if (!isConfigured()) {
    return { success: false, error: 'Not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('metrics_summary')
      .select('*')
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[Analytics] Failed to get metrics:', error);
    return { success: false, error: error.message };
  }
}

// Get platform stats
async function getPlatformStats() {
  if (!isConfigured()) {
    return { success: false, error: 'Not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('platform_stats')
      .select('*');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[Analytics] Failed to get platform stats:', error);
    return { success: false, error: error.message };
  }
}

// Get recent errors
async function getRecentErrors(limit = 50) {
  if (!isConfigured()) {
    return { success: false, error: 'Not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('recent_errors')
      .select('*')
      .limit(limit);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('[Analytics] Failed to get recent errors:', error);
    return { success: false, error: error.message };
  }
}

// Get quick stats (last 24 hours)
async function getQuickStats() {
  if (!isConfigured()) {
    return { success: false, error: 'Not configured' };
  }

  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('telemetry_events')
      .select('event_name, success, duration_ms')
      .gte('created_at', yesterday);

    if (error) throw error;

    // Calculate stats
    const total = data.length;
    const successful = data.filter(e => e.success).length;
    const failed = total - successful;
    const avgDuration = data.reduce((sum, e) => sum + (e.duration_ms || 0), 0) / total;

    const eventCounts = data.reduce((acc, e) => {
      acc[e.event_name] = (acc[e.event_name] || 0) + 1;
      return acc;
    }, {});

    return {
      success: true,
      data: {
        total_events: total,
        successful,
        failed,
        success_rate: total > 0 ? ((successful / total) * 100).toFixed(2) : 0,
        avg_duration_ms: Math.round(avgDuration),
        event_breakdown: eventCounts,
        period: 'Last 24 hours'
      }
    };
  } catch (error) {
    console.error('[Analytics] Failed to get quick stats:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  supabase,
  isConfigured,
  logEvent,
  getMetricsSummary,
  getPlatformStats,
  getRecentErrors,
  getQuickStats
};
