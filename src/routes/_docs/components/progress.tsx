import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Preview } from '@/components/preview'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Progress } from '@/registry/ui/progress'

export const Route = createFileRoute('/_docs/components/progress')({
  component: ProgressPage,
})

function ProgressPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Progress
        </h1>
        <p className="text-muted-foreground text-lg">
          A bar for an operation with a known end. It reports how far along the
          work is when the fraction is computable, and that the work is running
          when it is not.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Spinner, skeleton, progress, stepper
        </h2>
        <p className="text-muted-foreground">
          Four ways to report that something is happening, and each owns a
          different subject. A{' '}
          <strong className="text-foreground">spinner</strong> is a
          control&apos;s own busyness: the button the user just clicked is
          working. A <strong className="text-foreground">skeleton</strong> is a
          region loading: content whose shape is already known has not arrived
          yet. A <strong className="text-foreground">progress</strong> bar is an
          operation with a known end: a long job with nothing to fake and no
          control to attach to. A{' '}
          <strong className="text-foreground">stepper</strong> is a position:
          step 2 of 4 in a flow the user is walking, not work a machine is
          doing.
        </p>
        <p className="text-muted-foreground">
          Progress is domain-blind. It takes a number and a maximum and draws a
          bar. The app decides what the number means and writes the phase label
          beside it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Determinate</h2>
        <p className="text-muted-foreground">
          Pass <code>value</code> and the fill animates to that fraction of{' '}
          <code>max</code>, which defaults to 100. Each new value retargets the
          spring from wherever the fill currently sits, so a stream of small
          steps reads as one continuous travel rather than a series of jumps.
          The spring never overshoots, because a fill past its value misreports
          the work.
        </p>
        <Preview>
          <SteppedProgressDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Indeterminate</h2>
        <p className="text-muted-foreground">
          Omit <code>value</code> and the bar goes indeterminate: a segment
          travels the track on a 2s cycle, the same tempo skeleton pulses on.
          This is the state for work that has started and will end, but whose
          fraction is not computable yet — the window before the first progress
          event arrives. Swap to a number as soon as one exists.
        </p>
        <Preview>
          <div className="w-full max-w-xs">
            <Progress />
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A custom max</h2>
        <p className="text-muted-foreground">
          <code>max</code> lets the app count in its own units instead of
          converting to a percentage first. A generation that writes seven days
          counts to seven. <code>value</code> clamps to <code>[0, max]</code>{' '}
          for both the fill and the announced value, so an off-by-one from a
          server never draws a bar past its end.
        </p>
        <Preview>
          <div className="w-full max-w-xs space-y-2">
            <Progress value={5} max={7} label="Writing days" />
            <p className="text-muted-foreground text-xs">Day 5 of 7</p>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          The app owns the text
        </h2>
        <p className="text-muted-foreground">
          Progress has no text slots. It draws a bar and names itself for a
          screen reader; the label above it and the value beside it are the
          app&apos;s, because only the app knows what phase the work is in and
          how to word it. Compose them around the bar.
        </p>
        <Preview>
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">Building your trip</span>
              <span className="text-muted-foreground tabular-nums">62%</span>
            </div>
            <Progress value={62} label="Building your trip" />
            <p className="text-muted-foreground text-xs">
              Picking anchors in Kyoto
            </p>
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          The bar is not interactive: no hover, no focus, no press, no disabled,
          and no tab stop. It carries its phase as <code>data-state</code>,
          which is <code>indeterminate</code>, <code>loading</code>, or{' '}
          <code>complete</code> once <code>value</code> reaches <code>max</code>
          . A full bar keeps the fill color rather than turning green: the
          result of the operation belongs to the app, in the place the user is
          already looking. <code>data-state</code> is the hook for an app that
          wants to react to the end of the work.
        </p>
        <Preview>
          <div className="w-full max-w-xs space-y-3">
            <Progress value={0} />
            <Progress value={45} />
            <Progress value={100} />
          </div>
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Color</h2>
        <p className="text-muted-foreground">
          Two tokens: <code>--progress-track</code> for the groove and{' '}
          <code>--progress-fill</code>, which aliases <code>--indicator</code>,
          for the fill. The fill clears 3:1 against the track, so the boundary
          is readable without color vision. The track sits at 1.26:1 against the
          page, so an empty bar is visible without a border.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The bar is a <code>progressbar</code> with <code>aria-valuemin</code>{' '}
          at 0 and <code>aria-valuemax</code> at <code>max</code>. When
          determinate it carries <code>aria-valuenow</code>, and a screen reader
          reads a percentage. When indeterminate it carries no{' '}
          <code>aria-valuenow</code> at all, so no percentage is announced
          before one can be computed.
        </p>
        <p className="text-muted-foreground">
          <code>label</code> becomes <code>aria-label</code> and defaults to
          &ldquo;Loading&rdquo;. Name the work whenever more than one bar can be
          on screen. The bar sets no <code>aria-busy</code>: that belongs on the
          app&apos;s region, which knows which content is waiting.
        </p>
      </section>
    </article>
  )
}

function SteppedProgressDemo() {
  const [value, setValue] = useState(20)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Progress value={value} label="Stepped demo" />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() => setValue((current) => Math.min(current + 20, 100))}
        >
          Advance
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() => setValue(0)}
        >
          Reset
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          {value}%
        </span>
      </div>
    </div>
  )
}
