from flask import Flask, request, jsonify, redirect
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('geovend.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/login', methods=['POST'])
def login():
    role = request.form.get('role')
    username = request.form.get('username')
    password = request.form.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ? AND role = ?', 
                        (username, password, role)).fetchone()
    conn.close()

    if user:
        # Based on their account type, redirect to the appropriate mock dashboard
        if role == 'user':
            return jsonify({"status": "success", "message": "Redirecting to Live Discovery Map..."})
        elif role == 'vendor':
            return jsonify({"status": "success", "message": "Redirecting to Vendor Dashboard..."})
        elif role == 'admin':
            return jsonify({"status": "success", "message": "Redirecting to Admin Command Center..."})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials or incorrect role."}), 401

if __name__ == '__main__':
    # Run the abstract backend on localhost:5000
    app.run(debug=True, port=5000)
    