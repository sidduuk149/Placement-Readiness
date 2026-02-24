import { useState } from 'react'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'

interface ChecklistItem {
  id: string
  label: string
  checked: boolean
  proof: string
}

interface ProofFooterProps {
  items?: ChecklistItem[]
  onUpdate?: (items: ChecklistItem[]) => void
}

const defaultItems: ChecklistItem[] = [
  { id: 'ui', label: 'UI Built', checked: false, proof: '' },
  { id: 'logic', label: 'Logic Working', checked: false, proof: '' },
  { id: 'test', label: 'Test Passed', checked: false, proof: '' },
  { id: 'deploy', label: 'Deployed', checked: false, proof: '' },
]

export function ProofFooter({ items = defaultItems, onUpdate }: ProofFooterProps) {
  const [localItems, setLocalItems] = useState<ChecklistItem[]>(items)

  const handleCheckChange = (id: string, checked: boolean) => {
    const updated = localItems.map(item =>
      item.id === id ? { ...item, checked } : item
    )
    setLocalItems(updated)
    onUpdate?.(updated)
  }

  const handleProofChange = (id: string, proof: string) => {
    const updated = localItems.map(item =>
      item.id === id ? { ...item, proof } : item
    )
    setLocalItems(updated)
    onUpdate?.(updated)
  }

  return (
    <footer className="w-full border-t border-foreground/10 bg-background">
      <div className="px-10 py-6">
        <h3 className="font-serif text-lg text-foreground mb-4">
          Proof Checklist
        </h3>
        <div className="grid grid-cols-4 gap-6">
          {localItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-3">
              <Checkbox
                id={item.id}
                label={item.label}
                checked={item.checked}
                onChange={(checked) => handleCheckChange(item.id, checked)}
              />
              <Input
                placeholder="Add proof..."
                value={item.proof}
                onChange={(e) => handleProofChange(item.id, e.target.value)}
                disabled={!item.checked}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
