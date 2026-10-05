import { CalendarClock, Camera, Lock, UtensilsCrossed } from 'lucide-react'

import { IconTooltip } from '@/registry/ui/icon-tooltip'

const days = [
  {
    number: 1,
    weekday: 'Fri 12',
    locked: true,
    dateBound: false,
    activities: ['Food', 'Sights'],
  },
  {
    number: 2,
    weekday: 'Sat 13',
    locked: false,
    dateBound: true,
    activities: ['Sights'],
  },
  {
    number: 3,
    weekday: 'Sun 14',
    locked: false,
    dateBound: false,
    activities: ['Food'],
  },
]

const activityIcons: Record<string, React.ReactNode> = {
  Food: <UtensilsCrossed aria-hidden />,
  Sights: <Camera aria-hidden />,
}

export function IconTooltipInsideALinkRow() {
  return (
    <ul className="border-border divide-border w-full max-w-md divide-y overflow-hidden rounded-lg border">
      {days.map((day) => (
        <li
          key={day.number}
          className="hover:bg-muted relative flex min-h-11 items-center gap-3 px-3 py-1 text-sm transition-colors duration-(--motion-fast)"
        >
          <a
            href={`#day-${day.number}`}
            aria-label={`Day ${day.number}, ${day.weekday}`}
            className="ring-ring absolute inset-0 z-10 focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset"
          />
          <span className="w-12 shrink-0 font-medium">Day {day.number}</span>
          <span className="text-muted-foreground w-16 shrink-0 tabular-nums">
            {day.weekday}
          </span>
          <span className="text-muted-foreground flex gap-1 [&_svg]:size-3.5">
            {day.locked ? (
              <IconTooltip content="Locked, so the AI won’t change Fushimi Inari at dawn">
                <Lock aria-hidden />
              </IconTooltip>
            ) : null}
            {day.dateBound ? (
              <IconTooltip content="Tied to this date: Gion Matsuri parade">
                <CalendarClock aria-hidden />
              </IconTooltip>
            ) : null}
          </span>
          <span className="flex-1" />
          <span className="text-muted-foreground flex gap-2 [&_svg]:size-4">
            {day.activities.map((activity) => (
              <IconTooltip key={activity} content={`${activity} activities`}>
                {activityIcons[activity]}
              </IconTooltip>
            ))}
          </span>
        </li>
      ))}
    </ul>
  )
}
