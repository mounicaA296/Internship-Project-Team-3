export const allComplaints = [
  {
    id: '#1042',
    title: 'AC not working — 3rd floor',
    dept: 'Facilities',
    priority: 'High',
    status: 'Open',
    assignee: 'Ramesh T.',
    date: '20 Jun 2026',
    desc: 'The central AC unit on the 3rd floor has been malfunctioning since Monday.'
  },
  {
    id: '#1041',
    title: 'Payroll discrepancy — May',
    dept: 'Finance',
    priority: 'High',
    status: 'In progress',
    assignee: 'Priya Nair',
    date: '19 Jun 2026',
    desc: 'May salary credited was ₹4,200 less than contracted amount.'
  },
  {
    id: '#1040',
    title: 'Laptop keyboard broken',
    dept: 'IT',
    priority: 'Medium',
    status: 'In progress',
    assignee: 'Suresh M.',
    date: '18 Jun 2026',
    desc: 'Keys N, M and spacebar are unresponsive.'
  },
  {
    id: '#1039',
    title: 'Cafeteria hygiene concern',
    dept: 'Admin',
    priority: 'Medium',
    status: 'Resolved',
    assignee: 'Deepa R.',
    date: '17 Jun 2026',
    desc: 'Insects spotted near the food counter on 14 Jun.'
  },
  {
    id: '#1038',
    title: 'Parking access denied',
    dept: 'Security',
    priority: 'Low',
    status: 'Closed',
    assignee: 'Kiran B.',
    date: '15 Jun 2026',
    desc: 'Gate pass not working since 12 Jun.'
  }
];

export const statusClass = {
  'Open': 'badge-open',
  'In progress': 'badge-progress',
  'Resolved': 'badge-resolved',
  'Closed': 'badge-closed'
};

export const priorityClass = {
  'High': 'pri-high',
  'Medium': 'pri-med',
  'Low': 'pri-low'
};

export const deptData = [
  { name: 'IT', resolved: 12, total: 15 },
  { name: 'Finance', resolved: 8, total: 11 },
  { name: 'Facilities', resolved: 9, total: 14 },
  { name: 'Admin', resolved: 7, total: 8 },
  { name: 'Security', resolved: 5, total: 6 },
];