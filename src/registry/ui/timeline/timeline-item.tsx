import { use } from 'react'

import { cn } from '@/lib/utils'

import { timelineItemClassName } from './classnames'
import { TimelineOrientationContext } from './context'

export function TimelineItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  const orientation = use(TimelineOrientationContext)

  return (
    <li
      data-slot="timeline-item"
      className={cn(timelineItemClassName(orientation), className)}
      {...props}
    />
  )
}
