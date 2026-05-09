import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

// KR Market, Bangalore Coordinates: 12.9647, 77.5752
const initialVendors = [
  { id: 1, name: "Raju's Chaat Center", type: "Food", lat: 12.9650, lng: 77.5750, status: "online", rating: 4.8 },
  { id: 2, name: "KR Fresh Vegetables", type: "Produce", lat: 12.9642, lng: 77.5755, status: "online", rating: 4.5 },
  { id: 3, name: "Vintage Apparel", type: "Apparel", lat: 12.9648, lng: 77.5748, status: "offline", rating: 4.9 },
];

export const AppProvider = ({ children }) => {
  const [vendors, setVendors] = useState(initialVendors);
  const [currentUser, setCurrentUser] = useState(null); // { role: 'vendor'|'consumer', name: '...', id: ... }

  // Function for the logged-in vendor to toggle their status
  const toggleVendorStatus = (vendorId) => {
    setVendors(prevVendors => 
      prevVendors.map(v => {
        if (v.id === vendorId) {
          return { ...v, status: v.status === 'online' ? 'offline' : 'online' };
        }
        return v;
      })
    );
  };

  const login = (role, name) => {
    if (role === 'vendor') {
      // Mocking a vendor login. We'll assign them a new ID and add them to the map offline initially.
      const newVendorId = Date.now();
      const newVendor = {
        id: newVendorId,
        name: name || "My Vendor Shop",
        type: "Food", // Default type
        lat: 12.9655, // Near KR Market
        lng: 77.5760,
        status: "offline",
        rating: 5.0
      };
      setVendors([...vendors, newVendor]);
      setCurrentUser({ role, name, id: newVendorId });
    } else {
      setCurrentUser({ role, name });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{ vendors, currentUser, login, logout, toggleVendorStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
