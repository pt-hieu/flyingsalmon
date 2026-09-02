import { cn } from '@/lib/utils'

export function ModePreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-border bg-border grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2">
      <ModePanel mode="light">{children}</ModePanel>
      <ModePanel mode="dark">{children}</ModePanel>
    </div>
  )
}

function ModePanel({
  mode,
  children,
}: {
  mode: 'light' | 'dark'
  children: React.ReactNode
}) {
  return (
    <div className={cn(mode, 'bg-background flex flex-col')}>
      <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs font-medium">
        {mode === 'light' ? 'Light' : 'Dark'}
      </div>
      <div className="text-foreground relative flex flex-1 flex-wrap items-center justify-center gap-8 p-10">
        {children}
      </div>
    </div>
  )
}
