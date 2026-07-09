import { BarChart3, Bell, ClipboardList, FilePlus2, LayoutDashboard, LogOut, MessageSquare, UserRound } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/use-auth'
import { cn } from '@/lib/utils'

const studentLinks = [
  { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/submit', label: 'Submit Complaint', icon: FilePlus2 },
  { to: '/student/notifications', label: 'Notifications', icon: Bell },
  { to: '/student/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/student/profile', label: 'Profile', icon: UserRound },
]

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/complaints', label: 'Complaint Queue', icon: ClipboardList },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/profile', label: 'Profile', icon: UserRound },
]

export function DashboardShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth()
  const links = user?.role === 'admin' ? adminLinks : studentLinks

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-6 p-4">
          <Link to={user?.role === 'admin' ? '/admin' : '/student'} className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">UR</div>
            <div>
              <p className="font-bold text-slate-950">UniResolve</p>
              <p className="text-xs text-muted-foreground">AI grievance desk</p>
            </div>
          </Link>
          <nav className="grid gap-1">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/student' || item.to === '/admin'}
                className={({ isActive }) =>
                  cn('flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary', isActive && 'bg-accent text-primary')
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-md border bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-950">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            <Button className="mt-3 w-full" variant="outline" size="sm" onClick={logout}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </aside>
      <section className="min-w-0">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-sm font-semibold text-primary">{user?.role === 'admin' ? 'Administration' : 'Student portal'}</p>
            <h1 className="text-xl font-bold text-slate-950">University Complaint Management</h1>
          </div>
          <div className="hidden rounded-md border px-3 py-2 text-sm text-muted-foreground sm:block">AI classification active</div>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </section>
    </div>
  )
}
