import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full px-3 py-2 bg-background border border-foreground/20 rounded-sm',
          'text-foreground placeholder:text-foreground/40',
          'transition-base focus-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-foreground/5',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
