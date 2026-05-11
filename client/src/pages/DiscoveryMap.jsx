import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import Navbar from '../components/Navbar';
import { Store, Clock, Navigation, Search, User, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const { vendors, mapData, currentUser } = useAppContext();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative w-full">
        
        {/* Left Sidebar - ONLY shows if user is logged in (Consumer) */}
        {currentUser && (
          <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ease-in-out bg-white border-r border-gray-200 shadow-xl z-20 flex flex-col h-full relative`}>
            
            {/* Toggle Button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute -right-4 top-24 bg-white border border-gray-200 shadow-md rounded-full p-1 z-30 text-gray-500 hover:text-bright-teal hover:bg-gray-50"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>

            <div className={`flex flex-col h-full overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-deep-navy text-white flex items-center shrink-0 justify-center">
                    <User size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-deep-navy leading-tight truncate">
                      {currentUser.name || 'User Profile'}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      Consumer Account
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <div className="font-bold text-bright-teal">12</div>
                    <div className="text-gray-500 text-xs">Visits</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <div className="font-bold text-bright-teal">4</div>
                    <div className="text-gray-500 text-xs">Reviews</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 text-center text-gray-400 text-sm flex flex-col items-center justify-center whitespace-nowrap">
                <p>Your recent activity will appear here.</p>
              </div>
            </div>
          </aside>
        )}

        {/* Main Map Area */}
        <div className="flex-1 relative w-full h-full">
          
          {/* Original Map Controls overlaid on map */}
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

          <MapContainer center={[12.9018, 77.5180]} zoom={17} scrollWheelZoom={true} className="leaflet-map" style={{ zIndex: 0 }}>
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

          {/* Original Vendor Profile Popup over map */}
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
      </div>
    </div>
  );
};

export default DiscoveryMap;
