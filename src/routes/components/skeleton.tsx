import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { Skeleton, SkeletonVariant } from '@/registry/ui/skeleton'

export const Route = createFileRoute('/components/skeleton')({
  component: SkeletonPage,
})

function SkeletonPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Skeleton
        </h1>
        <p className="text-muted-foreground text-lg">
          The region-loading placeholder. A pulsing block holds the shape of
          content that has not arrived yet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Spinner or skeleton</h2>
        <p className="text-muted-foreground">
          A skeleton reports that a region is loading: a list, a card, a page of
          content on first load. A spinner reports that an action is running: a
          form submits, a setting saves. Never swap a control the user just
          clicked for a skeleton, and never show both for one wait.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Variants</h2>
        <p className="text-muted-foreground">
          Three shapes. <code>text</code> is the default: one line tall and full
          width, so stacked lines scale with the surrounding font.{' '}
          <code>circle</code> and <code>rectangle</code> carry no size of their
          own.
        </p>
        <ModePreview>
          <div className="w-full max-w-xs space-y-3">
            <Skeleton />
            <Skeleton className="w-3/4" />
            <div className="flex items-center gap-3">
              <Skeleton variant={SkeletonVariant.Circle} className="size-10" />
              <Skeleton className="w-32" />
            </div>
            <Skeleton
              variant={SkeletonVariant.Rectangle}
              className="h-24 w-full"
            />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizing</h2>
        <p className="text-muted-foreground">
          There are no size props. The consumer sizes every block through{' '}
          <code>className</code>, because a placeholder must match the content
          it stands in for. Radii come from the radius scale: the base radius
          for <code>rectangle</code>, a tighter step for <code>text</code>, full
          rounding for <code>circle</code>. Every block also carries its shape
          as <code>data-variant</code>, so a consumer can target one shape from
          CSS or from a test.
        </p>
        <ModePreview>
          <div className="w-full max-w-xs space-y-3 text-xs">
            <Skeleton />
            <p className="text-muted-foreground">Small text line</p>
          </div>
          <div className="w-full max-w-xs space-y-3 text-2xl">
            <Skeleton />
            <p className="text-muted-foreground text-xs">Heading line</p>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          One state: pulsing. The whole block fades from full opacity to half
          and back on a 2s ease-in-out cycle, on CSS keyframes. There is no
          enter animation and no exit animation. The skeleton appears at once,
          and the content replaces it at once.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The skeleton is always <code>aria-hidden</code> and never takes a tab
          stop, so a screen reader hears nothing from it. The region that is
          loading owns the announcement: put <code>aria-busy</code> on the
          container that will hold the real content.
        </p>
      </section>
    </article>
  )
}
