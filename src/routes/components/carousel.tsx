import { createFileRoute } from '@tanstack/react-router'
import { Bike, Bus, Footprints, Plane, Ship, TrainFront } from 'lucide-react'
import { Fragment } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/registry/ui/carousel'

export const Route = createFileRoute('/components/carousel')({
  component: CarouselPage,
})

const tripDays = [
  { label: 'Day 1', place: 'Hanoi', note: 'Old Quarter on foot' },
  { label: 'Day 2', place: 'Hanoi', note: 'Night train to Ninh Binh' },
  { label: 'Day 3', place: 'Ninh Binh', note: 'Boats through Tam Coc' },
  { label: 'Day 4', place: 'Hoi An', note: 'An Bang beach, late lunch' },
  { label: 'Day 5', place: 'Hoi An', note: 'Lanterns on the river' },
  { label: 'Day 6', place: 'Da Nang', note: 'Marble Mountains at dawn' },
  { label: 'Day 7', place: 'Da Nang', note: 'Flight home at nine' },
]

const dayStripClassNames = [
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
]

const journeyLegs = [
  { label: 'Fly to Hanoi', icon: Plane },
  { label: 'Old Quarter on foot', icon: Footprints },
  { label: 'Night train south', icon: TrainFront },
  { label: 'Boats through Tam Coc', icon: Ship },
  { label: 'Bus over the pass', icon: Bus },
  { label: 'Bikes to An Bang', icon: Bike },
  { label: 'Flight home', icon: Plane },
]

const longTripDayLabels = Array.from(
  { length: 14 },
  (_, index) => `Day ${index + 1}`,
)

