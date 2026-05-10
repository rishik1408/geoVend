import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import mapData from '../data/map.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchVendors = async () => {
    const { data, error } = await supabase.from('vendors').select('*');
    if (!error && data) {
      setVendors(data);
    } else {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
    const savedUser = localStorage.getItem('geovend_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    // Set up realtime subscription for vendors
    const subscription = supabase
      .channel('public:vendors')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vendors' }, payload => {
        fetchVendors(); // Refetch all vendors on any change for simplicity
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const loginUserLocal = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('geovend_current_user', JSON.stringify(userObj));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('geovend_current_user');
  };

  const registerUser = async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name: userData.name, email: userData.email, password: userData.password, role: 'consumer' }])
      .select()
      .single();
      
    if (error) {
      alert("Registration failed: " + error.message);
      return false;
    }
    loginUserLocal(data);
    return true;
  };

  const registerVendor = async (vendorData) => {
    // Insert user first
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ name: vendorData.name, email: vendorData.email, password: vendorData.password, role: 'vendor' }])
      .select()
      .single();

    if (userError) {
      alert("Registration failed: " + userError.message);
      return false;
    }

    // Insert vendor profile
    const { data: vData, error: vError } = await supabase
      .from('vendors')
      .insert([{ 
        user_id: userData.id, 
        name: vendorData.businessName, 
        email: vendorData.email,
        type: vendorData.type || 'Food',
        lat: 12.9015,
        lng: 77.5180,
        status: 'offline'
      }])
      .select()
      .single();

    if (vError) {
      alert("Vendor profile creation failed: " + vError.message);
      return false;
    }
    
    // Merge for local state
    loginUserLocal({ ...userData, vendor_id: vData.id, businessName: vData.name });
    return true;
  };

  const login = async (role, email, password) => {
    if (role === 'admin') {
      if (email === 'admin@geoVend.in' && password === 'geoVend123') {
        loginUserLocal({ id: 0, role: 'admin', name: 'System Admin' });
        return true;
      }
      return false;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .eq('role', role)
      .single();

    if (error || !data) {
      return false;
    }

    if (role === 'vendor') {
      const { data: vData } = await supabase
        .from('vendors')
        .select('id, name')
        .eq('user_id', data.id)
        .single();
        
      loginUserLocal({ ...data, vendor_id: vData?.id, businessName: vData?.name });
    } else {
      loginUserLocal(data);
    }
    return true;
  };

  const toggleVendorStatus = async (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return;
    
    const newStatus = vendor.status === 'online' ? 'offline' : 'online';
    
    // Optimistic update
    setVendors(vendors.map(v => v.id === vendorId ? { ...v, status: newStatus } : v));
    
    await supabase
      .from('vendors')
      .update({ status: newStatus })
      .eq('id', vendorId);
  };

  const updateVendorLocation = async (vendorId, lat, lng) => {
    // Optimistic update
    setVendors(vendors.map(v => v.id === vendorId ? { ...v, lat, lng } : v));
    
    await supabase
      .from('vendors')
      .update({ lat, lng })
      .eq('id', vendorId);
  };

  return (
    <AppContext.Provider value={{ 
      vendors, 
      currentUser, 
      login, 
      logout, 
      registerUser,
      registerVendor,
      toggleVendorStatus,
      updateVendorLocation,
      mapData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
