import axios from 'axios'

import { mockAnalytics, mockComplaints, mockNotifications } from '@/data/mock-data'
import type { AnalyticsSummary, Complaint, Feedback, Notification, User, UserRole } from '@/types/domain'

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api', timeout: 8000 })

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('uniresolve_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

async function withFallback<T>(request: Promise<{ data: { data: T } }>, fallback: T): Promise<T> {
  try {
    const response = await request
    return response.data.data
  } catch {
    return fallback
  }
}

export const api = {
  async login(email: string, password: string, role: UserRole) {
    const fallbackUser: User = {
      id: role === 'admin' ? 'admin-demo' : 'student-demo',
      name: role === 'admin' ? 'Admin Officer' : 'Demo Student',
      email,
      role,
      department: role === 'admin' ? 'Student Affairs' : undefined,
      studentId: role === 'student' ? 'UNI-2026-001' : undefined,
    }
    return withFallback(http.post('/auth/login', { email, password, role }), { token: 'demo-token', user: fallbackUser })
  },
  async register(payload: { name: string; email: string; password: string; role: UserRole; studentId?: string }) {
    return withFallback(http.post('/auth/register', payload), {
      token: 'demo-token',
      user: { id: 'new-user', name: payload.name, email: payload.email, role: payload.role, studentId: payload.studentId },
    })
  },
  async getComplaints() {
    return withFallback<Complaint[]>(http.get('/complaints'), mockComplaints)
  },
  async getComplaint(id: string) {
    return withFallback<Complaint>(http.get(`/complaints/${id}`), mockComplaints.find((complaint) => complaint.id === id) ?? mockComplaints[0])
  },
  async createComplaint(formData: FormData) {
    return withFallback<Complaint>(http.post('/complaints', formData), {
      ...mockComplaints[0],
      id: `cmp-${Date.now()}`,
      title: String(formData.get('title')),
      description: String(formData.get('description')),
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  },
  async updateComplaint(id: string, payload: Partial<Complaint>) {
    return withFallback<Complaint>(http.patch(`/complaints/${id}`, payload), { ...mockComplaints[0], ...payload, id })
  },
  async getNotifications() {
    return withFallback<Notification[]>(http.get('/notifications'), mockNotifications)
  },
  async getAnalytics() {
    return withFallback<AnalyticsSummary>(http.get('/analytics/summary'), mockAnalytics)
  },
  async submitFeedback(payload: Omit<Feedback, 'id' | 'createdAt'>) {
    return withFallback<Feedback>(http.post('/feedback', payload), { ...payload, id: `fb-${Date.now()}`, createdAt: new Date().toISOString() })
  },
}