function CarouselPage() {
  return (
    <article className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Carousel
        </h1>
        <p className="text-muted-foreground text-lg">
          A horizontally snapping region of items on native CSS scroll-snap.
          Many items can be visible at once, and the browser settles on an item
          start.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Native scroll, not a slideshow
        </h2>
        <p className="text-muted-foreground">
          The carousel is a board the user scrolls with a trackpad or a finger,
          and the browser snaps to the nearest item start when the scroll stops.
          Nothing sits on the scroll path: there is no pointer handling, no
          JavaScript animation of <code>scrollLeft</code>, and no Embla. What
          the component adds is the index the scroll is nearest, the enablement
          of previous and next, the dots, and a keyboard path. What it gives up
          is drag-to-scroll with a mouse, which the two buttons and the dots
          cover.
        </p>
        <p className="text-muted-foreground">
          One item per viewport is the special case where the item width equals
          the scroller width, so a day board and a phone day pager are the same
          component with one variable set differently. There is no loop, no
          autoplay, and no vertical axis.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          <code>Carousel</code> is a <code>section</code> that owns the state
          and takes a required <code>aria-label</code>.{' '}
          <code>CarouselContent</code> is the scroller and the single tab stop.{' '}
          <code>CarouselItem</code> is a labelled group that snaps.{' '}
          <code>CarouselPrevious</code> and <code>CarouselNext</code> are ghost
          icon buttons that step by a page and disable at the ends.{' '}
          <code>CarouselDots</code> paints one dot per item.{' '}
          <code>useCarousel()</code> reports the position to the app. Every part
          carries a <code>data-slot</code>.
        </p>
        <p className="text-muted-foreground">
          Gap and any inline padding are yours, set with <code>className</code>{' '}
          on the content. Set <code>--carousel-inline-padding</code> rather than
          a padding utility when you want one: the scroller matches its{' '}
          <code>scroll-padding-inline-start</code> to that variable, so the
          first item still lands flush against the padding instead of under it.
        </p>
        <ModePreview stacked>
          <DayBoard />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          One dimension, and it is a variable
        </h2>
        <p className="text-muted-foreground">
          Item width is <code>--carousel-item</code> on the root, 270px by
          default, overridden with <code>className</code> and never with a prop.
          There are no variants and no sizes. The root is a{' '}
          <code>@container</code>, so the phone pager is one class on the
          content: <code>@max-[700px]:[--carousel-item:100cqw]</code> makes each
          item as wide as the carousel itself.
        </p>
        <p className="text-muted-foreground">
          That 700px is the container threshold sidebar already uses, and it is
          the app's to pick, not the component's. The carousel never applies it
          on its own, because a carousel of 120px thumbnails must not silently
          turn into one item per viewport. The preview below is the same
          composition as the board above, in a 420px box.
        </p>
        <ModePreview stacked>
          <div className="w-full max-w-[420px]">
            <DayBoard />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          An item is not a card
        </h2>
        <p className="text-muted-foreground">
          <code>CarouselItem</code> renders a <code>div</code> with the item
          width, <code>shrink-0</code>, <code>snap-start</code>, and its own
          accessible name. It has no border, no background, no padding, and no
          height, so the card look on the boards above is the page's own markup
          inside the item. An item holds whatever the app puts in it: a photo, a
          chart, a control, or a line of text.
        </p>
        <p className="text-muted-foreground">
          The width is the one thing the item does impose, and{' '}
          <code>w-auto</code> on the item drops it, so the item is as wide as
          what it holds. The strip below has no chrome at all — an icon and a
          label per leg, each as wide as its own words — and it snaps, counts,
          and keys exactly like a board of cards.
        </p>
        <ModePreview stacked>
          <JourneyStrip />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Children that are not items
        </h2>
        <p className="text-muted-foreground">
          A child of the content that is not a <code>CarouselItem</code> scrolls
          with the flow and nothing else: no snap alignment, no index, no{' '}
          <code>data-current</code>, no <code>data-visible</code>, and no dot.
          The dashed flight column between day 3 and day 4 is one. Anchors like
          it are the app's idea — the carousel does not know what sits between
          two groups of days, and the app is what hides them in the narrow
          layout.
        </p>
        <p className="text-muted-foreground">
          An empty board is the same rule again. With no items the dots render
          nothing and both buttons are disabled, and the placeholder below is a
          plain child of the content, because what a board with nothing on it
          should say belongs to the app.
        </p>
        <ModePreview stacked>
          <EmptyBoard />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Current, visible, and the hook
        </h2>
        <p className="text-muted-foreground">
          <code>current</code> is the index of the item whose start edge is
          nearest the scroll position, recomputed on every <code>scroll</code>{' '}
          event, so it moves with the items rather than after they stop. It is
          reported through <code>onCurrentChange</code> each time it changes,
          and carried on the item as <code>data-current</code>.{' '}
          <code>visible</code> is every item intersecting the scroller, from an{' '}
          <code>IntersectionObserver</code>, and lands as{' '}
          <code>data-visible</code>: several items are visible and exactly one
          is current. Both are yours to style — the day cards above take an{' '}
          <code>--indicator</code> border on <code>data-current</code>, and{' '}
          <code>data-visible</code> is where work that only pays off on screen,
          like loading a photo, belongs.
        </p>
        <p className="text-muted-foreground">
          The carousel is uncontrolled. The scroll position is the truth, so
          there is no <code>index</code> prop to reconcile with every trackpad
          flick; an app that keeps the position in the URL writes it in{' '}
          <code>onCurrentChange</code> and calls <code>scrollTo</code> on
          navigation. <code>useCarousel()</code> returns <code>current</code>,{' '}
          <code>count</code>, <code>visible</code>, <code>canScrollPrev</code>,{' '}
          <code>canScrollNext</code>, <code>scrollTo</code>,{' '}
          <code>scrollPrev</code>, and <code>scrollNext</code>, and nothing
          more.
        </p>
        <ModePreview stacked>
          <LongTripBoard />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Dots</h2>
        <p className="text-muted-foreground">
          Each dot is a button labelled by its item and a 24px target. The
          current one carries <code>aria-current</code> and paints its mark{' '}
          <code>--primary</code>; every other mark is{' '}
          <code>--muted-foreground</code> and steps to <code>--foreground</code>{' '}
          under the pointer. Colour is the whole difference — every dot keeps
          the same size and shape. Above ten items <code>CarouselDots</code>{' '}
          renders nothing — a row of fourteen dots stops being a map and each
          target shrinks below use — and the app names the position from the
          hook instead, as the fourteen-day board above does.
        </p>
        <p className="text-muted-foreground">
          The scrollbar is hidden. What says a board continues past the edge is
          the item cut off at the edge, the enabled next button, and the dots.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Keyboard and screen readers
        </h2>
        <p className="text-muted-foreground">
          The scroller is the one tab stop. Left and Right move by one item,
          Home and End go to the first and last, and PageUp and PageDown move by
          a page — one scroller width, which is one item only when the item
          fills the viewport. Keys pressed inside an item are left alone, so a
          control in a day card keeps its own arrow keys. The buttons and the
          dots follow the scroller in tab order.
        </p>
        <p className="text-muted-foreground">
          Items are not tab stops. Their interactive content is reached by Tab
          in document order, and the browser's own focus scrolling brings an
          off-screen column into view before snap settles it.
        </p>
        <p className="text-muted-foreground">
          The root is a <code>section</code> with{' '}
          <code>aria-roledescription="carousel"</code> and a required{' '}
          <code>aria-label</code>, and it holds the scroller, the buttons, and
          the dots, so the role is announced once and the controls read as part
          of it. Each item is a <code>role="group"</code> with a required{' '}
          <code>aria-label</code> and an optional{' '}
          <code>aria-roledescription</code> that has no default, because "slide"
          is the wrong word for a day column. There is no <code>aria-live</code>
          : no button moves focus, the scroller is a region the user arrows
          into, and the app's own visible day label is the persistent feedback
          ADR 0008 asks for.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The dots hold the only animation: a mark steps colour at{' '}
          <code>--motion-fast</code>, both when it becomes current and under the
          pointer. Because <code>current</code> follows every scroll event, the
          colour moves while the items are still travelling, whether the scroll
          came from a dot, a button, a key, or a finger. Scrolling itself is{' '}
          <code>scroll-behavior: smooth</code>, so the browser picks the
          duration. That is the same movement a trackpad flick produces and sits
          outside ADR 0001's 200ms feedback cap; a JavaScript spring on{' '}
          <code>scrollLeft</code> would fight the native snap instead.{' '}
          <code>defaultIndex</code> scrolls instantly on mount, so a board that
          opens on day 3 shows no travel, and items added later neither enter
          nor exit.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          An inactive mark is <code>--muted-foreground</code> on{' '}
          <code>--background</code>: 5.2:1 in light mode and 7.0:1 in dark,
          against the 3:1 a non-text graphic needs. <code>--border</code> was
          rejected at roughly 1.3:1. The current mark is <code>--primary</code>,
          3.2:1 light and 5.8:1 dark, which clears the same bar with less room
          to spare in light mode.
        </p>
        <p className="text-muted-foreground">
          Previous and next reuse the button's ghost row unchanged. The
          scroller's focus ring is 2px of <code>--ring</code> on its own bounds,
          the boundary geometry from the <code>interaction</code> lib: 18.3:1 in
          light and 17.5:1 in dark.
        </p>
      </section>
    </article>
  )
}

