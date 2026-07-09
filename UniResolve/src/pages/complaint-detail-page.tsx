import { CalendarClock, UserCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PriorityBadge, StatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api } from '@/lib/api'
import type { Complaint } from '@/types/domain'

export function ComplaintDetailPage() {
  const { id = '' } = useParams()
  const [complaint, setComplaint] = useState<Complaint | null>(null)

  useEffect(() => {
    void api.getComplaint(id).then(setComplaint)
  }, [id])

  if (!complaint) return <div className="rounded-md border bg-white p-6">Loading complaint details...</div>

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle>{complaint.title}</CardTitle><p className="mt-2 text-sm text-muted-foreground">Raised by {complaint.studentName}</p></div><StatusBadge value={complaint.status} /></div></CardHeader>
        <CardContent className="grid gap-5">
          <p className="leading-7 text-slate-700">{complaint.description}</p>
          <div className="grid gap-3 sm:grid-cols-3"><Info label="AI Category" value={complaint.category} /><div className="rounded-md border p-3"><p className="text-xs text-muted-foreground">AI Priority</p><div className="mt-1"><PriorityBadge value={complaint.priority} /></div></div><Info label="Department" value={complaint.department} /></div>
          {complaint.imageUrl && <img className="max-h-96 rounded-md border object-cover" src={complaint.imageUrl} alt={complaint.title} />}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Tracking Timeline</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-3 rounded-md bg-accent p-3 text-primary"><UserCheck className="size-5" /><span className="text-sm font-semibold">Assigned staff: {complaint.assignedStaff ?? 'Awaiting assignment'}</span></div>
          {complaint.timeline.map((event) => (
            <div key={`${event.label}-${event.at}`} className="border-l-2 border-primary/30 pl-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950"><CalendarClock className="size-4 text-primary" />{event.label}</div>
              <p className="mt-1 text-sm text-muted-foreground">{new Date(event.at).toLocaleString()}</p>
              <p className="mt-1 text-sm text-slate-700">{event.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold text-slate-950">{value}</p></div>
}
