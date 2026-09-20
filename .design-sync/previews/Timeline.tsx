import { Plane, TrainFront } from 'lucide-react'
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineMarkerSize,
  TimelineOrientation,
  TimelineTitle,
} from 'flyingsalmon'

export function RouteRail() {
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
            <TimelineDescription>
              One night, boats through Tam Coc in the morning
            </TimelineDescription>
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

export function Strip() {
  const tripDays = [
    'Day 1',
    'Day 2',
    'Day 3',
    'Day 4',
    'Day 5',
    'Day 6',
    'Day 7',
  ]

  return (
    <div className="w-full max-w-md">
      <Timeline orientation={TimelineOrientation.Horizontal}>
        {tripDays.map((day) => (
          <TimelineItem key={day}>
            <TimelineMarker />
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}

export function Horizontal() {
  const legs = [
    { title: 'Kyoto', detail: 'Days 1–4' },
    { title: 'Kanazawa', detail: 'Days 5–6' },
    { title: 'Tokyo', detail: 'Days 7–10' },
  ]

  return (
    <div className="w-full max-w-md">
      <Timeline orientation={TimelineOrientation.Horizontal}>
        {legs.map((leg) => (
          <TimelineItem key={leg.title}>
            <TimelineMarker />
            <TimelineContent>
              <TimelineTitle>{leg.title}</TimelineTitle>
              <TimelineDescription>{leg.detail}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
