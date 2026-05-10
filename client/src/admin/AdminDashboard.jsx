import React from 'react';
import { Users, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const { vendors } = useAppContext();
  
  const totalVendors = vendors.length;
  const onlineVendors = vendors.filter(v => v.status === 'online').length;
  // Mocking violations for demonstration using index
  const activeViolations = vendors.filter((v, i) => i % 3 === 0 && v.status === 'online').length; 

  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Vendors</h3>
            <span className="stat-number">{totalVendors}</span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper green">
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Now</h3>
            <span className="stat-number">{onlineVendors}</span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper red">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>Zoning Violations</h3>
            <span className="stat-number text-red">{activeViolations}</span>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper teal">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>System Status</h3>
            <span className="stat-number">Healthy</span>
          </div>
        </div>
      </div>

      <div className="admin-dashboard-panels">
        <div className="admin-panel glass-panel">
          <h3>Recent Urgent Alerts</h3>
          <ul className="alert-list">
            {activeViolations > 0 ? (
              <li className="alert-item warning">
                <AlertTriangle size={16} />
                <span>Vendor #3 has entered Restricted Zone 4B. Warning issued.</span>
              </li>
            ) : (
              <li className="alert-item success">
                <CheckCircle size={16} />
                <span>No active zoning violations detected.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
