import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center', className)}>
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {description ? <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  )
}
