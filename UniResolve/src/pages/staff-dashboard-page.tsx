import { ClipboardCheck, Play, CheckCircle2, ClipboardList, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { PriorityBadge, StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import type { Complaint } from '@/types/domain'

export function StaffDashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    void api.getComplaints().then(setComplaints)
  }, [])

  async function updateStatus(id: string, status: 'In Progress' | 'Resolved', noteText: string) {
    const updated = await api.updateComplaint(id, { 
      status,
      // Pass a custom note if typed, otherwise provide a default one
      timeline: [{ label: status, note: noteText || `Complaint marked as ${status} by assigned staff.` }]
    } as any)
    setComplaints((items) => items.map((item) => (item.id === id ? updated : item)))
    // Clear note input
    setNotes(prev => ({ ...prev, [id]: '' }))
  }

  const assignedCount = complaints.length
  const inProgressCount = complaints.filter(item => item.status === 'In Progress').length
  const resolvedCount = complaints.filter(item => item.status === 'Resolved').length

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-950">Staff Dashboard</h2>
        <p className="text-muted-foreground">Manage tasks assigned to you, update work logs, and mark resolutions.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric title="Assigned Tasks" value={assignedCount} icon={ClipboardList} />
        <Metric title="In Progress" value={inProgressCount} icon={Clock} />
        <Metric title="Resolved" value={resolvedCount} icon={ClipboardCheck} />
      </div>

      <Card>
        <CardHeader><CardTitle>Assigned Grievance Tasks</CardTitle></CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <div className="text-center p-6 text-muted-foreground">No tasks currently assigned to you. Good job!</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action Log Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>
                      <Link className="font-semibold text-primary" to={`/staff/complaints/${complaint.id}`}>
                        {complaint.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">From: {complaint.studentName}</p>
                    </TableCell>
                    <TableCell>{complaint.category}</TableCell>
                    <TableCell><PriorityBadge value={complaint.priority} /></TableCell>
                    <TableCell><StatusBadge value={complaint.status} /></TableCell>
                    <TableCell>
                      <Input
                        className="h-8 max-w-xs text-xs"
                        placeholder="Add a log/timeline note..."
                        value={notes[complaint.id] ?? ''}
                        onChange={(e) => setNotes(prev => ({ ...prev, [complaint.id]: e.target.value }))}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {complaint.status !== 'In Progress' && complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-xs"
                            onClick={() => void updateStatus(complaint.id, 'In Progress', notes[complaint.id] ?? '')}
                          >
                            <Play className="size-3" /> Start
                          </Button>
                        )}
                        {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
                          <Button
                            size="sm"
                            className="h-8 gap-1 text-xs"
                            onClick={() => void updateStatus(complaint.id, 'Resolved', notes[complaint.id] ?? '')}
                          >
                            <CheckCircle2 className="size-3" /> Resolve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ title, value, icon: Icon }: { title: string; value: number; icon: any }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-slate-950">{value}</p>
        </div>
        <div className="rounded-md bg-accent p-3 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}
