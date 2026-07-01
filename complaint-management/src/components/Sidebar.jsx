import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user, activePage, setActivePage, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = role === 'admin' ? [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'complaints', label: 'All Grievances', icon: 'ti-list-details', badge: '12' },
    { id: 'assign', label: 'Assign & Escalate', icon: 'ti-user-check' },
    { id: 'tracking', label: 'Resolution Tracking', icon: 'ti-chart-line' },
    { id: 'reports', label: 'Reports', icon: 'ti-file-analytics' },
    { id: 'settings', label: 'Settings', icon: 'ti-settings' },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'complaints', label: 'My Complaints', icon: 'ti-list-details' },
    { id: 'raise', label: 'Raise Complaint', icon: 'ti-circle-plus' },
    { id: 'tracking', label: 'Resolution Tracking', icon: 'ti-chart-line' },
    { id: 'settings', label: 'Settings', icon: 'ti-settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="ti ti-shield"></i>
        </div>
        <div className="logo-text">
          <strong>{role === 'admin' ? 'GrievanceHub' : 'ComplaintHub'}</strong>
          <span>{role === 'admin' ? 'Admin Console' : 'Employee Portal'}</span>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-section">{role === 'admin' ? 'Overview' : 'Main'}</div>
        {navItems.map(item => (
          <div 
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <i className={`ti ${item.icon}`}></i> {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className={`avatar ${role === 'admin' ? 'avatar-purple' : 'avatar-blue'}`}>
          {user?.avatar || 'U'}
        </div>
        <div className="user-info">
          <strong>{user?.name || 'User'}</strong>
          <span>{user?.department || 'Department'}</span>
        </div>
        <i className="ti ti-logout" onClick={handleLogout} style={{marginLeft:'auto', color:'var(--text3)', cursor:'pointer'}}></i>
      </div>
    </aside>
  );
};

export default Sidebar;