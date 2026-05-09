import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Navbar from '../components/Navbar';
import { Store, Clock, Navigation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DiscoveryMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const DiscoveryMap = () => {
  const { vendors } = useAppContext();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filter, setFilter] = useState('All');

  // Filter vendors that are online or selected, based on category
  const filteredVendors = vendors.filter(v => 
    (filter === 'All' || v.type === filter) && v.status === 'online'
  );

  return (
    <div className="map-container">
      <Navbar />
      
      <div className="map-filters">
        {['All', 'Food', 'Produce', 'Apparel'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="map-wrapper">
        <MapContainer center={[12.9647, 77.5752]} zoom={15} scrollWheelZoom={true} className="leaflet-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {filteredVendors.map(vendor => (
            <Marker 
              key={vendor.id} 
              position={[vendor.lat, vendor.lng]}
              eventHandlers={{ click: () => setSelectedVendor(vendor) }}
            >
              <Popup>
                <strong>{vendor.name}</strong><br/>
                {vendor.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedVendor && (
        <div className="vendor-profile-panel glass-panel">
          <button className="close-panel" onClick={() => setSelectedVendor(null)}>×</button>
          
          <div className="panel-header">
            <Store className="panel-icon" />
            <h2>{selectedVendor.name}</h2>
            <span className={`status-badge ${selectedVendor.status}`}>
              {selectedVendor.status}
            </span>
          </div>
          
          <div className="panel-content">
            <p className="vendor-type">{selectedVendor.type}</p>
            
            <div className="info-row">
              <Clock size={16} />
              <span>Open until 8:00 PM</span>
            </div>
            
            <div className="info-row">
              <Navigation size={16} />
              <span>0.2 miles away</span>
            </div>
            
            <button className="btn btn-primary full-width mt-4">
              Get Directions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryMap;
