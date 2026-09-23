import { Link, createFileRoute } from '@tanstack/react-router'
import { CalendarClock, Camera, Lock, UtensilsCrossed } from 'lucide-react'

import { Preview } from '@/components/preview'
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/ui/card'
import { IconTooltip } from '@/registry/ui/icon-tooltip'

export const Route = createFileRoute('/_docs/components/icon-tooltip')({
  component: IconTooltipPage,
})

const demoDays = [
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

function IconTooltipPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Icon Tooltip
        </h1>
        <p className="text-muted-foreground text-lg">
          A focusable icon named by its tooltip text. Keyboard focus and hover
          open the tooltip, and the icon stays reachable inside a row whose
          whole surface is a link.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          An icon that names itself
        </h2>
        <p className="text-muted-foreground">
          Every standalone icon or emoji explains itself. <code>content</code>{' '}
          is both the tooltip text and the icon&apos;s accessible name. The
          child is decorative: give a lucide icon <code>aria-hidden</code>; an
          emoji needs nothing. The icon takes its size from{' '}
          <code>className</code> or from an ancestor such as{' '}
          <code>[&amp;_svg]:size-4</code>.
        </p>
        <p className="text-muted-foreground">
          The content follows the{' '}
          <Link to="/components/tooltip" className="text-foreground underline">
            Tooltip
          </Link>{' '}
          rule: it adds to what the page already says and is never the only
          place a reason or a result lives.
        </p>
        <Preview>
          <span className="text-muted-foreground flex items-center gap-3 [&_svg]:size-4">
            <IconTooltip content="Locked, so the AI won’t change it">
              <Lock aria-hidden />
            </IconTooltip>
            <IconTooltip content="Tied to this date">
              <CalendarClock aria-hidden />
            </IconTooltip>
            <IconTooltip content="Food activities">🍜</IconTooltip>
          </span>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Inside a row that is a link
        </h2>
        <p className="text-muted-foreground">
          A row whose whole surface is one link carries an empty anchor
          stretched over it at <code>z-10</code>. The icon sits at{' '}
          <code>z-20</code>, above that anchor and above the stretched links of
          an interactive card. The pointer over an icon reaches the icon: hover
          opens its tooltip and a click does not follow the link. Anywhere else
          in the row, the pointer reaches the link.
        </p>
        <p className="text-muted-foreground">
          Keep the icon a sibling of the anchor, never inside it: a focusable
          element nested in a link is invalid. Tab visits the row&apos;s link
          first, then each icon in the row.
        </p>
        <Preview>
          <ul className="border-border divide-border w-full max-w-md divide-y overflow-hidden rounded-lg border">
            {demoDays.map((day) => (
              <li
                key={day.number}
                className="hover:bg-muted relative flex min-h-11 items-center gap-3 px-3 py-1 text-sm transition-colors duration-(--motion-fast)"
              >
                <a
                  href={`#day-${day.number}`}
                  aria-label={`Day ${day.number}, ${day.weekday}`}
                  className="ring-ring absolute inset-0 z-10 focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset"
                />
                <span className="w-12 shrink-0 font-medium">
                  Day {day.number}
                </span>
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
                    <IconTooltip
                      key={activity}
                      content={`${activity} activities`}
                    >
                      {activityIcons[activity]}
                    </IconTooltip>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">On another surface</h2>
        <p className="text-muted-foreground">
          The focus ring stands 2px off the icon, and the gap takes the page
          background. On a card or any other surface, pass the matching offset,
          such as <code>focus-visible:ring-offset-card</code>, through{' '}
          <code>className</code>.
        </p>
        <Preview>
          <Card className="w-72">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Kyoto
                <IconTooltip
                  content="Locked, so the AI won’t change it"
                  className="text-muted-foreground focus-visible:ring-offset-card [&>svg]:size-4"
                >
                  <Lock aria-hidden />
                </IconTooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Three days, two temples, one very long train ride.
            </CardContent>
          </Card>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Keyboard and accessibility
        </h2>
        <p className="text-muted-foreground">
          The icon is one Tab stop. Keyboard focus opens the tooltip and draws
          the focus ring; Tab away or Escape closes it. The icon does nothing on
          Enter or Space, because it has nothing to activate. It renders as{' '}
          <code>role=&quot;img&quot;</code> with <code>aria-label</code> set to{' '}
          <code>content</code>, so a screen reader names the icon by the tooltip
          text whether or not the tooltip is open. The pointer turns to the help
          cursor over it.
        </p>
      </section>
    </article>
  )
}
