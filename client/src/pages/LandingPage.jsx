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
              <div className="card-icon blue">01</div>
              <h3>For Consumers</h3>
              <p>Instantly locate your favorite street food or local goods. Our live map shows exactly who is active around you, reducing the friction of finding what you need.</p>
            </div>
            
            <div className="overview-card glass-panel">
              <div className="card-icon teal">02</div>
              <h3>For Vendors</h3>
              <p>Log in to your dashboard and toggle your status to "Online". Broadcast your real-time location to nearby consumers and increase your daily footprint.</p>
            </div>
            
            <div className="overview-card glass-panel">
              <div className="card-icon mint">03</div>
              <h3>For City Admins</h3>
              <p>Access the command center to monitor city-wide vending activity. Geofencing ensures vendors comply with designated zones, keeping the streets orderly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overview-section">
        <div className="overview-container">
          <h2 className="overview-title">About geoVend</h2>
          
          <div className="overview-text-block glass-panel mb-4">
            <p>
              <strong>geoVend</strong> is a real-time geospatial platform designed to modernise urban street commerce by seamlessly connecting consumers, vendors, and city administrators. Our ecosystem empowers consumers to discover nearby goods and street food through an interactive live map, whilst providing vendors with a digital dashboard to broadcast their presence and monitor customer engagement. For city administrators, geoVend offers a sophisticated command centre with geofencing capabilities to ensure zoning compliance and streamline urban management. By bringing India’s vital street vending community onto a trackable digital map, we aim to transform disorganised street commerce into a structured, accessible, and highly efficient network.
            </p>
          </div>

          <div className="overview-text-block glass-panel hardware-module">
            <h3>Hardware Module – ESP32 + NEO-6M GPS</h3>
            <p>
              The hardware node consists of an ESP32 microcontroller paired with a NEO-6M GPS module, connected via a UART serial interface. The GPS module continuously acquires real-time geospatial coordinates and transmits them to the ESP32, which processes and publishes the location data as a JSON payload over WiFi. This lightweight, low-power unit serves as the field-deployed telemetry node for each vending cart, enabling continuous location tracking and seamless integration with the backend infrastructure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
