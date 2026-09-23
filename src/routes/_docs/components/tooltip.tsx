import { createFileRoute } from '@tanstack/react-router'
import { Plus, Share2, Trash2 } from 'lucide-react'

import { Preview } from '@/components/preview'
import { Avatar } from '@/registry/ui/avatar'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Tooltip } from '@/registry/ui/tooltip'

export const Route = createFileRoute('/_docs/components/tooltip')({
  component: TooltipPage,
})

function TooltipPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Tooltip
        </h1>
        <p className="text-muted-foreground text-lg">
          A non-modal text label anchored to its trigger. It never takes focus.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Content is supplementary, never essential
        </h2>
        <p className="text-muted-foreground">
          The content is{' '}
          <strong className="text-foreground">
            supplementary, never essential
          </strong>
          : a label for an icon-only control, a keyboard shortcut typed into the
          string, or one clarifying sentence. Interactive content, links, and
          images are banned. A tooltip is not reachable on touch and not
          reachable by a screen reader that never focuses its trigger, so a
          reason, a result, or an error never lives in one; it goes inline.
        </p>
        <p className="text-muted-foreground">
          No touch or long-press support, by decision.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Open delay and the second trigger
        </h2>
        <p className="text-muted-foreground">
          <code>TooltipProvider</code> fixes a 500ms open delay and a 300ms skip
          delay, mounted once at the app root. Hover the first icon and count to
          the open; move to the second within 300ms of the first closing and it
          opens at once, with no second count. The window is deliberately short:
          a longer one makes the delay feel arbitrary, because a hover that
          follows any recent close — including one a scroll caused — would skip
          the count while an isolated hover would not.
        </p>
        <p className="text-muted-foreground">
          One Radix limitation shows here. Its hoverable-content grace area
          tracks the pointer through a <code>document</code> listener that
          resolves a frame late, so a flick fast enough to fire only two or
          three pointer events across the row leaves the first tooltip stranded
          and the second unopened until the pointer moves again. Hoverable
          content stays on regardless: WCAG 2.1 SC 1.4.13 requires that a
          pointer be able to move onto the tooltip without it disappearing.
        </p>
        <Preview>
          <div className="flex gap-2">
            <Tooltip content="Add item">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Icon}
                aria-label="Add item"
              >
                <Plus />
              </Button>
            </Tooltip>
            <Tooltip content="Share">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Icon}
                aria-label="Share"
              >
                <Share2 />
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Icon}
                aria-label="Delete"
              >
                <Trash2 />
              </Button>
            </Tooltip>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Any focusable child</h2>
        <p className="text-muted-foreground">
          <code>children</code> is one element with <code>asChild</code> forced,
          so a tooltip wraps anything, not only a Button.{' '}
          <strong className="text-foreground">
            The child must be focusable
          </strong>{' '}
          — the component does not inject a <code>tabIndex</code>. Avatar takes
          no focus of its own, so this example adds one at the call site.
        </p>
        <Preview>
          <Tooltip content="Brian Nguyen">
            <Avatar tabIndex={0} name="Brian Nguyen" />
          </Tooltip>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Disabled trigger</h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Disabled trigger: not supported.
          </strong>{' '}
          A disabled button fires no pointer or focus events. The reason a
          control is disabled is essential information, so it goes inline. No
          span-wrapper recipe: it ships a focusable element with no accessible
          name.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Keyboard and dismiss
        </h2>
        <p className="text-muted-foreground">
          Keyboard focus on the trigger opens the tooltip; Tab away closes it.
          Escape closes it, innermost first inside a dialog. Any pointer-down
          closes it too, and the pointer may cross the 8px gap from the trigger
          onto the tooltip without it closing. Radix sets{' '}
          <code>aria-describedby</code> on the trigger and renders a{' '}
          <code>role=&quot;tooltip&quot;</code> node — the trigger keeps its own
          accessible name, and the tooltip only describes it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Surface and motion</h2>
        <p className="text-muted-foreground">
          The chip inverts to <code>bg-foreground text-background</code> with no
          border and no arrow: white text on neutral-950. It enters and exits on
          the <code>floating</code> item&apos;s anchored pair, scaling from{' '}
          <code>0.96</code> with the Radix popper transform origin, so content
          that flips still grows from its trigger.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The chip meets WCAG AA contrast. The tooltip never takes focus, so it
          draws no ring of its own — the trigger keeps whichever ring it already
          has.
        </p>
      </section>
    </article>
  )
}
