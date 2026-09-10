import { Children, isValidElement } from 'react'

import { cn } from '@/lib/utils'

import { timelineClassName } from './classnames'
import {
  TimelineIsLastItemContext,
  TimelineOrientationContext,
} from './context'
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
  const items = Children.toArray(children)
  const lastItemIndex = items.length - 1

  return (
    <TimelineOrientationContext value={orientation}>
      <ol
        data-slot="timeline"
        data-orientation={orientation}
        className={cn(timelineClassName(orientation), className)}
        {...props}
      >
        {items.map((item, index) => (
          <TimelineIsLastItemContext
            key={isValidElement(item) ? item.key : index}
            value={index === lastItemIndex}
          >
            {item}
          </TimelineIsLastItemContext>
        ))}
      </ol>
    </TimelineOrientationContext>
  )
}
