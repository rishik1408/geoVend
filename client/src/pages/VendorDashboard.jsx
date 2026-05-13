import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Power, AlertTriangle, MapPin, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const { currentUser, vendors, toggleVendorStatus, logout } = useAppContext();
  const navigate = useNavigate();
  const [zoningAlert, setZoningAlert] = useState(false);

  const myVendorData = vendors.find(v => v.id === currentUser?.vendor_id) || {};
  const isOnline = myVendorData.status === 'online';

  const toggleStatus = async () => {
    if (!currentUser?.vendor_id) return;
    await toggleVendorStatus(currentUser.vendor_id);
    if (!isOnline) setTimeout(() => setZoningAlert(true), 2000);
    else setZoningAlert(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const lat = myVendorData.lat ? Number(myVendorData.lat).toFixed(6) : '—';
  const lng = myVendorData.lng ? Number(myVendorData.lng).toFixed(6) : '—';

  return (
    <div className="vd-page">
      <Navbar />

      <main className="vd-main">
        <div className="vd-header">
          <div>
            <h1>Vendor Dashboard</h1>
            <p>Welcome back, {currentUser?.name || 'Vendor'}</p>
          </div>
          <div className="vd-header-actions">
            <Link to="/vendor/profile" className="vd-profile-link">
              <Settings size={16} /> Manage Profile
            </Link>
            <button className="vd-logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {zoningAlert && (
          <div className="vd-alert">
            <AlertTriangle size={18} />
            <span><strong>Zoning Alert:</strong> You are near a restricted vending zone (Sector 4B). Stay within permitted boundaries.</span>
            <button className="vd-alert-close" onClick={() => setZoningAlert(false)}>×</button>
          </div>
        )}

        <div className="vd-grid">
          {/* Status Card */}
          <div className="vd-card vd-status">
            <div className={`status-ring ${isOnline ? 'online' : 'offline'}`}>
              <Power size={36} color={isOnline ? '#2EC4B6' : 'rgba(255,255,255,0.15)'} />
            </div>
            <span className={`status-label ${isOnline ? 'on' : 'off'}`}>
              {isOnline ? 'ONLINE & TRACKING' : 'OFFLINE'}
            </span>
            <p className="status-note">
              {isOnline ? 'Your location is visible to consumers on the discovery map.' : 'Turn on to start broadcasting your location via ESP32 GPS.'}
            </p>
            <button className={`power-btn ${isOnline ? 'stop' : 'start'}`} onClick={toggleStatus}>
              <Power size={20} />
              {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
            </button>
          </div>

          {/* Location Data — REAL coordinates from ESP32 via Supabase */}
          <div className="vd-card">
            <div className="vd-card-header"><MapPin size={16} /> Location Data</div>
            <div className="vd-info-list">
              <div className="vd-info-row">
                <span className="vd-info-label">Current Zone</span>
                <span className="vd-info-value">Downtown Market Area</span>
              </div>
              <div className="vd-info-row">
                <span className="vd-info-label">Latitude</span>
                <span className="vd-info-value" style={{ fontFamily: "'Inter', monospace" }}>{lat}</span>
              </div>
              <div className="vd-info-row">
                <span className="vd-info-label">Longitude</span>
                <span className="vd-info-value" style={{ fontFamily: "'Inter', monospace" }}>{lng}</span>
              </div>
              <div className="vd-info-row">
                <span className="vd-info-label">Last Ping</span>
                <span className="vd-info-value">{isOnline ? 'Just now' : '—'}</span>
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="vd-card">
            <div className="vd-card-header"><TrendingUp size={16} /> Quick Insights</div>
            <div className="vd-stats">
              <div className="vd-stat">
                <span className="vd-stat-value">124</span>
                <span className="vd-stat-label">Profile Views Today</span>
              </div>
              <div className="vd-stat">
                <span className="vd-stat-value">4.8★</span>
                <span className="vd-stat-label">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
