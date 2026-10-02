import { createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import { snappedPencilStickerArt } from '@/components/snapped-pencil-sticker-art'
import {
  snappedPencilStickerLabel,
  snappedPencilStickerRoleClassNames,
} from '@/components/snapped-pencil-sticker'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateSticker,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'

export const Route = createFileRoute('/_docs/components/error-state')({
  component: ErrorStatePage,
})

function ErrorStatePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Error State
        </h1>
        <p className="text-muted-foreground text-lg">
          An empty state for content that failed to arrive. It says what
          happened and what the user can do about it, in the same layout, and is
          announced when it appears.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">When to use it</h2>
        <p className="text-muted-foreground">
          An error state is the failed state of the affected item, the first
          home for a result in the feedback rule: the region that was meant to
          fill says that it did not, with a retry, where the user is already
          looking. An error with a closer home does not use it: a form&apos;s
          error belongs to the acting surface&apos;s <code>alert</code>, and a
          result with no visible home goes to a <code>notice</code>. A region
          that is legitimately empty is an <code>empty-state</code>.
        </p>
        <Preview>
          <ErrorState>
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
          </ErrorState>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Slots</h2>
        <p className="text-muted-foreground">
          <code>ErrorState</code> replaces <code>EmptyState</code> as the root
          and takes its <code>size</code>; every other slot is an empty-state
          part. The layout stays the same and the art stays a sticker, tilted
          right where an empty state tilts it left: no red icon and no{' '}
          <code>Alert</code> inside it. The description says what happened and
          what was kept, and the actions offer the retry and the way back to the
          input.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Contrast</h2>
        <p className="text-muted-foreground">
          The colors are the empty state&apos;s: its title, its sticker, and its
          role tell it apart, never red.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The block is an <code>alert</code> labelled by its title, so it is
          announced when it appears, as when it replaces the content that
          failed, and a screen reader tells it apart from an empty state. A
          caller cannot change that role. Everything else, from the heading
          level to the tab stops, is the empty state&apos;s.
        </p>
      </section>
    </article>
  )
}
