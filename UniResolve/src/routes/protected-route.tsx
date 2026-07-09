import { Navigate, Outlet } from 'react-router-dom'

import { DashboardShell } from '@/components/dashboard-shell'
import { useAuth } from '@/features/auth/use-auth'
import type { UserRole } from '@/types/domain'

export function ProtectedRoute({ roles }: { roles: UserRole[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  )
}
