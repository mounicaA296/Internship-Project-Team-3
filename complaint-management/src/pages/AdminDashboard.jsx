import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import Complaints from './Complaints';
import RaiseComplaint from './RaiseComplaint';
import Tracking from './Tracking';
import AssignUpdate from './AssignUpdate';
import Reports from './Reports';
import Settings from './Settings';
import '../LoginPage.css';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (userData) {
      setUser(userData);
    }
  }, []);

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard':
        return <Dashboard role="admin" />;
      case 'complaints':
        return <Complaints role="admin" />;
      case 'raise':
        return <RaiseComplaint />;
      case 'tracking':
        return <Tracking />;
      case 'assign':
        return <AssignUpdate />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings role="admin" />;
      default:
        return <Dashboard role="admin" />;
    }
  };

  return (
    <div className="layout">
      <Sidebar 
        user={user} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        role="admin" 
      />
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            <span className="topbar-sub">
              {activePage === 'dashboard' ? 'Administrative overview' : ''}
            </span>
          </div>
          <div className="topbar-actions">
            <div className="icon-btn" title="Notifications">
              <i className="ti ti-bell"></i>
              <span className="notif-dot"></span>
            </div>
            <div className="icon-btn" title="Search">
              <i className="ti ti-search"></i>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setActivePage('raise')}>
              <i className="ti ti-plus"></i> New Grievance
            </button>
          </div>
        </div>
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;