import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ErrorStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again. If the issue continues, contact support.',
  actionLabel,
  onAction,
  children,
  className,
}: ErrorStateProps) {
  return (
    <section className={cn('rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center', className)}>
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-5" variant="destructive" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  )
}
