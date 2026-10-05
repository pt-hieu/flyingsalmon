import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { AccordionControlled } from '@/examples/accordion/controlled'
import controlledSource from '@/examples/accordion/controlled.tsx?raw'
import { AccordionDemo } from '@/examples/accordion/demo'
import demoSource from '@/examples/accordion/demo.tsx?raw'
import { AccordionDisabled } from '@/examples/accordion/disabled'
import disabledSource from '@/examples/accordion/disabled.tsx?raw'
import { AccordionPanelsThatDoWork } from '@/examples/accordion/panels-that-do-work'
import panelsThatDoWorkSource from '@/examples/accordion/panels-that-do-work.tsx?raw'
import { AccordionRichTriggers } from '@/examples/accordion/rich-triggers'
import richTriggersSource from '@/examples/accordion/rich-triggers.tsx?raw'
import { AccordionSingle } from '@/examples/accordion/single'
import singleSource from '@/examples/accordion/single.tsx?raw'
import usageSource from '@/examples/accordion/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/accordion')({
  component: AccordionPage,
})

function AccordionPage() {
  return (
    <DocPage
      title="Accordion"
      lead="A vertical stack of headings that each reveal a panel, for secondary content that helps some readers and should not crowd the rest."
      preview={{ source: demoSource, demo: <AccordionDemo /> }}
      installation="accordion"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="One at a time"
            description={
              <>
                <code>type=&quot;single&quot;</code> closes the open panel when
                another opens. Pressing the open item closes it, so the stack
                can rest with nothing open. Pass{' '}
                <code>collapsible={'{false}'}</code> when one panel must always
                be visible.
              </>
            }
            source={singleSource}
          >
            <AccordionSingle />
          </Example>

          <Example
            caption="A disabled item"
            description="Disabling dims the trigger and drops it from the arrow path, but an open panel stays readable, because disabling never hides content."
            source={disabledSource}
          >
            <AccordionDisabled />
          </Example>

          <Example
            caption="Triggers that carry more than a label"
            description="A trigger takes any phrasing content: a status badge with a summary line, a title long enough to wrap, a count. The chevron stays on the first line, where the eye starts reading."
            source={richTriggersSource}
          >
            <AccordionRichTriggers />
          </Example>

          <Example
            caption="Panels that do work"
            description="A panel is a plain container for fields, choices, and actions. Send a note with nothing typed to see a field error, then with text to see the result appear under the actions row, inside the panel that produced it."
            source={panelsThatDoWorkSource}
          >
            <AccordionPanelsThatDoWork />
          </Example>

          <Example
            caption="Driven from outside"
            description="Pair value with onValueChange and the open set becomes the app's state: expand all, collapse all, or open the item a search matched."
            source={controlledSource}
          >
            <AccordionControlled />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For secondary information that helps some readers: an FAQ, the detail behind a booking, a packing list.',
          'When the page should stay clean without the extra content and the panels can stay in document flow.',
          'For a single collapsible region: a one-item accordion covers it, so there is no separate collapsible.',
        ],
        whenNotToUse: [
          {
            situation:
              'to switch between co-equal views of the same subject. Tabs swap the content in place, an accordion reveals more of it.',
            alternative: { to: '/components/tabs', label: 'Tabs' },
          },
          {
            situation:
              'for content every reader needs. Hiding it behind a click costs them a step.',
            alternative: { to: '/components/card', label: 'Card' },
          },
          {
            situation: 'for content that stops the page or needs an answer.',
            alternative: { to: '/components/dialog', label: 'Dialog' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep a result inside the panel that produced it.',
            reason:
              'The traveller is looking at that panel, so the result below the actions row is where it will be seen, and it stays until they have.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Write each trigger as a heading the reader can scan.',
            reason:
              'A closed accordion is the table of contents. A trigger that needs the panel to make sense hides the point.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put a button, a link, or a field inside a trigger.',
            reason:
              'The trigger is itself a button, and everything you pass lands inside its heading. Keep it to text, badges, and spans.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Box the stack or add a fill to open panels.',
            reason:
              'The accordion is a flush divider list. Wrap it in card content when you want a box.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab', 'Shift+Tab'],
                description:
                  'Moves between triggers. Focus never enters a closed panel.',
              },
              {
                keys: ['ArrowDown', 'ArrowUp'],
                description:
                  'Moves to the next or previous trigger, skipping disabled ones.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Jumps to the first or last trigger.',
              },
              {
                keys: ['Enter', 'Space'],
                description: 'Opens or closes the focused item.',
              },
            ]}
          />
          <p>
            Every trigger sits inside a heading, so the document outline
            survives, and carries <code>aria-expanded</code>. Its panel is a
            region labelled by the trigger. The trigger renders an{' '}
            <code>h3</code>; pass <code>asChild</code> with your own heading to
            place the row at another level.
          </p>
          <p>
            The trigger draws no focus ring. Keyboard focus paints what hover
            paints: the item&rsquo;s divider and the row&rsquo;s chevron step to
            the indicator colour. A borderless row has no border to replace, and
            an inset ring would read as a box around a row that has no box.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Accordion"
            description="The root. The accordion is vertical only, so orientation and dir are not exposed."
            rows={[
              {
                name: 'type',
                type: 'AccordionType',
                default: 'AccordionType.Multiple',
                description:
                  'Multiple lets every item open on its own. Single keeps one open at a time.',
              },
              {
                name: 'collapsible',
                type: 'boolean',
                default: 'true',
                description:
                  'With type single, whether pressing the open item closes it. Multiple items always collapse.',
              },
              {
                name: 'value',
                type: 'string[] | string',
                description:
                  'The open items when controlled: an array under multiple, one string under single, where an empty string means nothing is open.',
              },
              {
                name: 'defaultValue',
                type: 'string[] | string',
                description: 'The items open on first render.',
              },
              {
                name: 'onValueChange',
                type: '(value: string[] | string) => void',
                description: 'Called when the open set changes.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Disables every trigger.',
              },
            ]}
          />
          <PropsTable
            component="AccordionItem"
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description: 'Identifies the item in the root’s value.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description:
                  'Dims the trigger and drops it from the arrow path. An open panel stays readable.',
              },
            ]}
          />
          <PropsTable
            component="AccordionTrigger"
            rows={[
              {
                name: 'asChild',
                type: 'boolean',
                default: 'false',
                description:
                  'Pass your own heading element as the only child to set the row’s level in the outline.',
              },
            ]}
          />
          <p>
            <code>AccordionContent</code> takes the props of the element it
            renders. <code>className</code> lands on the padded body inside the
            panel.
          </p>
        </>
      }
      notes={
        <>
          <p>
            Each item draws a 1px bottom border and nothing else: no outer
            border, no surface step, no horizontal padding, so the stack sits
            flush with its container. Hover and keyboard focus step the
            item&rsquo;s divider and the chevron to the indicator colour at the
            fast motion duration. The row draws no press ring, because it
            toggles on click and has nothing to hold.
          </p>
          <p>
            The divider answers to the trigger, not the panel: the item watches
            its own <code>[data-slot=&quot;accordion-trigger&quot;]</code> for
            hover and <code>:focus-visible</code>, so a hovered or focused
            control inside an open panel leaves the divider at rest.
          </p>
          <p>
            The panel animates height only, from 0 to the Radix content height,
            clipped while it travels, on the settle curve in both directions
            (350ms end to end). Bounce stays off any dimension that displaces
            content: an overshooting height would push the panels below it past
            their place and drag them back, which reads as a glitch. There is no
            opacity fade, because a panel that fades while it grows reads as two
            effects fighting. The animation is CSS keyframes and Radix owns
            mount and unmount. The chevron rotates 180 degrees on the base
            duration, with its colour step riding beside it.
          </p>
          <p>
            The panel measures itself when it opens and settles at{' '}
            <code>height: auto</code>, so content that appears afterwards, such
            as a validation message, grows the panel instead of being clipped.
            The clip would cut the focus ring off a full-width field or a
            right-aligned button, so the panel carries 6px of horizontal
            clearance: padding inside the clip and a matching negative margin
            outside it. Content still lines up flush with the dividers.
          </p>
          <p>
            Against the page background, the trigger label measures 17.20:1 and
            the chevron at rest 7.01:1. The stepped divider and chevron in the
            indicator colour measure 3.38:1, which clears the 3:1 bar for
            non-text elements. Resting dividers are decorative and exempt.
          </p>
        </>
      }
      related={[
        {
          to: '/components/tabs',
          label: 'Tabs',
          description:
            'Switches between co-equal views instead of revealing more.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description: 'A box to wrap an accordion in.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'A status inside a trigger.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'Why the focus indicator is not always a ring.',
        },
      ]}
    />
  )
}
