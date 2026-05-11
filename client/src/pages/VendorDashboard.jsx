import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Power, AlertTriangle, MapPin, TrendingUp, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const { currentUser, vendors, toggleVendorStatus, updateVendorLocation } = useAppContext();
  const [zoningAlert, setZoningAlert] = useState(false);
  
  // Find the current vendor's data in the global list
  // currentUser has vendor_id from the login process if role is vendor
  const myVendorData = vendors.find(v => v.id === currentUser?.vendor_id) || {};
  const isOnline = myVendorData.status === 'online';

  // Simulate ESP32 GPS data updates when online
  useEffect(() => {
    let interval;
    if (isOnline && currentUser?.vendor_id) {
      interval = setInterval(() => {
        // Randomly jitter the location slightly to simulate movement
        const jitterLat = (Math.random() - 0.5) * 0.0002;
        const jitterLng = (Math.random() - 0.5) * 0.0002;
        updateVendorLocation(
          currentUser.vendor_id, 
          myVendorData.lat + jitterLat, 
          myVendorData.lng + jitterLng
        );
      }, 5000); // Update every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isOnline, currentUser, myVendorData]);

  const toggleStatus = async () => {
    if (!currentUser?.vendor_id) return;
    await toggleVendorStatus(currentUser.vendor_id);
    if (!isOnline) {
      // Simulate checking zoning upon going online
      setTimeout(() => setZoningAlert(true), 2000);
    } else {
      setZoningAlert(false);
    }
  };

  return (
    <div className="dashboard-container wave-bg">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Vendor Dashboard</h1>
            <p>Welcome back, {currentUser?.name || 'Vendor'}</p>
          </div>
          <Link to="/vendor/profile" className="btn btn-outline">
            <Settings size={18} />
            Manage Profile
          </Link>
        </div>

        {zoningAlert && (
          <div className="alert-banner">
            <AlertTriangle size={20} className="alert-icon" />
            <div className="alert-content">
              <strong>Zoning Alert:</strong> You are currently near a restricted vending zone (Sector 4B). Please ensure you remain within the permitted boundaries.
            </div>
            <button className="alert-close" onClick={() => setZoningAlert(false)}>×</button>
          </div>
        )}

        <div className="dashboard-grid">
          {/* Main Status Card */}
          <div className="dashboard-card status-card glass-panel">
            <h2>Current Status</h2>
            <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              <div className="pulse-ring"></div>
              <span>{isOnline ? 'ONLINE & TRACKING' : 'OFFLINE'}</span>
            </div>
            
            <button 
              className={`toggle-btn ${isOnline ? 'btn-stop' : 'btn-start'}`}
              onClick={toggleStatus}
            >
              <Power size={24} />
              {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
            </button>
            <p className="status-note">
              {isOnline ? 'Your location is visible to consumers.' : 'Turn on to start broadcasting your location.'}
            </p>
          </div>

          {/* Location Info Card */}
          <div className="dashboard-card info-card glass-panel">
            <div className="card-header">
              <MapPin size={20} />
              <h2>Location Data</h2>
            </div>
            <div className="info-list">
              <div className="info-item">
                <span className="label">Current Zone</span>
                <span className="value">Downtown Market Area</span>
              </div>
              <div className="info-item">
                <span className="label">Coordinates</span>
                <span className="value">51.505, -0.09</span>
              </div>
              <div className="info-item">
                <span className="label">Last Ping</span>
                <span className="value">{isOnline ? 'Just now' : '2 hours ago'}</span>
              </div>
            </div>
          </div>

          {/* Quick Insights Card */}
          <div className="dashboard-card stats-card glass-panel">
            <div className="card-header">
              <TrendingUp size={20} />
              <h2>Quick Insights</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-value">124</span>
                <span className="stat-label">Profile Views Today</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">4.8★</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
