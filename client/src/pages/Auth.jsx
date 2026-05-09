import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { User, Store, ArrowRight, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('consumer'); // 'consumer' or 'vendor'
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, name);
    if (role === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/map');
    }
  };

  return (
    <div className="auth-container wave-bg">
      <Navbar />
      
      <main className="auth-main">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isLogin ? 'Log in to continue to geoVend' : 'Join geoVend today'}</p>
          </div>
          
          <div className="role-selector">
            <button 
              className={`role-btn ${role === 'consumer' ? 'active' : ''}`}
              onClick={() => setRole('consumer')}
              type="button"
            >
              <User size={20} />
              Consumer
            </button>
            <button 
              className={`role-btn ${role === 'vendor' ? 'active' : ''}`}
              onClick={() => setRole('vendor')}
              type="button"
            >
              <Store size={20} />
              Vendor
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="you@example.com" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              {isLogin ? 'Login' : 'Sign Up'}
              <ArrowRight size={18} />
            </button>
          </form>

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
        </div>
      </main>
    </div>
  );
};

export default Auth;
