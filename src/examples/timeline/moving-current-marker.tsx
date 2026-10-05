import { LayoutGroup, motion } from 'motion/react'
import { useId, useState } from 'react'

import { springBounce } from '@/registry/lib/motion'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineOrientation,
} from '@/registry/ui/timeline'

const tripDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

export function TimelineMovingCurrentMarker() {
  const layoutGroupId = useId()
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <LayoutGroup id={layoutGroupId}>
        <Timeline orientation={TimelineOrientation.Horizontal}>
          {tripDays.map((tripDay, dayIndex) => (
            <TimelineItem key={tripDay}>
              <TimelineMarker>
                {dayIndex === currentDayIndex ? (
                  <motion.span
                    layout
                    layoutId="timeline-current-day"
                    transition={springBounce}
                    className="bg-indicator size-3 rounded-full"
                  />
                ) : (
                  <span className="bg-muted-foreground size-1.5 rounded-full" />
                )}
              </TimelineMarker>
            </TimelineItem>
          ))}
        </Timeline>
      </LayoutGroup>

      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Outline}
          onClick={() =>
            setCurrentDayIndex((dayIndex) => Math.max(0, dayIndex - 1))
          }
        >
          Previous day
        </Button>
        <Button
          size={ButtonSize.Small}
          onClick={() =>
            setCurrentDayIndex((dayIndex) =>
              Math.min(tripDays.length - 1, dayIndex + 1),
            )
          }
        >
          Next day
        </Button>
      </div>
    </div>
  )
}
