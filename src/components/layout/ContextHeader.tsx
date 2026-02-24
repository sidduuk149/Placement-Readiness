interface ContextHeaderProps {
  title: string
  subtitle: string
}

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <div className="w-full px-10 py-10 border-b border-foreground/10">
      <div className="max-w-text">
        <h1 className="font-serif text-4xl text-foreground mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-lg text-foreground/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
