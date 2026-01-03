-- ============================================
-- AutoPlay Analytics Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Telemetry Events Table
CREATE TABLE IF NOT EXISTS telemetry_events (
  id BIGSERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  extension_version VARCHAR(20),
  platform VARCHAR(50),
  success BOOLEAN,
  duration_ms INTEGER,
  retry_count INTEGER,
  error_type VARCHAR(100),
  error_message TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_telemetry_created ON telemetry_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_event ON telemetry_events(event_name, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_platform ON telemetry_events(platform, created_at DESC);

-- 2. Metrics Summary View (for quick dashboard queries)
CREATE OR REPLACE VIEW metrics_summary 
WITH (security_invoker=true) AS
SELECT 
  DATE(created_at) as date,
  event_name,
  COUNT(*) as total_events,
  COUNT(*) FILTER (WHERE success = true) as successful,
  COUNT(*) FILTER (WHERE success = false) as failed,
  AVG(duration_ms) as avg_duration_ms,
  AVG(retry_count) as avg_retries
FROM telemetry_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), event_name
ORDER BY date DESC, event_name;

-- 3. Platform Success Rates View
CREATE OR REPLACE VIEW platform_stats 
WITH (security_invoker=true) AS
SELECT 
  platform,
  COUNT(*) as total_requests,
  COUNT(*) FILTER (WHERE success = true) as successful,
  ROUND(100.0 * COUNT(*) FILTER (WHERE success = true) / COUNT(*), 2) as success_rate,
  AVG(duration_ms) as avg_duration_ms
FROM telemetry_events
WHERE platform IS NOT NULL
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY platform
ORDER BY total_requests DESC;

-- 4. Recent Errors View
CREATE OR REPLACE VIEW recent_errors 
WITH (security_invoker=true) AS
SELECT 
  created_at,
  event_name,
  platform,
  error_type,
  error_message,
  extension_version,
  retry_count
FROM telemetry_events
WHERE success = false
  AND created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 100;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE telemetry_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running this script)
DROP POLICY IF EXISTS "Allow public insert" ON telemetry_events;
DROP POLICY IF EXISTS "Allow public read" ON telemetry_events;

-- Allow public inserts (extensions can write)
CREATE POLICY "Allow public insert" ON telemetry_events
  FOR INSERT
  WITH CHECK (true);

-- Allow public reads (for now - tighten later if needed)
CREATE POLICY "Allow public read" ON telemetry_events
  FOR SELECT
  USING (true);

-- ============================================
-- Setup Complete!
-- ============================================
-- Next steps:
-- 1. Copy your Supabase URL and anon key to .env
-- 2. Restart your Express server
-- 3. Test the /api/telemetry endpoint
