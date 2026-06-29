import React from 'react';
import { allComplaints } from '../data/complaintsData';

const Tracking = () => {
  const openCount = allComplaints.filter(c => c.status === 'Open').length;
  const inProgressCount = allComplaints.filter(c => c.status === 'In progress').length;
  const resolvedCount = allComplaints.filter(c => c.status === 'Resolved').length;

  return (
    <>
      <div className="metric-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        <div className="metric-card">
          <div className="metric-icon blue"><i className="ti ti-clock"></i></div>
          <div>
            <div className="metric-label">Avg. Resolution Time</div>
            <div className="metric-value">3.2 days</div>
            <div className="metric-delta up">Down from 4.1 last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green"><i className="ti ti-shield-check"></i></div>
          <div>
            <div className="metric-label">SLA Compliance</div>
            <div className="metric-value">87%</div>
            <div className="metric-delta up">Target: 85% ✓</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon red"><i className="ti ti-alarm"></i></div>
          <div>
            <div className="metric-label">Overdue Complaints</div>
            <div className="metric-value" style={{color:'var(--red)'}}>7</div>
            <div className="metric-delta down">Needs escalation</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Complaint #1041 — Payroll Discrepancy (May)</div>
            <div className="card-sub">Finance Department · Raised by Vikram S. on 19 Jun 2026</div>
          </div>
          <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
            <span className="badge badge-progress">In Progress</span>
            <span style={{fontSize:'12px', color:'var(--text3)'}}>Due: <strong style={{color:'var(--orange)'}}>23 Jun 2026</strong></span>
          </div>
        </div>

        <div style={{display:'flex', gap:'20px', marginBottom:'20px', flexWrap:'wrap'}}>
          <div style={{fontSize:'12.5px', color:'var(--text3)'}}><i className="ti ti-user"></i> Assigned to <strong style={{color:'var(--text)'}}>Priya Nair</strong></div>
          <div style={{fontSize:'12.5px', color:'var(--text3)'}}><i className="ti ti-building"></i> Finance Ops</div>
          <div style={{fontSize:'12.5px', color:'var(--text3)'}}><i className="ti ti-flag"></i> Priority: <strong style={{color:'var(--red)'}}>High</strong></div>
        </div>

        <div style={{fontSize:'11px', fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'8px'}}>Progress</div>
        <div style={{display:'flex', gap:0, margin:'12px 0 20px'}}>
          <div style={{flex:1, textAlign:'center'}}>
            <div style={{height:'8px', background:'#16A34A', borderRadius:'4px 0 0 4px'}}></div>
            <div style={{fontSize:'11px', fontWeight:600, color:'#027A48', marginTop:'4px'}}>Received</div>
          </div>
          <div style={{flex:1, textAlign:'center'}}>
            <div style={{height:'8px', background:'#16A34A'}}></div>
            <div style={{fontSize:'11px', fontWeight:600, color:'#027A48', marginTop:'4px'}}>Assigned</div>
          </div>
          <div style={{flex:1, textAlign:'center'}}>
            <div style={{height:'8px', background:'#D97706'}}></div>
            <div style={{fontSize:'11px', fontWeight:600, color:'#B54708', marginTop:'4px'}}>In Review</div>
          </div>
          <div style={{flex:1, textAlign:'center'}}>
            <div style={{height:'8px', background:'var(--gray-bg)', borderRadius:'0 4px 4px 0'}}></div>
            <div style={{fontSize:'11px', fontWeight:600, color:'var(--text3)', marginTop:'4px'}}>Resolved</div>
          </div>
        </div>

        <div style={{fontSize:'11px', fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'12px'}}>Activity Timeline</div>
        <ul className="timeline">
          <li>
            <div className="tl-dot green"><i className="ti ti-plus"></i></div>
            <div className="tl-body">
              <strong>Complaint raised</strong>
              <p>Submitted by Vikram S. regarding May salary discrepancy of ₹4,200.</p>
              <time>19 Jun 2026, 10:14 AM</time>
            </div>
          </li>
          <li>
            <div className="tl-dot blue"><i className="ti ti-user-check"></i></div>
            <div className="tl-body">
              <strong>Assigned to Priya Nair</strong>
              <p>Complaint forwarded to Finance Ops team for review and resolution.</p>
              <time>19 Jun 2026, 11:30 AM</time>
            </div>
          </li>
          <li>
            <div className="tl-dot orange"><i className="ti ti-message"></i></div>
            <div className="tl-body">
              <strong>Update from Priya Nair</strong>
              <p>Reviewing May payroll run against timesheets and attendance records.</p>
              <time>20 Jun 2026, 9:00 AM</time>
            </div>
          </li>
          <li>
            <div className="tl-dot" style={{color:'var(--text3)'}}><i className="ti ti-clock"></i></div>
            <div className="tl-body">
              <strong>Awaiting resolution</strong>
              <p>SLA deadline: 23 Jun 2026. Escalation triggered if unresolved.</p>
              <time>In progress</time>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Tracking;