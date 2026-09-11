import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { NumberField, NumberFieldSize } from '@/registry/ui/number-field'

export const Route = createFileRoute('/components/number-field')({
  component: NumberFieldPage,
})

function NumberFieldPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Number Field
        </h1>
        <p className="text-muted-foreground text-lg">
          A quantity field that formats for the reader's locale, clamps to its
          bounds, and steps from the keyboard or its own spin buttons. It
          reports a number or nothing at all, never the text on screen.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          It reports a number, never a string
        </h2>
        <p className="text-muted-foreground">
          <code>onValueChange</code> carries <code>number | null</code>. An
          empty field is <code>null</code> — never <code>NaN</code>, never{' '}
          <code>0</code>, so nothing downstream has to tell "unanswered" from
          "zero". While you type, the field reports what the parser reads, in
          range or not; blur and Enter clamp into <code>[min, max]</code> and
          reformat. Text the parser cannot read reverts to the last committed
          value and raises no error: the <code>error</code> prop is the only
          error channel. Native <code>onChange</code> still reaches the inner
          input if you want the keystrokes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Always set min</h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Set <code>min</code> on every field that cannot go negative.
          </strong>{' '}
          It bounds the clamp, it gives Home somewhere to jump, it disables the
          decrease button at the floor, and it picks the mobile keyboard:{' '}
          <code>numeric</code> when <code>min</code> is zero or above,{' '}
          <code>decimal</code> when the step is fractional, and the full{' '}
          <code>text</code> keyboard only when negatives are possible. A guest
          count with no <code>min</code> is a field that accepts minus three
          people.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Group size</h2>
        <p className="text-muted-foreground">
          The plainest shape: a floor of one, a step of one, no prefix and no
          unit. The decrease button dims at the floor and stops there, and so do
          the arrow keys.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Group size"
            defaultValue={2}
            min={1}
            max={12}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Budget per person</h2>
        <p className="text-muted-foreground">
          <code>prefix</code> puts a symbol before the value and{' '}
          <code>step</code> sizes one press of a spin button. Both are plain
          text — no <code>Intl</code> currency formatting — so the prefix reads
          the way your product writes money. The value still groups for the
          locale, and the prefix joins it in the announcement:{' '}
          <code>$1,500</code>.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Budget per person"
            prefix="$"
            defaultValue={1500}
            min={0}
            step={50}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Duration</h2>
        <p className="text-muted-foreground">
          <code>unit</code> puts a word after the value. With <code>min</code>{' '}
          and <code>max</code> both set, Home and End jump to the ends of the
          range, Page Up and Page Down move by <code>largeStep</code> — ten
          times <code>step</code> unless you say otherwise — and each spin
          button dims as its end arrives.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Duration"
            unit="days"
            defaultValue={7}
            min={1}
            max={30}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes match input's, so a number field and a text field line up in
          a row. The spin buttons are squares the height of the field, so the
          control keeps its proportions at both sizes. There is no variant prop
          and no <code>width</code> prop — constrain the wrapper with{' '}
          <code>className</code>, as every example here does.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Group size"
            defaultValue={2}
            min={1}
          />
          <NumberField
            className="w-64"
            size={NumberFieldSize.Small}
            label="Group size"
            defaultValue={2}
            min={1}
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">
          <code>error</code> turns the border, the dividers, and the label
          destructive, sets <code>aria-invalid</code>, and renders the message
          below. The field grows downward only. Nothing shakes — the mood is
          soft, so errors arrive calmly.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Group size"
            defaultValue={0}
            min={0}
            error="Book for at least one guest"
          />
          <NumberField
            className="w-64"
            size={NumberFieldSize.Small}
            label="Budget per person"
            prefix="$"
            defaultValue={0}
            min={0}
            step={50}
            error="Enter a budget above zero"
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> replaces the spin button pair with a spinner in
          exactly the pair's width, so nothing moves.{' '}
          <strong className="text-foreground">The field stays typeable</strong>{' '}
          — loading here means background work, such as a quote being priced,
          and the submit button is what locks a flow. With an error alongside,
          both show and the spinner turns destructive.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Budget per person"
            prefix="$"
            defaultValue={1500}
            min={0}
            step={50}
            loading
          />
          <NumberField
            className="w-64"
            label="Budget per person"
            prefix="$"
            defaultValue={1500}
            min={0}
            step={50}
            loading
            error="No trips at this budget"
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Disabled and read-only
        </h2>
        <p className="text-muted-foreground">
          Both keep the spin buttons in place and mark them{' '}
          <code>aria-disabled</code>, so the control never changes shape as it
          locks. Disabled dims the field and its label together, takes no
          pointer events, and posts nothing, exactly like a native disabled
          control. Read-only keeps full contrast on a muted background, stays
          focusable so the value can be read and copied, and still posts.
        </p>
        <ModePreview>
          <NumberField
            className="w-64"
            label="Group size"
            defaultValue={2}
            min={1}
            disabled
          />
          <NumberField
            className="w-64"
            label="Duration"
            unit="days"
            defaultValue={7}
            min={1}
            max={30}
            readOnly
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Keyboard</h2>
        <p className="text-muted-foreground">
          Up and Down step by <code>step</code>. Page Up, Page Down, and the
          shifted arrows step by <code>largeStep</code>. Home and End jump to{' '}
          <code>min</code> and <code>max</code>, and do nothing when that bound
          is unset. Enter commits and lets the form submit. Escape is left
          alone, because it belongs to whatever dialog encloses the field, and
          the wheel never steps, so a scroll through a form cannot change an
          answer. Tab reaches the field and then leaves: the spin buttons sit
          outside the tab ring, since the arrow keys already do their job.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The border, the field background, and the spin button backgrounds
          transition at <code>--motion-fast</code>. Holding a spin button
          repeats after 400ms at 60ms. The error message is the one enter and
          exit: height and opacity on <code>spring-settle</code>. Digits never
          tween and the reformat on blur is instant — a number that animates is
          a number you cannot read.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The text input is the <code>spinbutton</code>: it carries{' '}
          <code>aria-valuemin</code>, <code>aria-valuemax</code>,{' '}
          <code>aria-valuenow</code>, and an <code>aria-valuetext</code> that
          includes the prefix and the unit, so a screen reader hears "$1,500"
          rather than "1500". An empty field omits both value attributes rather
          than announce a number it does not have. The visible prefix and unit
          are <code>aria-hidden</code>, because the value text already says
          them. The spin buttons are named Decrease and Increase and point at
          the input with <code>aria-controls</code>. The whole box draws the
          focus ring on <code>focus-within</code>, since the input inside it
          owns no border of its own. <code>required</code> marks the label and
          sets <code>aria-required</code>; the validation itself stays with your
          app.
        </p>
      </section>
    </article>
  )
}
