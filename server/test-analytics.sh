#!/bin/bash

# AutoPlay Analytics - Local Development Test Script
# Run this to verify everything works before deploying to production

echo "🧪 AutoPlay Analytics Test Suite"
echo "================================"
echo ""

# Check if .env exists
echo "1️⃣  Checking .env configuration..."
if [ -f .env ]; then
    echo "   ✅ .env file exists"
    
    # Check if required variables are set
    if grep -q "SUPABASE_URL=" .env && grep -q "SUPABASE_ANON_KEY=" .env; then
        echo "   ✅ Supabase credentials configured"
    else
        echo "   ❌ Missing Supabase credentials in .env"
        echo "   → Copy .env.example to .env and add your credentials"
        exit 1
    fi
else
    echo "   ❌ .env file not found"
    echo "   → Copy .env.example to .env and configure it"
    exit 1
fi

echo ""

# Check if server is running
echo "2️⃣  Checking server status..."
if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "   ✅ Server is running on port 3000"
    
    # Get health status
    HEALTH=$(curl -s http://localhost:3000/api/health)
    ANALYTICS=$(echo $HEALTH | grep -o '"analytics":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$ANALYTICS" = "enabled" ]; then
        echo "   ✅ Analytics: ENABLED"
    else
        echo "   ⚠️  Analytics: DISABLED"
        echo "   → Check your .env configuration"
    fi
else
    echo "   ❌ Server is not running"
    echo "   → Run 'npm start' in another terminal"
    exit 1
fi

echo ""

# Test telemetry endpoint
echo "3️⃣  Testing telemetry endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/telemetry \
    -H "Content-Type: application/json" \
    -d '{
        "event": "test_event",
        "data": {"success": true, "duration": 100},
        "extensionVersion": "2.0.0"
    }')

if echo $RESPONSE | grep -q '"success":true'; then
    echo "   ✅ Telemetry endpoint working"
else
    echo "   ❌ Telemetry endpoint failed"
    echo "   Response: $RESPONSE"
fi

echo ""

# Test metrics endpoint
echo "4️⃣  Testing metrics endpoint..."
if [ ! -z "$ADMIN_TOKEN" ] || grep -q "ADMIN_TOKEN=" .env; then
    TOKEN=$(grep "ADMIN_TOKEN=" .env | cut -d'=' -f2)
    METRICS=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/metrics/quick)
    
    if echo $METRICS | grep -q '"success"'; then
        echo "   ✅ Metrics endpoint working"
        echo "   $(echo $METRICS | grep -o '"total_events":[0-9]*')"
    else
        echo "   ⚠️  Metrics endpoint returned: $METRICS"
    fi
else
    echo "   ⚠️  No ADMIN_TOKEN set (OK for testing)"
fi

echo ""

# Check dashboard file
echo "5️⃣  Checking dashboard..."
if [ -f dashboard.html ]; then
    echo "   ✅ Dashboard file exists"
    echo "   → Open dashboard.html in your browser"
else
    echo "   ❌ Dashboard file not found"
fi

echo ""
echo "================================"
echo "✅ Test suite complete!"
echo ""
echo "Next steps:"
echo "1. Open dashboard.html in your browser"
echo "2. Test with API URL: http://localhost:3000"
echo "3. If everything works, deploy to Render.com"
echo ""
