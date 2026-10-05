import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { CardDemo } from '@/examples/card/demo'
import demoSource from '@/examples/card/demo.tsx?raw'
import { CardInteractive } from '@/examples/card/interactive'
import interactiveSource from '@/examples/card/interactive.tsx?raw'
import { CardSpacing } from '@/examples/card/spacing'
import spacingSource from '@/examples/card/spacing.tsx?raw'
import { CardStates } from '@/examples/card/states'
import statesSource from '@/examples/card/states.tsx?raw'
import usageSource from '@/examples/card/usage.tsx?raw'
import { CardWithAction } from '@/examples/card/with-action'
import withActionSource from '@/examples/card/with-action.tsx?raw'

export const Route = createFileRoute('/_docs/components/card')({
  component: CardPage,
})

function CardPage() {
  return (
    <DocPage
      title="Card"
      lead="A flat container that groups related content on one surface, fixing only the edge, the padding, and the interaction feedback while you compose what goes inside."
      preview={{ source: demoSource, demo: <CardDemo /> }}
      installation="card"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Interactive"
            description={
              <>
                Pass <code>interactive</code> and put the link directly inside{' '}
                <code>CardTitle</code>. The link stretches over the whole card,
                so a click anywhere follows it, while the Save button stays
                independently clickable.
              </>
            }
            source={interactiveSource}
          >
            <CardInteractive />
          </Example>

          <Example
            caption="An action row"
            description={
              <>
                <code>CardAction</code> is a direct child of the card, not of
                the header. It pins to the bottom right, so the action never
                competes with the title for the top edge.
              </>
            }
            source={withActionSource}
          >
            <CardWithAction />
          </Example>

          <Example
            caption="Static, interactive, and loading"
            description="A static card has one state and an interactive card responds to hover, focus, and press. A card whose content is missing shows skeletons in the same layout. Neither kind has a disabled state."
            source={statesSource}
          >
            <CardStates />
          </Example>

          <Example
            caption="Spacing"
            description={
              <>
                The one padding step is <code>--card-spacing</code>. Set it on a
                card to loosen or tighten that card, rather than padding its
                children.
              </>
            }
            source={spacingSource}
          >
            <CardSpacing />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To group a trip, a place, or a traveller with its description and actions on one surface.',
          'For a list of items that each lead somewhere, as an interactive card.',
        ],
        whenNotToUse: [
          {
            situation:
              'to reveal secondary content under a heading. A card is always open.',
            alternative: { to: '/components/accordion', label: 'Accordion' },
          },
          {
            situation:
              'for a result or a warning about the page. A card has no status of its own.',
            alternative: { to: '/components/alert', label: 'Alert' },
          },
          {
            situation: 'for tabular data with comparable columns.',
            alternative: { to: '/components/table', label: 'Table' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Put the link inside CardTitle when the card is interactive.',
            reason:
              'The title is the accessible name of the link, so a screen reader hears the trip name and not the whole card.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Show skeletons in the card’s layout while content is missing.',
            reason:
              'The card has no loading state of its own, and a skeleton keeps the layout from jumping when the content arrives.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Make a card interactive when nothing happens on click.',
            reason:
              'Hover and press feedback promise an action. A dead target must not look almost clickable, which is also why a card has no disabled state.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Add a shadow or a fill to lift a card.',
            reason:
              'Cards are flat. A solid border and the card surface separate them from the page, and the system ships no shadow tokens.',
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
                  'On an interactive card, focuses the title link first, then any nested action.',
              },
              {
                keys: ['Enter'],
                description: 'On the title link, follows it.',
              },
              {
                keys: ['Enter', 'Space'],
                description: 'On a nested action, runs it.',
              },
            ]}
          />
          <p>
            A static card is not focusable and takes no keyboard input. The
            interactive card is not itself a link, so a nested button stays
            valid HTML. The focus ring surrounds the whole card boundary, and
            the card border is decorative, so the content identifies the card.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Card"
            rows={[
              {
                name: 'interactive',
                type: 'boolean',
                default: 'false',
                description:
                  'Turns on hover, focus, and press feedback, and stretches the title link over the card.',
              },
              {
                name: 'className',
                type: 'string',
                description:
                  'Sets the width, or --card-spacing to change the padding.',
              },
            ]}
          />
          <p>
            <code>CardHeader</code>, <code>CardTitle</code>,{' '}
            <code>CardDescription</code>, <code>CardAction</code>,{' '}
            <code>CardContent</code>, and <code>CardFooter</code> each render a
            div and take its props. Use the ones you need. There is no variant
            and no size: width comes from your layout.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The card separates from the page with a solid 1px border and a
            surface step, never a shadow. Padding and the gap between slots both
            come from <code>--card-spacing</code>, 16px by default.
          </p>
          <p>
            Hover turns the border to the indicator colour. Press grows a 2px
            indicator ring out of nothing while held, matching the button. Focus
            draws a 2px ring around the whole card boundary. All three are CSS
            transitions at the fast motion duration. The stretched link is a
            pseudo-element on the title anchor, and descriptions, content,
            footers, and actions lift their links and buttons above it. The card
            owns no other motion: list enter, exit, and reorder belong to your
            app through motion&rsquo;s <code>layout</code> prop.
          </p>
          <p>The focus ring meets 3:1 against both the card and the page.</p>
        </>
      }
      related={[
        {
          to: '/components/accordion',
          label: 'Accordion',
          description: 'Reveals secondary content in a stack.',
        },
        {
          to: '/components/skeleton',
          label: 'Skeleton',
          description: 'What a card shows while its content is missing.',
        },
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'Changes the item a card shows.',
        },
        {
          to: '/spacing',
          label: 'Spacing',
          description: 'The 4px scale behind --card-spacing.',
        },
      ]}
    />
  )
}
