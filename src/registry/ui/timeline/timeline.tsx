import { Children } from 'react'

import { cn } from '@/lib/utils'

import { timelineClassName } from './classnames'
import { TimelineLastItemContext, TimelineOrientationContext } from './context'
import { TimelineOrientation } from './types'

export interface TimelineProps extends React.ComponentProps<'ol'> {
  orientation?: TimelineOrientation
}

export function Timeline({
  orientation = TimelineOrientation.Vertical,
  className,
  children,
  ...props
}: TimelineProps) {
  const itemCount = Children.count(children)

  return (
    <TimelineOrientationContext value={orientation}>
      <ol
        data-slot="timeline"
        data-orientation={orientation}
        className={cn(timelineClassName(orientation), className)}
        {...props}
      >
        {Children.map(children, (item, index) => (
          <TimelineLastItemContext value={index === itemCount - 1}>
            {item}
          </TimelineLastItemContext>
        ))}
      </ol>
    </TimelineOrientationContext>
  )
}
