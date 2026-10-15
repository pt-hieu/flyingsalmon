import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

export const noticeLiveRegionClassName = 'sr-only'

export const noticeOutletClassName = cn(
  'fixed z-50 mx-auto max-w-md',
  'top-[calc(var(--notice-offset-top,--spacing(0))+--spacing(4))]',
  'right-[calc(var(--notice-offset-right,--spacing(0))+--spacing(4))]',
  'left-[calc(var(--notice-offset-left,--spacing(0))+--spacing(4))]',
)

export const noticeSubjectClassName = cn(
  'text-card-foreground w-fit underline underline-offset-4',
  'transition-colors duration-(--motion-fast)',
  'hover:text-primary-text active:text-primary-text',
  offsetFocusRingGeometry,
  'ring-ring focus-visible:ring-offset-card rounded-sm',
)
