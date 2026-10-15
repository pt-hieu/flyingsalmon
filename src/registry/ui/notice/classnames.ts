import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const noticeLiveRegionClassName = 'sr-only'

export const noticeOutletClassName =
  'fixed top-4 right-4 left-4 z-50 mx-auto max-w-md'

export const noticeSubjectClassName = cn(
  'text-card-foreground w-fit underline underline-offset-4',
  'transition-colors duration-(--motion-fast)',
  'hover:text-primary-text active:text-primary-text',
  offsetFocusRingGeometry,
  'ring-ring focus-visible:ring-offset-card rounded-sm',
)
