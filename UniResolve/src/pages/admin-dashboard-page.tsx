import { AlertTriangle, CheckCircle2, ClipboardList, TimerReset, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PriorityBadge, StatusBadge } from '@/components/status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import type { AnalyticsSummary, Complaint } from '@/types/domain'

export function AdminDashboardPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    void api.getAnalytics().then(setSummary)
    void api.getComplaints().then(setComplaints)
  }, [])

  return (
    <div className="grid gap-6">
      <div><h2 className="text-2xl font-bold text-slate-950">Admin Dashboard</h2><p className="text-muted-foreground">Review AI triage, assign teams, and monitor service performance.</p></div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Total" value={summary?.total ?? 0} icon={ClipboardList} />
        <Metric title="Open" value={summary?.open ?? 0} icon={TimerReset} />
        <Metric title="Resolved" value={summary?.resolved ?? 0} icon={CheckCircle2} />
        <Metric title="Critical" value={summary?.critical ?? 0} icon={AlertTriangle} />
      </div>
      <Card>
        <CardHeader><CardTitle>Priority Queue</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Complaint</TableHead><TableHead>Student</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Department</TableHead></TableRow></TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell><Link className="font-semibold text-primary" to={`/admin/complaints/${complaint.id}`}>{complaint.title}</Link></TableCell>
                  <TableCell>{complaint.studentName}</TableCell>
                  <TableCell><PriorityBadge value={complaint.priority} /></TableCell>
                  <TableCell><StatusBadge value={complaint.status} /></TableCell>
                  <TableCell>{complaint.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ title, value, icon: Icon }: { title: string; value: number; icon: LucideIcon }) {
  return <Card><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-muted-foreground">{title}</p><p className="text-3xl font-bold text-slate-950">{value}</p></div><div className="rounded-md bg-accent p-3 text-primary"><Icon className="size-5" /></div></CardContent></Card>
}
