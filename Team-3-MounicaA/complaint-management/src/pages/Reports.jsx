import React from 'react';
import { allComplaints } from '../data/complaintsData';

const Reports = () => {
  const total = allComplaints.length;
  const resolved = allComplaints.filter(c => c.status === 'Resolved').length;
  const avgDays = 3.2;
  const breached = 7;

  return (
    <>
      <div className="card">
        <div className="card-header"><div className="card-title">Generate Report</div></div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>From Date</label>
            <input type="date" defaultValue="2026-06-01" style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
          </div>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>To Date</label>
            <input type="date" defaultValue="2026-06-23" style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}} />
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Department</label>
            <select style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}}>
              <option>All Departments</option><option>IT</option><option>Finance</option><option>Facilities</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label" style={{display:'block', fontSize:'13px', fontWeight:600, color:'var(--text2)', marginBottom:'4px'}}>Status</label>
            <select style={{width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'var(--radius)', fontSize:'13px'}}>
              <option>All Statuses</option><option>Open</option><option>Resolved</option>
            </select>
          </div>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <button className="btn btn-primary"><i className="ti ti-file-spreadsheet"></i> Export CSV</button>
          <button className="btn"><i className="ti ti-file-text"></i> Export PDF</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Summary Statistics — June 2026</div></div>
        <div className="metric-grid" style={{marginBottom:0}}>
          <div className="metric-card"><div className="metric-icon blue"><i className="ti ti-clipboard-list"></i></div><div><div className="metric-label">Total Raised</div><div className="metric-value">{total}</div></div></div>
          <div className="metric-card"><div className="metric-icon green"><i className="ti ti-circle-check"></i></div><div><div className="metric-label">Resolved</div><div className="metric-value">{resolved}</div></div></div>
          <div className="metric-card"><div className="metric-icon orange"><i className="ti ti-clock"></i></div><div><div className="metric-label">Avg. Days</div><div className="metric-value">{avgDays}</div></div></div>
          <div className="metric-card"><div className="metric-icon red"><i className="ti ti-alarm"></i></div><div><div className="metric-label">Breached SLA</div><div className="metric-value">{breached}</div></div></div>
        </div>
      </div>
    </>
  );
};

export default Reports;