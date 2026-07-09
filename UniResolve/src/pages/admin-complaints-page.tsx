import { useEffect, useState } from 'react'

import { PriorityBadge, StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import type { Complaint, ComplaintStatus } from '@/types/domain'

const statuses: ComplaintStatus[] = ['Under Review', 'Assigned', 'In Progress', 'Resolved', 'Closed']

export function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    void api.getComplaints().then(setComplaints)
  }, [])

  async function updateStatus(complaint: Complaint, status: ComplaintStatus) {
    const updated = await api.updateComplaint(complaint.id, { status })
    setComplaints((items) => items.map((item) => (item.id === complaint.id ? updated : item)))
  }

  const filtered = complaints.filter((item) => `${item.title} ${item.category} ${item.department}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Complaint Management</CardTitle>
        <Input className="sm:max-w-xs" placeholder="Search complaints" value={query} onChange={(event) => setQuery(event.target.value)} />
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>AI Category</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Department</TableHead><TableHead>Update</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="min-w-64 font-semibold">{complaint.title}</TableCell>
                <TableCell>{complaint.category}</TableCell>
                <TableCell><PriorityBadge value={complaint.priority} /></TableCell>
                <TableCell><StatusBadge value={complaint.status} /></TableCell>
                <TableCell>{complaint.department}</TableCell>
                <TableCell><div className="flex flex-wrap gap-2">{statuses.map((status) => <Button key={status} variant="outline" size="sm" onClick={() => void updateStatus(complaint, status)}>{status}</Button>)}</div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
