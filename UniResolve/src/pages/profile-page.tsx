import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/features/auth/use-auth'

export function ProfilePage() {
  const { user } = useAuth()
  return (
    <Card className="max-w-2xl">
      <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
      <CardContent className="grid gap-4">
        <label className="grid gap-2 text-sm font-semibold">Name<Input value={user?.name ?? ''} readOnly /></label>
        <label className="grid gap-2 text-sm font-semibold">Email<Input value={user?.email ?? ''} readOnly /></label>
        <label className="grid gap-2 text-sm font-semibold">Role<Input value={user?.role ?? ''} readOnly /></label>
        {user?.studentId && <label className="grid gap-2 text-sm font-semibold">Student ID<Input value={user.studentId} readOnly /></label>}
        {user?.department && <label className="grid gap-2 text-sm font-semibold">Department<Input value={user.department} readOnly /></label>}
      </CardContent>
    </Card>
  )
}
