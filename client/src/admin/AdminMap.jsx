import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AdminMap = () => {
  const { vendors, mapData } = useAppContext();

  // Filter vendors with valid coordinates to prevent Leaflet crashes
  const validVendors = vendors.filter(v => v.lat != null && v.lng != null && !isNaN(Number(v.lat)) && !isNaN(Number(v.lng)));

  // Admin God-Mode Map: Show ALL vendors (online and offline)
  const geoJsonStyle = (feature) => {
    return {
      fillColor: feature.properties.fill || '#ff0000',
      weight: feature.properties['stroke-width'] || 2,
      opacity: feature.properties['stroke-opacity'] || 1,
      color: feature.properties.stroke || '#ff0000',
      fillOpacity: feature.properties['fill-opacity'] || 0.4
    };
  };

  return (
    <div className="admin-map-container">
      <div className="map-legend glass-panel">
        <h4>Map Legend</h4>
        <div className="legend-item">
          <span className="color-box red"></span> Restricted Zoning
        </div>
        <div className="legend-item">
          <span className="color-box blue"></span> Walking Paths
        </div>
        <div className="legend-item">
          <span className="color-box green"></span> Main Vending Area
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} color="#22c55e" /> Vendor Online
        </div>
        <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <XCircle size={16} color="#ef4444" /> Vendor Offline
        </div>
      </div>
      
      <MapContainer 
        center={[12.9018, 77.5180]} 
        zoom={17} 
        scrollWheelZoom={true} 
        className="admin-leaflet-map"
        style={{ height: '100%', width: '100%' }}
      >
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
        
        {validVendors.map(vendor => (
          <Marker 
            key={vendor.id} 
            position={[Number(vendor.lat), Number(vendor.lng)]}
          >
            <Popup>
              <strong>{vendor.name}</strong><br/>
              Status: {vendor.status}<br/>
              Type: {vendor.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AdminMap;
