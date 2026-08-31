import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { Spinner } from '@/registry/ui/spinner'

export const Route = createFileRoute('/components/spinner')({
  component: SpinnerPage,
})

function SpinnerPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Spinner
        </h1>
        <p className="text-muted-foreground text-lg">
          The loading primitive for action busyness. The button embeds it, and
          it ships standalone for inline working moments.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Spinner or skeleton</h2>
        <p className="text-muted-foreground">
          A spinner reports that an action is running: a form submits, a setting
          saves. A skeleton reports that a region is loading: a list, a card, a
          page of content. Pick one for a given wait, never both.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes match the button size tiers: <code>default</code> at 16px
          and <code>sm</code> at 12px. Standalone use takes <code>default</code>
          .
        </p>
        <ModePreview>
          <Spinner />
          <Spinner size="sm" />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Color</h2>
        <p className="text-muted-foreground">
          The arc draws in <code>currentColor</code> and there is no track
          behind it, so the spinner inherits the text color of whatever contains
          it.
        </p>
        <ModePreview>
          <span className="text-foreground">
            <Spinner />
          </span>
          <span className="text-primary">
            <Spinner />
          </span>
          <span className="text-muted-foreground">
            <Spinner />
          </span>
          <span className="text-destructive">
            <Spinner />
          </span>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          One state: spinning. The arc turns 360° per 800ms, linear and endless,
          on CSS keyframes. There is no enter animation and no exit animation.
          The spinner appears and disappears at once.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Standalone, the spinner carries <code>role=&quot;status&quot;</code>{' '}
          and reads out its <code>label</code>, which defaults to
          &quot;Loading&quot;. It never takes focus and never takes a tab stop.
          A component that announces its own busyness, such as the button,
          embeds the spinner with <code>aria-hidden</code> so the wait is
          announced once.
        </p>
      </section>
    </article>
  )
}
