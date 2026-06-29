import React, { useState } from 'react';
import { allComplaints } from '../data/complaintsData';

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    dept: '',
    priority: '',
    desc: '',
    location: '',
    date: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace('c-', '');
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors['c-title'] = 'Please enter a complaint title.';
    if (!formData.dept) newErrors['c-dept'] = 'Please select a department.';
    if (!formData.priority) newErrors['c-priority'] = 'Please select a priority.';
    if (!formData.desc) newErrors['c-desc'] = 'Please provide a description.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitComplaint = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newComplaint = {
      id: `#${1043 + allComplaints.length}`,
      title: formData.title,
      dept: formData.dept,
      priority: formData.priority,
      status: 'Open',
      assignee: 'Unassigned',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      desc: formData.desc,
    };
    allComplaints.unshift(newComplaint);
    setComplaintId(newComplaint.id);
    setSuccess(true);
    setFormData({ title: '', dept: '', priority: '', desc: '', location: '', date: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div style={{maxWidth:'660px'}}>
      {success && (
        <div className="alert alert-success" style={{display:'flex'}}>
          <i className="ti ti-circle-check"></i>
          <div>Complaint {complaintId} submitted! It will be reviewed within 24 hours.</div>
        </div>
      )}

      <div className="card">
        <div className="card-header" style={{marginBottom:'8px'}}>
          <div>
            <div className="card-title">New Complaint</div>
            <div className="card-sub">Fill in the details below. Fields marked <span style={{color:'var(--red)'}}>*</span> are required.</div>
          </div>
        </div>

        <form onSubmit={submitComplaint}>
          <div className="form-group">
            <label className="form-label">Complaint Title <span className="req">*</span></label>
            <input type="text" id="c-title" placeholder="Brief summary of the issue" value={formData.title} onChange={handleChange} />
            {errors['c-title'] && <div className="form-error" style={{display:'block'}}>{errors['c-title']}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department <span className="req">*</span></label>
              <select id="c-dept" value={formData.dept} onChange={handleChange}>
                <option value="">Select department</option>
                <option>IT</option><option>Finance</option><option>Facilities</option><option>Admin</option><option>HR</option><option>Security</option>
              </select>
              {errors['c-dept'] && <div className="form-error" style={{display:'block'}}>{errors['c-dept']}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Priority <span className="req">*</span></label>
              <select id="c-priority" value={formData.priority} onChange={handleChange}>
                <option value="">Select priority</option>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
              {errors['c-priority'] && <div className="form-error" style={{display:'block'}}>{errors['c-priority']}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description <span className="req">*</span></label>
            <textarea id="c-desc" rows="5" placeholder="Describe the issue in detail…" value={formData.desc} onChange={handleChange}></textarea>
            {errors['c-desc'] && <div className="form-error" style={{display:'block'}}>{errors['c-desc']}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location / Floor</label>
              <input type="text" id="c-loc" placeholder="e.g. 3rd floor, Block B" value={formData.location} onChange={handleChange} />
              <div className="form-hint">Optional — helps faster resolution.</div>
            </div>
            <div className="form-group">
              <label className="form-label">Date of Incident</label>
              <input type="date" id="c-date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <div style={{display:'flex', gap:'10px', marginTop:'6px'}}>
            <button type="submit" className="btn btn-primary">
              <i className="ti ti-send"></i> Submit Complaint
            </button>
            <button type="button" className="btn" onClick={() => setFormData({ title: '', dept: '', priority: '', desc: '', location: '', date: '' })}>
              <i className="ti ti-rotate"></i> Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;