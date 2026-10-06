import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { AvatarGroupCappedCount } from '@/examples/avatar-group/capped-count'
import cappedCountSource from '@/examples/avatar-group/capped-count.tsx?raw'
import { AvatarGroupDemo } from '@/examples/avatar-group/demo'
import demoSource from '@/examples/avatar-group/demo.tsx?raw'
import { AvatarGroupNamesBesideGroup } from '@/examples/avatar-group/names-beside-group'
import namesBesideGroupSource from '@/examples/avatar-group/names-beside-group.tsx?raw'
import { AvatarGroupOnACard } from '@/examples/avatar-group/on-a-card'
import onACardSource from '@/examples/avatar-group/on-a-card.tsx?raw'
import { AvatarGroupOverflow } from '@/examples/avatar-group/overflow'
import overflowSource from '@/examples/avatar-group/overflow.tsx?raw'
import { AvatarGroupSizes } from '@/examples/avatar-group/sizes'
import sizesSource from '@/examples/avatar-group/sizes.tsx?raw'
import usageSource from '@/examples/avatar-group/usage.tsx?raw'
import guidelines from '@/registry/ui/avatar-group/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/avatar-group')({
  component: AvatarGroupPage,
})

function AvatarGroupPage() {
  return (
    <DocPage
      title="Avatar group"
      lead="An avatar group is a compact, overlapping roster of people: the travellers on a trip, the collaborators on a plan."
      preview={{ source: demoSource, demo: <AvatarGroupDemo /> }}
      installation="avatar-group"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Sizes"
            description="The two avatar sizes, set once on the group. Use small in a dense row such as a table cell or a comment header."
            source={sizesSource}
          >
            <AvatarGroupSizes />
          </Example>

          <Example
            caption="Overflow"
            description="max is the number of avatars shown, not the total. Whenever the roster runs past it, the group adds a +N chip, even for one person over. The chip is an avatar-shaped circle, not a badge."
            source={overflowSource}
          >
            <AvatarGroupOverflow />
          </Example>

          <Example
            caption="Capped count"
            description="A roster of 254 would print +250 in a circle that fits two digits. cap stops the printed number at +99 while the chip's accessible name still says 250 more. Below the cap the chip prints the real number."
            source={cappedCountSource}
          >
            <AvatarGroupCappedCount />
          </Example>

          <Example
            caption="On a card"
            description="Every avatar wears a ring in the page colour so the faces separate. On a card, set the ring to the card colour with className."
            source={onACardSource}
          >
            <AvatarGroupOnACard />
          </Example>

          <Example
            caption="Names beside the group"
            description="Hover or focus an avatar and a tooltip names the person, but a touch screen has no such path. When the names matter, write them as text and let the cluster stay decoration."
            source={namesBesideGroupSource}
          >
            <AvatarGroupNamesBesideGroup />
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
                  'Enters the group on its first named avatar. The group is one tab stop, and Tab leaves it.',
              },
              {
                keys: ['ArrowRight', 'ArrowLeft'],
                description:
                  'Moves to the next or previous avatar, then the chip. Focus does not wrap.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Jumps to the first or last stop.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the open tooltip and leaves focus where it is.',
              },
            ]}
          />
          <p>
            The wrapper is <code>role=&quot;group&quot;</code> and forwards{' '}
            <code>aria-label</code>. Each avatar and the chip is a focusable{' '}
            <code>role=&quot;img&quot;</code> named by the person, or by{' '}
            <code>alt</code> when there is no name, and the chip is named{' '}
            <code>N more</code>. An item with neither a name nor an{' '}
            <code>alt</code> is hidden from assistive technology, gets no
            tooltip, and the arrow keys skip it.
          </p>
          <p>
            Focus does everything hover does, and also turns the ring around the
            focused face orange, so the indicator stays visible on a group of
            one where nothing moves. Pressing an avatar does nothing, because
            nothing here is a button; it only closes the tooltip.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="AvatarGroup"
            description={
              <>
                Also takes every <code>&lt;div&gt;</code> attribute except{' '}
                <code>children</code>. Render it inside a{' '}
                <code>TooltipProvider</code>, once at your app root. Hovering a
                face parts the row past the group&rsquo;s own box, so keep it
                out of any container that clips its overflow.
              </>
            }
            rows={[
              {
                name: 'items',
                type: 'AvatarGroupItem[]',
                required: true,
                description:
                  'The roster, in order. Each item takes name, src, color, and alt as Avatar does, plus an optional id used as its key.',
              },
              {
                name: 'size',
                type: 'AvatarSize',
                default: 'AvatarSize.Default',
                description:
                  'Set once on the group and passed to every avatar and the chip. Items carry no size of their own.',
              },
              {
                name: 'max',
                type: 'number',
                default: '4',
                description:
                  'How many avatars show before the overflow chip. Values below 1 count as 1.',
              },
              {
                name: 'cap',
                type: 'number',
                description:
                  'The largest number the chip prints. The chip’s accessible name always states the true count.',
              },
              {
                name: 'aria-label',
                type: 'string',
                description:
                  'Names the group, which is announced as one unit. Say whose faces these are, such as Trip travellers.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            The first avatar sits on top and the stack descends to the right.
            Overlap is a quarter of the diameter: 8px at default size, 6px at
            small. Every avatar and the chip wear a 2px ring in{' '}
            <code>--background</code>; a standalone avatar has no ring. The chip
            is <code>--secondary</code> with <code>--secondary-foreground</code>
            , and it passes WCAG AA.
          </p>
          <p>
            Hidden people are not rendered, so a 250-person roster costs five
            nodes. The roster is also the source of the chip’s tooltip: it lists
            every hidden name, comma-joined.
          </p>
          <p>
            Hovering an avatar parts the row over <code>--motion-base</code>.
            Everything to its left slides 14px left and everything to its right
            slides 14px right (12px at small size), which clears the overlap,
            both 2px rings, and 2px of air. It is one step, not a fan: the faces
            beyond the two neighbours travel with them and stay overlapped, so
            only the hovered avatar comes free. The resting z-order never
            changes. Sweeping across the row recentres the parting on the face
            under the pointer, and the row shuts when the pointer leaves the
            group.
          </p>
          <p>
            Pressing an avatar closes its tooltip, because the floating layer
            closes every tooltip on pointer-down. The name returns when the
            pointer leaves the avatar and comes back.
          </p>
          <p>
            One <code>TooltipProvider</code> at the app root shares a single
            tooltip delay across the row, so sweeping the pointer over the faces
            never waits out the open delay on each. A provider per group would
            reset it.
          </p>
        </>
      }
      related={[
        {
          to: '/components/avatar',
          label: 'Avatar',
          description: 'The single-person mark the group is built from.',
        },
        {
          to: '/components/tooltip',
          label: 'Tooltip',
          description: 'Names each person on hover and focus.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'The marker for a count that has no people behind it.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'Keyboard and focus rules every component follows.',
        },
      ]}
    />
  )
}
