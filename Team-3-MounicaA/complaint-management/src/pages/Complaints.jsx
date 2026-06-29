import React, { useState } from 'react';
import { allComplaints, statusClass, priorityClass } from '../data/complaintsData';

const Complaints = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const filtered = allComplaints.filter(c => {
    const matchSearch = !searchTerm || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = !filterStatus || c.status === filterStatus;
    const matchDept = !filterDept || c.dept === filterDept;
    const matchPriority = !filterPriority || c.priority === filterPriority;
    return matchSearch && matchStatus && matchDept && matchPriority;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('');
    setFilterDept('');
    setFilterPriority('');
  };

  return (
    <>
      <div className="filter-bar">
        <div className="search-wrap">
          <i className="ti ti-search"></i>
          <input 
            type="text" 
            placeholder="Search by title, department, ID…" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option>Open</option><option>In progress</option><option>Resolved</option><option>Closed</option>
        </select>
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          <option>IT</option><option>Finance</option><option>Facilities</option><option>Admin</option><option>Security</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <button className="btn btn-sm" onClick={resetFilters}><i className="ti ti-filter-off"></i> Clear</button>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>ID</th><th>Title</th><th>Department</th><th>Priority</th><th>Status</th><th>Assignee</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td className="id-col">{c.id}</td>
                  <td className="title-col">{c.title}</td>
                  <td>{c.dept}</td>
                  <td><span className={`priority-tag ${priorityClass[c.priority]}`}>{c.priority}</span></td>
                  <td><span className={`badge ${statusClass[c.status]}`}>{c.status}</span></td>
                  <td style={{color:'var(--text3)'}}>{c.assignee}</td>
                  <td style={{color:'var(--text3)', whiteSpace:'nowrap'}}>{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <i className="ti ti-mood-empty"></i>
            <p>No complaints match your filters.</p>
          </div>
        )}
      </div>
      <div style={{fontSize:'12px', color:'var(--text3)'}}>
        Showing {filtered.length} of {allComplaints.length} complaints
      </div>
    </>
  );
};

export default Complaints;