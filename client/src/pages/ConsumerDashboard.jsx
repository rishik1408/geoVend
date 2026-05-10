import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Store, Star, Clock, MapPin, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './ConsumerDashboard.css';

const ConsumerDashboard = () => {
  const { vendors, currentUser } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);

  const filteredVendors = vendors.filter(v => {
    const matchesStatus = filter === 'All' ? true : v.status === filter.toLowerCase();
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="consumer-page wave-bg">
      <Navbar />
      
      <main className="consumer-content">
        <div className="profile-header glass-panel">
          <h2>Welcome back, {currentUser?.name || 'User'}!</h2>
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-val">12</span>
              <span className="stat-label">Vendors Visited</span>
            </div>
            <div className="stat">
              <span className="stat-val">4</span>
              <span className="stat-label">Reviews Given</span>
            </div>
          </div>
        </div>

        <div className="vendors-section">
          <h3>Discover Vendors</h3>
          
          <div className="controls glass-panel">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search vendors..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filters">
              {['All', 'Online', 'Offline'].map(f => (
                <button 
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="vendors-grid">
            {filteredVendors.map(vendor => (
              <div 
                key={vendor.id} 
                className="vendor-card glass-panel"
                onClick={() => setSelectedVendor(vendor)}
              >
                <div className="card-header">
                  <Store size={24} className="card-icon" />
                  <span className={`status-badge ${vendor.status}`}>
                    {vendor.status}
                  </span>
                </div>
                <h4>{vendor.name}</h4>
                <p className="type">{vendor.type}</p>
                <div className="rating">
                  <Star size={16} fill="#facc15" color="#facc15" />
                  <span>{vendor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Vendor Profile Modal */}
      {selectedVendor && (
        <div className="modal-overlay" onClick={() => setSelectedVendor(null)}>
          <div className="vendor-profile-modal glass-panel" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedVendor(null)}>×</button>
            
            <div className="modal-header">
              <h2>{selectedVendor.name}</h2>
              <span className={`status-badge ${selectedVendor.status}`}>{selectedVendor.status}</span>
            </div>
            
            <p className="modal-type">{selectedVendor.type}</p>
            
            <div className="modal-details">
              <div className="detail-row">
                <MapPin size={18} />
                <span>Lat: {selectedVendor.lat.toFixed(4)}, Lng: {selectedVendor.lng.toFixed(4)}</span>
              </div>
              <div className="detail-row">
                <Clock size={18} />
                <span>Operating Hours: 10 AM - 8 PM</span>
              </div>
            </div>

            <div className="rate-section">
              <h4>Leave a Rating</h4>
              <div className="stars">
                {[1,2,3,4,5].map(s => (
                  <button key={s} className="star-btn">
                    <Star size={24} />
                  </button>
                ))}
              </div>
              <button className="btn btn-primary full-width mt-4" onClick={() => {
                alert("Rating submitted!");
                setSelectedVendor(null);
              }}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerDashboard;
