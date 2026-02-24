import { ReactNode } from 'react'

interface PrimaryWorkspaceProps {
  children: ReactNode
}

export function PrimaryWorkspace({ children }: PrimaryWorkspaceProps) {
  return (
    <main className="flex-1 min-h-0">
      <div className="h-full p-10">
        {children}
      </div>
    </main>
  )
}
