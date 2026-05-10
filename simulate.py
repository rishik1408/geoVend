import urllib.request
import json
import time
import random

url = "http://127.0.0.1:5000/api/location"
headers = {'Content-Type': 'application/json'}

carts = [
    {"cart_id": "VND_001", "lat": 12.9020, "lon": 77.5170},
    {"cart_id": "VND_002", "lat": 12.9040, "lon": 77.5190},
    {"cart_id": "VND_003", "lat": 12.9150, "lon": 77.5300}
]

print("Starting simulation. Press Ctrl+C to stop.")
try:
    while True:
        for cart in carts:
            cart["lat"] += random.uniform(-0.0001, 0.0001)
            cart["lon"] += random.uniform(-0.0001, 0.0001)
            
            data = json.dumps(cart).encode('utf-8')
            req = urllib.request.Request(url, data=data, headers=headers)
            
            try:
                urllib.request.urlopen(req)
                print(f"Updated {cart['cart_id']} at {cart['lat']:.5f}, {cart['lon']:.5f}")
            except Exception as e:
                print(f"Error updating {cart['cart_id']}: {e}")
        
        time.sleep(3)
except KeyboardInterrupt:
    print("\nSimulation stopped.")