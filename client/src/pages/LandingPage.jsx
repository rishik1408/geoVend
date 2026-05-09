import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container wave-bg">
      <Navbar />
      
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            MAPPING THE FUTURE OF<br/>
            <span className="text-highlight">STREET COMMERCE.</span>
          </h1>
          <p className="hero-subtitle">
            Smart Streets. Vibrant Cities. Connected Vendors. Find local street food and goods instantly with real-time tracking.
          </p>
          
          <div className="hero-actions">
            <Link to="/map" className="btn btn-primary">
              Find Vendors Near Me
            </Link>
            <Link to="/auth" className="btn btn-outline">
              Vendor Login
            </Link>
          </div>
        </div>
      </main>

      <section className="overview-section">
        <div className="overview-container">
          <h2 className="overview-title">How geoVend Works</h2>
          <div className="overview-grid">
            <div className="overview-card glass-panel">
              <div className="step-number">1</div>
              <h3>For Consumers</h3>
              <p>Open the live discovery map to see exactly where your favorite street vendors are right now. No more guessing if they are open or where they moved.</p>
            </div>
            <div className="overview-card glass-panel">
              <div className="step-number">2</div>
              <h3>For Vendors</h3>
              <p>Log in to your dashboard and toggle "Go Online". Your location is instantly broadcasted to nearby consumers, driving foot traffic directly to your cart.</p>
            </div>
            <div className="overview-card glass-panel">
              <div className="step-number">3</div>
              <h3>For Cities</h3>
              <p>geoVend uses smart zoning alerts to help vendors stay compliant with city regulations, ensuring safe and vibrant street commerce for everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
