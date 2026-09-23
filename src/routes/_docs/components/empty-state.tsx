import { createFileRoute } from '@tanstack/react-router'
import { Compass, Link2Off, Route as RouteIcon, Wallet } from 'lucide-react'

import { Preview } from '@/components/preview'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Card, CardContent } from '@/registry/ui/card'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSize,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'

export const Route = createFileRoute('/_docs/components/empty-state')({
  component: EmptyStatePage,
})

function EmptyStatePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Empty State
        </h1>
        <p className="text-muted-foreground text-lg">
          A resting no-content block. It says why a region holds nothing and
          what the user can do about it, in one look, with no surface of its
          own.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Not feedback, not loading
        </h2>
        <p className="text-muted-foreground">
          An empty state is a resting state. Use it when a page, a list, or a
          card is legitimately empty. An error that follows something the user
          did is feedback and belongs to the acting surface's <code>alert</code>
          , or to a <code>notice</code> when the shell owns the result. A region
          still fetching shows a <code>skeleton</code>: the skeleton holds the
          shape of content that is coming, the empty state says content is not
          coming until the user acts. A dead share link is an empty state, not
          an error: the user landed on a page with nothing in it, they did not
          act and fail.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Slots</h2>
        <p className="text-muted-foreground">
          Five slots. <code>EmptyState</code> renders a <code>section</code>{' '}
          labelled by its title. <code>EmptyStateIcon</code> is optional and
          holds any node inside a <code>--muted</code> circle.{' '}
          <code>EmptyStateTitle</code> is required and carries the label.{' '}
          <code>EmptyStateDescription</code> and <code>EmptyStateActions</code>{' '}
          are optional. There is no <code>variant</code> prop: one look, and the
          consumer supplies a boundary by wrapping the block in a{' '}
          <code>Card</code>.
        </p>
        <Preview>
          <EmptyState>
            <EmptyStateIcon>
              <Compass />
            </EmptyStateIcon>
            <EmptyStateTitle>No trips yet</EmptyStateTitle>
            <EmptyStateDescription>
              Tell hottrip where you want to go and it drafts the route.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button>Plan a trip</Button>
            </EmptyStateActions>
          </EmptyState>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Two recipes</h2>
        <p className="text-muted-foreground">
          The block is centered and full width with a min-content height, so it
          takes its boundary from wherever you put it. Centered in the page it
          reads as the page's own message; wrapped in a <code>Card</code> it
          reads as one region's message among others. The component paints no
          border and no background either way.
        </p>
        <Preview>
          <div className="w-full max-w-md space-y-6">
            <EmptyState>
              <EmptyStateIcon>
                <Link2Off />
              </EmptyStateIcon>
              <EmptyStateTitle>This trip link has expired</EmptyStateTitle>
              <EmptyStateDescription>
                The owner stopped sharing it, or the trip was deleted.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button>Plan your own trip</Button>
              </EmptyStateActions>
            </EmptyState>

            <Card>
              <CardContent>
                <EmptyState>
                  <EmptyStateIcon>
                    <RouteIcon />
                  </EmptyStateIcon>
                  <EmptyStateTitle as={EmptyStateTitleElement.H3}>
                    Activities come after the route
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    Approve the route and 10 days of activities generate.
                  </EmptyStateDescription>
                </EmptyState>
              </CardContent>
            </Card>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes. <code>Default</code> is for page-level emptiness: a{' '}
          <code>text-lg</code> title above a 48px circle holding a 24px icon.{' '}
          <code>Small</code> is for a block inside a card, where the card
          already carries the heading weight: a <code>text-base</code> title and
          a 40px circle holding a 20px icon. The description keeps{' '}
          <code>text-sm</code> in both. Inside the block the gap is{' '}
          <code>gap-2</code>, and the actions row adds <code>mt-2</code> on top
          of it, so it sits a full <code>gap-4</code> step below the text.
        </p>
        <Preview>
          <div className="w-full max-w-md space-y-6">
            <Card>
              <CardContent>
                <EmptyState size={EmptyStateSize.Small}>
                  <EmptyStateIcon>
                    <Wallet />
                  </EmptyStateIcon>
                  <EmptyStateTitle as={EmptyStateTitleElement.H3}>
                    No credits yet
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    Credits pay for route and activity generation.
                  </EmptyStateDescription>
                  <EmptyStateActions>
                    <Button>Buy credits</Button>
                  </EmptyStateActions>
                </EmptyState>
              </CardContent>
            </Card>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Actions</h2>
        <p className="text-muted-foreground">
          One or two buttons, primary first. On narrow widths they stack in that
          same order, so the primary stays on top. An empty state with no action
          is normal: the route proposal above has nothing for the user to do
          until the route is approved, so it explains and stops. The block knows
          nothing about Button's props — you pass the buttons you want.
        </p>
        <Preview>
          <EmptyState>
            <EmptyStateIcon>
              <Compass />
            </EmptyStateIcon>
            <EmptyStateTitle>No trips yet</EmptyStateTitle>
            <EmptyStateDescription>
              Tell hottrip where you want to go and it drafts the route.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button>Plan a trip</Button>
              <Button variant={ButtonVariant.Outline}>Browse ideas</Button>
            </EmptyStateActions>
          </EmptyState>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          The title is <code>--foreground</code> and the description is{' '}
          <code>--muted-foreground</code>, both measured on{' '}
          <code>--background</code> and on <code>--card</code>. The title runs
          17.20:1 on the background and 18.25:1 on the card; the description
          7.01:1 and 7.44:1. The only <code>--muted</code> surface inside the
          block is the icon circle, which holds an icon rather than text at
          6.48:1. Placed on <code>--muted</code>, the block keeps its
          description at 6.48:1.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Accessibility and motion
        </h2>
        <p className="text-muted-foreground">
          The block is a region labelled by its title, so a screen reader user
          can find it and hear what it is. The title renders <code>h2</code> by
          default and takes an <code>as</code> prop for the level the
          surrounding document needs — <code>h3</code> inside a card. The icon
          is <code>aria-hidden</code>. There is no <code>role="status"</code>{' '}
          and no live region: a resting state must not announce itself on every
          render. Tab reaches the action buttons and nothing else. There is no
          animation, because the state an empty state replaces is usually a
          skeleton and the swap displaces no siblings.
        </p>
      </section>
    </article>
  )
}
