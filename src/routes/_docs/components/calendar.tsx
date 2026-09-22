import {
  getLocalTimeZone,
  isWeekend,
  parseDate,
  today,
} from '@internationalized/date'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Preview } from '@/components/preview'
import type { CalendarRange } from '@/registry/ui/calendar'
import { Calendar, CalendarMode } from '@/registry/ui/calendar'

export const Route = createFileRoute('/_docs/components/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Calendar
        </h1>
        <p className="text-muted-foreground text-lg">
          A month grid the user picks one day or a range from. It owns
          selection, the range preview, the keyboard grid, and month paging. The
          app owns the value and the constraints; the trigger, the panel, and
          the field wiring belong to date-picker.
        </p>
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">
            Dates cross the boundary as ISO <code>YYYY-MM-DD</code> strings.
          </strong>{' '}
          A trip date is a calendar day, not an instant, so no time zone drifts
          it and it posts straight into a hidden native input.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">One day</h2>
        <p className="text-muted-foreground">
          The default mode. <code>value</code> is a string or <code>null</code>,
          and <code>onChange</code> fires with the clicked day. Today wears a
          dot under its numeral. <code>min</code> is set to today here, so every
          earlier day is struck through and the previous button disables at the
          edge of this month. Pressing the selected day again keeps it selected;
          clearing is <code>value={'{null}'}</code> from the app.
        </p>
        <Preview>
          <SingleDayExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A range</h2>
        <p className="text-muted-foreground">
          <code>mode={'{CalendarMode.Range}'}</code> takes a{' '}
          <code>{'{ start, end }'}</code> pair and reports one back once, on
          commit, with <code>start</code> never after <code>end</code>. Picking
          the end first normalizes. The endpoints fill <code>--indicator</code>{' '}
          and flatten the edge that faces the band; the days between them carry
          a band that starts and stops at the filled squares.{' '}
          <strong className="text-foreground">
            Two taps is the range path: one on the first day, one on the last.
          </strong>{' '}
          Dragging across the grid works too, as a secondary path. While the
          first day is anchored, the pointer or the keyboard cursor previews the
          range in the same paint as a committed one; Escape, or focus leaving
          the grid, drops the anchor and restores the last committed value
          without firing <code>onChange</code>.
        </p>
        <p className="text-muted-foreground">
          <code>months={'{2}'}</code> shows two grids side by side that page
          together. Tab into the grid and arrow across the range to see the
          focused day step one shade deeper on its own tint, with no ring.
        </p>
        <Preview>
          <TripRangeExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Locale and unavailable days
        </h2>
        <p className="text-muted-foreground">
          <code>locale</code> defaults to <code>en-US</code> and is applied
          through the library&rsquo;s own provider, so the server and the client
          agree on weekday names, the week start, and the heading. Under{' '}
          <code>de-DE</code> the week opens on Monday.{' '}
          <code>isDateDisabled</code> receives each day as an ISO string and
          strikes the ones it refuses; they stay reachable by arrow key but
          cannot be selected. Weekends are struck below.
        </p>
        <p className="text-muted-foreground">
          <code>disabled</code> on the whole calendar dims the root to half
          opacity, disables the previous and next buttons, and takes the grid
          out of the tab order. <code>readOnly</code> keeps the grid reachable
          and shows nothing, because the state of the value is the app&rsquo;s
          to explain.
        </p>
        <Preview>
          <GermanWeekdaysExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Props</h2>
        <p className="text-muted-foreground">
          One export, <code>Calendar</code>. <code>mode</code> is{' '}
          <code>CalendarMode.Single</code> by default or{' '}
          <code>CalendarMode.Range</code>, and the value and handler types
          follow it. <code>aria-label</code> is required. The rest:{' '}
          <code>months</code> (1 or 2), <code>locale</code>, <code>min</code>,{' '}
          <code>max</code>, <code>isDateDisabled</code>, <code>disabled</code>,{' '}
          <code>readOnly</code>, <code>autoFocus</code>, and{' '}
          <code>className</code>.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            There is no visible-month control, no week-start prop, no
            range-length limit, and no error state.
          </strong>{' '}
          The visible month derives from the value, else today, else{' '}
          <code>min</code>. The week start follows the locale. Errors belong to
          date-picker.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Surface</h2>
        <p className="text-muted-foreground">
          Content only: the calendar draws no border and no background of its
          own. The host owns the surface, whether that is date-picker&rsquo;s
          panel or a card on a page. Cells are 36px, six rows always so the
          height never changes between months, and days outside the month are
          empty, unfocusable cells. Every paint sits 2px inside the cell, so a
          filled day is a 32px rounded square and neighbours never touch; the
          band runs edge to edge between its endpoints with the same 2px inset
          above and below. Hover and keyboard focus paint one rounded background
          step and no ring, extending the borderless-item rule from ADR 0003 to
          a grid cell: an idle day steps to <code>--accent</code>, a day inside
          the band one shade deeper, and a filled endpoint to the step every
          indicator-filled surface uses. There is no press ring; the fill
          changing under the pointer is the feedback.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          A month change slides the incoming grid in from 16px on the side it
          came from, with a fade, 150ms on the bounce curve as a CSS keyframe;
          the heading fades in at <code>--motion-fast</code>. The weekday
          header, the buttons, and the height stay still, and nothing exits: the
          outgoing cells read the visible month from the library&rsquo;s
          context, so a copy held back for an exit would repaint onto the new
          month. Selection, the band, hover, and focus snap: the preview already
          moves cell by cell with the pointer, and a fade behind it would only
          lag. The one thing that moves inside a cell is an endpoint&rsquo;s
          shape, its corners rounding or squaring and its flat edge sliding to
          the cell edge at <code>--motion-fast</code> as the range grows or
          shrinks. Calendar carries no <code>motion</code> dependency.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The keyboard map is React Aria&rsquo;s, unmodified. Tab reaches the
          previous button, the next button, and then the grid as one stop,
          landing on the selected day or today. Arrows move across days and
          weeks and page the grid at a month edge; PageUp and PageDown move a
          month, with Shift a year; Home and End go to the first and last day of
          the month; Enter and Space select. Screen readers hear the
          grid&rsquo;s name with the visible month, each day with its weekday
          and its today, selected, or unavailable status, and the range
          announcements the library provides.
        </p>
        <p className="text-muted-foreground">
          Measured against this theme&rsquo;s palette with an OKLCH-to-sRGB
          contrast check, on the two hosts the calendar sits in. Numerals sit at
          18.25:1 on <code>--popover</code> and 17.20:1 on{' '}
          <code>--background</code>, and 13.46:1 on the range band. Muted
          weekday and unavailable text sits at 7.44:1 on <code>--popover</code>{' '}
          and 7.01:1 on <code>--background</code>. The numeral on a filled day
          sits at 5.08:1, and 6.31:1 on its hover step. A keyboard-focused
          unavailable day takes the accent pair,{' '}
          <code>--accent-foreground</code> on <code>--accent</code>, at 11.96:1,
          like every highlighted idle day. Every text pair clears WCAG AA, so no
          fallback step is taken. The today dot, in <code>--indicator</code>,
          sits at 3.59:1 on <code>--popover</code> and 3.38:1 on{' '}
          <code>--background</code>, clearing the 3:1 non-text bar. On a hovered
          idle day or inside the range band it sits on orange-200 at 2.65:1, and
          on the band's hover step at 2.11:1 (ADR 0004).
        </p>
      </section>
    </article>
  )
}