function DayBoard() {
  return (
    <Carousel aria-label="Trip days" className="w-full">
      <CarouselContent className="gap-3 @max-[700px]:[--carousel-item:100cqw]">
        {tripDays.map((tripDay, index) => (
          <Fragment key={tripDay.label}>
            {index === 3 ? <FlightAnchor /> : null}
            <CarouselItem
              aria-label={tripDay.label}
              aria-roledescription="day column"
              className="group/day"
            >
              <div className="border-border bg-card group-data-[current=true]/day:border-indicator flex h-full flex-col overflow-hidden rounded-lg border">
                <div
                  className={cn(
                    'h-1.5',
                    dayStripClassNames[index % dayStripClassNames.length],
                  )}
                />
                <div className="flex flex-col gap-1 p-4">
                  <p className="font-heading text-base font-semibold">
                    {tripDay.label}
                  </p>
                  <p className="text-foreground text-sm">{tripDay.place}</p>
                  <p className="text-muted-foreground text-sm">
                    {tripDay.note}
                  </p>
                </div>
              </div>
            </CarouselItem>
          </Fragment>
        ))}
      </CarouselContent>

      <div className="flex w-full items-center justify-between gap-3">
        <CarouselDots aria-label="Trip days" />
        <StepControls />
      </div>
    </Carousel>
  )
}

function StepControls() {
  return (
    <div className="flex items-center gap-1">
      <CarouselPrevious />
      <CarouselNext />
    </div>
  )
}

function EmptyBoard() {
  return (
    <Carousel aria-label="Saved trips" className="w-full">
      <CarouselContent>
        <div className="border-border text-muted-foreground flex h-20 w-full items-center justify-center rounded-lg border border-dashed text-sm">
          No saved trips yet
        </div>
      </CarouselContent>

      <div className="flex w-full items-center justify-between gap-3">
        <CarouselDots aria-label="Saved trips" />
        <StepControls />
      </div>
    </Carousel>
  )
}

function FlightAnchor() {
  return (
    <div className="border-border text-muted-foreground flex w-20 shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-xs @max-[700px]:hidden">
      <Plane aria-hidden="true" className="size-4" />
      <span>Flight</span>
    </div>
  )
}

function LongTripBoard() {
  return (
    <Carousel
      aria-label="Fourteen day trip"
      defaultIndex={2}
      className="w-full [--carousel-item:180px]"
    >
      <CarouselContent className="gap-3">
        {longTripDayLabels.map((label) => (
          <CarouselItem
            key={label}
            aria-label={label}
            aria-roledescription="day column"
            className="border-border bg-card data-[current=true]:border-indicator flex h-20 items-center justify-center rounded-lg border"
          >
            <p className="font-heading text-base font-semibold">{label}</p>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex w-full items-center justify-between gap-3">
        <CurrentDayLabel />
        <StepControls />
      </div>

      <CarouselDots aria-label="Fourteen day trip" />
    </Carousel>
  )
}

function JourneyStrip() {
  return (
    <Carousel aria-label="Journey legs" className="w-full">
      <CarouselContent className="gap-6">
        {journeyLegs.map(({ label, icon: LegIcon }) => (
          <CarouselItem
            key={label}
            aria-label={label}
            className="flex w-auto items-center gap-2"
          >
            <LegIcon
              aria-hidden="true"
              className="text-muted-foreground size-4 shrink-0"
            />
            <p className="text-sm whitespace-nowrap">{label}</p>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex w-full items-center justify-between gap-3">
        <CarouselDots aria-label="Journey legs" />
        <StepControls />
      </div>
    </Carousel>
  )
}

function CurrentDayLabel() {
  const { current, count, visible } = useCarousel()

  return (
    <p className="text-muted-foreground text-sm">
      {`Day ${current + 1} of ${count}, ${visible.length} in view`}
    </p>
  )
}
