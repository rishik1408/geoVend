import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const ProtectedVendorRoute = ({ children }) => {
  const { currentUser } = useAppContext();
  
  if (!currentUser || currentUser.role !== 'vendor') {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};
