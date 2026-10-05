import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from '@/registry/ui/timeline'

export function TimelineDemo() {
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
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Ninh Binh</TimelineTitle>
            <TimelineDescription>
              One night, boats through Tam Coc in the morning
            </TimelineDescription>
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
