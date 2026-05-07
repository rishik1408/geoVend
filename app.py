from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)

# --- GEOFENCING CONFIGURATION (RNSIT AREA) ---
# These coordinates define the 'Safe Zone' rectangle
LAT_MIN, LAT_MAX = 12.9010, 12.9050
LON_MIN, LON_MAX = 77.5160, 77.5210

def init_db():
    """Creates the database and vendor table if they don't exist."""
    with sqlite3.connect('database.db') as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS vendors (
                cart_id TEXT PRIMARY KEY,
                lat REAL,
                lon REAL,
                is_inside BOOLEAN,
                last_updated TEXT
            )
        ''')
    print("Database initialised.")

def check_geofence(lat, lon):
    """Mathematical check: Is the coordinate inside our rectangle?"""
    return LAT_MIN <= lat <= LAT_MAX and LON_MIN <= lon <= LON_MAX

# --- FRONTEND ROUTES ---

@app.route('/')
def index():
    """Main Landing Page / Dashboard summary."""
    return render_template('dashboard.html')

@app.route('/map')
def map_page():
    """The OpenStreetMap tracking page."""
    return render_template('map.html')

# --- BACKEND API ROUTES ---

@app.route('/api/location', methods=['POST'])
def update_location():
    """Endpoint for ESP32 or Testing Tools (cURL/Postman)."""
    try:
        data = request.get_json()
        cart_id = data.get('cart_id')
        lat = float(data.get('lat'))
        lon = float(data.get('lon'))
        
        is_inside = check_geofence(lat, lon)
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        with sqlite3.connect('database.db') as conn:
            conn.execute('''
                REPLACE INTO vendors (cart_id, lat, lon, is_inside, last_updated)
                VALUES (?, ?, ?, ?, ?)
            ''', (cart_id, lat, lon, is_inside, timestamp))
            
        return jsonify({"status": "success", "is_inside": is_inside}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/vendors', methods=['GET'])
def get_vendors():
    """Returns all vendor data as JSON for the Map to read."""
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute('SELECT * FROM vendors').fetchall()
        return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    init_db()
    # host='0.0.0.0' allows other devices (ESP32) on your Wi-Fi to connect
    app.run(host='0.0.0.0', port=5000, debug=True)