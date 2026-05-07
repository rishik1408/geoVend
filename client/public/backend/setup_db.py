import sqlite3
import os

def init_db():
    # Hardcoding your specific absolute path
    base_dir = '/Users/rishikm/VS/VENDtrack-main/client/public/backend/'
    
    # Join that folder path with your database name
    db_path = os.path.join(base_dir, 'geovend.db')
    
    # Connect using the absolute path
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('user', 'vendor', 'admin'))
        )
    ''')
    
    cursor.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES ('test_user', 'password123', 'user')")
    cursor.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES ('test_vendor', 'password123', 'vendor')")
    cursor.execute("INSERT OR IGNORE INTO users (username, password, role) VALUES ('test_admin', 'password123', 'admin')")
    
    conn.commit()
    conn.close()
    print(f"Database initialized successfully at: {db_path}")

if __name__ == '__main__':
    init_db()