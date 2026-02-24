import { clsx } from 'clsx'

type Status = 'not-started' | 'in-progress' | 'shipped'

interface StatusBadgeProps {
  status: Status
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  'not-started': {
    label: 'Not Started',
    className: 'bg-foreground/10 text-foreground/60',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-warning/10 text-warning border border-warning/30',
  },
  'shipped': {
    label: 'Shipped',
    className: 'bg-success/10 text-success border border-success/30',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 text-sm font-medium rounded-sm',
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
