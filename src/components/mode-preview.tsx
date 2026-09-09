import { PreviewSurface } from '@/components/preview'
import { cn } from '@/lib/utils'

export function ModePreview({
  stacked = false,
  children,
}: {
  stacked?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'border-border bg-border grid gap-px overflow-hidden rounded-lg border',
        !stacked && 'sm:grid-cols-2',
      )}
    >
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
    <div className={cn(mode, 'bg-background relative flex flex-col')}>
      <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs font-medium">
        {mode === 'light' ? 'Light' : 'Dark'}
      </div>
      <PreviewSurface>{children}</PreviewSurface>
    </div>
  )
}
