import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const textLinkClassName = cn(
  'text-foreground inline underline decoration-1 underline-offset-4',
  'decoration-indicator hover:decoration-orange-700 active:decoration-orange-700',
  'hover:decoration-[1.5px] active:decoration-[1.5px]',
  'transition-[text-decoration-color,text-decoration-thickness] duration-(--motion-fast)',
  offsetFocusRingGeometry,
  'ring-ring box-decoration-clone rounded-sm',
  '[&>svg]:inline [&>svg]:size-[1em] [&>svg]:align-[-0.125em]',
)
