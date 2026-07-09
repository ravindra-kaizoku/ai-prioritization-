import { Badge } from '@/components/ui/badge'
import type { ComplaintPriority, ComplaintStatus } from '@/types/domain'

export function PriorityBadge({ value }: { value: ComplaintPriority }) {
  const variant = value === 'Critical' || value === 'High' ? 'destructive' : value === 'Medium' ? 'secondary' : 'outline'
  return <Badge variant={variant}>{value}</Badge>
}

export function StatusBadge({ value }: { value: ComplaintStatus }) {
  return <Badge variant={value === 'Resolved' || value === 'Closed' ? 'success' : 'outline'}>{value}</Badge>
}
