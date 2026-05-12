import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { User, Store, ArrowRight, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('consumer');
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
      if (role === 'admin') { alert('Admins cannot register here.'); return; }
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
    <div className="auth-page">
      <Navbar />
      <div className="auth-body">
        {/* Left: Big headline */}
        <div className="auth-left">
          <span className="section-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#94a3b8' }}>
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </span>
          <h1 className="auth-headline">
            {isLogin ? (
              <>LOG IN TO<br />YOUR <span className="accent">ACCOUNT</span>.</>
            ) : (
              <>JOIN THE<br /><span className="accent">GEO</span>VEND<br />NETWORK.</>
            )}
          </h1>
          <p className="auth-subline">
            {isLogin
              ? 'Access your dashboard, manage your vendor profile, or discover nearby street vendors.'
              : 'Create an account to start discovering vendors or broadcast your own location on the grid.'
            }
          </p>
        </div>

        {/* Right: Form card */}
        <div className="auth-card">
          <h2 className="auth-card-title">
            {role === 'admin' ? 'Admin Portal' : isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="auth-card-sub">
            {role === 'admin' ? 'Login with your admin credentials' : isLogin ? 'Enter your credentials to continue' : 'Fill in the details below'}
          </p>

          <div className="role-tabs">
            <button className={`role-tab ${role === 'consumer' ? 'active' : ''}`}
              onClick={() => { setRole('consumer'); setIsLogin(true); }} type="button">
              Consumer
            </button>
            <button className={`role-tab ${role === 'vendor' ? 'active' : ''}`}
              onClick={() => { setRole('vendor'); setIsLogin(true); }} type="button">
              Vendor
            </button>
            <button className={`role-tab ${role === 'admin' ? 'active' : ''}`}
              onClick={() => { setRole('admin'); setIsLogin(true); }} type="button">
              Admin
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && role !== 'admin' && (
              <div>
                <label className="form-label">Full Name</label>
                <div className="form-input-wrap">
                  <User size={16} />
                  <input className="form-input" type="text" name="name" placeholder="John Doe"
                    value={formData.name} onChange={handleInputChange} required />
                </div>
              </div>
            )}

            {!isLogin && role === 'vendor' && (
              <div>
                <label className="form-label">Business Name</label>
                <div className="form-input-wrap">
                  <Store size={16} />
                  <input className="form-input" type="text" name="businessName" placeholder="Raju's Chaat"
                    value={formData.businessName} onChange={handleInputChange} required />
                </div>
              </div>
            )}

            <div>
              <label className="form-label">Email</label>
              <div className="form-input-wrap">
                <Mail size={16} />
                <input className="form-input" type="email" name="email"
                  placeholder={role === 'admin' ? 'admin@geovend.com' : 'you@example.com'}
                  value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="form-input-wrap">
                <Lock size={16} />
                <input className="form-input" type="password" name="password" placeholder="••••••••"
                  value={formData.password} onChange={handleInputChange} required />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              {isLogin ? 'Login' : 'Sign Up'} <ArrowRight size={16} />
            </button>
          </form>

          {role !== 'admin' && (
            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button className="text-link" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
