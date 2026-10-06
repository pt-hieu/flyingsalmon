import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { CalendarDemo } from '@/examples/calendar/demo'
import demoSource from '@/examples/calendar/demo.tsx?raw'
import { CalendarDisabled } from '@/examples/calendar/disabled'
import disabledSource from '@/examples/calendar/disabled.tsx?raw'
import { CalendarLocale } from '@/examples/calendar/locale'
import localeSource from '@/examples/calendar/locale.tsx?raw'
import { CalendarRangeExample } from '@/examples/calendar/range'
import rangeSource from '@/examples/calendar/range.tsx?raw'
import { CalendarReadOnly } from '@/examples/calendar/read-only'
import readOnlySource from '@/examples/calendar/read-only.tsx?raw'
import { CalendarUnavailableDays } from '@/examples/calendar/unavailable-days'
import unavailableDaysSource from '@/examples/calendar/unavailable-days.tsx?raw'
import usageSource from '@/examples/calendar/usage.tsx?raw'
import guidelines from '@/registry/ui/calendar/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  return (
    <DocPage
      title="Calendar"
      lead="A month grid the traveller picks one day or a range from."
      preview={{ source: demoSource, demo: <CalendarDemo /> }}
      installation="calendar"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="A range"
            description="Two taps is the range path: one on the first day, one on the last. Dragging across the grid works too. While the first day is anchored, the pointer or the keyboard cursor previews the range, and Escape drops the anchor."
            source={rangeSource}
          >
            <CalendarRangeExample />
          </Example>

          <Example
            caption="Unavailable days"
            description="isDateDisabled receives each day as an ISO string and strikes the ones it refuses. They stay reachable by arrow key but cannot be selected. Weekends are struck here."
            source={unavailableDaysSource}
          >
            <CalendarUnavailableDays />
          </Example>

          <Example
            caption="Locale"
            description="The locale sets the weekday names, the heading, and the first day of the week. Under de-DE the week opens on Monday."
            source={localeSource}
          >
            <CalendarLocale />
          </Example>

          <Example
            caption="Disabled"
            description="The whole calendar dims, both month buttons disable, and the grid leaves the tab order."
            source={disabledSource}
          >
            <CalendarDisabled />
          </Example>

          <Example
            caption="Read-only"
            description="The grid stays reachable and shows the value, but nothing can change it. Say in the surrounding copy why the date is fixed."
            source={readOnlySource}
          >
            <CalendarReadOnly />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Reaches the previous button, the next button, and then the grid as one stop, landing on the selected day or today.',
              },
              {
                keys: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
                description:
                  'Moves across days and weeks, and pages the grid at a month edge.',
              },
              {
                keys: ['PageUp', 'PageDown'],
                description: 'Moves one month back or forward.',
              },
              {
                keys: ['Shift+PageUp', 'Shift+PageDown'],
                description: 'Moves one year back or forward.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Goes to the first or last day of the month.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Selects the focused day. In a range, the first press anchors and the second commits.',
              },
              {
                keys: ['Escape'],
                description:
                  'Drops an anchored range start without calling onChange.',
              },
            ]}
          />
          <p>
            Screen readers hear the grid&rsquo;s name with the visible month,
            each day with its weekday and its today, selected, or unavailable
            status, and the range announcements the underlying library provides.
            Focus is the highlight: a focused day steps one shade deeper on its
            own tint, with no ring. For the field that wraps this grid, see{' '}
            <TextLink asChild>
              <Link to="/components/date-picker">Date picker</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <PropsTable
          component="Calendar"
          description={
            <>
              <code>mode</code> selects the value shape, and the value and
              handler types follow it.
            </>
          }
          rows={[
            {
              name: 'aria-label',
              type: 'string',
              required: true,
              description:
                'The grid’s accessible name. Required, because the grid has no visible label: a screen reader announces it with the visible month.',
            },
            {
              name: 'mode',
              type: 'CalendarMode',
              default: 'CalendarMode.Single',
              description: 'Single takes one day. Range takes a pair.',
            },
            {
              name: 'value',
              type: 'string | CalendarRange | null',
              description:
                'The controlled value: an ISO YYYY-MM-DD day, { start, end }, or null. Pass null to clear it: pressing the selected day again keeps it selected, so the grid never empties itself.',
            },
            {
              name: 'onChange',
              type: '(value) => void',
              description:
                'Reports the selection as ISO YYYY-MM-DD days. In range mode it fires once, on commit, with start never after end.',
            },
            {
              name: 'months',
              type: '1 | 2',
              default: '1',
              description:
                'How many months show side by side. They page together.',
            },
            {
              name: 'locale',
              type: 'string',
              default: '"en-US"',
              description:
                'Sets the weekday names, the heading, and the week start.',
            },
            {
              name: 'min, max',
              type: 'string',
              description:
                'ISO YYYY-MM-DD bounds. Days outside them are struck through, and the month buttons disable at the edge.',
            },
            {
              name: 'isDateDisabled',
              type: '(date: string) => boolean',
              description: 'Strikes the days it refuses.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the calendar, disables the month buttons, and leaves the tab order.',
            },
            {
              name: 'readOnly',
              type: 'boolean',
              default: 'false',
              description: 'Keeps the grid reachable but unchangeable.',
            },
            {
              name: 'autoFocus',
              type: 'boolean',
              default: 'false',
              description: 'Focuses the grid on mount.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Values are ISO <code>YYYY-MM-DD</code> strings because a trip date
            is a calendar day, not an instant, so no time zone shifts it, and it
            posts straight into a hidden native input.
          </p>
          <p>
            The visible month derives from the value, else today, else{' '}
            <code>min</code>. There is no visible-month control, no week-start
            prop, and no range-length limit: the week start follows the locale.
            The locale reaches the grid through the library&rsquo;s own
            provider, so the server and the client agree.
          </p>
          <p>
            Calendar draws no border and no background; the host owns the
            surface. Cells are 36px and the grid is always six rows, so the
            height never changes between months. Days outside the month are
            empty, unfocusable cells. Every paint sits 2px inside the cell, so a
            filled day is a 32px rounded square and neighbours never touch. The
            range band runs edge to edge between its endpoints with the same 2px
            inset above and below, and the endpoints fill{' '}
            <code>--indicator</code> with the edge facing the band flattened.
            Today wears a dash under its numeral.
          </p>
          <p>
            Hover and keyboard focus paint one background step and no ring: an
            idle day steps to <code>--accent</code>, a day inside the band one
            shade deeper, and a filled endpoint to the step every
            indicator-filled surface uses. There is no press ring, because the
            fill changing under the pointer is the feedback.
          </p>
          <p>
            A month change slides the incoming grid in from 16px on the side it
            came from, with a fade, 250ms on the bounce curve; the heading fades
            in at <code>--motion-fast</code>. The weekday header, the buttons,
            and the height stay still, and nothing exits, because the outgoing
            cells read the visible month from the library&rsquo;s context and a
            held-back copy would repaint onto the new month. Selection, the
            band, hover, and focus snap. An endpoint&rsquo;s corners round or
            square and its flat edge slides at <code>--motion-fast</code> as the
            range grows or shrinks. Calendar has no <code>motion</code>{' '}
            dependency.
          </p>
          <p>
            Measured contrast: numerals sit at 18.25:1 on <code>--popover</code>
            , 17.20:1 on <code>--background</code>, and 13.46:1 on the range
            band. Muted weekday and unavailable text sits at 7.44:1 on{' '}
            <code>--popover</code> and 7.01:1 on <code>--background</code>. The
            white numeral on a filled day sits at 3.59:1, and 5.23:1 on its
            hover step, which is below AA for text. A keyboard-focused
            unavailable day takes <code>--accent-foreground</code> on{' '}
            <code>--accent</code> at 11.96:1. The today dash sits at 3.59:1 on{' '}
            <code>--popover</code> and 3.38:1 on <code>--background</code>,
            clearing the 3:1 non-text bar, and drops to 2.65:1 on a hovered idle
            day or inside the band and 2.11:1 on the band&rsquo;s hover step.
          </p>
        </>
      }
      related={[
        {
          to: '/components/date-picker',
          label: 'Date picker',
          description:
            'The form field that hosts this grid in a floating panel.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'How the registry measures contrast and handles focus.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The spring presets and durations behind the paging.',
        },
      ]}
    />
  )
}
