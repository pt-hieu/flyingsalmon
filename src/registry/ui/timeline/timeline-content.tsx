import { cn } from '@/lib/utils'

import { timelineContentClassName } from './classnames'
import type { TimelineSlotProps } from './types'

export function TimelineContent({ className, ...props }: TimelineSlotProps) {
  return (
    <div
      data-slot="timeline-content"
      className={cn(timelineContentClassName, className)}
      {...props}
    />
  )
}
