from flask import Flask, request, render_template, redirect, url_for
import sqlite3
import os

app = Flask(__name__)

def get_db_connection():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, 'geovend.db')
    
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

# Serve the Landing Page
@app.route('/')
def home():
    return render_template('index.html')

# Serve the Login Page & Handle Authentication
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        role = request.form.get('role')
        username = request.form.get('username')
        password = request.form.get('password')

        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ? AND role = ?', 
                            (username, password, role)).fetchone()
        conn.close()

        if user:
            return f"<h1>Success! Logged in as {role}</h1><p>Welcome, {username}. Redirecting to your dashboard...</p>"
        else:
            return render_template('login.html', error="Invalid credentials or incorrect role.")

    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)