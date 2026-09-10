import { cn } from '@/lib/utils'

export const progressTrackClassName =
  'bg-progress-track h-2 w-full overflow-hidden rounded-full'

export const progressFillClassName =
  'bg-progress-fill h-full w-full origin-left rounded-full'

export const progressIndeterminateSegmentClassName = cn(
  progressFillClassName,
  'animate-progress-indeterminate w-2/5',
)
