import { cn } from '@/lib/utils'

export const progressTrackClassName =
  'bg-progress-track h-2 w-full overflow-hidden rounded-full'

const progressFillBaseClassName = 'bg-progress-fill h-full'

export const progressFillClassName = cn(
  progressFillBaseClassName,
  'w-full origin-left',
)

export const progressIndeterminateSegmentClassName = cn(
  progressFillBaseClassName,
  'animate-progress-indeterminate w-2/5',
)
