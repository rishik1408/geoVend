import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import DiscoveryMap from './pages/DiscoveryMap';
import VendorDashboard from './pages/VendorDashboard';
import { AppProvider } from './context/AppContext';
import { ProtectedVendorRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/map" element={<DiscoveryMap />} />
          {/* Protected Vendor Route */}
          <Route path="/vendor/dashboard" element={
            <ProtectedVendorRoute>
              <VendorDashboard />
            </ProtectedVendorRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
