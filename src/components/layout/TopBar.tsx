import { StatusBadge } from '../ui/StatusBadge'
import { ProgressIndicator } from '../ui/ProgressIndicator'

interface TopBarProps {
  projectName: string
  currentStep: number
  totalSteps: number
  status: 'not-started' | 'in-progress' | 'shipped'
}

export function TopBar({ projectName, currentStep, totalSteps, status }: TopBarProps) {
  return (
    <header className="w-full border-b border-foreground/10 bg-background">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-medium text-foreground">
            {projectName}
          </span>
        </div>
        
        <div className="flex items-center">
          <ProgressIndicator current={currentStep} total={totalSteps} />
        </div>
        
        <div className="flex items-center">
          <StatusBadge status={status} />
        </div>
      </div>
    </header>
  )
}
