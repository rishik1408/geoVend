import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Map, Users, LogOut, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Admin.css';

const AdminLayout = () => {
  const { currentUser, logout } = useAppContext();
  const location = useLocation();

  // Basic route protection
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Command Center' },
    { path: '/admin/map', icon: Map, label: 'Global Map' },
    { path: '/admin/directory', icon: Users, label: 'Vendor Directory' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <MapPin size={28} className="brand-icon" />
          <span className="brand-text">geoVend <span className="admin-badge">ADMIN</span></span>
        </div>
        
        <nav className="admin-nav">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`admin-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <strong>{currentUser.name}</strong>
            <br />
            <span>Administrator</span>
          </div>
          <button className="admin-logout-btn" onClick={() => logout()}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <header className="admin-topbar">
          <h2>
            {navItems.find(i => i.path === location.pathname)?.label || 'Admin Portal'}
          </h2>
          <div className="topbar-actions">
            <span className="live-indicator">
              <span className="pulse-dot"></span> System Live
            </span>
          </div>
        </header>
        
        <div className="admin-page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
