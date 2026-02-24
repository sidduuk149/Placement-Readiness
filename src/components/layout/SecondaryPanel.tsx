
import { Button } from '../ui/Button'
import { Copy, CheckCircle, XCircle, ImagePlus } from 'lucide-react'

interface SecondaryPanelProps {
  stepExplanation: string
  promptText: string
  onCopy?: () => void
  onBuildInLovable?: () => void
  onItWorked?: () => void
  onError?: () => void
  onAddScreenshot?: () => void
}

export function SecondaryPanel({
  stepExplanation,
  promptText,
  onCopy,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}: SecondaryPanelProps) {
  return (
    <aside className="w-[30%] min-w-[320px] border-l border-foreground/10 bg-background">
      <div className="h-full p-6 flex flex-col gap-6">
        <div>
          <h3 className="font-serif text-xl text-foreground mb-3">
            Step Explanation
          </h3>
          <p className="text-base text-foreground/70 leading-relaxed">
            {stepExplanation}
          </p>
        </div>

        <div className="flex-1">
          <h3 className="font-serif text-xl text-foreground mb-3">
            Prompt
          </h3>
          <div className="relative">
            <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-sm font-mono text-sm text-foreground/80 whitespace-pre-wrap min-h-[120px]">
              {promptText}
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onCopy}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={onBuildInLovable}>
            Build in Lovable
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={onItWorked}>
              <CheckCircle className="w-4 h-4 mr-1" />
              It Worked
            </Button>
            <Button variant="secondary" size="sm" onClick={onError}>
              <XCircle className="w-4 h-4 mr-1" />
              Error
            </Button>
          </div>
          <Button variant="secondary" size="sm" onClick={onAddScreenshot}>
            <ImagePlus className="w-4 h-4 mr-1" />
            Add Screenshot
          </Button>
        </div>
      </div>
    </aside>
  )
}
