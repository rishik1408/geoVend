import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppContext';
import { Store, Save, Settings, ShieldCheck, Camera } from 'lucide-react';

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
    <div className="min-h-screen bg-deep-navy font-main text-white pb-24 relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-bright-teal/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/40 blur-[150px] rounded-full"></div>
      </div>

      <Navbar />

      <div className="w-full flex justify-center pt-32 px-6 z-10 relative">
        <main className="max-w-3xl w-full flex flex-col items-center">
        
        {/* Page Header */}
        <div className="text-center mb-10 w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md text-bright-teal rounded-full flex items-center justify-center shadow-lg border border-white/20 mb-6">
            <Settings size={36} />
          </div>
          <h1 className="text-4xl font-heading font-black text-white mb-3 tracking-tight">Vendor Settings</h1>
          <p className="text-gray-300 text-lg max-w-md font-medium">
            Manage your business profile, verification status, and public appearance.
          </p>
        </div>

        {/* Verification Alert */}
        <div className="w-full bg-bright-teal/10 border border-bright-teal/30 backdrop-blur-md rounded-2xl p-6 mb-10 flex items-start gap-4 shadow-lg">
          <ShieldCheck size={28} className="text-bright-teal shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-white text-lg mb-1">Account Verified & Active</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your vendor account is approved. Ensure your hardware GPS module is powered on to begin broadcasting location data to consumers.
            </p>
          </div>
        </div>

        {/* Main Settings Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          
          <div className="px-10 py-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Store size={20} className="text-bright-teal" /> Public Business Details
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            
            {/* Logo Upload (Simplified) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/10">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-400 border-2 border-dashed border-white/20 hover:border-bright-teal hover:text-bright-teal transition-colors cursor-pointer">
                <Camera size={32} />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-white mb-1">Business Logo</h3>
                <p className="text-sm text-gray-400 mb-4">Upload a square image to stand out on the map.</p>
                <button type="button" className="text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-lg transition-colors border border-white/10">
                  Choose Image
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Business Name</label>
                <div className="relative">
                  <Store size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-bright-teal focus:bg-white/10 transition-all text-white font-medium placeholder-gray-500"
                    placeholder="e.g. Ramesh Fresh Produce"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Primary Category</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-bright-teal focus:bg-white/10 transition-all text-white font-medium appearance-none cursor-pointer"
                >
                  <option value="Food" className="bg-deep-navy text-white">Food & Beverages</option>
                  <option value="Produce" className="bg-deep-navy text-white">Fresh Produce</option>
                  <option value="Apparel" className="bg-deep-navy text-white">Apparel & Goods</option>
                  <option value="Services" className="bg-deep-navy text-white">Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">Internal Description (Private)</label>
                <p className="text-xs text-gray-400 mb-3">This information is only visible to City Admins for zoning verification.</p>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-bright-teal focus:bg-white/10 transition-all text-white resize-y placeholder-gray-500"
                  placeholder="Notes for city admins or your own records..."
                ></textarea>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-4">
              <button type="button" className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-colors border border-transparent hover:border-white/10">
                Discard Changes
              </button>
              <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-bright-teal text-deep-navy px-10 py-4 rounded-xl font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-bright-teal/20 hover:-translate-y-0.5">
                <Save size={18} />
                Save Profile
              </button>
            </div>
            
          </form>
        </div>
        
        </main>
      </div>
    </div>
  );
};

export default VendorProfile;
