import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { User, Store, ArrowRight, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('consumer'); // 'consumer', 'vendor', or 'admin'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', businessName: '' });
  const navigate = useNavigate();
  const { login, registerUser, registerVendor } = useAppContext();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const success = await login(role, formData.email, formData.password);
      if (success) {
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'vendor') navigate('/vendor/dashboard');
        else navigate('/map');
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (role === 'admin') {
        alert('Admins cannot register here.');
        return;
      }
      if (role === 'vendor') {
        const success = await registerVendor(formData);
        if (success) navigate('/vendor/dashboard');
      } else {
        const success = await registerUser(formData);
        if (success) navigate('/map');
      }
    }
  };

  return (
    <div className="auth-container wave-bg">
      <Navbar />
      
      <main className="auth-main">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h2>{role === 'admin' ? 'Admin Portal' : isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{role === 'admin' ? 'Login with your admin credentials' : isLogin ? 'Log in to continue to geoVend' : 'Join geoVend today'}</p>
          </div>
          
          <div className="role-selector">
            <button 
              className={`role-btn ${role === 'consumer' ? 'active' : ''}`}
              onClick={() => { setRole('consumer'); setIsLogin(true); }}
              type="button"
            >
              <User size={20} />
              Consumer
            </button>
            <button 
              className={`role-btn ${role === 'vendor' ? 'active' : ''}`}
              onClick={() => { setRole('vendor'); setIsLogin(true); }}
              type="button"
            >
              <Store size={20} />
              Vendor
            </button>
            <button 
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => { setRole('admin'); setIsLogin(true); }}
              type="button"
            >
              <ShieldCheck size={20} />
              Admin
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && role !== 'admin' && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            )}
            
            {!isLogin && role === 'vendor' && (
              <div className="form-group">
                <label>Business Name</label>
                <div className="input-wrapper">
                  <Store size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="businessName"
                    placeholder="Raju's Chaat" 
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  placeholder={role === 'admin' ? "admin@geovend.com" : "you@example.com"} 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              {isLogin ? 'Login' : 'Sign Up'}
              <ArrowRight size={18} />
            </button>
          </form>

          {role !== 'admin' && (
            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  className="text-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Auth;
