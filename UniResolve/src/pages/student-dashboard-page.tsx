import { Clock, FilePlus2, History, MessageSquare, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PriorityBadge, StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import type { Complaint } from '@/types/domain'

export function StudentDashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  useEffect(() => {
    void api.getComplaints().then(setComplaints)
  }, [])

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Student Dashboard</h2>
          <p className="text-muted-foreground">Track complaints, AI decisions, and department action.</p>
        </div>
        <Button asChild><Link to="/student/submit"><FilePlus2 className="size-4" />Submit complaint</Link></Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Total complaints" value={complaints.length} icon={History} />
        <Metric title="Open complaints" value={complaints.filter((item) => item.status !== 'Resolved' && item.status !== 'Closed').length} icon={Clock} />
        <Metric title="Feedback pending" value={complaints.filter((item) => item.status === 'Resolved').length} icon={MessageSquare} />
      </div>
      <Card>
        <CardHeader><CardTitle>Complaint History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Category</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Department</TableHead></TableRow></TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell><Link className="font-semibold text-primary" to={`/student/complaints/${complaint.id}`}>{complaint.title}</Link></TableCell>
                  <TableCell>{complaint.category}</TableCell>
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
