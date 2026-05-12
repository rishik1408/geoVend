import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import './LandingPage.css';

const TICKER_ITEMS = [
  'Smart Streets', 'Vibrant Cities', 'Connected Vendors',
  'Live Tracking', 'Urban Commerce', 'Geofenced Zones',
];

/* Pixel grid (10×10): 0=dim, 1=white, 2=teal */
const PIXELS = [
  [0,0,0,1,1,0,0,0,0,0],
  [0,0,1,2,1,1,0,0,0,0],
  [0,1,1,1,2,1,1,0,0,0],
  [0,0,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,1,0],
  [0,0,0,0,0,0,0,1,2,1],
  [0,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

const PixelGrid = () => (
  <div className="pixel-grid">
    {PIXELS.flat().map((v, i) => (
      <div key={i} className={`pixel${v === 1 ? ' on' : ''}${v === 2 ? ' accent' : ''}`} />
    ))}
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const whyRef = useRef(null);

  /* Scroll-triggered fade-in for Why section */
  useEffect(() => {
    const el = whyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="section-label">Real-Time Geospatial Platform</span>
            <h1 className="hero-title">
              <span className="line">MAPPING THE</span>
              <span className="line">FUTURE OF</span>
              <span className="line">
                <span className="text-accent">STREET</span>
                <span className="text-glyph">
                  <span className="glyph-inner">
                    <MapPin strokeWidth={2.5} />
                  </span>
                </span>,
              </span>
              <span className="line">COMMERCE.</span>
            </h1>
          </div>

          <div className="hero-aside">
            <p className="hero-desc">
              geoVend helps consumers, vendors, and city administrators
              connect through real-time GPS tracking, geofenced zoning,
              and live discovery maps.
            </p>
            <div className="hero-ctas">
              <Link to="/map" className="cta-btn cta-primary">
                Find Vendors <ArrowRight size={15} />
              </Link>
              <Link to="/auth" className="cta-btn cta-outline">
                Vendor Login <Eye size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="process-section">
        <div className="process-grid">
          <div className="process-left">
            <span className="section-label">Operating Model</span>
            <h2 className="process-title">
              HOW<br />GEO<span className="text-accent">VEND</span><br />WORKS.
            </h2>
            <p className="process-subtitle">
              A unified ecosystem for modern cities. We organize the path
              from invisible street commerce to a fully digital, trackable,
              and compliant urban marketplace.
            </p>
          </div>

          <div className="process-right">
            <div className="process-card" onClick={() => navigate('/map')} style={{ cursor: 'pointer' }}>
              <PixelGrid />
              <span className="process-card-label">01</span>
              <h3 className="process-card-title">DISCOVER</h3>
              <p className="process-card-desc">
                Consumers find active vendors through an interactive live map.
                No more guesswork — real-time GPS pings show exactly who is nearby.
              </p>
            </div>
          </div>
        </div>

        <div className="process-steps">
          <div className="step-card" onClick={() => navigate('/map')} style={{ cursor: 'pointer' }}>
            <span className="step-num">01</span>
            <h4 className="step-title">Consumers</h4>
            <p className="step-desc">
              Instantly locate your favorite street food or local goods on a live, interactive map.
            </p>
            <div className="step-bar" />
          </div>
          <div className="step-card">
            <span className="step-num">02</span>
            <h4 className="step-title">Vendors</h4>
            <p className="step-desc">
              Toggle your status to &ldquo;Online&rdquo; and broadcast your real-time location to nearby consumers.
            </p>
            <div className="step-bar" />
          </div>
          <div className="step-card">
            <span className="step-num">03</span>
            <h4 className="step-title">City Admins</h4>
            <p className="step-desc">
              Monitor city-wide vending activity. Geofencing ensures vendors comply with designated zones.
            </p>
            <div className="step-bar" />
          </div>
        </div>
      </section>

      {/* ─── WHY GEOVEND ─── */}
      <section className="why-section" ref={whyRef}>
        <div className="why-top">
          <span className="section-label">Why geoVend</span>
          <div className="why-badge">
            <span className="why-badge-line">LESS CHAOS. ↓</span>&nbsp;&nbsp;
            <span>MORE ORDER. ↑</span>
          </div>
        </div>

        <h2 className="why-title">
          <span className="word-reveal">EMPOWERING</span>{' '}
          <span className="word-reveal d2 streets">STREETS.</span><br />
          <span className="word-reveal d3">ORGANIZING</span>{' '}
          <span className="word-reveal d4">CITIES.</span>
        </h2>

        <p className="manifesto">
          The informal economy shouldn't mean invisible commerce.
          <strong> geoVend</strong> gives street vendors the digital visibility
          of a modern enterprise, gives consumers the convenience of real-time
          discovery, and gives city admins the tools to maintain harmony.
          It's local commerce, <strong>upgraded</strong>.
        </p>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services-section">
        <div className="services-inner">
          <div className="services-header">
            <h2 className="services-title">
              BUILT FOR THE <span className="text-accent">STREETS</span>.<br />POWERED BY DATA.
            </h2>
            <p className="services-sub">A complete toolkit for the modern informal economy.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <span className="service-num">001</span>
              <h3 className="service-name">Real-Time<br />Geospatial Mapping</h3>
              <p className="service-desc">
                We bridge the gap between local supply and instant demand.
                Vendors broadcast their live location to the grid, while
                consumers get a frictionless, live map to discover active
                street food and goods in their immediate neighborhood.
              </p>
            </div>
            <div className="service-card">
              <span className="service-num">002</span>
              <h3 className="service-name">Smart Zoning<br />&amp; Geofencing</h3>
              <p className="service-desc">
                We bring structured data to city management. Administrators
                get IoT-powered geofencing tools to define approved
                vending zones, monitor city-wide activity, and enforce
                compliance without constant physical patrols.
              </p>
            </div>
            <div className="service-card">
              <span className="service-num">003</span>
              <h3 className="service-name">IoT &amp; Hardware<br />Integration</h3>
              <p className="service-desc">
                Digital visibility shouldn't require an expensive smartphone.
                We offer dedicated, compact GPS hardware solutions that allow
                any vendor to sync directly with the geoVend network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-name">geoVend</span>
            <span className="footer-brand-year">© 2026. All rights reserved.</span>
          </div>
          <div className="footer-team">
            <h4>TEAM SILICON SOULMATES</h4>
            <ul className="footer-emails">
              <li><a href="mailto:rishikm25ci@rnsit.ac.in">rishikm25ci@rnsit.ac.in</a></li>
              <li><a href="mailto:rudrachakraborty25ci@rnsit.ac.in">rudrachakraborty25ci@rnsit.ac.in</a></li>
              <li><a href="mailto:chirantangergal25ec@rnsit.ac.in">chirantangergal25ec@rnsit.ac.in</a></li>
              <li><a href="mailto:chirantanravikumarsuswaram25ec@rnsit.ac.in">chirantanravikumarsuswaram25ec@rnsit.ac.in</a></li>
              <li><a href="mailto:rohanrh25ci@rnsit.ac.in">rohanrh25ci@rnsit.ac.in</a></li>
              <li><a href="mailto:samvedsars25ci@rnsit.ac.in">samvedsars25ci@rnsit.ac.in</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          geoVend 2026 · Real-Time Geospatial Platform for Urban Street Commerce
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
