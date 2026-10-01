import { createFileRoute } from '@tanstack/react-router'
import { Compass, Link2Off, Route as RouteIcon, Wallet } from 'lucide-react'

import { Preview } from '@/components/preview'
import { routeStickerArt } from '@/components/route-sticker-art'
import {
  routeStickerLabel,
  routeStickerRoleClassNames,
} from '@/components/route-sticker'
import { snappedPencilStickerArt } from '@/components/snapped-pencil-sticker-art'
import {
  snappedPencilStickerLabel,
  snappedPencilStickerRoleClassNames,
} from '@/components/snapped-pencil-sticker'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Card, CardContent } from '@/registry/ui/card'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateKind,
  EmptyStateSize,
  EmptyStateSticker,
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
          A no-content block. It says why a region holds nothing and what the
          user can do about it, in one look, with no surface of its own. Its
          error kind says the same about a region whose content failed to
          arrive.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Empty, failed, or loading
        </h2>
        <p className="text-muted-foreground">
          An empty state is a resting state. Use it when a page, a list, or a
          card is legitimately empty. A dead share link is an empty state, not
          an error: the user landed on a page with nothing in it, they did not
          act and fail. A region still fetching shows a <code>skeleton</code>:
          the skeleton holds the shape of content that is coming, the empty
          state says content is not coming until the user acts.
        </p>
        <p className="text-muted-foreground">
          The error kind is the failed state of the affected item, the first
          home for a result in the feedback rule: the region that was meant to
          fill says that it did not, with a retry, where the user is already
          looking. An error with a closer home does not use it: a form&apos;s
          error belongs to the acting surface&apos;s <code>alert</code>, and a
          result with no visible home goes to a <code>notice</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sticker art</h2>
        <p className="text-muted-foreground">
          A sticker is the default art for both kinds.{' '}
          <code>EmptyStateSticker</code> takes the props of a{' '}
          <code>Sticker</code> and sizes and tilts it for the block, so a screen
          sets neither. The empty kind tilts the sticker left and the error kind
          tilts it right. The sticker pops in as it scrolls into view;{' '}
          <code>popIn={'{false}'}</code> turns that off.
        </p>
        <Preview>
          <EmptyState>
            <EmptyStateSticker
              art={routeStickerArt}
              label={routeStickerLabel}
              roleClassNames={routeStickerRoleClassNames}
            />
            <EmptyStateTitle>Your route is on its way</EmptyStateTitle>
            <EmptyStateDescription>
              The AI is choosing cities and nights for Japan. The cities,
              flights, and trains appear here as soon as the route is drafted,
              and you approve it before any day is planned. You can leave this
              page; it keeps going.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button variant={ButtonVariant.Outline}>
                Back to your trips
              </Button>
            </EmptyStateActions>
          </EmptyState>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error state</h2>
        <p className="text-muted-foreground">
          <code>kind={'{EmptyStateKind.Error}'}</code> marks the block as an
          error state. The layout stays the same and the art stays a sticker: no
          red icon and no <code>Alert</code> inside it. The description says
          what happened and what was kept, and the actions offer the retry and
          the way back to the input.
        </p>
        <Preview>
          <EmptyState kind={EmptyStateKind.Error}>
            <EmptyStateSticker
              art={snappedPencilStickerArt}
              label={snappedPencilStickerLabel}
              roleClassNames={snappedPencilStickerRoleClassNames}
            />
            <EmptyStateTitle>Generation failed</EmptyStateTitle>
            <EmptyStateDescription>
              It stopped while planning the days for Japan. All 12 credits are
              back in your wallet, and nothing from the failed attempt was kept.
              Your Brief is saved; try again or change it first.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button>Try again</Button>
              <Button variant={ButtonVariant.Outline}>Edit the Brief</Button>
            </EmptyStateActions>
          </EmptyState>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Slots</h2>
        <p className="text-muted-foreground">
          Six slots. <code>EmptyState</code> renders a <code>section</code>{' '}
          labelled by its title. The art is optional and is one of two:{' '}
          <code>EmptyStateSticker</code>, or <code>EmptyStateIcon</code>, which
          holds any node inside a <code>--muted</code> circle.{' '}
          <code>EmptyStateTitle</code> is required and carries the label.{' '}
          <code>EmptyStateDescription</code> and <code>EmptyStateActions</code>{' '}
          are optional. There is no <code>variant</code> prop: one look for both
          kinds, and the consumer supplies a boundary by wrapping the block in a{' '}
          <code>Card</code>.
        </p>
        <p className="text-muted-foreground">
          The icon is the fallback where a sticker would be too much, such as a
          small empty state inside a card among other cards.
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
          a 40px circle holding a 20px icon. A sticker is at most 240px wide in{' '}
          <code>Default</code> and 160px in <code>Small</code>, keeping its
          art&apos;s aspect ratio. The description keeps <code>text-sm</code> in
          both. Inside the block the gap is <code>gap-2</code>, and the actions
          row adds <code>mt-2</code> on top of it, so it sits a full{' '}
          <code>gap-4</code> step below the text.
        </p>
        <Preview>
          <div className="w-full max-w-md space-y-6">
            <EmptyState size={EmptyStateSize.Small}>
              <EmptyStateSticker
                art={routeStickerArt}
                label={routeStickerLabel}
                roleClassNames={routeStickerRoleClassNames}
              />
              <EmptyStateTitle as={EmptyStateTitleElement.H3}>
                No trips yet
              </EmptyStateTitle>
              <EmptyStateDescription>
                Tell hottrip where you want to go and it drafts the route.
              </EmptyStateDescription>
            </EmptyState>

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
          description at 6.48:1. The error kind uses the same colors: its title,
          its sticker, and its role tell it apart, never red.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Accessibility and motion
        </h2>
        <p className="text-muted-foreground">
          The empty kind is a region labelled by its title, so a screen reader
          user can find it and hear what it is. There is no{' '}
          <code>role="status"</code> and no live region: a resting state must
          not announce itself on every render. The error kind is an{' '}
          <code>alert</code> labelled by the same title, so it is announced when
          it appears, as when it replaces the content that failed, and a screen
          reader tells it apart from an empty state. The title renders{' '}
          <code>h2</code> by default and takes an <code>as</code> prop for the
          level the surrounding document needs — <code>h3</code> inside a card.
        </p>
        <p className="text-muted-foreground">
          The sticker is one image named by its label, which describes the
          picture rather than repeating the title. The icon is{' '}
          <code>aria-hidden</code>. Tab reaches the action buttons and nothing
          else. The block itself does not animate, because the state it replaces
          is usually a skeleton and the swap displaces no siblings; the only
          motion is the sticker&apos;s own pop-in and line boil.
        </p>
      </section>
    </article>
  )
}
