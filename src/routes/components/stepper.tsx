import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Stepper } from '@/registry/ui/stepper'

export const Route = createFileRoute('/components/stepper')({
  component: StepperPage,
})

function StepperPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Stepper
        </h1>
        <p className="text-muted-foreground text-lg">
          A display-only bar of equal segments, filled through the current one,
          for a position in a sequence whose count is known. It reads as ticks,
          not as a fraction.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Stepper, progress, timeline, tabs
        </h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Progress</strong> is a fraction of
          one operation with a known end: a machine is working and the bar says
          how far it got. <strong className="text-foreground">Stepper</strong>{' '}
          is a position in a sequence a person is walking: turn 2 of 4, with
          nothing partial about turn 2.{' '}
          <strong className="text-foreground">Timeline</strong> is a layout of
          markers joined by connectors, each carrying its own content and no
          item state. <strong className="text-foreground">Tabs</strong> navigate
          between peer panels. Stepper has no markers, no connectors, no
          fraction, and no navigation.
        </p>
        <p className="text-muted-foreground">
          It is domain-blind: it takes <code>count</code> and{' '}
          <code>current</code> and paints segments through the current one. The
          app maps its own notion of a step onto those two numbers and writes
          the position text.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Forward and back</h2>
        <p className="text-muted-foreground">
          <code>current</code> is 1-based and clamps to <code>[1, count]</code>,
          so a step past the end or below the start never draws past the bar.
          Advancing fills the reached segment from its left edge with a spring
          that overshoots inside the segment&apos;s own box; going back un-fills
          it without a wobble. The current segment paints the same as a
          completed one — a display-only bar has no reason to distinguish where
          you are from what you have done, and{' '}
          <code>data-state=&quot;current&quot;</code> is the hook for an app
          that wants a third look.
        </p>
        <ModePreview>
          <SteppedStepperDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A growing count</h2>
        <p className="text-muted-foreground">
          <code>count</code> may change while the bar is mounted. New segments
          render as upcoming with no enter animation, because a segment
          appearing is a change to the plan rather than movement through it.
        </p>
        <ModePreview>
          <GrowingStepperDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          The app owns the text
        </h2>
        <p className="text-muted-foreground">
          The stepper has no text slots and no segment labels. &ldquo;Turn 2 of
          4&rdquo; is the bar plus the app&apos;s own line, because only the app
          knows what a step is called. Compose the two.
        </p>
        <ModePreview>
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">Planning your trip</span>
              <span className="text-muted-foreground tabular-nums">
                Turn 2 of 4
              </span>
            </div>
            <Stepper count={4} current={2} label="Intake turn" />
            <p className="text-muted-foreground text-xs">
              Next: who is coming with you
            </p>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          The bar is not interactive: no hover, no focus, no press, no disabled,
          and no tab stop. Each segment carries its own <code>data-state</code>,
          which is <code>complete</code>, <code>current</code>, or{' '}
          <code>upcoming</code>. There are two paints: segments through{' '}
          <code>current</code> on <code>--progress-fill</code>, the rest on{' '}
          <code>--progress-track</code>. Both tokens come from the theme, which
          is why the stepper does not depend on the progress item.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The bar is a <code>list</code> named by <code>label</code>, which
          defaults to &ldquo;Progress&rdquo;. Each segment is a{' '}
          <code>listitem</code> named &ldquo;2 of 4&rdquo;, and the current one
          carries <code>aria-current=&quot;step&quot;</code>, so a screen reader
          reads &ldquo;2 of 4, current step&rdquo;. Nothing else sits on the
          root, and nothing in the bar takes focus.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A note on the name</h2>
        <p className="text-muted-foreground">
          Elsewhere &ldquo;stepper&rdquo; names the minus and plus pair beside a
          numeric input. In this registry that pair belongs to{' '}
          <code>number-field</code> and is called{' '}
          <strong className="text-foreground">spin buttons</strong>, the name
          its ARIA role already uses. <code>stepper</code> is this bar, because
          it is the word a consumer searches for when they want one.
        </p>
      </section>
    </article>
  )
}

function SteppedStepperDemo() {
  const [currentTurn, setCurrentTurn] = useState(1)
  const turnCount = 4

  return (
    <div className="w-full max-w-xs space-y-3">
      <Stepper count={turnCount} current={currentTurn} label="Stepped demo" />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() => setCurrentTurn((turn) => Math.max(turn - 1, 1))}
        >
          Back
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() =>
            setCurrentTurn((turn) => Math.min(turn + 1, turnCount))
          }
        >
          Next
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          Turn {currentTurn} of {turnCount}
        </span>
      </div>
    </div>
  )
}

function GrowingStepperDemo() {
  const [turnCount, setTurnCount] = useState(3)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Stepper count={turnCount} current={2} label="Growing demo" />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() => setTurnCount((count) => count + 1)}
        >
          Add a turn
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() => setTurnCount(3)}
        >
          Reset
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          Turn 2 of {turnCount}
        </span>
      </div>
    </div>
  )
}
