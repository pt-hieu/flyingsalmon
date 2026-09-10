import { cn } from '@/lib/utils'

import { timelineDescriptionClassName } from './classnames'
import type { TimelineSlotProps } from './types'

export function TimelineDescription({
  className,
  ...props
}: TimelineSlotProps) {
  return (
    <div
      data-slot="timeline-description"
      className={cn(timelineDescriptionClassName, className)}
      {...props}
    />
  )
}
