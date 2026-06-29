import React from 'react';
import { allComplaints, statusClass, priorityClass, deptData } from '../data/complaintsData';

const Dashboard = ({ role }) => {
  const total = allComplaints.length;
  const open = allComplaints.filter(c => c.status === 'Open').length;
  const inProgress = allComplaints.filter(c => c.status === 'In progress').length;
  const resolved = allComplaints.filter(c => c.status === 'Resolved').length;

  return (
    <>
      <div className="metric-grid">
        <div className="metric-card">
          <div className="metric-icon blue"><i className="ti ti-clipboard-list"></i></div>
          <div>
            <div className="metric-label">Total {role === 'admin' ? 'Grievances' : 'Complaints'}</div>
            <div className="metric-value">{total}</div>
            <div className="metric-delta up"><i className="ti ti-trending-up" style={{fontSize:'12px'}}></i> +12 this month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon red"><i className="ti ti-alert-circle"></i></div>
          <div>
            <div className="metric-label">Open</div>
            <div className="metric-value" style={{color:'var(--red)'}}>{open}</div>
            <div className="metric-delta down"><i className="ti ti-clock" style={{fontSize:'12px'}}></i> Needs attention</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon orange"><i className="ti ti-loader"></i></div>
          <div>
            <div className="metric-label">In Progress</div>
            <div className="metric-value" style={{color:'var(--orange)'}}>{inProgress}</div>
            <div className="metric-delta"><i className="ti ti-user" style={{fontSize:'12px'}}></i> Being resolved</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green"><i className="ti ti-circle-check"></i></div>
          <div>
            <div className="metric-label">Resolved</div>
            <div className="metric-value" style={{color:'var(--green)'}}>{resolved}</div>
            <div className="metric-delta up"><i className="ti ti-trending-up" style={{fontSize:'12px'}}></i> 87% SLA met</div>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'24px'}}>
        <div className="card" style={{marginBottom:0}}>
          <div className="card-header">
            <div>
              <div className="card-title">Resolution by Department</div>
              <div className="card-sub">Resolved vs total this month</div>
            </div>
          </div>
          <div>
            {deptData.map(d => {
              const pct = Math.round(d.resolved / d.total * 100);
              const color = pct >= 80 ? '#16A34A' : pct >= 60 ? '#D97706' : '#DC2626';
              return (
                <div key={d.name} style={{marginBottom:'12px'}}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'12.5px', marginBottom:'4px'}}>
                    <span>{d.name}</span>
                    <span>{d.resolved}/{d.total} ({pct}%)</span>
                  </div>
                  <div style={{height:'7px', background:'var(--gray-bg)', borderRadius:'4px', overflow:'hidden'}}>
                    <div style={{width:`${pct}%`, background:color, height:'100%', borderRadius:'4px', transition:'width 0.3s'}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{marginBottom:0}}>
          <div className="card-header">
            <div>
              <div className="card-title">Status Breakdown</div>
              <div className="card-sub">Current snapshot</div>
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'20px'}}>
            <svg viewBox="0 0 120 120" width="100" height="100" style={{flexShrink:0}}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="18"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#2563EB" strokeWidth="18"
                strokeDasharray={`${open/total*360} ${360 - open/total*360}`} strokeDashoffset="0" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#D97706" strokeWidth="18"
                strokeDasharray={`${inProgress/total*360} ${360 - inProgress/total*360}`} strokeDashoffset={`-${open/total*360}`} transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#16A34A" strokeWidth="18"
                strokeDasharray={`${resolved/total*360} ${360 - resolved/total*360}`} strokeDashoffset={`-${(open+inProgress)/total*360}`} transform="rotate(-90 60 60)"/>
              <text x="60" y="56" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0F172A">{total}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill="#64748B">total</text>
            </svg>
            <div style={{flex:1}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', fontSize:'12.5px'}}>
                <span style={{width:'10px', height:'10px', borderRadius:'50%', background:'#2563EB'}}></span>
                <span style={{color:'var(--text2)'}}>Open</span>
                <span style={{marginLeft:'auto', fontWeight:700}}>{open}</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', fontSize:'12.5px'}}>
                <span style={{width:'10px', height:'10px', borderRadius:'50%', background:'#D97706'}}></span>
                <span style={{color:'var(--text2)'}}>In Progress</span>
                <span style={{marginLeft:'auto', fontWeight:700}}>{inProgress}</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', fontSize:'12.5px'}}>
                <span style={{width:'10px', height:'10px', borderRadius:'50%', background:'#16A34A'}}></span>
                <span style={{color:'var(--text2)'}}>Resolved</span>
                <span style={{marginLeft:'auto', fontWeight:700}}>{resolved}</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'12.5px'}}>
                <span style={{width:'10px', height:'10px', borderRadius:'50%', background:'#64748B'}}></span>
                <span style={{color:'var(--text2)'}}>Closed</span>
                <span style={{marginLeft:'auto', fontWeight:700}}>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Recent {role === 'admin' ? 'Grievances' : 'Complaints'}</div>
            <div className="card-sub">Latest 5 complaints across all departments</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Title</th><th>Department</th><th>Priority</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {allComplaints.slice(0, 5).map(c => (
                <tr key={c.id}>
                  <td className="id-col">{c.id}</td>
                  <td className="title-col">{c.title}</td>
                  <td>{c.dept}</td>
                  <td><span className={`priority-tag ${priorityClass[c.priority]}`}>{c.priority}</span></td>
                  <td><span className={`badge ${statusClass[c.status]}`}>{c.status}</span></td>
                  <td style={{color:'var(--text3)', whiteSpace:'nowrap'}}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;