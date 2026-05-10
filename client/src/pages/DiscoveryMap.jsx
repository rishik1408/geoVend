import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import Navbar from '../components/Navbar';
import { Store, Clock, Navigation, Search } from 'lucide-react';
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
  const { vendors, mapData } = useAppContext();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vendors that are online
  const filteredVendors = vendors.filter(v => {
    const matchesCategory = filter === 'All' || v.type === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && v.status === 'online';
  });

  // Style for the GeoJSON polygons (Red = Restricted)
  const geoJsonStyle = (feature) => {
    return {
      fillColor: feature.properties.fill || '#ff0000',
      weight: feature.properties['stroke-width'] || 2,
      opacity: feature.properties['stroke-opacity'] || 1,
      color: feature.properties.stroke || '#ff0000',
      fillOpacity: feature.properties['fill-opacity'] || 0.5
    };
  };

  return (
    <div className="map-container">
      <Navbar />
      
      <div className="map-controls">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search vendors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
      </div>

      <div className="discovery-map-legend glass-panel">
        <h4>Zones</h4>
        <div className="legend-item">
          <span className="color-box red"></span> Restricted
        </div>
        <div className="legend-item">
          <span className="color-box blue"></span> Walking Paths
        </div>
        <div className="legend-item">
          <span className="color-box green"></span> Vending Area
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer center={[12.9018, 77.5180]} zoom={17} scrollWheelZoom={true} className="leaflet-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {mapData && (
            <GeoJSON 
              data={mapData} 
              style={geoJsonStyle}
            />
          )}
          
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
              <span>{selectedVendor.lat.toFixed(4)}, {selectedVendor.lng.toFixed(4)}</span>
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
