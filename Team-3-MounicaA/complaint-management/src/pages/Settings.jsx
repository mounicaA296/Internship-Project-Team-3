import React from 'react';

const Settings = ({ role }) => {
  return (
    <div style={{maxWidth:'640px', paddingBottom:'40px'}}>
      <div className="card">
        <div className="card-header"><div className="card-title">Profile Settings</div></div>
        <div className="form-group" style={{marginBottom:'16px'}}>
          <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Full Name</label>
          <input type="text" defaultValue="Arjun Kumar" style={{width:'100%', maxWidth:'500px', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
        </div>
        <div className="form-group" style={{marginBottom:'16px'}}>
          <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Email Address</label>
          <input type="email" defaultValue="arjun.kumar@company.com" style={{width:'100%', maxWidth:'500px', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', maxWidth:'500px'}}>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Department</label>
            <select style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px', background:'var(--surface)'}}>
              <option selected>HR</option><option>IT</option><option>Finance</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Role</label>
            <input type="text" value={role === 'admin' ? 'Administrator' : 'Employee'} disabled style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px', background:'var(--gray-bg)', color:'var(--text3)'}} />
          </div>
        </div>
        <button className="btn btn-primary" style={{marginTop:'16px'}}>
          <i className="ti ti-device-floppy"></i> Save Changes
        </button>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Notification Preferences</div></div>
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <label style={{display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', fontSize:'13.5px'}}>
            <input type="checkbox" defaultChecked style={{accentColor:'var(--accent)'}} /> Email on complaint assignment
          </label>
          <label style={{display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', fontSize:'13.5px'}}>
            <input type="checkbox" defaultChecked style={{accentColor:'var(--accent)'}} /> Email on status change
          </label>
          <label style={{display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', fontSize:'13.5px'}}>
            <input type="checkbox" style={{accentColor:'var(--accent)'}} /> Daily digest of open complaints
          </label>
          <label style={{display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', fontSize:'13.5px'}}>
            <input type="checkbox" defaultChecked style={{accentColor:'var(--accent)'}} /> SLA breach alerts
          </label>
        </div>
        <button className="btn btn-primary" style={{marginTop:'18px'}}>
          <i className="ti ti-device-floppy"></i> Save Preferences
        </button>
      </div>

      <div className="card" style={{marginBottom:'40px'}}>
        <div className="card-header"><div className="card-title">Change Password</div></div>
        <div className="form-group" style={{marginBottom:'14px'}}>
          <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Current Password</label>
          <input type="password" placeholder="••••••••" style={{width:'100%', maxWidth:'500px', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
        </div>
        <div className="form-group" style={{marginBottom:'14px'}}>
          <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>New Password</label>
          <input type="password" placeholder="••••••••" style={{width:'100%', maxWidth:'500px', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
        </div>
        <div className="form-group" style={{marginBottom:'14px'}}>
          <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Confirm Password</label>
          <input type="password" placeholder="••••••••" style={{width:'100%', maxWidth:'500px', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
        </div>
        <button className="btn btn-primary">
          <i className="ti ti-lock"></i> Update Password
        </button>
      </div>
    </div>
  );
};

export default Settings;