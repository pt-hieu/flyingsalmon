import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { Button, ButtonVariant } from '@/registry/ui/button'
import { Form, FormActions } from '@/registry/ui/form'
import { Input, InputType } from '@/registry/ui/input'
import { Textarea } from '@/registry/ui/textarea'

export const Route = createFileRoute('/_docs/components/form')({
  component: FormPage,
})

function preventNavigationOnSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

function FormPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Form</h1>
        <p className="text-muted-foreground text-lg">
          A layout shell for a set of fields. It gives them one vertical rhythm,
          an actions row, and a fixed position where the app puts the submit
          result. It owns no form state, dictates no form-state library, and
          paints nothing of its own.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Two exports: <code>Form</code> and <code>FormActions</code>.{' '}
          <strong className="text-foreground">
            There is no <code>FormField</code>
          </strong>{' '}
          — every field family component already owns its own label, id linkage,
          and error message, so there is nothing left for a wrapper to wrap. Put
          fields in as plain children.
        </p>
        <p className="text-muted-foreground">
          <code>Form</code> renders a real <code>&lt;form&gt;</code> and spreads
          native props, so <code>onSubmit</code>, <code>action</code>,{' '}
          <code>method</code>, and <code>id</code> behave exactly as they do on
          the element. The result is a <code>result</code> prop rather than a
          child, because the shell owns where it appears and a child cannot
          guarantee its own position.
        </p>
        <ModePreview>
          <Form
            className="w-full max-w-sm"
            onSubmit={preventNavigationOnSubmit}
          >
            <Input
              label="Destination"
              name="destination"
              placeholder="Lisbon"
            />
            <Input label="Dates" name="dates" placeholder="12–19 Oct" />
            <FormActions>
              <Button variant={ButtonVariant.Outline}>Cancel</Button>
              <Button type="submit">Save trip</Button>
            </FormActions>
          </Form>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Rhythm</h2>
        <p className="text-muted-foreground">
          One fixed step between children — 20px, on a flex column.{' '}
          <strong className="text-foreground">
            There is no <code>spacing</code> or <code>density</code> prop.
          </strong>{' '}
          Removing the decision is the point: every form in an app agrees
          without anyone copying a number. Fields with labels above need visibly
          more separation than the label-to-input distance inside a field, and
          error messages grow in on top of that. A heading dropped between two
          fields is another child and inherits the same step. A genuinely dense
          form is its own design decision, not a prop retrofitted here.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Actions row</h2>
        <p className="text-muted-foreground">
          <code>FormActions</code> stacks its buttons full width with the
          primary on top below 640px and lays them out in a right-aligned row
          above it — the same shape as the dialog footer. It sits in the normal
          flow as another child at the same rhythm step: no top border, no extra
          separation. It is optional; a one-button form can put the button in
          directly.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Write <code>type=&quot;submit&quot;</code> on the submit button.
          </strong>{' '}
          <code>Button</code> defaults to <code>type=&quot;button&quot;</code>,
          so a Cancel button next to it never submits by accident.{' '}
          <code>FormActions</code> injects nothing into its children — it would
          have to inspect and clone them, and that breaks the moment a button is
          wrapped.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Live submit</h2>
        <p className="text-muted-foreground">
          Submit either panel below. The handler waits 1.6 seconds on purpose so
          the button&apos;s morph is visible.{' '}
          <strong className="text-foreground">
            The submit button&apos;s <code>loading</code> is the only busyness a
            submitting form shows, and the fields stay editable while the
            request is in flight
          </strong>{' '}
          — so a typo can still be fixed. Form exposes no <code>pending</code>{' '}
          and no form-level <code>disabled</code>; every field already takes its
          own <code>disabled</code>.
        </p>
        <ModePreview>
          <LiveSubmitDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Field errors</h2>
        <p className="text-muted-foreground">
          Per-field failures belong to the field. Each one takes an{' '}
          <code>error</code> string and owns the whole failure itself: the
          label, the border, the ring, and the message below. Form neither
          collects them nor renders a summary, and it never reads error state
          from a context.
        </p>
        <ModePreview>
          <Form
            className="w-full max-w-sm"
            onSubmit={preventNavigationOnSubmit}
          >
            <Input
              label="Email"
              name="email"
              type={InputType.Email}
              defaultValue="not-an-address"
              error="Enter a valid email address"
            />
            <Textarea
              label="Notes"
              name="notes"
              minRows={2}
              defaultValue="…"
              error="Say a little more than that"
            />
            <FormActions>
              <Button variant={ButtonVariant.Outline}>Cancel</Button>
              <Button type="submit">Save trip</Button>
            </FormActions>
          </Form>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The result slot</h2>
        <p className="text-muted-foreground">
          Pass the app&apos;s own <code>Alert</code> to <code>result</code> and
          it renders below the actions row, as the last child of the column, at
          the same rhythm step.{' '}
          <strong className="text-foreground">
            One position, so the button the user just pressed never moves.
          </strong>{' '}
          The slot is a position, not a renderer: the app supplies the alert and
          picks its variant, because only the app knows what a successful submit
          means. Form-wide failures — cross-field validation, a server that is
          the validator — go through the same slot.
        </p>
        <p className="text-muted-foreground">
          The slot reserves no space when it is empty, carries no live region,
          and Form does no scroll or focus management: the alert announces
          itself through its own role. A dialog form leaves the slot empty — it
          closes on submit, so its result belongs on the item that changed.
        </p>
        <ModePreview>
          <Form
            className="w-full max-w-sm"
            onSubmit={preventNavigationOnSubmit}
            result={
              <Alert variant={AlertVariant.Error}>
                <AlertTitle>That card was declined</AlertTitle>
                <AlertDescription>
                  Try another card, or pay by bank transfer.
                </AlertDescription>
              </Alert>
            }
          >
            <Input
              label="Card number"
              name="card"
              defaultValue="4242 4242 4242 4242"
            />
            <FormActions>
              <Button variant={ButtonVariant.Outline}>Cancel</Button>
              <Button type="submit">Pay</Button>
            </FormActions>
          </Form>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Wiring a form-state library
        </h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Form ships no binding and depends on no form-state library.
          </strong>{' '}
          A design system is a rendering stack; form state is app logic, and
          dictating a library narrows who can adopt this one. Every example on
          this page runs on plain React state.
        </p>
        <p className="text-muted-foreground">
          The field family&apos;s props are the contract any library drives.
          Each member takes <code>name</code>, <code>error</code> as a single
          string, <code>disabled</code>, and its own change callback — native{' '}
          <code>onChange</code> on input and textarea,{' '}
          <code>onCheckedChange</code> on checkbox, <code>onValueChange</code>{' '}
          on select and radio-group. Wire a library&apos;s per-field state onto
          those four and it works; reducing that library&apos;s error shape down
          to the one string is app code, and so is subscribing to its submitting
          flag for the button&apos;s <code>loading</code>. No schema library is
          named here either: a Standard Schema issue, a plain string, and a
          library&apos;s own error type all reduce to the same string.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          <strong className="text-foreground">None of Form&apos;s own.</strong>{' '}
          The two things that move already animate themselves: a field&apos;s
          error message and the result alert each grow their own height from
          zero on <code>spring-settle</code>, so the content below them travels
          continuously rather than snapping. A layout animation on the root
          would double-animate the same shift. The submit button runs its own
          morph into <code>loading</code>. The rhythm uses flex <code>gap</code>{' '}
          rather than sibling margins, whose collapsing fights those height
          animations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Form sets <code>noValidate</code> by default, and it is overridable.
          The field&apos;s <code>error</code> string is meant to be the only
          error channel: native constraint validation would add a second one,
          rendered as a browser bubble positioned by the user agent, unowned and
          gone on the next click.
        </p>
        <p className="text-muted-foreground">
          Because the root is a real <code>&lt;form&gt;</code>, Enter in a text
          field submits through native implicit submission and Enter in a
          textarea inserts a newline. Tab order is DOM order and Form adds
          nothing to it.{' '}
          <strong className="text-foreground">
            There is no Cmd or Ctrl+Enter shortcut
          </strong>{' '}
          — a hidden keybinding with no visible affordance only helps people who
          already guessed it exists, and Tab then Enter on the submit button
          already works. Form paints no background, border, or text, so it
          carries no contrast obligation of its own; the fields, the buttons,
          and the result alert each meet AA on their own.
        </p>
      </section>
    </article>
  )
}

function LiveSubmitDemo() {
  const [submitting, setSubmitting] = useState(false)
  const [savedDestination, setSavedDestination] = useState<string | null>(null)
  const submitTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (submitTimeout.current) clearTimeout(submitTimeout.current)
    }
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const destination = String(
      new FormData(event.currentTarget).get('destination') ?? '',
    )
    setSavedDestination(null)
    setSubmitting(true)
    submitTimeout.current = setTimeout(() => {
      setSubmitting(false)
      setSavedDestination(destination.trim() || 'nowhere in particular')
    }, 1600)
  }

  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={handleSubmit}
      result={
        savedDestination ? (
          <Alert variant={AlertVariant.Success}>
            <AlertTitle>Trip saved</AlertTitle>
            <AlertDescription>
              Six days in {savedDestination}, ready to share.
            </AlertDescription>
          </Alert>
        ) : null
      }
    >
      <Input label="Destination" name="destination" defaultValue="Lisbon" />
      <Textarea label="Notes" name="notes" minRows={2} />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit" loading={submitting}>
          Save trip
        </Button>
      </FormActions>
    </Form>
  )
}
