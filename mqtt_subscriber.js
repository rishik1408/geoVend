/**
 * mqtt_subscriber.js — geoVend MQTT → Supabase Bridge
 *
 * Connects to an MQTT broker and subscribes to the topic where the
 * ESP32 publishes GPS coordinates. Each incoming message is parsed
 * and the corresponding vendor's lat/lng is updated in Supabase.
 *
 * Expected MQTT payload (JSON):
 *   { "vendor_id": 1, "lat": 12.9015, "lng": 77.518 }
 *
 * Usage:
 *   node mqtt_subscriber.js
 */

const mqtt = require('mqtt');
const { createClient } = require('@supabase/supabase-js');

// ── Configuration ──────────────────────────────────────────────
const MQTT_BROKER  = process.env.MQTT_BROKER  || 'mqtt://broker.hivemq.com:1883';
const MQTT_TOPIC   = process.env.MQTT_TOPIC   || 'geovend/gps';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qfsesquowvfxccqwjmth.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmc2VzcXVvd3ZmeGNjcXdqbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDI3NzIsImV4cCI6MjA5Mzk3ODc3Mn0.IMt6yo71dCZtYGJLI2OSAKLi7ZRBxYwNjh08DywNTZY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── MQTT Client ────────────────────────────────────────────────
console.log(`[geoVend MQTT] Connecting to broker: ${MQTT_BROKER}`);
console.log(`[geoVend MQTT] Subscribing to topic: ${MQTT_TOPIC}`);

const client = mqtt.connect(MQTT_BROKER, {
  clientId: `geovend_sub_${Math.random().toString(16).slice(2, 8)}`,
  clean: true,
  connectTimeout: 10000,
  reconnectPeriod: 5000,
});

client.on('connect', () => {
  console.log('[geoVend MQTT] ✓ Connected to broker');
  client.subscribe(MQTT_TOPIC, { qos: 1 }, (err) => {
    if (err) {
      console.error('[geoVend MQTT] ✗ Subscribe error:', err.message);
    } else {
      console.log(`[geoVend MQTT] ✓ Subscribed to "${MQTT_TOPIC}"`);
      console.log('[geoVend MQTT] Waiting for ESP32 GPS data...\n');
    }
  });
});

client.on('message', async (topic, message) => {
  const raw = message.toString();
  console.log(`[geoVend MQTT] ← Received: ${raw}`);

  try {
    const payload = JSON.parse(raw);
    const { vendor_id, lat, lng } = payload;

    if (!vendor_id || lat == null || lng == null) {
      console.warn('[geoVend MQTT] ⚠ Invalid payload — missing vendor_id, lat, or lng');
      return;
    }

    // Update Supabase
    const { error } = await supabase
      .from('vendors')
      .update({ lat: parseFloat(lat), lng: parseFloat(lng) })
      .eq('id', vendor_id);

    if (error) {
      console.error(`[geoVend MQTT] ✗ Supabase update failed for vendor ${vendor_id}:`, error.message);
    } else {
      console.log(`[geoVend MQTT] ✓ Vendor ${vendor_id} location updated → (${lat}, ${lng})`);
    }
  } catch (e) {
    console.error('[geoVend MQTT] ✗ Failed to parse message:', e.message);
  }
});

client.on('error', (err) => {
  console.error('[geoVend MQTT] ✗ Connection error:', err.message);
});

client.on('reconnect', () => {
  console.log('[geoVend MQTT] ↻ Reconnecting...');
});

client.on('close', () => {
  console.log('[geoVend MQTT] Connection closed');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[geoVend MQTT] Shutting down...');
  client.end(false, () => {
    console.log('[geoVend MQTT] Disconnected. Goodbye.');
    process.exit(0);
  });
});
