import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('employee');
  const [email, setEmail] = useState('employee@company.com');
  const [password, setPassword] = useState('password123');
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
    if (role === 'employee') {
      setEmail('employee@company.com');
      setPassword('password123');
    } else {
      setEmail('admin@company.com');
      setPassword('admin123');
    }
    setAlert({ show: false, message: '', type: 'error' });
  };

  const showAlert = (message, type = 'error') => {
    setAlert({ show: true, message, type });
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = setTimeout(() => {
      setAlert({ show: false, message: '', type: 'error' });
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showAlert('Please enter both email and password.');
      return;
    }

    let isValid = false;
    let userData = null;

    if (currentRole === 'employee') {
      if (trimmedEmail.endsWith('@company.com') && trimmedPassword === 'password123') {
        isValid = true;
        userData = {
          name: 'Arjun Kumar',
          email: trimmedEmail,
          role: 'employee',
          department: 'HR',
          avatar: 'AK'
        };
      } else {
        showAlert('Invalid employee credentials. Use employee@company.com / password123');
      }
    } else if (currentRole === 'admin') {
      if (trimmedEmail === 'admin@company.com' && trimmedPassword === 'admin123') {
        isValid = true;
        userData = {
          name: 'Admin User',
          email: trimmedEmail,
          role: 'admin',
          department: 'Administration',
          avatar: 'AU'
        };
      } else {
        showAlert('Invalid admin credentials. Use admin@company.com / admin123');
      }
    }

    if (isValid && userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      showAlert(`✅ Welcome ${userData.name}! Redirecting...`, 'success');
      
      setTimeout(() => {
        navigate(`/${userData.role}-dashboard`);
      }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <i className="ti ti-shield"></i>
          </div>
          <div className="logo-text">
            <strong>GrievanceHub</strong>
            <span>Complaint Management</span>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">
          {currentRole === 'employee' 
            ? 'Sign in to raise and track your complaints' 
            : 'Sign in to manage and resolve grievances'}
        </p>

        {alert.show && (
          <div className={`alert show ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            <i className={`ti ${alert.type === 'success' ? 'ti-check-circle' : 'ti-alert-circle'}`}></i>
            <span>{alert.message}</span>
          </div>
        )}

        <div className="role-toggle">
          <button 
            className={`role-btn ${currentRole === 'employee' ? 'active' : ''}`}
            onClick={() => setRole('employee')}
          >
            <i className="ti ti-user"></i> Employee
          </button>
          <button 
            className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <i className="ti ti-shield"></i> Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address <span className="req">*</span></label>
            <div className="input-wrap">
              <i className="ti ti-mail"></i>
              <input 
                type="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password <span className="req">*</span></label>
            <div className="input-wrap">
              <i className="ti ti-lock"></i>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required 
              />
            </div>
          </div>

          <div className="form-options">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> 
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="btn-login">
            <i className="ti ti-login"></i> Sign In
          </button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span className={`role-indicator ${currentRole === 'employee' ? 'employee' : 'admin'}`}>
            <i className={`ti ${currentRole === 'employee' ? 'ti-user' : 'ti-shield'}`}></i>
            {currentRole === 'employee' ? 'ComplaintHub' : 'GrievanceHub'}
          </span>
        </div>

        <div className="login-footer">
          Don't have an account? <a href="#">Contact HR</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;