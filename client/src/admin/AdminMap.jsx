import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AdminMap = () => {
  const { vendors, mapData } = useAppContext();

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
        <div className="legend-item flex items-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" /> Vendor Online
        </div>
        <div className="legend-item flex items-center gap-2">
          <XCircle size={16} className="text-red-500" /> Vendor Offline
        </div>
      </div>
      
      <MapContainer center={[12.9018, 77.5180]} zoom={17} scrollWheelZoom={true} className="admin-leaflet-map">
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
        
        {vendors.map(vendor => (
          <Marker 
            key={vendor.id} 
            position={[vendor.lat, vendor.lng]}
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
