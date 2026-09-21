import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '@/registry/ui/accordion'
import { Alert, AlertSize, AlertVariant } from '@/registry/ui/alert'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { Badge, BadgeVariant } from '@/registry/ui/badge'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Checkbox } from '@/registry/ui/checkbox'
import { Input } from '@/registry/ui/input'

export const Route = createFileRoute('/_docs/components/accordion')({
  component: AccordionPage,
})

function AccordionPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Accordion
        </h1>
        <p className="text-muted-foreground text-lg">
          Progressive disclosure in a vertical stack. Use it when extra
          information helps some readers but not all, and the page should stay
          clean without it. It peers to tabs and never substitutes for it: tabs
          switch between co-equal views, accordion reveals secondary content
          that stays in document flow.
        </p>
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">
            There is no standalone collapsible.
          </strong>{' '}
          A one-item accordion with <code>type=&quot;single&quot;</code> covers
          that need.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Several open at once
        </h2>
        <p className="text-muted-foreground">
          The default. <code>type</code> is <code>multiple</code> and{' '}
          <code>collapsible</code> is <code>true</code>, so the common case
          needs no props at all: every item opens and closes on its own.{' '}
          <code>defaultValue</code> takes an array of item values to open on
          first render, so two of the three below start open.
        </p>
        <ModePreview>
          <Accordion
            className="w-full max-w-sm"
            defaultValue={['shipping', 'warranty']}
          >
            <AccordionItem value="shipping">
              <AccordionTrigger>How does shipping work?</AccordionTrigger>
              <AccordionContent>
                Orders leave the warehouse within two working days and arrive
                inside a week, tracked from the moment they ship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Can I return an order?</AccordionTrigger>
              <AccordionContent>
                Anything unopened comes back within thirty days for a full
                refund. Start the return from your order history.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty">
              <AccordionTrigger>What does the warranty cover?</AccordionTrigger>
              <AccordionContent>
                Two years against manufacturing defects, parts and labour
                included.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          One at a time, and collapsible
        </h2>
        <p className="text-muted-foreground">
          <code>type=&quot;single&quot;</code> closes the open panel when
          another opens. <code>collapsible</code> stays <code>true</code> by
          default, so pressing the open item closes it and the stack can rest
          with nothing open. Pass <code>collapsible={'{false}'}</code> when one
          panel must always be visible.
        </p>
        <ModePreview>
          <Accordion
            className="w-full max-w-sm"
            type={AccordionType.Single}
            defaultValue="itinerary"
          >
            <AccordionItem value="itinerary">
              <AccordionTrigger>Itinerary</AccordionTrigger>
              <AccordionContent>
                Four days in Kyoto, then two in Osaka, with the train booked
                between them.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="budget">
              <AccordionTrigger>Budget</AccordionTrigger>
              <AccordionContent>
                Flights and lodging are paid. Meals and local transport are
                estimated per day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="packing">
              <AccordionTrigger>Packing list</AccordionTrigger>
              <AccordionContent>
                One carry-on each, rain shell, and an adapter for the two-pin
                sockets.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A disabled item</h2>
        <p className="text-muted-foreground">
          <code>disabled</code> on an item dims its trigger to half opacity,
          takes its pointer events away, and drops it from the arrow path. An
          item disabled while open{' '}
          <strong className="text-foreground">keeps its panel readable</strong>{' '}
          &mdash; disabling never hides content. <code>disabled</code> on the
          root cascades to every trigger.
        </p>
        <ModePreview>
          <Accordion className="w-full max-w-sm" defaultValue={['receipt']}>
            <AccordionItem value="receipt" disabled>
              <AccordionTrigger>Receipt</AccordionTrigger>
              <AccordionContent>
                Issued on 3 May and already sent to your email; it cannot be
                edited.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery">
              <AccordionTrigger>Delivery</AccordionTrigger>
              <AccordionContent>
                Left with the concierge, signed for at 14:20.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Triggers that carry more than a label
        </h2>
        <p className="text-muted-foreground">
          A trigger takes any phrasing content, so a row can hold a status
          badge, a stacked summary line, or a title long enough to wrap.{' '}
          <strong className="text-foreground">
            The chevron sits on the first line of the label, not in the middle
            of the block
          </strong>{' '}
          &mdash; a wrapped question and a two-line label both keep the
          affordance where the eye starts reading. Everything you pass lands
          inside the heading, so keep it to text and spans; a nested button is
          not allowed inside the trigger.
        </p>
        <ModePreview>
          <Accordion className="w-full max-w-sm" defaultValue={['flights']}>
            <AccordionItem value="flights">
              <AccordionTrigger>
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    Flights
                    <Badge variant={BadgeVariant.Success}>Booked</Badge>
                  </span>
                  <span className="text-muted-foreground font-sans text-sm font-normal">
                    Haneda to Itami, 12 April, two seats
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Seats 14A and 14B, checked bags included. The airline releases
                boarding passes a day before departure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="documents">
              <AccordionTrigger>
                What documents do I need at the border, and how far ahead should
                I apply for them?
              </AccordionTrigger>
              <AccordionContent>
                A passport valid for six more months, and a visa applied for at
                least three weeks before you fly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="party">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  Travellers
                  <Badge variant={BadgeVariant.Secondary}>3</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-2">
                  <Avatar
                    size={AvatarSize.Small}
                    name="Mai Tran"
                    color={AvatarColor.Teal}
                  />
                  <Avatar
                    size={AvatarSize.Small}
                    name="Ken Sato"
                    color={AvatarColor.Amber}
                  />
                  <Avatar
                    size={AvatarSize.Small}
                    name="Ana Lopez"
                    color={AvatarColor.Pink}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Panels that do work</h2>
        <p className="text-muted-foreground">
          A panel is a plain container: fields, choices, and actions all belong
          in one. The panel measures itself when it opens and settles at{' '}
          <code>height: auto</code>, so content that appears afterwards &mdash;
          a validation message, an inline result &mdash; grows the panel instead
          of being clipped.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A result stays inside the panel that produced it.
          </strong>{' '}
          The acting surface owns its own outcome (ADR 0008), so the alert below
          sits under the actions row, in view, and stays until the reader has
          seen it. Controls inside a panel keep their own hover and focus states
          and leave the item&rsquo;s divider alone &mdash; only the trigger
          steps it.
        </p>
        <ModePreview>
          <WorkingPanelsDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Driven from outside</h2>
        <p className="text-muted-foreground">
          Pair <code>value</code> with <code>onValueChange</code> and the open
          set becomes the app&rsquo;s state: expand all, collapse all, or open
          the one item a search matched. Under <code>multiple</code> both speak
          an array, so &ldquo;expand all&rdquo; is the list of every item value
          and &ldquo;collapse all&rdquo; is the empty array. Keep the array
          identity stable across renders &mdash; pass state, not a literal built
          in render.
        </p>
        <ModePreview>
          <ControlledAccordionDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Props</h2>
        <p className="text-muted-foreground">
          Four parts: <code>Accordion</code>, <code>AccordionItem</code>,{' '}
          <code>AccordionTrigger</code>, and <code>AccordionContent</code>. The
          root takes <code>type</code> (<code>multiple</code> by default),{' '}
          <code>collapsible</code> (<code>true</code> by default),{' '}
          <code>value</code>, <code>defaultValue</code>,{' '}
          <code>onValueChange</code>, and <code>disabled</code>, all forwarded
          to Radix. <code>orientation</code> and <code>dir</code> are not
          exposed: the accordion is vertical only.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Controlled usage pairs <code>value</code> with{' '}
            <code>onValueChange</code>.
          </strong>{' '}
          Under <code>multiple</code> both speak an array of item values; under{' '}
          <code>single</code> both speak one value string, and an empty string
          means nothing is open. <code>AccordionItem</code> requires{' '}
          <code>value</code> and takes <code>disabled</code>.{' '}
          <code>AccordionTrigger</code> renders its label inside an{' '}
          <code>h3</code>; pass <code>asChild</code> with your own heading
          element to place the row at a different level in the document outline.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Surface</h2>
        <p className="text-muted-foreground">
          A divider list. Each item draws a 1px <code>--border</code> bottom
          edge and nothing else &mdash; no outer border, no surface step, no
          horizontal padding &mdash; so the stack sits flush with its container.
          A boxed accordion is the consumer&rsquo;s call: wrap it in card
          content. Hover and keyboard focus paint the same pair at{' '}
          <code>--motion-fast</code>: the item&rsquo;s divider steps to{' '}
          <code>--indicator</code>, and so does the chevron. There is no
          background step, no underline, and no ring in either state. The row
          draws no press ring either &mdash; it toggles on click and has nothing
          to hold, the same ground as a menu item.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            The divider answers to the trigger, not the panel.
          </strong>{' '}
          The item watches its own{' '}
          <code>[data-slot=&quot;accordion-trigger&quot;]</code> for hover and
          for <code>:focus-visible</code>, so a hovered or focused control
          inside an open panel leaves the divider at rest &mdash; checkboxes,
          fields, and buttons included. Only the row that opens the panel claims
          the divider under it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Height only, from <code>0</code> to the Radix content height, with the
          panel clipped while it travels. Both directions run 150ms on{' '}
          <code>spring-settle</code>, transcribed to the <code>linear()</code>{' '}
          string the floating layer exits on. A panel displaces everything below
          it, and ADR 0001 keeps bounce off any dimension that does that: an
          overshooting height would push the panels under it past their place
          and drag them back, which reads as a glitch rather than play. There is
          no opacity fade either &mdash; a panel that fades while it grows reads
          as two effects fighting.
        </p>
        <p className="text-muted-foreground">
          The height runs on CSS keyframes and Radix owns mount and unmount
          &mdash; no <code>forceMount</code>, no <code>AnimatePresence</code>,
          no <code>layout</code> prop, no open state of the component&rsquo;s
          own. The chevron rotates 180 degrees on <code>--motion-base</code>,
          select&rsquo;s rotation rule, with a color step to{' '}
          <code>--indicator</code> riding beside it at{' '}
          <code>--motion-fast</code>; rotation and height share the 150ms, so
          the row and its panel come to rest together.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Every trigger sits inside a heading, so the document outline survives.
          Tab moves between triggers, Up and Down walk the stack, Home and End
          jump to the first and last, Enter and Space toggle, and a disabled
          trigger is skipped. Focus never enters a closed panel. Each trigger
          carries <code>aria-expanded</code>, and its panel is a region labelled
          by the trigger.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A panel reserves room for the rings inside it.
          </strong>{' '}
          The panel clips itself so the height animation has an edge, which
          would cut the ring off a full-width field or a right-aligned button
          sitting flush against it. So the panel carries 6px of horizontal
          clearance &mdash; padding inside the clip, a matching negative margin
          outside it &mdash; the same trade the dialog body makes on its
          vertical axis. Content still lines up flush with the dividers.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            The trigger draws no focus ring.
          </strong>{' '}
          A borderless row has no border to replace and no room for an offset
          ring without covering its neighbours, and an inset ring reads as a box
          around a row that has no box. So keyboard focus paints what hover
          paints: the item&rsquo;s divider and the row&rsquo;s chevron both step
          to <code>--indicator</code> (ADR 0003). The chevron is the half that
          stays inside the row when the panel is open and the divider sits below
          it. WCAG 2.4.7 asks for a visible focus indicator, not a ring &mdash;
          the same ground tabs stands on.
        </p>
        <p className="text-muted-foreground">
          Measured against this theme&rsquo;s own palette steps with an
          OKLCH-to-sRGB contrast check: the stepped divider and the stepped
          chevron are 3.17:1 on the light background and 5.75:1 on the dark one,
          the trigger label 18.25:1 and 17.48:1, the chevron at rest 5.17:1 and
          7.04:1 &mdash; every pair clears WCAG AA in both modes, with the light
          step passing the 3:1 non-text bar it was flagged as tight against.
          Resting dividers are decorative and exempt.
        </p>
      </section>
    </article>
  )
}

