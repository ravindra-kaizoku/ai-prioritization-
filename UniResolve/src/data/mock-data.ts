import type { AnalyticsSummary, Complaint, Notification } from '@/types/domain'

export const mockComplaints: Complaint[] = [
  {
    id: 'cmp-1001',
    title: 'Hostel water leakage near electrical board',
    description: 'Water is leaking from the second-floor washroom ceiling and dripping close to an electrical panel.',
    category: 'Hostel',
    priority: 'Critical',
    status: 'Assigned',
    department: 'Hostel Administration',
    assignedStaff: 'R. Mehta',
    studentName: 'Anika Sharma',
    createdAt: '2026-07-07T09:30:00.000Z',
    updatedAt: '2026-07-08T11:00:00.000Z',
    timeline: [
      { label: 'Submitted', at: '2026-07-07T09:30:00.000Z', note: 'Complaint received from student portal.' },
      { label: 'AI Classified', at: '2026-07-07T09:31:00.000Z', note: 'Category Hostel, priority Critical.' },
      { label: 'Assigned', at: '2026-07-08T11:00:00.000Z', note: 'Assigned to maintenance team.' },
    ],
  },
  {
    id: 'cmp-1002',
    title: 'Exam portal not showing admit card',
    description: 'My admit card is not visible although my fees and exam form are submitted.',
    category: 'Examination',
    priority: 'High',
    status: 'In Progress',
    department: 'Examination Cell',
    assignedStaff: 'P. Nair',
    studentName: 'Kabir Rao',
    createdAt: '2026-07-06T14:10:00.000Z',
    updatedAt: '2026-07-08T10:20:00.000Z',
    timeline: [
      { label: 'Submitted', at: '2026-07-06T14:10:00.000Z', note: 'Complaint received from student portal.' },
      { label: 'In Progress', at: '2026-07-08T10:20:00.000Z', note: 'Exam cell is verifying form status.' },
    ],
  },
  {
    id: 'cmp-1003',
    title: 'Library book renewal failed',
    description: 'The online library system shows an error when I try to renew issued books.',
    category: 'Library',
    priority: 'Medium',
    status: 'Under Review',
    department: 'Central Library',
    studentName: 'Mira Das',
    createdAt: '2026-07-05T08:45:00.000Z',
    updatedAt: '2026-07-05T08:45:00.000Z',
    timeline: [{ label: 'Submitted', at: '2026-07-05T08:45:00.000Z', note: 'Complaint received from student portal.' }],
  },
]

export const mockNotifications: Notification[] = [
  { id: 'not-1', title: 'Complaint assigned', body: 'Hostel water leakage has been assigned to Hostel Administration.', read: false, createdAt: '2026-07-08T11:00:00.000Z' },
  { id: 'not-2', title: 'Status updated', body: 'Exam portal complaint moved to In Progress.', read: true, createdAt: '2026-07-08T10:20:00.000Z' },
]

export const mockAnalytics: AnalyticsSummary = {
  total: 42,
  open: 29,
  resolved: 13,
  critical: 5,
  byCategory: [
    { name: 'Hostel', value: 8 },
    { name: 'Academics', value: 5 },
    { name: 'Examination', value: 7 },
    { name: 'IT Support', value: 6 },
    { name: 'Maintenance', value: 9 },
    { name: 'Library', value: 4 },
  ],
  byPriority: [
    { name: 'Critical', value: 5 },
    { name: 'High', value: 11 },
    { name: 'Medium', value: 18 },
    { name: 'Low', value: 8 },
  ],
  trend: [
    { month: 'Feb', complaints: 18, resolved: 12 },
    { month: 'Mar', complaints: 24, resolved: 15 },
    { month: 'Apr', complaints: 28, resolved: 19 },
    { month: 'May', complaints: 35, resolved: 23 },
    { month: 'Jun', complaints: 31, resolved: 20 },
    { month: 'Jul', complaints: 42, resolved: 13 },
  ],
}
