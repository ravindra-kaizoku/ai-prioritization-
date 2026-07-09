import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type LoadingSpinnerProps = {
  label?: string
  className?: string
}

export function LoadingSpinner({ label = 'Loading', className }: LoadingSpinnerProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 text-sm font-medium text-muted-foreground', className)}>
      <Loader2 className="size-4 animate-spin text-primary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
