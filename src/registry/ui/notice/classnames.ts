import { cn } from '@/lib/utils'

export const noticeLiveRegionClassName = 'sr-only'

export const noticeOutletClassName =
  'fixed top-4 right-4 left-4 z-50 mx-auto max-w-md'

export const noticeSubjectClassName = cn(
  'text-card-foreground w-fit underline underline-offset-4',
  'transition-colors duration-(--motion-fast)',
  'hover:text-indicator active:text-indicator',
)
