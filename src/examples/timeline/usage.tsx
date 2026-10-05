import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from '@/registry/ui/timeline'

export function TripRoute() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineMarker />
        <TimelineContent>
          <TimelineTitle>Hanoi</TimelineTitle>
          <TimelineDescription>Two nights</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker />
        <TimelineContent>
          <TimelineTitle>Hoi An</TimelineTitle>
          <TimelineDescription>Three nights</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
