import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { Store, Save, Settings, ShieldCheck, Camera } from 'lucide-react';
import './VendorProfile.css';

const VendorProfile = () => {
  const { currentUser, vendors } = useAppContext();
  const myVendorData = vendors.find(v => v.id === currentUser?.vendor_id) || {};
  
  const [formData, setFormData] = useState({
    name: myVendorData.name || '',
    type: myVendorData.type || 'Food',
    description: myVendorData.description || ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully! (Mocked)");
  };

  return (
    <div className="vp-page">
      <Navbar />

      <div className="vp-container">
        {/* Page Header */}
        <div className="vp-header">
          <div className="vp-icon-circle">
            <Settings size={36} />
          </div>
          <h1 className="vp-title">Vendor Settings</h1>
          <p className="vp-subtitle">
            Manage your business profile, verification status, and public appearance.
          </p>
        </div>

        {/* Verification Banner */}
        <div className="vp-banner">
          <ShieldCheck size={28} />
          <div>
            <div className="vp-banner-title">Account Verified & Active</div>
            <p className="vp-banner-desc">
              Your vendor account is approved. Ensure your hardware GPS module is powered on to begin broadcasting location data to consumers.
            </p>
          </div>
        </div>

        {/* Main Settings Card */}
        <div className="vp-card">
          <div className="vp-card-header">
            <Store size={20} />
            Public Business Details
          </div>

          <form onSubmit={handleSubmit} className="vp-card-body">
            {/* Logo Upload */}
            <div className="vp-logo-section">
              <div className="vp-logo-circle">
                <Camera size={32} />
              </div>
              <div className="vp-logo-info">
                <h3>Business Logo</h3>
                <p>Upload a square image to stand out on the map.</p>
                <button type="button" className="vp-upload-btn">Choose Image</button>
              </div>
            </div>

            {/* Business Name */}
            <div className="vp-form-group">
              <label className="vp-label">Business Name</label>
              <div className="vp-input-wrapper">
                <Store size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="vp-input"
                  placeholder="e.g. Ramesh Fresh Produce"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="vp-form-group">
              <label className="vp-label">Primary Category</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="vp-select"
              >
                <option value="Food">Food & Beverages</option>
                <option value="Produce">Fresh Produce</option>
                <option value="Apparel">Apparel & Goods</option>
                <option value="Services">Services</option>
              </select>
            </div>

            {/* Description */}
            <div className="vp-form-group">
              <label className="vp-label">Internal Description (Private)</label>
              <p className="vp-hint">This information is only visible to City Admins for zoning verification.</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="vp-textarea"
                placeholder="Notes for city admins or your own records..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="vp-actions">
              <button type="button" className="vp-btn-discard">Discard Changes</button>
              <button type="submit" className="vp-btn-save">
                <Save size={18} />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