const packingChecklist = [
  { value: 'adapter', label: 'Two-pin adapter' },
  { value: 'shell', label: 'Rain shell' },
  { value: 'passport', label: 'Passport and copies' },
]

function WorkingPanelsDemo() {
  const [note, setNote] = useState('')
  const [noteError, setNoteError] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedNote, setSavedNote] = useState('')
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
    }
  }, [])

  return (
    <Accordion className="w-full max-w-sm" defaultValue={['note']}>
      <AccordionItem value="note">
        <AccordionTrigger>Note for the host</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Input
              label="Arrival note"
              placeholder="Landing late, around 23:00"
              value={note}
              error={noteError}
              onChange={(event) => {
                setNote(event.target.value)
                setNoteError('')
              }}
            />
            <div className="flex justify-end">
              <Button
                size={ButtonSize.Small}
                loading={saving}
                onClick={() => {
                  if (!note.trim()) {
                    setNoteError('Write the note before sending it.')
                    return
                  }
                  setSavedNote('')
                  setSaving(true)
                  saveTimeout.current = setTimeout(() => {
                    setSaving(false)
                    setSavedNote(note)
                  }, 1200)
                }}
              >
                Send to host
              </Button>
            </div>
            <Alert
              size={AlertSize.Small}
              variant={AlertVariant.Success}
              open={Boolean(savedNote) && !saving}
            >
              The host has your note.
            </Alert>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="packing">
        <AccordionTrigger>Packing list</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {packingChecklist.map((item) => (
              <Checkbox key={item.value} label={item.label} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="budget">
        <AccordionTrigger>Budget</AccordionTrigger>
        <AccordionContent>
          <dl className="flex flex-col gap-2">
            <div className="flex justify-between">
              <dt>Flights</dt>
              <dd className="text-foreground font-medium">$640</dd>
            </div>
            <div className="flex justify-between">
              <dt>Lodging</dt>
              <dd className="text-foreground font-medium">$520</dd>
            </div>
            <div className="flex justify-between">
              <dt>Daily spend</dt>
              <dd className="text-foreground font-medium">$70</dd>
            </div>
          </dl>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const itineraryDays = [
  {
    value: 'day-one',
    title: 'Day one, Kyoto',
    detail: 'Fushimi Inari at dawn, then Nishiki Market for lunch.',
  },
  {
    value: 'day-two',
    title: 'Day two, Arashiyama',
    detail: 'The bamboo grove early, monkeys after, river walk at dusk.',
  },
  {
    value: 'day-three',
    title: 'Day three, Osaka',
    detail: 'Train at nine, Dotonbori in the evening.',
  },
]

function ControlledAccordionDemo() {
  const [openDays, setOpenDays] = useState<string[]>(['day-one'])

  const allExpanded = openDays.length === itineraryDays.length

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-sm">
          {openDays.length} of {itineraryDays.length} open
        </span>
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Small}
          onClick={() =>
            setOpenDays(
              allExpanded ? [] : itineraryDays.map((day) => day.value),
            )
          }
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <Accordion value={openDays} onValueChange={setOpenDays}>
        {itineraryDays.map((day) => (
          <AccordionItem key={day.value} value={day.value}>
            <AccordionTrigger>{day.title}</AccordionTrigger>
            <AccordionContent>{day.detail}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
