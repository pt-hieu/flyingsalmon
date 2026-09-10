import { cn } from '@/lib/utils'

import { timelineTitleClassName } from './classnames'
import type { TimelineSlotProps } from './types'

export function TimelineTitle({ className, ...props }: TimelineSlotProps) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(timelineTitleClassName, className)}
      {...props}
    />
  )
}
