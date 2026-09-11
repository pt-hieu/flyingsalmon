import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Checkbox } from '@/registry/ui/checkbox'

export const Route = createFileRoute('/components/checkbox')({
  component: CheckboxPage,
})

function CheckboxPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Checkbox
        </h1>
        <p className="text-muted-foreground text-lg">
          A tri-state checkbox that owns its label and its error message. One
          size, no variants — error, disabled, and indeterminate are states.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          Checkbox renders a wrapper around the box so it can hold the label and
          the error message.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the box.
          </strong>{' '}
          Every other prop passes through to the Radix root, the same divergence
          from stock shadcn that Input carries.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          One 20px box and a 20px row, so a checkbox that starts a row leaves no
          dead space above or below it. Checked and indeterminate both take the
          <code>--indicator</code> fill. There is no size prop and no loading
          state — a checkbox states intent inside a form, and the submit button
          owns the busyness.
        </p>
        <ModePreview>
          <div className="flex flex-col gap-4">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" checked="indeterminate" />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled and checked" disabled defaultChecked />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Tri-state</h2>
        <p className="text-muted-foreground">
          <code>checked</code> takes <code>true</code>, <code>false</code>, or{' '}
          <code>&quot;indeterminate&quot;</code> — the Radix value passed
          straight through, so a select-all header row is one prop. The
          indeterminate box reports <code>aria-checked=&quot;mixed&quot;</code>.
          Grouping is the app&apos;s job: this component ships no checkbox
          group. Toggle the parent below to watch the mark morph.
        </p>
        <ModePreview>
          <SelectAllExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">
          Pass <code>error</code> and the box mirrors Input: the border, the
          focus ring, and the label turn destructive, and the message renders
          below.{' '}
          <strong className="text-foreground">
            The fill turns destructive too while checked.
          </strong>{' '}
          A 20px box is too small to read a red border against a blue fill, so
          the whole control carries one color.
        </p>
        <ModePreview>
          <div className="flex flex-col gap-4">
            <Checkbox
              label="Accept the terms"
              error="You must accept the terms to continue"
            />
            <Checkbox
              label="Accept the terms"
              defaultChecked
              error="Accept the updated terms, revised today"
            />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The check scales in with opacity on <code>spring-bounce</code> at{' '}
          <code>--motion-base</code>. Entry cannot morph, because a morph needs
          two shapes. Checked to indeterminate is the signature move: the{' '}
          <code>d</code> attribute of one path animates between the check and
          the dash. Both marks are drawn as one move-to plus two line-tos, which
          is what lets motion interpolate them — keep the command counts
          identical if you redraw either mark. Unchecking fades and shrinks the
          mark out on <code>spring-settle</code>, with no reverse draw. The
          fill, the hover shade, the focus ring, and the destructive colors are
          CSS transitions at <code>--motion-fast</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Checkbox generates the box <code>id</code> and wires the label{' '}
          <code>htmlFor</code> itself, so clicking the label toggles the box and
          the click target covers both. Tab focuses the box and Space toggles
          it. An error sets <code>aria-invalid</code> and links the message
          through <code>aria-describedby</code>, keeping any description you
          passed. The focus ring is keyboard-only and sits 2px clear of the box,
          the same 3px ring Button and Switch use. There is no press ring,
          because a held state means nothing on an instant toggle.{' '}
          <code>required</code> marks the label and sets{' '}
          <code>aria-required</code>; the validation itself stays with your app.
        </p>
      </section>
    </article>
  )
}

const fruitOptions = ['Apples', 'Oranges', 'Pears'] as const

function summariseSelection(selectedCount: number, totalCount: number) {
  if (selectedCount === totalCount) return true
  if (selectedCount === 0) return false
  return 'indeterminate' as const
}

function SelectAllExample() {
  const [selectedFruits, setSelectedFruits] = useState<string[]>(['Oranges'])

  const allSelected = selectedFruits.length === fruitOptions.length

  function toggleFruit(fruit: string, isChecked: boolean) {
    setSelectedFruits((previouslySelected) =>
      isChecked
        ? [...previouslySelected, fruit]
        : previouslySelected.filter((selected) => selected !== fruit),
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="All fruit"
        checked={summariseSelection(selectedFruits.length, fruitOptions.length)}
        onCheckedChange={() =>
          setSelectedFruits(allSelected ? [] : [...fruitOptions])
        }
      />
      <div className="flex flex-col gap-3 pl-7">
        {fruitOptions.map((fruit) => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selectedFruits.includes(fruit)}
            onCheckedChange={(isChecked) =>
              toggleFruit(fruit, isChecked === true)
            }
          />
        ))}
      </div>
    </div>
  )
}
