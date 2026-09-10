import { createFileRoute } from '@tanstack/react-router'
import { Coffee, Landmark, Mountain, Music } from 'lucide-react'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemVariant,
  ToggleGroupMode,
  ToggleGroupSize,
} from '@/registry/ui/toggle-group'

export const Route = createFileRoute('/components/toggle-group')({
  component: ToggleGroupPage,
})

function ToggleGroupPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Toggle Group
        </h1>
        <p className="text-muted-foreground text-lg">
          Chips that toggle, in single or multiple mode, wrapping across rows. A
          member of the field family: it owns its label and its error message,
          takes <code>required</code>, and posts through <code>name</code>. Two
          sizes, one per-item color variant.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          ToggleGroup renders a wrapper around the chip row so it can hold the
          group label and the error message, the same as Radio Group and Select.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the row.
          </strong>{' '}
          On <code>ToggleGroupItem</code> it styles the chip. Every other prop
          passes through to the matching Radix part.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Single</h2>
        <p className="text-muted-foreground">
          <code>mode</code> defaults to <code>ToggleGroupMode.Single</code>:{' '}
          <code>value</code> is a string and <code>onValueChange</code> hands
          back a string.{' '}
          <strong className="text-foreground">
            Clicking the pressed chip deselects it and reports an empty string.
          </strong>{' '}
          That return to empty is the reason toggle-group sits beside Radio
          Group rather than inside it — a radio group cannot be emptied by the
          user. Each item takes an optional 16px leading <code>icon</code> on
          Button&apos;s slot rule.
        </p>
        <ModePreview>
          <SingleActivityExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Multiple and max</h2>
        <p className="text-muted-foreground">
          <code>ToggleGroupMode.Multiple</code> switches <code>value</code> to
          an array and adds <code>max</code>. At the cap every unpressed chip
          takes the disabled look and stops toggling, while pressed chips stay
          live so the user can always back out of a pick.{' '}
          <strong className="text-foreground">
            The registry renders no counter and no hint: the label says the
            limit.
          </strong>{' '}
          A capped chip and a disabled chip are deliberately indistinguishable —
          both are unavailable right now, and the label already explains why.
        </p>
        <ModePreview>
          <MultipleInterestsExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Required</h2>
        <p className="text-muted-foreground">
          <code>required</code> means the group must hold a value. The component
          blocks the deselect that would empty it, in both modes, and the field
          label renders its marker.{' '}
          <strong className="text-foreground">
            This is the field family&apos;s meaning of <code>required</code>.
          </strong>{' '}
          It is not a submit-time check: a group mounted empty is reachable, and
          a submit while it is still empty is the app&apos;s validation error,
          shown through <code>error</code>.
        </p>
        <ModePreview>
          <div className="flex flex-col gap-8">
            <ToggleGroup label="Trip pace" required defaultValue="steady">
              <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
              <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
              <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              label="Trip pace"
              required
              error="Pick a pace before generating"
            >
              <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
              <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
              <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Amber</h2>
        <p className="text-muted-foreground">
          <code>variant</code> on an item takes{' '}
          <code>ToggleGroupItemVariant.Amber</code>: amber-400 with neutral-950
          text, Button&apos;s amber row.{' '}
          <strong className="text-foreground">
            Amber is color and nothing else — the chip toggles like every other
            one.
          </strong>{' '}
          It marks an option that needs a step the label names, such as a visa
          or a permit. The fill stays amber whether the chip is pressed or not,
          so the pressed state moves into the border, where every other chip
          keeps its feedback. A chip that fires an action and never toggles is
          the app&apos;s to compose from a Button; the registry ships no such
          rule.
        </p>
        <ModePreview>
          <ToggleGroup
            label="Destinations"
            mode={ToggleGroupMode.Multiple}
            defaultValue={['lisbon', 'hanoi']}
          >
            <ToggleGroupItem value="lisbon">Lisbon</ToggleGroupItem>
            <ToggleGroupItem value="osaka">Osaka</ToggleGroupItem>
            <ToggleGroupItem
              value="hanoi"
              variant={ToggleGroupItemVariant.Amber}
            >
              Hanoi, visa needed
            </ToggleGroupItem>
            <ToggleGroupItem
              value="marrakesh"
              variant={ToggleGroupItemVariant.Amber}
            >
              Marrakesh, visa needed
            </ToggleGroupItem>
          </ToggleGroup>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes and states</h2>
        <p className="text-muted-foreground">
          <code>size</code> sits on the group, not on the item:{' '}
          <code>ToggleGroupSize.Default</code> is 36px and{' '}
          <code>ToggleGroupSize.Small</code> is 32px, matching Input and Button.
          Chips are fully rounded and wrap across rows. A chip rests on{' '}
          <code>--secondary</code> with its border in the same color, so hover
          shows up as the border stepping to <code>--accent</code>; pressed
          fills <code>--primary</code> and steps one shade lighter on hover.{' '}
          <strong className="text-foreground">
            Feedback lives in the border and the fill, never in elevation.
          </strong>{' '}
          A held press draws Button&apos;s tight 2px ring with no scale and no
          translate (ADR 0003).
        </p>
        <ModePreview>
          <div className="flex flex-col gap-8">
            <ToggleGroup label="Default, 36px" defaultValue="food">
              <ToggleGroupItem value="food">Food</ToggleGroupItem>
              <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
              <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              label="Small, 32px"
              size={ToggleGroupSize.Small}
              defaultValue="food"
            >
              <ToggleGroupItem value="food">Food</ToggleGroupItem>
              <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
              <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup label="One item disabled" defaultValue="food">
              <ToggleGroupItem value="food">Food</ToggleGroupItem>
              <ToggleGroupItem value="museums" disabled>
                Museums, closed today
              </ToggleGroupItem>
              <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              label="Whole group disabled"
              defaultValue="food"
              disabled
            >
              <ToggleGroupItem value="food">Food</ToggleGroupItem>
              <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Not a segmented control, not a badge
        </h2>
        <p className="text-muted-foreground">
          Tabs draw a shared track and switch the panel underneath; a segmented
          control is that same shape borrowed for a value. Toggle Group has no
          track, no fixed row, and no panel: the chips wrap, multiple mode
          exists, and single mode returns to empty.{' '}
          <strong className="text-foreground">
            If the choice navigates, it is Tabs. If it answers a question, it is
            Toggle Group.
          </strong>{' '}
          And a chip the user cannot press is a Badge — a read-only summary of
          activity types, or the chosen values echoed back on a review screen,
          is Badge and not a disabled group. There is no separate chip
          primitive.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Forms</h2>
        <p className="text-muted-foreground">
          <code>name</code> puts the raw values into the surrounding form&apos;s{' '}
          <code>FormData</code> through hidden inputs: one in single mode, one
          per pressed chip in multiple mode, and none at all while the group is
          empty. <code>value</code> with <code>onValueChange</code> hands the
          selection to the app and <code>defaultValue</code> leaves it with the
          component — the props a form-state library drives, and the registry
          binds to none of them itself (ADR 0007).
        </p>
        <ModePreview>
          <ControlledInterestsExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The fill and the border swap on a CSS transition at{' '}
          <code>--motion-fast</code>, and that is the whole of it.{' '}
          <strong className="text-foreground">
            Toggle Group has no <code>motion</code> dependency
          </strong>{' '}
          — chips added while the group is mounted appear with no enter
          animation, on Badge&apos;s precedent, and an app that mounts options
          dynamically wraps them itself. The animated error message below the
          row comes from the <code>field</code> item.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Single mode exposes <code>role=&quot;radiogroup&quot;</code> with{' '}
          <code>role=&quot;radio&quot;</code> chips carrying{' '}
          <code>aria-checked</code>; multiple mode exposes a group of buttons
          carrying <code>aria-pressed</code>. The group is named by its label
          through <code>aria-labelledby</code>, takes <code>aria-required</code>{' '}
          in single mode, and an <code>error</code> sets{' '}
          <code>aria-invalid</code> and links the message through{' '}
          <code>aria-describedby</code>.{' '}
          <strong className="text-foreground">The row is one tab stop.</strong>{' '}
          Tab lands on the pressed chip, Left and Right move and wrap at the
          ends, Home and End reach them directly, Space and Enter toggle, and Up
          and Down do nothing — a wrapped row has no vertical order to follow.
          Disabled and capped chips leave the arrow order. The focus ring is
          Button&apos;s keyboard-only offset ring.
        </p>
      </section>
    </article>
  )
}

