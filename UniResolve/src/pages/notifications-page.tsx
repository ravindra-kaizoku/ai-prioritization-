import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { Notification } from '@/types/domain'

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    void api.getNotifications().then(setNotifications)
  }, [])

  return (
    <Card className="max-w-3xl">
      <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
      <CardContent className="grid gap-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-3 rounded-md border p-4">
            <div className="rounded-md bg-accent p-2 text-primary"><Bell className="size-5" /></div>
            <div><p className="font-semibold text-slate-950">{notification.title}</p><p className="text-sm text-slate-700">{notification.body}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p></div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
