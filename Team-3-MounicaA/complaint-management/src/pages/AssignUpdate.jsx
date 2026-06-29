import React, { useState } from 'react';

const AssignUpdate = () => {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleAssign = () => {
    const complaint = document.getElementById('assign-complaint')?.value;
    const assignee = document.getElementById('assign-to')?.value;
    if (!complaint || !assignee) {
      alert('Please select both a grievance and a staff member.');
      return;
    }
    setMessage(`Grievance #${complaint} has been assigned to ${assignee}.`);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <>
      <div className="card" style={{background:'#FFFBEB', borderColor:'#FDE68A'}}>
        <div style={{display:'flex', alignItems:'flex-start', gap:'12px'}}>
          <i className="ti ti-lock" style={{color:'var(--orange)', fontSize:'20px'}}></i>
          <div style={{fontSize:'13.5px', color:'var(--text2)'}}>
            This section is restricted to <strong>Administrators and Managers</strong>. Assignments will trigger email notifications to the staff member.
          </div>
        </div>
      </div>

      <div style={{maxWidth:'680px'}}>
        <div className="card">
          <div className="card-header" style={{marginBottom:'4px'}}>
            <div className="card-title">Assign Grievance to Staff</div>
          </div>

          <div className="form-group" style={{marginBottom:'16px'}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Select Grievance</label>
            <select id="assign-complaint" style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}}>
              <option value="">-- Select a grievance --</option>
              <option value="1042">#1042 — AC not working (Facilities · High)</option>
              <option value="1041">#1041 — Payroll discrepancy (Finance · High)</option>
              <option value="1040">#1040 — Laptop keyboard broken (IT · Medium)</option>
            </select>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Assign To</label>
              <select id="assign-to" style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}}>
                <option value="">-- Select staff --</option>
                <option>Priya Nair — Finance Ops</option>
                <option>Suresh M. — IT Support</option>
                <option>Ramesh T. — Facilities</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Update Status</label>
              <select id="assign-status" style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}}>
                <option value="">-- Select status --</option>
                <option>Open</option><option>In progress</option><option>Resolved</option><option>Closed</option>
              </select>
            </div>
          </div>

          <div style={{display:'flex', gap:'10px'}}>
            <button className="btn btn-primary" onClick={handleAssign}><i className="ti ti-user-check"></i> Save Assignment</button>
            <button className="btn"><i className="ti ti-mail"></i> Notify via Email</button>
          </div>
        </div>

        {success && (
          <div style={{background:'#F0FDF4', border:'1px solid #A7F3D0', borderRadius:'var(--radius)', padding:'14px 18px', display:'flex', alignItems:'center', gap:'12px'}}>
            <i className="ti ti-circle-check" style={{color:'var(--green)', fontSize:'20px'}}></i>
            <div style={{fontSize:'13.5px', color:'#065F46'}}>{message}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignUpdate;