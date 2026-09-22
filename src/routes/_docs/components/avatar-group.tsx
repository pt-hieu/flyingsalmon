import { createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import { AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'
import type { AvatarGroupItem } from '@/registry/ui/avatar-group'

export const Route = createFileRoute('/_docs/components/avatar-group')({
  component: AvatarGroupPage,
})

const tripMembers: AvatarGroupItem[] = [
  {
    id: 'ada',
    name: 'Ada Lovelace',
    src: '/avatar-sample-sky-300.svg',
    color: AvatarColor.Sky,
  },
  { id: 'grace', name: 'Grace Hopper', color: AvatarColor.Teal },
  { id: 'katherine', name: 'Katherine Johnson', color: AvatarColor.Fuchsia },
  { id: 'alan', name: 'Alan Turing', color: AvatarColor.Blue },
  { id: 'barbara', name: 'Barbara Liskov', color: AvatarColor.Pink },
]

const conference: AvatarGroupItem[] = [
  ...tripMembers,
  ...Array.from({ length: 249 }, (_unused, index) => ({
    id: `attendee-${index}`,
    name: `Attendee ${index + 1}`,
    color: AvatarColor.Cyan,
  })),
]

const apiRows = [
  {
    name: 'items',
    type: 'AvatarGroupItem[]',
    description:
      'The roster, in order. Each item picks name, src, color, and alt from Avatar, plus an optional id used as the React key.',
  },
  {
    name: 'size',
    type: 'AvatarSize',
    description:
      'default (32px) or sm (24px), set once on the group and pushed to every avatar and the chip. Items carry no size of their own.',
  },
  {
    name: 'max',
    type: 'number',
    description:
      'How many avatars render before the overflow chip. Defaults to 4 and clamps up to 1.',
  },
  {
    name: 'cap',
    type: 'number',
    description:
      'Caps the number printed in the chip. The chip’s accessible name always states the true count.',
  },
  {
    name: 'aria-label',
    type: 'string',
    description:
      'Names the group. Everything else a div takes passes through, except children.',
  },
]

function AvatarGroupPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Avatar Group
        </h1>
        <p className="text-muted-foreground text-lg">
          A compact roster of people: trip members, collaborators, assignees on
          a row. Presentational — nothing in the group triggers an action.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Preview</h2>
        <p className="text-muted-foreground">
          Five people with the default <code>max</code> of 4: four overlapped
          avatars and a <code>+1</code> chip. The first avatar sits on top and
          the z-order descends to the right, so the cluster reads left to right.
          Every avatar and the chip wear a 2px ring in <code>--background</code>{' '}
          that the group owns — a standalone avatar stays ring-less.
        </p>
        <Preview>
          <AvatarGroup items={tripMembers} aria-label="Trip members" />
        </Preview>
        <p className="text-muted-foreground">
          On a card the ring should match the surface it sits on. Override it at
          the call site with{' '}
          <code>className=&quot;[&amp;&gt;*]:ring-card&quot;</code>; there is no
          prop for it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          The two avatar sizes, <code>default</code> and <code>sm</code>, set
          once on the group. Overlap is a quarter of the diameter: 8px at{' '}
          <code>default</code>, 6px at <code>sm</code>. Use <code>sm</code> in
          dense rows such as a table cell or a comment header.
        </p>
        <Preview>
          <AvatarGroup items={tripMembers} aria-label="Trip members" />
          <AvatarGroup
            items={tripMembers}
            size={AvatarSize.Small}
            aria-label="Trip members"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Overflow and max</h2>
        <p className="text-muted-foreground">
          <code>max</code> is the number of avatars shown, not the total.
          Whenever the roster runs past it the group renders a chip reading{' '}
          <code>+N</code>, where N is everyone left over — one over{' '}
          <code>max</code> still gets a chip, with no special case. Hidden
          people are not rendered at all, so a 250-person roster costs five
          nodes.{' '}
          <strong className="text-foreground">
            The chip is an avatar-shaped circle
          </strong>{' '}
          on <code>--secondary</code>, not a ninth avatar hue and not a badge.
        </p>
        <Preview>
          <AvatarGroup
            items={tripMembers}
            max={2}
            aria-label="Trip members, two shown"
          />
          <AvatarGroup
            items={tripMembers}
            max={4}
            aria-label="Trip members, four shown"
          />
          <AvatarGroup
            items={tripMembers}
            max={5}
            aria-label="Trip members, all shown"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">cap</h2>
        <p className="text-muted-foreground">
          A roster of 254 with <code>max</code> 4 leaves 250 hidden, and{' '}
          <code>+250</code> is wider than the circle it sits in.{' '}
          <code>cap</code> caps the printed number at <code>+99</code> while the
          chip&apos;s accessible name still states the true count, so a screen
          reader hears &ldquo;250 more&rdquo;. Below the cap the chip prints the
          real number.
        </p>
        <Preview>
          <AvatarGroup
            items={conference}
            cap={99}
            aria-label="Conference attendees"
          />
          <AvatarGroup items={tripMembers} cap={99} aria-label="Trip members" />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Hover and keyboard</h2>
        <p className="text-muted-foreground">
          Hover an avatar and the row parts around it over{' '}
          <code>--motion-base</code>. Everything to its left slides 14px left
          and everything to its right slides 14px right — 12px at{' '}
          <code>sm</code> — which clears the overlap, both 2px rings, and 2px of
          air.{' '}
          <strong className="text-foreground">
            One step, not a fan: the faces beyond the two neighbours travel with
            them and stay overlapped with each other
          </strong>
          , so only the hovered avatar comes free. It stands whole without being
          lifted over anyone, the resting z-order never moves, and it holds its
          own place so the pointer cannot lose it. A tooltip opens with the
          person&apos;s name. The chip does the same and lists everyone it
          hides, comma-joined.
        </p>
        <p className="text-muted-foreground">
          Sweeping across the row re-centers the parting on the face under the
          pointer; the gaps it opens hold the current face rather than closing
          the row mid-sweep. The row shuts when the pointer leaves the group. It
          parts 14px past the group&apos;s own box on each side, so keep it
          clear of a clipped container.
        </p>
        <p className="text-muted-foreground">
          Pressing an avatar does nothing — nothing here is a button — but it
          closes the tooltip, because the floating layer closes every tooltip on
          any pointer-down. The name comes back when the pointer leaves the
          avatar and returns.
        </p>
        <p className="text-muted-foreground">
          The group is <strong className="text-foreground">one tab stop</strong>
          . Tab enters on the first avatar; ArrowRight and ArrowLeft walk the
          avatars and then the chip; Home and End jump to the ends. Nothing
          wraps, and Tab leaves the group. Focus does everything hover does and
          additionally recolors the separator ring to <code>--indicator</code>,
          which keeps the indicator visible on a one-person group where the
          parting has no neighbour to move. Escape closes the open tooltip and
          leaves focus where it is.
        </p>
        <Preview>
          <AvatarGroup items={tripMembers} aria-label="Trip members" />
        </Preview>
        <p className="text-muted-foreground">
          <strong className="text-foreground">There is no touch path</strong> —
          the tooltip inherits that limitation, so names and the chip&apos;s
          list are unreachable on a phone. When the names are essential, render
          them beside the group as text and let the cluster stay decorative.
        </p>
        <Preview>
          <div className="flex items-center gap-3">
            <AvatarGroup
              items={tripMembers}
              max={3}
              aria-label="Trip members"
            />
            <p className="text-sm">
              <span className="font-medium">Ada, Grace and Katherine</span>{' '}
              <span className="text-muted-foreground">and 2 others</span>
            </p>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Provider requirement
        </h2>
        <p className="text-muted-foreground">
          The group consumes the registry <code>Tooltip</code> and mounts no
          provider of its own.{' '}
          <strong className="text-foreground">
            Your app root must render <code>TooltipProvider</code>
          </strong>{' '}
          — this docs site mounts one. A local provider per group would reset
          the shared 300ms skip window, so sweeping the pointer across a row of
          faces would make you wait out the full open delay on every one.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The wrapper is <code>role=&quot;group&quot;</code> and forwards{' '}
          <code>aria-label</code>. Each avatar and the chip is a focusable{' '}
          <code>role=&quot;img&quot;</code> named by the person — or{' '}
          <code>alt</code> when there is no name — and <code>N more</code> for
          the chip. A bare focusable span resolves as <code>generic</code>, a
          role ARIA forbids naming, so the explicit <code>img</code> role is
          what makes the name reach assistive tech. An item with neither a name
          nor an <code>alt</code> is <code>aria-hidden</code>, gets no tooltip,
          and the arrow keys skip over it. The chip pairs{' '}
          <code>--secondary</code> with <code>--secondary-foreground</code> at
          14.14:1, and the initials keep avatar&apos;s neutral-950 on step-400
          hues at 6.3:1 worst case.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">API</h2>
        <dl className="border-border divide-border divide-y rounded-lg border">
          {apiRows.map((apiRow) => (
            <div
              key={apiRow.name}
              className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
            >
              <dt className="space-y-1">
                <code className="text-foreground text-sm font-medium">
                  {apiRow.name}
                </code>
                <p className="text-muted-foreground font-mono text-xs">
                  {apiRow.type}
                </p>
              </dt>
              <dd className="text-muted-foreground text-sm">
                {apiRow.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
