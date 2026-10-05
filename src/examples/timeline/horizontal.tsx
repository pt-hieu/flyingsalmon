import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineOrientation,
  TimelineTitle,
} from '@/registry/ui/timeline'

export function TimelineHorizontal() {
  return (
    <div className="w-full max-w-lg">
      <Timeline orientation={TimelineOrientation.Horizontal}>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
            <TimelineDescription>2 nights</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Ninh Binh</TimelineTitle>
            <TimelineDescription>1 night</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hoi An</TimelineTitle>
            <TimelineDescription>3 nights</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}
