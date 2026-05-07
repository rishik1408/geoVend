from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)

# --- GEOFENCING CONFIGURATION (RNSIT AREA) ---
LAT_MIN, LAT_MAX = 12.9010, 12.9050
LON_MIN, LON_MAX = 77.5160, 77.5210

def init_db():
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
    return LAT_MIN <= lat <= LAT_MAX and LON_MIN <= lon <= LON_MAX

# --- PORTAL ROUTES (Customer & Vendor) ---

@app.route('/')
def index():
    """Main Landing Page / Welcome Portal."""
    return render_template('dashboard.html')

@app.route('/map')
def customer_map():
    """Customer View: Live map to find nearby vendors."""
    return render_template('customer_map.html')

@app.route('/vendor')
def vendor_portal():
    """Vendor View: Personal compliance and status."""
    return render_template('vendor_portal.html')

# --- ADMIN PORTAL ROUTES ---

@app.route('/admin')
def admin_dashboard():
    with sqlite3.connect('database.db') as conn:
        total = conn.execute('SELECT COUNT(*) FROM vendors').fetchone()[0]
        violations = conn.execute('SELECT COUNT(*) FROM vendors WHERE is_inside = 0').fetchone()[0]
    return render_template('admin_dashboard.html', total=total, violations=violations)

@app.route('/admin/map')
def admin_map():
    """Admin God-Mode Map: Includes zoning overlays."""
    return render_template('admin_map.html')

@app.route('/admin/directory')
def admin_directory():
    """Admin CRM: Detailed table of all registered vendors."""
    return render_template('admin_directory.html')

@app.route('/admin/analytics')
def admin_analytics():
    """Admin Analytics: Historical heatmaps and IoT data."""
    return render_template('admin_analytics.html')

# --- BACKEND API ROUTES ---

@app.route('/api/location', methods=['POST'])
def update_location():
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
    with sqlite3.connect('database.db') as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute('SELECT * FROM vendors').fetchall()
        return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)