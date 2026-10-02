import {
  getDayOfWeek,
  getLocalTimeZone,
  isWeekend,
  parseDate,
  today,
} from '@internationalized/date'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Preview } from '@/components/preview'
import type { DatePickerRange } from '@/registry/ui/date-picker'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'

export const Route = createFileRoute('/_docs/components/date-picker')({
  component: DatePickerPage,
})

function DatePickerPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Date Picker
        </h1>
        <p className="text-muted-foreground text-lg">
          A form field for one calendar day or one range, entered by typing into
          date segments or by picking from a calendar in a floating panel. It
          owns the label, the error, the panel, and the hidden native inputs;
          the grid inside the panel is Calendar.
        </p>
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">
            Dates cross the boundary as ISO <code>YYYY-MM-DD</code> strings.
          </strong>{' '}
          The same shape Calendar uses, so a value moves between the two without
          a conversion and posts straight into a hidden native input.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">One day</h2>
        <p className="text-muted-foreground">
          The default mode. <code>value</code> is a string or <code>null</code>,{' '}
          <code>onChange</code> fires with the ISO day, and <code>name</code>{' '}
          posts it. The segments carry their own <code>mm</code>,{' '}
          <code>dd</code>, and <code>yyyy</code> placeholders in the
          locale&rsquo;s order, so there is no <code>placeholder</code> prop and
          no format prop. <code>min</code> is set to today here, so an earlier
          day is refused in the grid and rejected when typed.
        </p>
        <Preview>
          <DepartureExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A range</h2>
        <p className="text-muted-foreground">
          <code>mode={'{DatePickerMode.Range}'}</code> takes a{' '}
          <code>{'{ start, end }'}</code> pair and posts it under{' '}
          <code>startName</code> and <code>endName</code>. Both groups of
          segments share one box, one label, and one error message, with a
          static dash between them. The panel shows two months, always.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Picking the end day commits, closes the panel, and returns focus to
            whatever opened it.
          </strong>{' '}
          Escape or a click outside mid-range closes and leaves the committed
          range in place in one press, through Calendar&rsquo;s reset commit
          behaviour: the app never sees a half-selection.
        </p>
        <Preview>
          <TripDatesExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          <code>error</code> is the app&rsquo;s message and wins over the
          built-in ones. <code>loading</code> replaces the calendar button with
          a spinner in the same footprint, red when the field shows an error, so
          opening is blocked and the end slot has nothing to hover or tab to. It
          also makes the segments read-only, hides the clear button, and sets{' '}
          <code>aria-busy</code>. <code>disabled</code> takes the whole field
          out of the tab order. The last field below holds a Saturday against an{' '}
          <code>isDateDisabled</code> that refuses weekends, so it renders
          rejected: the invalid ring, the built-in{' '}
          <code>unavailableMessage</code>, and nothing posted. A reversed range
          shows <code>rangeOrderMessage</code> instead. Both are props, so they
          translate.
        </p>
        <Preview>
          <StatesExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Description</h2>
        <p className="text-muted-foreground">
          <code>description</code> is helper text in muted type directly under
          the box, and it joins the group&rsquo;s accessible description, so a
          screen reader reads it with the field. It stays put when an error or a
          rejected entry arrives: the message renders below it, and a screen
          reader hears the message first, then the description. A disabled field
          dims its description with its label.
        </p>
        <Preview>
          <DescriptionExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Props</h2>
        <p className="text-muted-foreground">
          One export, <code>DatePicker</code>. <code>mode</code> is{' '}
          <code>DatePickerMode.Single</code> by default or{' '}
          <code>DatePickerMode.Range</code>, and the value, the handler, and the
          name props follow it: <code>name</code> in single mode,{' '}
          <code>startName</code> and <code>endName</code> in range mode. The
          field family props are <code>label</code>, <code>labelPlacement</code>
          , <code>error</code>, <code>description</code>, <code>disabled</code>,{' '}
          <code>required</code>, <code>readOnly</code>, <code>id</code>,{' '}
          <code>size</code> (<code>DatePickerSize.Default</code> or{' '}
          <code>Small</code>, Select&rsquo;s trigger geometry), and{' '}
          <code>loading</code>. <code>min</code>, <code>max</code>,{' '}
          <code>isDateDisabled</code>, and <code>locale</code> reach the
          segments and the grid alike. <code>side</code> and <code>align</code>{' '}
          position the panel and default to <code>bottom</code> and{' '}
          <code>center</code> per ADR 0005.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A partly typed entry is silent.
          </strong>{' '}
          No ring, no message, no <code>onChange</code>, and the hidden inputs
          stay empty until every segment is filled — the year included, so
          typing <code>2</code>, <code>0</code>, <code>2</code>, <code>6</code>{' '}
          reports once rather than four times. A complete entry the constraints
          refuse is a rejected entry: the box takes the invalid ring and{' '}
          <code>aria-invalid</code>, the built-in message renders, and{' '}
          <code>onChange</code> still does not fire. Nothing is posted either
          way, so a form cannot submit a value the field refused.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Structure</h2>
        <p className="text-muted-foreground">
          One bordered box holds the segments and the end slot. The box draws
          the boundary ring on <code>focus-within</code>, per ADR 0003: the
          segments are what take focus, and they own no border to replace. The
          end slot holds the clear button, then the calendar icon button, both
          ghost buttons at Button&rsquo;s <code>field-icon</code> size, so each
          sits 4px inside the box&rsquo;s top, bottom, and right edges with its
          corners rounded to match. Neither draws a focus ring: tabbing to one
          paints its hover fill, and the box&rsquo;s own ring stays on. Clear
          shows once a value is set, on a field that is not{' '}
          <code>required</code>, <code>readOnly</code>, <code>loading</code>, or{' '}
          <code>disabled</code> &mdash; every state where emptying the value is
          not the user&rsquo;s to do. Behind the box sit visually hidden native
          inputs carrying the ISO values, the names, and <code>required</code>,
          so the browser&rsquo;s own constraint validation blocks the submit and
          puts its bubble at the field. A <code>readOnly</code> field is exempt
          from that check, as a read-only native control is: the user has no way
          to satisfy it.
        </p>
        <p className="text-muted-foreground">
          The panel is the Radix popover primitive, portalled to{' '}
          <code>document.body</code> with <code>sideOffset</code> 8, flipping
          then shifting at a viewport edge. Calendar is its only content: one
          month in single mode, two in range mode, no footer and no actions.
          Focus lands on the selected day, or today when the field is empty.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Keyboard</h2>
        <p className="text-muted-foreground">
          Tab enters the first segment, then each segment in turn, then the
          clear button when it is shown, then the calendar button. In a segment,
          digits type, ArrowUp and ArrowDown step, ArrowLeft and ArrowRight move
          between segments, and Backspace clears. Alt+ArrowDown opens the panel
          from anywhere in the box; Enter and Space open it from the calendar
          button. Inside the panel the map is React Aria&rsquo;s, unmodified.
          Clearing keeps focus on the clear button until it hides, then moves to
          the calendar button.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            In range mode the two groups are two date fields, not one.
          </strong>{' '}
          React Aria ships no <code>DateRangeField</code>, so ArrowRight at the
          end of the start group stops there and Tab is the way across. Screen
          readers hear the group, then &ldquo;Start date&rdquo; and &ldquo;End
          date&rdquo;, then each segment.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The panel runs the ADR 0005 anchored pair, 250ms bouncing in from{' '}
          <code>scale-96</code> at the popper origin and 150ms settling out, as
          a CSS keyframe Radix waits on. The grid&rsquo;s motion is
          Calendar&rsquo;s and date-picker adds none. The focused
          segment&rsquo;s colour and the box border move at{' '}
          <code>--motion-fast</code>. Messages ride{' '}
          <code>FieldErrorMessage</code>&rsquo;s settle. The clear button and
          the spinner swap instantly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Measured against this theme&rsquo;s palette with an OKLCH-to-sRGB
          contrast check. A filled segment sits at 18.25:1 on the white box; a
          placeholder segment and the dash at 7.44:1; the invalid ring at
          4.57:1. The icon buttons sit at 7.44:1 at rest and 11.96:1 on the fill
          they share between hover and focus.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            The focused segment paints <code>--primary-text</code>.
          </strong>{' '}
          It is orange-700, the step that carries orange as text, and sits at
          5.23:1 on the white box, clearing WCAG AA (ADR 0004).
        </p>
      </section>
    </article>
  )
}

