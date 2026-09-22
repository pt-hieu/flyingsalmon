import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const iconTooltipClassName = cn(
  'relative z-20 inline-flex cursor-help rounded-sm',
  'ring-ring',
  offsetFocusRingGeometry,
)