function SingleActivityExample() {
  const [selectedActivity, setSelectedActivity] = useState('food')

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        label="Activity type"
        value={selectedActivity}
        onValueChange={setSelectedActivity}
      >
        <ToggleGroupItem value="food" icon={<Coffee />}>
          Food
        </ToggleGroupItem>
        <ToggleGroupItem value="museums" icon={<Landmark />}>
          Museums
        </ToggleGroupItem>
        <ToggleGroupItem value="hikes" icon={<Mountain />}>
          Hikes
        </ToggleGroupItem>
        <ToggleGroupItem value="nightlife" icon={<Music />}>
          Nightlife
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">
        {selectedActivity ? `Filtering by ${selectedActivity}.` : 'No filter.'}
      </p>
    </div>
  )
}

function MultipleInterestsExample() {
  return (
    <ToggleGroup
      label="Pick up to 3"
      mode={ToggleGroupMode.Multiple}
      max={3}
      defaultValue={['food', 'museums', 'markets']}
    >
      <ToggleGroupItem value="food">Food</ToggleGroupItem>
      <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
      <ToggleGroupItem value="markets">Markets</ToggleGroupItem>
      <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      <ToggleGroupItem value="nightlife">Nightlife</ToggleGroupItem>
      <ToggleGroupItem value="beaches">Beaches</ToggleGroupItem>
    </ToggleGroup>
  )
}

function ControlledInterestsExample() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['food'])

  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        label="Interests"
        name="interests"
        mode={ToggleGroupMode.Multiple}
        value={selectedInterests}
        onValueChange={setSelectedInterests}
      >
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hikes">Hikes</ToggleGroupItem>
      </ToggleGroup>
      <p className="text-muted-foreground text-sm">
        Posting {selectedInterests.length} hidden{' '}
        {selectedInterests.length === 1 ? 'input' : 'inputs'} named interests.
      </p>
    </div>
  )
}
