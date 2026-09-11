import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Alert, AlertVariant } from '@/registry/ui/alert'
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectSize,
} from '@/registry/ui/select'

export const Route = createFileRoute('/components/select')({
  component: SelectPage,
})

function SelectPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Select
        </h1>
        <p className="text-muted-foreground text-lg">
          A form field that opens a list and takes exactly one value. It reads
          like Input at the call site: a label, an error message, and its own
          busyness.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          Select renders a wrapper around the trigger so it can hold the label
          and the error message, the same as Input.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the trigger.
          </strong>{' '}
          Only <code>Select</code>, <code>SelectItem</code>,{' '}
          <code>SelectGroup</code>, <code>SelectLabel</code>, and{' '}
          <code>SelectSeparator</code> are exported — the Radix trigger, value,
          portal, content, and viewport stay internal.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two trigger sizes match Input and Button. Items inside the panel stay
          32px at both sizes — a list is dense by nature and does not follow the
          trigger's height.
        </p>
        <ModePreview>
          <Select
            className="w-64"
            label="Currency"
            placeholder="Choose a currency"
          >
            <SelectItem value="usd">US Dollar</SelectItem>
            <SelectItem value="eur">Euro</SelectItem>
            <SelectItem value="vnd">Vietnamese Dong</SelectItem>
          </Select>
          <Select
            className="w-64"
            size={SelectSize.Small}
            label="Currency"
            placeholder="Choose a currency"
          >
            <SelectItem value="usd">US Dollar</SelectItem>
            <SelectItem value="eur">Euro</SelectItem>
            <SelectItem value="vnd">Vietnamese Dong</SelectItem>
          </Select>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Groups, separators, and the checked item
        </h2>
        <p className="text-muted-foreground">
          <code>SelectGroup</code> takes a <code>SelectLabel</code> as its
          heading and separates from the next group with a{' '}
          <code>SelectSeparator</code>. The checked item shows a{' '}
          <code>text-primary</code> check in a reserved trailing icon slot, so
          every item label starts at the same left edge. An item's{' '}
          <code>icon</code> sits ahead of the label, hidden from screen readers
          so only the label is read, and stays in the list: the trigger shows
          the label alone. A disabled item stays in the list, dimmed, so its
          position never shifts. Open the trigger below to see all of it.
        </p>
        <ModePreview>
          <Select
            className="w-64"
            label="Destination"
            placeholder="Choose a destination"
            defaultValue="paris"
          >
            <SelectGroup>
              <SelectLabel>Popular</SelectLabel>
              <SelectItem value="tokyo" icon={<Star />}>
                Tokyo
              </SelectItem>
              <SelectItem value="paris" icon={<Star />}>
                Paris
              </SelectItem>
              <SelectItem value="reykjavik" icon={<Star />} disabled>
                Reykjavík (sold out)
              </SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>More</SelectLabel>
              <SelectItem value="lisbon" icon={<MapPin />}>
                Lisbon
              </SelectItem>
              <SelectItem value="hanoi" icon={<MapPin />}>
                Hanoi
              </SelectItem>
            </SelectGroup>
          </Select>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">
          Pass <code>error</code> and the trigger takes the destructive border
          and ring, the label turns destructive, and the message renders below
          the trigger — it may be covered while the panel is open, and reappears
          once it closes.
        </p>
        <ModePreview>
          <Select
            className="w-64"
            label="Currency"
            placeholder="Choose a currency"
            error="Choose a supported currency"
          >
            <SelectItem value="usd">US Dollar</SelectItem>
            <SelectItem value="eur">Euro</SelectItem>
            <SelectItem value="vnd">Vietnamese Dong</SelectItem>
          </Select>
          <Select
            className="w-64"
            size={SelectSize.Small}
            label="Currency"
            placeholder="Choose a currency"
            error="Choose a supported currency"
          >
            <SelectItem value="usd">US Dollar</SelectItem>
            <SelectItem value="eur">Euro</SelectItem>
            <SelectItem value="vnd">Vietnamese Dong</SelectItem>
          </Select>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> swaps the chevron for a spinner and keeps the
          trigger focusable with its value visible; opening is a no-op while the
          request runs.{' '}
          <strong className="text-foreground">
            The field shows its own busyness, and the app shows the result.
          </strong>{' '}
          Choosing "Urgent" below fails a fake approval check and the field
          reports it through its own <code>error</code>; every other choice
          succeeds and the result shows inline through Alert, after the field
          settles.
        </p>
        <ModePreview>
          <TicketPriorityDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Long lists scroll and truncate
        </h2>
        <p className="text-muted-foreground">
          The panel matches the trigger's width and scrolls inside a max height
          with no scroll buttons, so a long list like airports stays inside the
          viewport. Long item text truncates with an ellipsis, and the trigger
          truncates the chosen label the same way.
        </p>
        <ModePreview>
          <AirportSelectDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Hover border and focus ring are CSS transitions at{' '}
          <code>--motion-fast</code>, matching Input. The chevron rotates 180
          degrees on open, a CSS transition at <code>--motion-base</code> — the
          one select-specific cue. The panel's enter and exit are the floating
          item's anchored keyframe pair: scale from <code>0.96</code> plus fade,
          250ms on the bounce curve in and 150ms on the settle curve out,
          growing from the trigger. Menu items snap to their highlighted state
          with no transition, and the check mark shows no animation of its own —
          the panel closes the moment it appears.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Select generates the trigger <code>id</code> and wires the label
          itself, so clicking the label focuses the trigger without opening the
          panel. Enter, Space, ArrowUp, and ArrowDown open a closed trigger and
          never change the value on their own; once open, arrow keys, Home, End,
          and typeahead move the highlight, and Enter or Space chooses and
          closes. Escape and an outside click back out with no change, and focus
          always returns to the trigger. An error sets <code>aria-invalid</code>{' '}
          and links the message through <code>aria-describedby</code>. A loading
          trigger sets <code>aria-busy</code> and stays in the tab order;
          disabled removes it. A plain form posts the chosen value through
          Radix's hidden native <code>&lt;select&gt;</code>, and{' '}
          <code>required</code> marks the label, sets <code>aria-required</code>
          , and participates in native validation.
        </p>
      </section>
    </article>
  )
}

