import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from '@/registry/ui/timeline'

const stops = ['Hanoi', 'Ninh Binh', 'Hoi An']

export function TimelineSpacing() {
  return (
    <Timeline className="[--timeline-spacing:--spacing(2)]">
      {stops.map((stop) => (
        <TimelineItem key={stop}>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>{stop}</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
