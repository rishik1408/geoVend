import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <MapPin size={24} className="brand-icon" />
        <span className="brand-text">geoVend</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link active">HOME</Link>
        <Link to="/map" className="nav-link">DISCOVER</Link>
        <Link to="/vendor/dashboard" className="nav-link">VENDORS</Link>
        <Link to="/auth" className="nav-link">LOGIN</Link>
        <button className="nav-search" aria-label="Search">
          <Search size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
