import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Store, ShieldCheck, Activity, Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import './LandingPage.css';

const LandingPage = () => {
  const { vendors } = useAppContext();
  const onlineVendors = vendors.filter(v => v.status === 'online').slice(0, 4);

  return (
    <div className="landing-container wave-bg text-deep-navy">
      <Navbar />
      
      {/* Original Style Hero with 'STREET COMMERCE' popping */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            MAPPING THE FUTURE OF<br/>
            <span className="text-highlight drop-shadow-sm">STREET COMMERCE.</span>
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

      {/* Bento Grid 1: How it Works */}
      <div className="w-full flex justify-center py-24 px-6 z-10">
        <section className="max-w-5xl w-full flex flex-col items-center">
          <div className="mb-12 w-full flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-heading font-black mb-4 text-deep-navy">How geoVend Works</h2>
            <p className="text-gray-600 text-xl font-medium">A unified ecosystem for modern cities.</p>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bento-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy font-heading">For Consumers</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Instantly locate your favorite street food or local goods. Our live map shows exactly who is active around you, reducing the friction of finding what you need.
            </p>
          </div>

          <div className="bento-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mb-6 text-bright-teal">
              <Store size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy font-heading">For Vendors</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Log in to your dashboard and toggle your status to "Online". Broadcast your real-time location to nearby consumers and increase your daily footprint.
            </p>
          </div>

          <div className="bento-card flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy font-heading">For City Admins</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Access the command center to monitor city-wide vending activity. Geofencing ensures vendors comply with designated zones, keeping the streets orderly.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* Bento Grid 2: About & Hardware */}
      <div className="w-full flex justify-center py-24 px-6 z-10 bg-white/30 backdrop-blur-sm border-y border-white/40">
        <section className="max-w-5xl w-full flex flex-col items-center">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 w-full">
          
          <div className="bento-card lg:col-span-3 flex flex-col justify-center text-center items-center">
            <h2 className="text-3xl font-heading font-bold mb-4 text-deep-navy text-center">About geoVend</h2>
            <p className="text-gray-600 leading-relaxed text-lg text-center">
              <strong className="text-deep-navy">geoVend</strong> is a <strong className="text-bright-teal font-medium">real-time geospatial platform</strong> designed to modernise urban street commerce by seamlessly connecting consumers, vendors, and city administrators. Our ecosystem empowers consumers to discover nearby goods through an interactive live map, whilst providing vendors with a digital dashboard to broadcast their presence.
            </p>
          </div>

          <div className="bento-card data-stream-bg text-white lg:col-span-2 shadow-xl border-none">
            <div className="data-stream-content">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-bright-teal">
                  <Cpu size={20} />
                </div>
                <h3 className="text-xl font-bold font-mono text-bright-teal tracking-tight">ESP32 + NEO-6M</h3>
              </div>
              <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
                The hardware node consists of an ESP32 microcontroller paired with a NEO-6M GPS module, connected via UART. The GPS continuously acquires coordinates and transmits them as a JSON payload.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-bright-teal bg-black/30 p-3 rounded-lg border border-white/5">
                <Activity size={14} className="animate-pulse" />
                <span>TX/RX ACTIVE ... WAITING FIX</span>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>

      {/* Unauthenticated Vendors Preview */}
      <div className="w-full flex justify-center py-24 px-6 z-10 mb-10">
        <section className="max-w-5xl w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center text-center mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-heading font-black mb-3 text-deep-navy">Live Vendor Feed</h2>
              <p className="text-gray-600 text-lg font-medium">See who's currently online and broadcasting.</p>
            </div>
            <Link to="/map" className="text-bright-teal font-bold hover:text-teal-700 transition-all flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-teal-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-2">
              View All on Map &rarr;
            </Link>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {onlineVendors.length > 0 ? (
            onlineVendors.map(vendor => (
              <div key={vendor.id} className="bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-sm border border-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-teal-50 text-bright-teal p-2.5 rounded-lg">
                    <Store size={20} />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-bright-teal animate-pulse"></span>
                    Online
                  </span>
                </div>
                <h4 className="font-bold text-deep-navy text-lg mb-1 font-heading">{vendor.name}</h4>
                <p className="text-gray-500 text-sm font-medium">{vendor.type}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-300">
              <Store size={32} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm">No vendors are currently broadcasting their location.</p>
            </div>
          )}
        </div>
      </section>
      </div>

    </div>
  );
};

export default LandingPage;
