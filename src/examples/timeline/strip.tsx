import {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineOrientation,
} from '@/registry/ui/timeline'

const tripDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

export function TimelineStrip() {
  return (
    <div className="w-full max-w-md">
      <Timeline orientation={TimelineOrientation.Horizontal}>
        {tripDays.map((tripDay) => (
          <TimelineItem key={tripDay}>
            <TimelineMarker />
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