const localToday = today(getLocalTimeZone())

function SingleDayExample() {
  const [departure, setDeparture] = useState<string | null>(
    localToday.add({ days: 3 }).toString(),
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Departure"
        value={departure}
        onChange={setDeparture}
        min={localToday.toString()}
      />
      <p className="text-muted-foreground text-sm">
        {departure ? `Leaving ${departure}.` : 'No departure picked.'}
      </p>
    </div>
  )
}

function TripRangeExample() {
  const [trip, setTrip] = useState<CalendarRange | null>({
    start: localToday.add({ days: 9 }).toString(),
    end: localToday.add({ days: 16 }).toString(),
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar
        aria-label="Trip dates"
        mode={CalendarMode.Range}
        months={2}
        value={trip}
        onChange={setTrip}
      />
      <p className="text-muted-foreground text-sm">
        {trip ? `${trip.start} to ${trip.end}.` : 'No trip picked.'}
      </p>
    </div>
  )
}

function GermanWeekdaysExample() {
  const [abreise, setAbreise] = useState<string | null>(
    localToday.add({ days: 4 }).toString(),
  )

  return (
    <Calendar
      aria-label="Abreise"
      locale="de-DE"
      value={abreise}
      onChange={setAbreise}
      isDateDisabled={(date) => isWeekend(parseDate(date), 'de-DE')}
    />
  )
}