function TicketPriorityDemo() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const requestTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => () => clearTimeout(requestTimeout.current), [])

  function submitPriority(nextPriority: string) {
    setLoading(true)
    setError(undefined)
    setResult(null)

    requestTimeout.current = setTimeout(() => {
      setLoading(false)

      if (nextPriority === 'urgent') {
        setError("Urgent tickets need a manager's approval first")
        return
      }

      setResult('Priority updated')
    }, 1200)
  }

  return (
    <div className="flex w-64 flex-col gap-3">
      <Select
        label="Priority"
        placeholder="Choose a priority"
        error={error}
        loading={loading}
        onValueChange={submitPriority}
      >
        <SelectItem value="low">Low</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="urgent">Urgent</SelectItem>
      </Select>

      {result ? <Alert variant={AlertVariant.Success}>{result}</Alert> : null}
    </div>
  )
}

function AirportSelectDemo() {
  return (
    <Select
      className="w-64"
      label="Departure airport"
      placeholder="Choose an airport"
    >
      <SelectGroup>
        <SelectLabel>Recent</SelectLabel>
        <SelectItem value="sgn">
          Tan Son Nhat International Airport (SGN)
        </SelectItem>
        <SelectItem value="nrt">Narita International Airport (NRT)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>All airports</SelectLabel>
        <SelectItem value="lhr">London Heathrow Airport (LHR)</SelectItem>
        <SelectItem value="cdg">
          Paris Charles de Gaulle Airport (CDG)
        </SelectItem>
        <SelectItem value="dxb">Dubai International Airport (DXB)</SelectItem>
        <SelectItem value="sin">Singapore Changi Airport (SIN)</SelectItem>
        <SelectItem value="hnd">Tokyo Haneda Airport (HND)</SelectItem>
        <SelectItem value="ist">Istanbul Airport (IST)</SelectItem>
        <SelectItem value="fra">Frankfurt Airport (FRA)</SelectItem>
        <SelectItem value="ams">Amsterdam Airport Schiphol (AMS)</SelectItem>
        <SelectItem value="lax">
          Los Angeles International Airport (LAX)
        </SelectItem>
        <SelectItem value="jfk">
          John F. Kennedy International Airport (JFK)
        </SelectItem>
      </SelectGroup>
    </Select>
  )
}
