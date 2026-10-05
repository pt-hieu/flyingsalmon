import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from '@/registry/ui/timeline'

export function TimelineLinkedTitle() {
  return (
    <div className="w-full max-w-md">
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>
              <a
                href="#hanoi"
                className={cn('ring-ring rounded-sm', offsetFocusRingGeometry)}
              >
                Hanoi
              </a>
            </TimelineTitle>
            <TimelineDescription>
              Two nights in the Old Quarter
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
      </Timeline>
    </div>
  )
}
