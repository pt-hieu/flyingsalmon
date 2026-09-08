import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupOrientation,
} from '@/registry/ui/radio-group'

export const Route = createFileRoute('/components/radio-group')({
  component: RadioGroupPage,
})

function RadioGroupPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Radio Group
        </h1>
        <p className="text-muted-foreground text-lg">
          A single choice from a small set of visible options. It owns its label
          and its error message like the rest of the field family. One size, no
          variants — error and disabled are states.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          RadioGroup renders a wrapper around the option list so it can hold the
          group label and the error message, the same as Checkbox and Select.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the list.
          </strong>{' '}
          On <code>RadioGroupItem</code> it styles the row that holds the circle
          and its label. Every other prop passes through to the matching Radix
          part.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States</h2>
        <p className="text-muted-foreground">
          One 20px circle, matching Checkbox&apos;s box, on a 20px row. The
          checked item fills <code>--primary</code> and knocks an 8px dot out of
          it, so a radio sitting beside a checkbox in the same form reads as the
          same family — not the unfilled circle with a colored dot that most
          libraries draw. Hover steps an unchecked border to primary and a
          checked disc a shade lighter. There is no size prop and no loading
          state: an option states intent inside a form, and the submit button
          owns the busyness.
        </p>
        <ModePreview>
          <div className="flex flex-col gap-8">
            <RadioGroup label="Enabled" defaultValue="checked">
              <RadioGroupItem value="unchecked" label="Unchecked" />
              <RadioGroupItem value="checked" label="Checked" />
            </RadioGroup>
            <RadioGroup label="Disabled" defaultValue="checked" disabled>
              <RadioGroupItem value="unchecked" label="Unchecked" />
              <RadioGroupItem value="checked" label="Checked" />
            </RadioGroup>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Basic</h2>
        <p className="text-muted-foreground">
          <code>RadioGroup</code> takes <code>label</code>, <code>error</code>,{' '}
          <code>value</code>, <code>defaultValue</code>,{' '}
          <code>onValueChange</code>, <code>name</code>, <code>disabled</code>,
          and <code>required</code>. <code>RadioGroupItem</code> takes{' '}
          <code>value</code>, <code>label</code>, and <code>disabled</code> —
          and nothing else. There is no description line, no{' '}
          <code>ReactNode</code> label, and no card-style item: an option that
          needs a price or a badge beside it is a group the app composes from
          Radix itself.
        </p>
        <ModePreview>
          <RadioGroup label="Delivery speed" defaultValue="standard">
            <RadioGroupItem value="standard" label="Standard, 3–5 days" />
            <RadioGroupItem value="express" label="Express, next day" />
            <RadioGroupItem value="overnight" label="Overnight, before 9am" />
          </RadioGroup>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Horizontal</h2>
        <p className="text-muted-foreground">
          <code>orientation</code> takes{' '}
          <code>RadioGroupOrientation.Horizontal</code> and lays the options out
          in a row. Radix remaps the arrow keys to match.{' '}
          <strong className="text-foreground">
            Horizontal is for short labels.
          </strong>{' '}
          A row of full sentences wraps unpredictably and loses the alignment
          that makes a set of options scannable.
        </p>
        <ModePreview>
          <RadioGroup
            label="Seat"
            defaultValue="window"
            orientation={RadioGroupOrientation.Horizontal}
          >
            <RadioGroupItem value="window" label="Window" />
            <RadioGroupItem value="aisle" label="Aisle" />
            <RadioGroupItem value="either" label="Either" />
          </RadioGroup>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error and disabled</h2>
        <p className="text-muted-foreground">
          Pass <code>error</code> and the group label, the item borders, the
          focus ring, and the checked disc all turn destructive, with the
          message below.{' '}
          <strong className="text-foreground">
            The disc keeps its knocked-out dot; only the fill changes color.
          </strong>{' '}
          <code>disabled</code> on the group dims and disables every option;{' '}
          <code>disabled</code> on one item takes that option out while the rest
          stay live.
        </p>
        <ModePreview>
          <div className="flex flex-col gap-8">
            <RadioGroup
              label="Delivery speed"
              defaultValue="express"
              error="Overnight is the only speed available today"
            >
              <RadioGroupItem value="standard" label="Standard, 3–5 days" />
              <RadioGroupItem value="express" label="Express, next day" />
              <RadioGroupItem value="overnight" label="Overnight, before 9am" />
            </RadioGroup>
            <RadioGroup label="Gift wrap" defaultValue="none">
              <RadioGroupItem value="none" label="No wrapping" />
              <RadioGroupItem value="paper" label="Recycled paper" />
              <RadioGroupItem
                value="ribbon"
                label="Ribbon, out of stock"
                disabled
              />
            </RadioGroup>
            <RadioGroup
              label="Signature on delivery"
              defaultValue="any"
              disabled
            >
              <RadioGroupItem value="any" label="Anyone at the address" />
              <RadioGroupItem value="named" label="Named recipient only" />
            </RadioGroup>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Controlled</h2>
        <p className="text-muted-foreground">
          <code>value</code> plus <code>onValueChange</code> hands the selection
          to the app; <code>defaultValue</code> leaves it with the component.{' '}
          <code>name</code> puts the chosen value into the surrounding form's{' '}
          <code>FormData</code>, so a plain native submit works with no
          JavaScript of your own. These are the props a form-state library
          drives — the registry binds to none of them itself.
        </p>
        <ModePreview>
          <ControlledPaymentExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The dot is mounted permanently and fades between opacity 0 and 1 on a
          CSS <code>transition-opacity</code> at <code>--motion-base</code>. It
          does not scale: a spring describes movement, and a lone opacity value
          has none to describe. The disc fill, the border, and the focus ring
          are CSS transitions at <code>--motion-fast</code> underneath, the same
          headline-over-feedback split Checkbox runs.{' '}
          <strong className="text-foreground">
            Radio Group is the first field-family member with no{' '}
            <code>motion</code> dependency
          </strong>{' '}
          — the animated error message below it still comes from the{' '}
          <code>field</code> item.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The group exposes <code>role=&quot;radiogroup&quot;</code> named by
          its label through <code>aria-labelledby</code> — no fieldset and no
          legend, because the role already carries the grouping. Each item
          generates its own <code>id</code> and wires its label{' '}
          <code>htmlFor</code>, so clicking a label selects that option. Tab
          enters the group once, landing on the checked option or the first
          enabled one, and the arrow keys move the selection from there; Space
          selects the focused option. An error sets <code>aria-invalid</code> on
          the group and links the message through <code>aria-describedby</code>,
          keeping any description you passed. The focus ring is keyboard-only
          and sits 2px clear of the circle, the same 3px ring Button, Checkbox,
          and Switch use.
        </p>
      </section>
    </article>
  )
}

const paymentLabels: Record<string, string> = {
  card: 'Card',
  transfer: 'Bank transfer',
  invoice: 'Invoice',
}

function ControlledPaymentExample() {
  const [selectedPayment, setSelectedPayment] = useState('card')

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        label="Payment method"
        name="payment"
        value={selectedPayment}
        onValueChange={setSelectedPayment}
      >
        {Object.entries(paymentLabels).map(([value, label]) => (
          <RadioGroupItem key={value} value={value} label={label} />
        ))}
      </RadioGroup>
      <p className="text-muted-foreground text-sm">
        Paying by {paymentLabels[selectedPayment]}.
      </p>
    </div>
  )
}
