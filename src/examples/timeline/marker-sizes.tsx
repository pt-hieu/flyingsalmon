import { Plane, TrainFront } from 'lucide-react'

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineMarkerSize,
  TimelineTitle,
} from '@/registry/ui/timeline'

export function TimelineMarkerSizes() {
  return (
    <div className="w-full max-w-md">
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
            <TimelineDescription>
              Two nights in the Old Quarter
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker size={TimelineMarkerSize.Small}>
            <TrainFront aria-hidden="true" />
          </TimelineMarker>
          <TimelineContent>
            <TimelineTitle>Train to Ninh Binh</TimelineTitle>
            <TimelineDescription>
              2h 20m from Ha Noi station
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Ninh Binh</TimelineTitle>
            <TimelineDescription>One night</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker size={TimelineMarkerSize.Small}>
            <Plane aria-hidden="true" />
          </TimelineMarker>
          <TimelineContent>
            <TimelineTitle>Flight to Da Nang</TimelineTitle>
            <TimelineDescription>1h 20m, lands at midday</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hoi An</TimelineTitle>
            <TimelineDescription>
              Three nights on An Bang beach
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}
