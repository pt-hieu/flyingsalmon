import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { EmptyStateDemo } from '@/examples/empty-state/demo'
import demoSource from '@/examples/empty-state/demo.tsx?raw'
import { EmptyStateExpiredLink } from '@/examples/empty-state/expired-link'
import expiredLinkSource from '@/examples/empty-state/expired-link.tsx?raw'
import { EmptyStateIconArt } from '@/examples/empty-state/icon'
import iconSource from '@/examples/empty-state/icon.tsx?raw'
import { EmptyStateNoAction } from '@/examples/empty-state/no-action'
import noActionSource from '@/examples/empty-state/no-action.tsx?raw'
import { EmptyStateSmallSticker } from '@/examples/empty-state/small-sticker'
import smallStickerSource from '@/examples/empty-state/small-sticker.tsx?raw'
import { EmptyStateTwoActions } from '@/examples/empty-state/two-actions'
import twoActionsSource from '@/examples/empty-state/two-actions.tsx?raw'
import usageSource from '@/examples/empty-state/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/empty-state')({
  component: EmptyStatePage,
})

function EmptyStatePage() {
  return (
    <DocPage
      title="Empty state"
      lead="A resting block that says why a region holds nothing and what the traveller can do about it, with no surface of its own."
      preview={{ source: demoSource, demo: <EmptyStateDemo /> }}
      installation="empty-state"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Icon art"
            description="The icon holds any node in a muted circle. Use it where a sticker would be too much, such as a small block beside other content."
            source={iconSource}
          >
            <EmptyStateIconArt />
          </Example>

          <Example
            caption="Two actions"
            description="One or two buttons, primary first. On narrow widths they stack in the same order, so the primary stays on top."
            source={twoActionsSource}
          >
            <EmptyStateTwoActions />
          </Example>

          <Example
            caption="No action"
            description="An empty state with no action is normal. This card has nothing to show until the traveller approves the route elsewhere on the page, so it explains and stops. Wrapping the block in a card is how you give it a boundary."
            source={noActionSource}
          >
            <EmptyStateNoAction />
          </Example>

          <Example
            caption="Small with a sticker"
            description="Small is for a block inside a surface that already carries heading weight. The title drops to a third-level heading to fit the page outline, and the sticker shrinks."
            source={smallStickerSource}
          >
            <EmptyStateSmallSticker />
          </Example>

          <Example
            caption="An expired link"
            description="A dead share link is an empty state and not an error: the traveller landed on a page with nothing in it, and did not act and fail."
            source={expiredLinkSource}
          >
            <EmptyStateExpiredLink />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'When a page, a list, or a card is legitimately empty: no trips yet, no places saved, nobody invited.',
          'When a link leads to a page with nothing in it, such as an expired share link.',
        ],
        whenNotToUse: [
          {
            situation:
              'when a region is still fetching. The placeholder holds the shape of what is coming.',
            alternative: { to: '/components/skeleton', label: 'Skeleton' },
          },
          {
            situation:
              'when a region’s content failed to arrive. That is a failure, and it is announced.',
            alternative: {
              to: '/components/error-state',
              label: 'Error state',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Title the block with a plain statement or a short question, and say in the description what the traveller can do next.',
            reason:
              'A resting state with no next step leaves the traveller to guess whether something broke.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Offer one action: filled when it starts something, outline when it only leads out.',
            reason:
              'One button is an obvious next step, and its fill tells the traveller whether it begins something or takes them back.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give a friendly empty a sticker, and a dead end, such as a trip that does not exist, an icon.',
            reason:
              'The sticker invites the traveller to begin. The icon says plainly that there is nothing here to begin.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep a block inside a card quieter than one that fills a page.',
            reason:
              'The card already carries the heading weight, so the block inside it steps down.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Use an empty state while content is loading.',
            reason:
              'A skeleton holds the shape of what is coming. The one exception is long work that runs in the background with nothing to draw yet: there, an empty state that says the traveller is free to leave tells the truth.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Frame the block itself. Place it in a card when it needs a boundary.',
            reason:
              'On a page it is the page’s own message, and in a card it is the card’s. A frame of its own would compete with both.',
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
                  'Reaches the action buttons in order. Nothing else in the block takes focus.',
              },
            ]}
          />
          <p>
            The block is a region labelled by its title, so a screen reader user
            can find it. It has no live region: a resting state must not
            announce itself on every render. The title is a second-level heading
            by default; pass <code>as</code> for the level the surrounding
            document needs, such as a third-level heading inside a card.
          </p>
          <p>
            A sticker is one image named by its label, which describes the
            picture and does not repeat the title. The icon is hidden from
            assistive technology.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="EmptyState"
            description={
              <>
                Renders a <code>section</code> labelled by its title and takes
                every <code>&lt;section&gt;</code> attribute. Compose it from{' '}
                <code>EmptyStateSticker</code> or <code>EmptyStateIcon</code>,{' '}
                <code>EmptyStateTitle</code>, <code>EmptyStateDescription</code>
                , and <code>EmptyStateActions</code>.
              </>
            }
            rows={[
              {
                name: 'size',
                type: 'EmptyStateSize',
                default: 'EmptyStateSize.Default',
                description:
                  'Default for a page, Small for a block inside a card. The block paints no border or background of its own.',
              },
            ]}
          />
          <PropsTable
            component="EmptyStateTitle"
            description="Required. It labels the region."
            rows={[
              {
                name: 'as',
                type: 'EmptyStateTitleElement',
                default: 'EmptyStateTitleElement.H2',
                description:
                  'H2 or H3, to fit the heading outline of the page.',
              },
            ]}
          />
          <PropsTable
            component="EmptyStateSticker"
            description="Takes the props of a Sticker and sizes and tilts it for the block."
            rows={[
              {
                name: 'art',
                type: 'StickerArt',
                required: true,
                description: 'The drawing.',
              },
              {
                name: 'label',
                type: 'string',
                required: true,
                description: 'What the picture shows, for a screen reader.',
              },
              {
                name: 'roleClassNames',
                type: 'StickerRoleClassNames',
                required: true,
                description: 'The colour classes for each role in the art.',
              },
              {
                name: 'popIn',
                type: 'boolean',
                default: 'true',
                description: 'Pops the sticker in as it scrolls into view.',
              },
            ]}
          />
          <p>
            <code>EmptyStateIcon</code>, <code>EmptyStateDescription</code>, and{' '}
            <code>EmptyStateActions</code> take only their element’s props.
          </p>
        </>
      }
      notes={
        <>
          <p>
            Default sizes the title at <code>text-lg</code> over a 48px icon
            circle holding a 24px icon, with a sticker up to 240px wide. Small
            uses <code>text-base</code> over a 40px circle holding a 20px icon,
            with a sticker up to 160px wide. The description is{' '}
            <code>text-sm</code> in both.
          </p>
          <p>
            The block is centred and full width with a min-content height. Its
            gap is <code>gap-2</code> and the actions row adds <code>mt-2</code>
            , so the actions sit a full <code>gap-4</code> step below the text.
          </p>
          <p>
            The sticker tilts left; an error state tilts it right. The block
            itself does not animate, because the state it replaces is usually a
            skeleton and the swap displaces no siblings. The only motion is the
            sticker’s pop-in and line boil.
          </p>
          <p>
            The title is 17.20:1 on the page and 18.25:1 on the card. The
            description is 7.01:1 and 7.44:1. The icon sits on{' '}
            <code>--muted</code> at 6.48:1, and a description placed on{' '}
            <code>--muted</code> keeps 6.48:1.
          </p>
        </>
      }
      related={[
        {
          to: '/components/error-state',
          label: 'Error state',
          description: 'The same block for content that failed to arrive.',
        },
        {
          to: '/components/skeleton',
          label: 'Skeleton',
          description: 'What a region shows while its content is on the way.',
        },
        {
          to: '/components/card',
          label: 'Card',
          description: 'Gives the block a boundary among other regions.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The actions the block offers.',
        },
      ]}
    />
  )
}
