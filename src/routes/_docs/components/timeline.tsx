import { createFileRoute } from '@tanstack/react-router'
import { Plane, TrainFront } from 'lucide-react'
import { LayoutGroup, motion } from 'motion/react'
import { useId, useState } from 'react'

import { Preview } from '@/components/preview'
import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { springBounce } from '@/registry/lib/motion'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineMarkerSize,
  TimelineOrientation,
  TimelineTitle,
} from '@/registry/ui/timeline'

export const Route = createFileRoute('/_docs/components/timeline')({
  component: TimelinePage,
})

const tripDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

function TimelinePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Timeline
        </h1>
        <p className="text-muted-foreground text-lg">
          A sequence of markers joined by a connector. Content sits beside its
          marker; meaning stays with the consumer.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A layout, not a state model
        </h2>
        <p className="text-muted-foreground">
          The timeline places markers and joins them. It has no{' '}
          <code>status</code>, no <code>active</code>, and no item states at
          all, because what an item means — a city, a flight, a day, done or
          still ahead — is a claim about the app's domain that a registry
          primitive cannot make. A route rail is a composition: you pick the
          markers, you paint the current one, and the timeline keeps them in
          line. For a position in a sequence of known count with no content
          beside it, reach for <code>stepper</code> instead.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          <code>Timeline</code> renders an <code>ol</code> with list styling
          reset. <code>TimelineItem</code> renders an <code>li</code>. The
          connector to the next item is drawn for you — it belongs to the item,
          the marker paints it because that is where the geometry lives, and
          there is none after the last item or on an item with no marker.{' '}
          <code>TimelineMarker</code> is a slot: empty it renders a neutral dot,
          and with children it renders a bordered circle around them.{' '}
          <code>TimelineContent</code> is free-form, with{' '}
          <code>TimelineTitle</code> and <code>TimelineDescription</code>{' '}
          mirroring card's typography. Every part carries a{' '}
          <code>data-slot</code>.
        </p>
        <Preview>
          <div className="w-full max-w-md">
            <RouteRail />
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Orientation</h2>
        <p className="text-muted-foreground">
          Vertical is the default: the marker column sits on the left with the
          marker centred on the title's first line, and the content sits beside
          it. Horizontal puts the content below the marker and gives every item{' '}
          <code>flex-1</code>, so markers stay evenly spaced however long the
          content runs. The value is exposed as <code>data-orientation</code>{' '}
          for consumers styling around it.
        </p>
        <p className="text-muted-foreground">
          The timeline is host-agnostic: it never reads the sidebar context. A
          rail that has to follow the shell takes its orientation from the
          consumer, which reads <code>useSidebar().layout</code> and passes the
          matching <code>TimelineOrientation</code> down.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Strip</h2>
        <p className="text-muted-foreground">
          A strip is a horizontal timeline whose items omit{' '}
          <code>TimelineContent</code>. There is no hidden-content mode and no
          separate component: leaving the content out is the whole recipe.
        </p>
        <Preview>
          <div className="w-full max-w-md">
            <Timeline orientation={TimelineOrientation.Horizontal}>
              {tripDays.map((day) => (
                <TimelineItem key={day}>
                  <TimelineMarker />
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Marker sizes</h2>
        <p className="text-muted-foreground">
          <code>Default</code> is a 24px box holding a 16px icon, or a 12px dot
          when it is empty. <code>Small</code> is a 16px box holding a 12px
          icon, or an 8px dot. Both centre on the same 24px line, so a rail can
          mix them: the rail above gives its cities default markers and its
          transport anchors small ones, and the connector still runs straight.
        </p>
        <p className="text-muted-foreground">
          Mixing sizes is a vertical affordance. A horizontal connector spans
          from its own marker's edge using its own size, so a horizontal
          timeline should keep one size throughout or the line will overshoot at
          one end.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Spacing</h2>
        <p className="text-muted-foreground">
          The gap between items comes from <code>--timeline-spacing</code> on
          the root, <code>--spacing(6)</code> by default. Override it on one
          timeline and both the gaps and the connectors that bridge them follow.
          The gap between a marker and its content is a fixed{' '}
          <code>--spacing(3)</code>. There is no density prop: one variable does
          the job a prop would.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A moving current marker
        </h2>
        <p className="text-muted-foreground">
          The component owns no animation. When an app wants the current marker
          to travel rather than blink between positions, it renders a{' '}
          <code>motion.span</code> with a shared <code>layoutId</code> inside
          the current item's marker and animates it on <code>springBounce</code>{' '}
          — the same mechanism as the sidebar's active bar. Wrap the timeline in
          a <code>LayoutGroup</code> with a <code>useId</code> so two instances
          on one page do not fly into each other.
        </p>
        <p className="text-muted-foreground">
          A shared <code>layoutId</code> animates only when the element it
          leaves and the element it enters are mounted in the same commit, so
          the timeline has to survive whatever changes the current item. Mount
          it in the shell — a sidebar or a persistent header — not inside the
          route that unmounts on navigation. If the host remounts, the marker
          appears at its new place with no travel, which is the correct
          fallback, not a bug.
        </p>
        <Preview>
          <div className="w-full max-w-md">
            <MovingCurrentMarker />
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          The empty marker's dot is <code>--muted-foreground</code> on{' '}
          <code>--background</code>: 5.2:1, against the 3:1 a non-text graphic
          needs. An icon marker draws a 1px <code>--border</code> circle and
          puts the icon in <code>--foreground</code> at 18.3:1, so the icon
          carries the 3:1 and the circle carries nothing. The connector is 2px
          of <code>--border</code>, 1.3:1: it is decorative and exempt under
          WCAG 1.4.11, because it says only what the markers and the content
          already say.
        </p>
        <p className="text-muted-foreground">
          The title runs <code>--foreground</code> at 18.3:1; the description
          runs <code>--muted-foreground</code> at 5.2:1. A link inside the title
          stays <code>--foreground</code> in every state and carries a permanent
          underline: 1px <code>--muted-foreground</code> at rest, stepping to
          1.5px <code>--foreground</code> on hover and press, 4.73:1. Those are
          text link's values, so every prose link in the portfolio follows one
          rule.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Accessibility and motion
        </h2>
        <p className="text-muted-foreground">
          A screen reader reads an ordered list: the root is an <code>ol</code>{' '}
          and every item is an <code>li</code>, so the order and the count are
          announced without any extra ARIA. The connector is{' '}
          <code>aria-hidden</code>. Icons you put in a marker should be
          decorative too, because the title beside the marker already names the
          stop.
        </p>
        <p className="text-muted-foreground">
          Tab reaches one stop per linked title, in document order. The title
          paints the underline, the colour, and the hover, but the anchor is
          yours, so you put <code>offsetFocusRingGeometry</code> from the{' '}
          <code>interaction</code> lib on it — that keeps the ring in the one
          place ADR 0006 puts it and keeps the timeline itself dependency-free.
          Nothing else in the timeline is focusable, and there is no stretched
          link: an item is never a hit target, so a route rail with five cities
          and one linked title costs the keyboard user exactly one stop.
        </p>
      </section>
    </article>
  )
}

function RouteRail() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineMarker />
        <TimelineContent>
          <TimelineTitle>
            <a
              href="https://en.wikipedia.org/wiki/Hanoi"
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
        <TimelineMarker size={TimelineMarkerSize.Small}>
          <TrainFront aria-hidden="true" />
        </TimelineMarker>
        <TimelineContent>
          <TimelineTitle>Train to Ninh Binh</TimelineTitle>
          <TimelineDescription>2h 20m from Ha Noi station</TimelineDescription>
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
  )
}

function MovingCurrentMarker() {
  const layoutGroupId = useId()
  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  return (
    <div className="flex w-full flex-col gap-6">
      <LayoutGroup id={layoutGroupId}>
        <Timeline orientation={TimelineOrientation.Horizontal}>
          {tripDays.map((day, index) => (
            <TimelineItem key={day}>
              <TimelineMarker>
                {index === currentDayIndex ? (
                  <motion.span
                    layout
                    layoutId="timeline-current-day"
                    transition={springBounce}
                    className="bg-indicator size-3 rounded-full"
                  />
                ) : (
                  <span className="bg-muted-foreground size-1.5 rounded-full" />
                )}
              </TimelineMarker>
            </TimelineItem>
          ))}
        </Timeline>
      </LayoutGroup>

      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Outline}
          onClick={() => setCurrentDayIndex((index) => Math.max(0, index - 1))}
        >
          Previous day
        </Button>
        <Button
          size={ButtonSize.Small}
          onClick={() =>
            setCurrentDayIndex((index) =>
              Math.min(tripDays.length - 1, index + 1),
            )
          }
        >
          Next day
        </Button>
      </div>
    </div>
  )
}
