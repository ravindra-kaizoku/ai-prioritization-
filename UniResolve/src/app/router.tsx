import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/layouts/app-layout'
import { AdminAnalyticsPage } from '@/pages/admin-analytics-page'
import { AdminComplaintsPage } from '@/pages/admin-complaints-page'
import { AdminDashboardPage } from '@/pages/admin-dashboard-page'
import { AuthPage } from '@/pages/auth-page'
import { ComplaintDetailPage } from '@/pages/complaint-detail-page'
import { FeedbackPage } from '@/pages/feedback-page'
import { NotificationsPage } from '@/pages/notifications-page'
import { ProfilePage } from '@/pages/profile-page'
import { StaffDashboardPage } from '@/pages/staff-dashboard-page'
import { StudentDashboardPage } from '@/pages/student-dashboard-page'
import { SubmitComplaintPage } from '@/pages/submit-complaint-page'
import { ProtectedRoute } from '@/routes/protected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <AuthPage /> },
      { path: 'login', element: <AuthPage /> },
      { path: 'register', element: <AuthPage mode="register" /> },
      {
        path: 'student',
        element: <ProtectedRoute roles={['student']} />,
        children: [
          { index: true, element: <StudentDashboardPage /> },
          { path: 'submit', element: <SubmitComplaintPage /> },
          { path: 'complaints/:id', element: <ComplaintDetailPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'feedback', element: <FeedbackPage /> },
        ],
      },
      {
        path: 'admin',
        element: <ProtectedRoute roles={['admin']} />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'complaints', element: <AdminComplaintsPage /> },
          { path: 'complaints/:id', element: <ComplaintDetailPage /> },
          { path: 'analytics', element: <AdminAnalyticsPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'feedback', element: <FeedbackPage /> },
        ],
      },
      {
        path: 'staff',
        element: <ProtectedRoute roles={['staff']} />,
        children: [
          { index: true, element: <StaffDashboardPage /> },
          { path: 'dashboard', element: <StaffDashboardPage /> },
          { path: 'complaints/:id', element: <ComplaintDetailPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
])
