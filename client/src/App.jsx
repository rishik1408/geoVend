import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import DiscoveryMap from './pages/DiscoveryMap';
import VendorDashboard from './pages/VendorDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminMap from './admin/AdminMap';
import AdminDirectory from './admin/AdminDirectory';
import { AppProvider, useAppContext } from './context/AppContext';
import { ProtectedVendorRoute } from './components/ProtectedRoute';
import './App.css';

const DynamicBackground = () => {
  const location = useLocation();
  const { currentUser } = useAppContext();

  useEffect(() => {
    document.body.className = '';
    if (location.pathname.startsWith('/admin')) {
      document.body.classList.add('admin-bg');
    } else if (location.pathname.startsWith('/vendor')) {
      document.body.classList.add('vendor-bg');
    } else {
      document.body.classList.add('consumer-bg');
    }
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <DynamicBackground />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/map" element={<DiscoveryMap />} />
          <Route path="/consumer" element={<ConsumerDashboard />} />
          {/* Protected Vendor Route */}
          <Route path="/vendor/dashboard" element={
            <ProtectedVendorRoute>
              <VendorDashboard />
            </ProtectedVendorRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="map" element={<AdminMap />} />
            <Route path="directory" element={<AdminDirectory />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
