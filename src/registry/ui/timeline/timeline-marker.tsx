import { Children, use } from 'react'

import { cn } from '@/lib/utils'

import {
  timelineConnectorClassName,
  timelineMarkerBoxClassName,
  timelineMarkerClassName,
  timelineMarkerDotClassName,
} from './classnames'
import {
  TimelineIsLastItemContext,
  TimelineOrientationContext,
} from './context'
import { TimelineMarkerSize } from './types'

export interface TimelineMarkerProps extends React.ComponentProps<'span'> {
  size?: TimelineMarkerSize
}

export function TimelineMarker({
  size = TimelineMarkerSize.Default,
  className,
  children,
  ...props
}: TimelineMarkerProps) {
  const orientation = use(TimelineOrientationContext)
  const isLastItem = use(TimelineIsLastItemContext)
  const hasMarkerContent = Children.toArray(children).length > 0

  return (
    <span
      data-slot="timeline-marker"
      className={cn(timelineMarkerClassName(orientation), className)}
      {...props}
    >
      <span
        data-slot="timeline-marker-box"
        className={timelineMarkerBoxClassName(size, hasMarkerContent)}
      >
        {hasMarkerContent ? (
          children
        ) : (
          <span
            data-slot="timeline-marker-dot"
            className={timelineMarkerDotClassName(size)}
          />
        )}
      </span>

      {!isLastItem && (
        <span
          data-slot="timeline-connector"
          aria-hidden="true"
          className={timelineConnectorClassName(orientation, size)}
        />
      )}
    </span>
  )
}
