import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { IconTooltipDemo } from '@/examples/icon-tooltip/demo'
import demoSource from '@/examples/icon-tooltip/demo.tsx?raw'
import { IconTooltipInsideALinkRow } from '@/examples/icon-tooltip/inside-a-link-row'
import insideALinkRowSource from '@/examples/icon-tooltip/inside-a-link-row.tsx?raw'
import { IconTooltipOnACard } from '@/examples/icon-tooltip/on-a-card'
import onACardSource from '@/examples/icon-tooltip/on-a-card.tsx?raw'
import usageSource from '@/examples/icon-tooltip/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/icon-tooltip')({
  component: IconTooltipPage,
})

function IconTooltipPage() {
  return (
    <DocPage
      title="Icon tooltip"
      lead="A focusable icon or emoji named by its tooltip text, so every standalone icon explains itself."
      preview={{ source: demoSource, demo: <IconTooltipDemo /> }}
      installation="icon-tooltip"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Inside a row that is a link"
            description="Hover an icon and its tooltip opens without following the row's link. Anywhere else in the row, a click follows the link. Tab visits the link first, then each icon."
            source={insideALinkRowSource}
          >
            <IconTooltipInsideALinkRow />
          </Example>

          <Example
            caption="On a card"
            description={
              <>
                The focus ring stands off the icon with a gap in the page
                colour. On a card, pass the matching offset through{' '}
                <code>className</code>, here{' '}
                <code>focus-visible:ring-offset-card</code>, so the gap takes
                the card&rsquo;s colour.
              </>
            }
            source={onACardSource}
          >
            <IconTooltipOnACard />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To name a status icon that sits on its own: locked, tied to a date, a category.',
          'For an icon inside a row or card whose whole surface is a link.',
        ],
        whenNotToUse: [
          {
            situation:
              'to label a button or any other control. The control is already focusable, so wrap it directly.',
            alternative: { to: '/components/tooltip', label: 'Tooltip' },
          },
          {
            situation:
              'for an icon beside text that already says the same thing. The icon is then decoration.',
            alternative: { to: '/components/badge', label: 'Badge' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Use it for a glyph that repeats across rows, such as a lock or an activity type, that would otherwise need a legend.',
            reason:
              'The traveller learns the glyph once by pointing at it, and the page carries no key.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep status and category icons small and muted, grouped at the edge of the row with its other details.',
            reason:
              'They are a quiet second read beside the content, not something to act on.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Make the icon the only place a reason lives. The row already says why a day is locked; the icon repeats it.',
            reason:
              'Like any tooltip, it is out of reach on touch. It adds to what the page already says.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Moves focus onto the icon, which opens the tooltip and draws the focus ring. Tabbing away closes it.',
              },
              {
                keys: ['Escape'],
                description: 'Closes the tooltip.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Do nothing, because the icon has nothing to activate.',
              },
            ]}
          />
          <p>
            The icon is one Tab stop. It renders as{' '}
            <code>role=&quot;img&quot;</code> with <code>aria-label</code> set
            to <code>content</code>, so a screen reader names it by the tooltip
            text whether or not the tooltip is open. A lucide icon inside is
            marked <code>aria-hidden</code>, so the name is not read twice. The
            pointer turns to the help cursor over it.
          </p>
        </>
      }
      api={
        <PropsTable
          component="IconTooltip"
          rows={[
            {
              name: 'content',
              type: 'string',
              required: true,
              description: 'The tooltip text and the icon’s accessible name.',
            },
            {
              name: 'children',
              type: 'ReactNode',
              required: true,
              description:
                'The icon or emoji. It is decorative, so mark a lucide icon aria-hidden; an emoji needs nothing. In a row whose surface is a link, place it beside the link, never inside: a focusable element nested in a link is invalid HTML.',
            },
            {
              name: 'className',
              type: 'string',
              description:
                'Sizes the icon, such as [&>svg]:size-4, or sets the focus ring offset on another surface.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            A row whose whole surface is one link carries an empty anchor
            stretched over it at <code>z-10</code>. The icon sits at{' '}
            <code>z-20</code>, above that anchor and above the stretched links
            of an interactive card, so the pointer over an icon reaches the
            icon.
          </p>
          <p>
            The icon takes its size from <code>className</code> or from an
            ancestor such as <code>[&amp;_svg]:size-4</code>. The focus ring
            stands 2px off the icon and the gap takes the page background by
            default. The tooltip itself is the <code>Tooltip</code> component
            with its default placement, so its delay, surface, and motion are
            the same.
          </p>
        </>
      }
      related={[
        {
          to: '/components/tooltip',
          label: 'Tooltip',
          description:
            'The rules for tooltip content, and the label for a control.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description:
            'An interactive card is one place the icon stays reachable.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'A visible status label when the icon is not enough.',
        },
      ]}
    />
  )
}