const localToday = today(getLocalTimeZone())

const nextWeekendDay = localToday.add({
  days: 6 - getDayOfWeek(localToday, 'en-US'),
})

function DepartureExample() {
  const [departure, setDeparture] = useState<string | null>(
    localToday.add({ days: 3 }).toString(),
  )

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <DatePicker
        label="Departure"
        name="departure"
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

function TripDatesExample() {
  const [tripDates, setTripDates] = useState<DatePickerRange | null>({
    start: localToday.add({ days: 9 }).toString(),
    end: localToday.add({ days: 16 }).toString(),
  })

  return (
    <div className="flex w-full max-w-80 flex-col gap-4">
      <DatePicker
        label="Intake dates"
        mode={DatePickerMode.Range}
        startName="intakeStart"
        endName="intakeEnd"
        value={tripDates}
        onChange={setTripDates}
        min={localToday.toString()}
      />
      <p className="text-muted-foreground text-sm">
        {tripDates
          ? `${tripDates.start} to ${tripDates.end}.`
          : 'No dates picked.'}
      </p>
    </div>
  )
}

function DescriptionExample() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-6">
      <DatePicker
        label="Departure"
        defaultValue={localToday.add({ days: 3 }).toString()}
        description="The day you fly out"
      />
      <DatePicker
        label="Departure"
        defaultValue={localToday.add({ days: 3 }).toString()}
        description="The day you fly out"
        error="That flight is sold out"
      />
    </div>
  )
}

function StatesExample() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-6">
      <DatePicker
        label="Departure"
        defaultValue={localToday.add({ days: 3 }).toString()}
        error="That flight is sold out"
      />
      <DatePicker label="Departure" loading />
      <DatePicker
        label="Departure"
        disabled
        defaultValue={localToday.add({ days: 3 }).toString()}
      />
      <DatePicker
        label="Departure"
        defaultValue={nextWeekendDay.toString()}
        isDateDisabled={(date) => isWeekend(parseDate(date), 'en-US')}
      />
    </div>
  )
}
