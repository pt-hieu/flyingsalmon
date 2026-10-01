import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Preview } from '@/components/preview'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { NumberField } from '@/registry/ui/number-field'
import { Slider } from '@/registry/ui/slider'

export const Route = createFileRoute('/_docs/components/slider')({
  component: SliderPage,
})

const budgetLevels = [
  'Easy on the wallet, about $400 per person',
  'Easy on the wallet, about $600 per person',
  'Comfortable, about $800 per person',
  'Comfortable, about $1,000 per person',
  'Comfortable, about $1,200 per person',
  'Treat ourselves, about $1,500 per person',
  'Treat ourselves, about $2,000 per person',
]

const paceLevels = [
  'Slow mornings, one plan a day',
  'Two plans a day, long lunches',
  'Packed days, early starts',
]

function describeBudgetLevel(budgetLevel: number) {
  return `${budgetLevels[budgetLevel]} for 5 days, before flights`
}

function SliderPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Slider
        </h1>
        <p className="text-muted-foreground text-lg">
          A stepped track for picking a level rather than typing a number. A dot
          marks every step, the fill runs to the thumb, and a description below
          the track says what the current step means.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Stepped, with a description
        </h2>
        <p className="text-muted-foreground">
          <code>min</code>, <code>max</code>, and <code>step</code> set the
          steps, and a dot is drawn for every one of them, so keep the count to
          what a reader can tell apart at a glance. The value is controlled:{' '}
          <code>value</code> is a number and <code>onValueChange</code> reports
          the next one. <code>description</code> is your words for the current
          step. It sits under the track and is what a screen reader announces,
          so a step reads as its meaning, not as its index. There are no end
          labels; the description already names where the thumb is.
        </p>
        <Preview>
          <PaceExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">With an action</h2>
        <p className="text-muted-foreground">
          <code>action</code> places a node beside the track, centred on it. Use
          it for a way out of the slider, such as switching to an exact number
          when the reader has one. The slider only positions the node; what it
          does is yours.
        </p>
        <Preview>
          <BudgetExample />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Width</h2>
        <p className="text-muted-foreground">
          The track grows with its container up to 28rem, and the action keeps
          its own width beside it. Constrain the slider further with{' '}
          <code>className</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Keyboard</h2>
        <p className="text-muted-foreground">
          Tab reaches the thumb. The arrow keys move one step and stop at the
          ends, Page Up and Page Down move ten, and Home and End jump to{' '}
          <code>min</code> and <code>max</code>. Disabled takes the thumb out of
          the tab order and dims the slider, its label, and its description.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The fill's width transitions at <code>--motion-fast</code>, so a step
          reads as a short slide rather than a jump. The thumb follows the
          pointer and the keys directly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The thumb is the <code>slider</code>. It takes its name from the label
          and its <code>aria-valuetext</code> from the description, and it draws
          the offset focus ring. The dots and the fill are hidden from assistive
          technology, because the value text already says what they show.{' '}
          <code>required</code> marks the label; a slider always holds a value,
          so there is nothing for it to block. With <code>name</code> set inside
          a form, the value posts under that name.
        </p>
      </section>
    </article>
  )
}

function PaceExample() {
  const [paceLevel, setPaceLevel] = useState(1)

  return (
    <Slider
      className="w-full"
      label="Pace"
      min={0}
      max={paceLevels.length - 1}
      value={paceLevel}
      description={paceLevels[paceLevel]}
      onValueChange={setPaceLevel}
    />
  )
}

function BudgetExample() {
  const [budgetLevel, setBudgetLevel] = useState(3)
  const [hasExactBudget, setHasExactBudget] = useState(false)
  const [exactBudget, setExactBudget] = useState<number | null>(1000)

  if (hasExactBudget) {
    return (
      <div className="flex w-full flex-wrap items-end gap-x-4 gap-y-3">
        <NumberField
          className="w-64"
          label="Budget per person"
          prefix="$"
          min={100}
          step={100}
          required
          value={exactBudget}
          onValueChange={setExactBudget}
        />
        <Button
          variant={ButtonVariant.Ghost}
          onClick={() => setHasExactBudget(false)}
        >
          Not sure yet
        </Button>
      </div>
    )
  }

  return (
    <Slider
      className="w-full"
      label="Budget"
      min={0}
      max={budgetLevels.length - 1}
      required
      value={budgetLevel}
      description={describeBudgetLevel(budgetLevel)}
      onValueChange={setBudgetLevel}
      action={
        <Button
          variant={ButtonVariant.Ghost}
          onClick={() => setHasExactBudget(true)}
        >
          I have a number
        </Button>
      }
    />
  )
}
