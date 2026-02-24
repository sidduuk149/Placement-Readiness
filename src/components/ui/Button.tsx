import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-base focus-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-accent text-white hover:bg-accent/90 border border-accent': variant === 'primary',
          'bg-transparent text-foreground border border-foreground/20 hover:bg-foreground/5': variant === 'secondary',
        },
        {
          'px-3 py-1.5 text-sm rounded-sm': size === 'sm',
          'px-4 py-2 text-base rounded-sm': size === 'md',
          'px-6 py-3 text-lg rounded-sm': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
