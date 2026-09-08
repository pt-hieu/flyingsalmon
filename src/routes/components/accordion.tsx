import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '@/registry/ui/accordion'

export const Route = createFileRoute('/components/accordion')({
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
          content. Hover steps the item&rsquo;s divider to{' '}
          <code>--primary</code> and the chevron to <code>--foreground</code> at{' '}
          <code>--motion-fast</code>; there is no background step and no
          underline. The row draws no press ring &mdash; it toggles on click and
          has nothing to hold, the same ground as a menu item.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            The divider answers to the trigger, not the panel.
          </strong>{' '}
          Hovering an open panel leaves the divider at rest; a button you place
          inside a panel steps it, because the item&rsquo;s hover selector reads
          any hovered button it contains.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Height only, from <code>0</code> to the Radix content height, with the
          panel clipped while it travels. Opening runs 250ms on the bounce
          curve, closing 150ms on the settle curve &mdash; the same{' '}
          <code>linear()</code> strings the floating layer uses. The open curve
          peaks at 1.04, so the panel passes its settled height by 4 percent
          &mdash; two or three pixels on the panels above &mdash; for about 60ms
          before it comes back. There is no opacity fade: a panel that fades
          while it grows reads as two effects fighting.
        </p>
        <p className="text-muted-foreground">
          The height runs on CSS keyframes and Radix owns mount and unmount
          &mdash; no <code>forceMount</code>, no <code>AnimatePresence</code>,
          no <code>layout</code> prop, no open state of the component&rsquo;s
          own. The chevron rotates 180 degrees on <code>--motion-base</code>,
          select&rsquo;s rotation rule, with a color step to{' '}
          <code>--foreground</code> riding beside it at{' '}
          <code>--motion-fast</code>; it settles while the panel is still
          growing; that mismatch is deliberate and matches select.
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
          Focus draws a 2px <code>--primary</code> inset ring on the trigger,
          rounded on the radius scale. A borderless row inside a stack has no
          border to replace and no room for an offset ring without covering its
          neighbours, so the ring draws inside the row&rsquo;s own edge (ADR
          0003). Measured against this theme&rsquo;s own palette steps with an
          OKLCH-to-sRGB contrast check: the ring and the hover divider are
          3.17:1 on the light background and 5.75:1 on the dark one, the trigger
          label 18.25:1 and 17.48:1, the chevron 5.17:1 and 7.04:1 &mdash; every
          pair clears WCAG AA in both modes, with the light ring passing the 3:1
          non-text bar it was flagged as tight against. Resting dividers are
          decorative and exempt.
        </p>
      </section>
    </article>
  )
}
