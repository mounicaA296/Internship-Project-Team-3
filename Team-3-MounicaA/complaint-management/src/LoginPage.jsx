import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import api from './services/api';

const LoginPage = () => {
  const navigate = useNavigate();

  // Roles & Auth States
  const [currentRole, setCurrentRole] = useState('employee');
  const [isSignup, setIsSignup] = useState(false);
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('employee@company.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  const [alert, setAlert] = useState({ show: false, message: '', type: 'error' });
  const alertTimeoutRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      navigate(`/${user.role}-dashboard`);
    }
  }, [navigate]);

  const setRole = (role) => {
    setCurrentRole(role);
    
    // If admin is selected, strictly disable signup mode
    if (role === 'admin') {
      setIsSignup(false);
      setEmail('admin@company.com');
      setPassword('admin123');
    } else if (role === 'employee') {
      setEmail(isSignup ? '' : 'employee@company.com');
      setPassword(isSignup ? '' : 'password123');
    } else if (role === 'staff') {
      setEmail(isSignup ? '' : 'staff@company.com');
      setPassword(isSignup ? '' : 'staff123');
    }
    
    setAlert({ show: false, message: '', type: 'error' });
  };

  const showAlert = (message, type = 'error') => {
    setAlert({ show: true, message, type });
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    alertTimeoutRef.current = setTimeout(() => {
      setAlert({ show: false, message: '', type: 'error' });
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  // --- SIGN IN LOGIC ---
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password, role: currentRole });
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        showAlert(`✅ Welcome ${user.full_name}! Redirecting...`, 'success');
        setTimeout(() => {
          const role = user.role.toLowerCase();
          if (role === 'admin') navigate('/admin-dashboard');
          else if (role === 'staff' || role === 'manager') navigate('/staff-dashboard');
          else navigate('/employee-dashboard');
        }, 800);
      }
    } catch (error) {
      showAlert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // --- SIGN UP LOGIC ---
  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      return showAlert('Please fill in all fields.');
    }
    if (password !== confirmPassword) {
      return showAlert('Passwords do not match.');
    }
    if (password.length < 6) {
      return showAlert('Password must be at least 6 characters.');
    }

    try {
      await api.post('/auth/register', {
        full_name: fullName.trim(),
        email: email.trim(),
        password: password,
        role: currentRole
      });

      showAlert('✅ Account created successfully! Please sign in.', 'success');
      
      // Reset form and switch to login
      setTimeout(() => {
        setIsSignup(false);
        setPassword('');
        setConfirmPassword('');
      }, 1500);

    } catch (error) {
      showAlert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="recruitify-layout-wrapper">
      
      {/* Top Left Logo Area */}
      <div className="top-brand-logo">
        <span className="logo-icon">G</span>
        <span className="logo-text">rievanceHub</span>
      </div>

      {/* Main Centered Content */}
      <div className="recruitify-login-box">
        
        <div className="login-header">
          <div className="icon-wrapper">
            <i className="ti ti-shield"></i>
          </div>
          <h1>{isSignup ? 'Create Account' : 'Sign in'}</h1>
          <p>
            {isSignup 
              ? `Register as a new ${currentRole}!` 
              : `Sign in and start managing your ${currentRole === 'employee' ? 'complaints!' : 'system!'}`}
          </p>
        </div>

        {alert.show && (
          <div className={`custom-alert ${alert.type}`}>
            <span>{alert.message}</span>
          </div>
        )}

        <form className="recruitify-form" onSubmit={handleSubmit}>
          
          {/* Subtle Role Toggle */}
          <div className="recruitify-role-toggle">
            <button type="button" className={currentRole === 'employee' ? 'active' : ''} onClick={() => setRole('employee')}>Employee</button>
            <button type="button" className={currentRole === 'staff' ? 'active' : ''} onClick={() => setRole('staff')}>Staff</button>
            <button type="button" className={currentRole === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>Admin</button>
          </div>

          {/* Conditional Full Name Field for Signup */}
          {isSignup && (
            <div className="input-container">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-container">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Conditional Confirm Password for Signup */}
          {isSignup && (
            <div className="input-container">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Hide Remember Me & Forgot Password during Signup */}
          {!isSignup && (
            <div className="form-options-row">
              <label className="custom-checkbox">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <span className="checkmark-box"></span>
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="neon-green-btn">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {/* Toggle between Login and Signup (Hidden for Admin) */}
        {currentRole !== 'admin' && (
          <div className="auth-switch">
            {isSignup ? (
              <p>Already have an account? <span onClick={() => setIsSignup(false)}>Sign in</span></p>
            ) : (
              <p>Don't have an account? <span onClick={() => {
                setIsSignup(true);
                setEmail('');
                setPassword('');
              }}>Sign up</span></p>
            )}
          </div>
        )}
      </div>

      {/* The Bottom Wave */}
      <div className="bottom-wave-container">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#0d2e3d" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,144C672,128,768,128,864,149.3C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#e1e5eb" fillOpacity="1" d="M0,256L60,250.7C120,245,240,235,360,240C480,245,600,267,720,272C840,277,960,267,1080,250.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          <path fill="#ffffff" fillOpacity="1" d="M0,288L80,282.7C160,277,320,267,480,261.3C640,256,800,256,960,261.3C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

    </div>
  );
};

export default LoginPage;