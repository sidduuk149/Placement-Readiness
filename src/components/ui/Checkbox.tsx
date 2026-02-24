import { clsx } from 'clsx'
import { Check } from 'lucide-react'

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ id, label, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex items-center gap-3 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <div
        className={clsx(
          'w-5 h-5 border rounded-sm flex items-center justify-center transition-base',
          checked
            ? 'bg-accent border-accent'
            : 'bg-background border-foreground/30 hover:border-foreground/50'
        )}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      <span className="text-base text-foreground">{label}</span>
    </label>
  )
}
