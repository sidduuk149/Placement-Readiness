interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-foreground/60">Step</span>
      <span className="font-medium text-foreground">{current}</span>
      <span className="text-foreground/40">/</span>
      <span className="text-foreground/60">{total}</span>
    </div>
  )
}
