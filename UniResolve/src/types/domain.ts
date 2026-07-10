export type UserRole = 'student' | 'admin' | 'staff'
export type ComplaintCategory = 'Hostel' | 'Academics' | 'Examination' | 'IT Support' | 'Library' | 'Transport' | 'Maintenance' | 'Mess & Cafeteria' | 'Security' | 'Medical'
export type ComplaintPriority = 'Critical' | 'High' | 'Medium' | 'Low'
export type ComplaintStatus = 'Submitted' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  studentId?: string
  phone?: string
}

export interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  priority: ComplaintPriority
  status: ComplaintStatus
  department: string
  assignedStaff?: string
  imageUrl?: string
  studentName: string
  createdAt: string
  updatedAt: string
  timeline: Array<{ label: string; at: string; note: string }>
}

export interface Notification {
  id: string
  title: string
  body: string
  read: boolean
  createdAt: string
}

export interface Feedback {
  id: string
  complaintId: string
  rating: number
  comment: string
  createdAt: string
}

export interface AnalyticsSummary {
  total: number
  open: number
  resolved: number
  critical: number
  byCategory: Array<{ name: string; value: number }>
  byPriority: Array<{ name: ComplaintPriority; value: number }>
  trend: Array<{ month: string; complaints: number; resolved: number }>
}
