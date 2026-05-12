import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <MapPin size={22} className="brand-icon" />
        <span className="brand-text">geoVend</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link active">Home</Link>
        <Link to="/map" className="nav-link">Discover</Link>
        <Link to="/vendor/dashboard" className="nav-link">Vendors</Link>
        <Link to="/auth" className="nav-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
