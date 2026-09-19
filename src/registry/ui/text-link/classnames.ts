import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const textLinkClassName = cn(
  'text-foreground inline underline decoration-1 underline-offset-4',
  'decoration-muted-foreground hover:decoration-foreground active:decoration-foreground',
  'transition-colors duration-(--motion-fast)',
  offsetFocusRingGeometry,
  'ring-ring box-decoration-clone rounded-sm',
  '[&>svg]:inline [&>svg]:size-[1em] [&>svg]:align-[-0.125em]',
)
