import { createFileRoute } from '@tanstack/react-router'
import { Search } from 'lucide-react'

import { ModePreview } from '@/components/mode-preview'
import { Input, InputSize, InputType } from '@/registry/ui/input'

export const Route = createFileRoute('/components/input')({
  component: InputPage,
})

function InputPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Input
        </h1>
        <p className="text-muted-foreground text-lg">
          A single-line text field that owns its label, its error message, and
          its busyness. Text-like types only.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Types</h2>
        <p className="text-muted-foreground">
          Seven text-like types cover what a single line of text can be.{' '}
          <strong className="text-foreground">
            <code>number</code> is superseded by number-field,
          </strong>{' '}
          which formats and parses in the reader's locale, clamps to its bounds,
          steps from the keyboard and from its own spin buttons, and reports a
          number rather than a string. Reach for it whenever the value is a
          quantity; <code>number</code> here stays for a numeric string nothing
          does arithmetic on.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          Input renders a wrapper around the <code>&lt;input&gt;</code> so it
          can hold the label and the error message.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the field.
          </strong>{' '}
          Every other native prop passes through to the{' '}
          <code>&lt;input&gt;</code>. Stock shadcn puts <code>className</code>{' '}
          on the field itself, so a copied snippet lands somewhere else than you
          expect. Every example on this page sets <code>w-64</code> on the
          wrapper.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes match the button size tiers, so a field and its submit
          button line up in a row. There is no variant prop — one look.
        </p>
        <ModePreview>
          <Input
            className="w-64"
            label="Email"
            type={InputType.Email}
            placeholder="you@example.com"
          />
          <Input
            className="w-64"
            size={InputSize.Small}
            label="Email"
            type={InputType.Email}
            placeholder="you@example.com"
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">End adornment</h2>
        <p className="text-muted-foreground">
          The <code>endAdornment</code> slot sits inside the border on the
          right, and the field padding grows so text never runs under it. Pass a
          plain icon with <code>aria-hidden</code> to describe the field, or a
          ghost icon button to act on it. There is no leading slot.
        </p>
        <ModePreview>
          <Input
            className="w-64"
            label="Search"
            type={InputType.Search}
            placeholder="Find a component"
            endAdornment={
              <Search className="text-muted-foreground size-4" aria-hidden />
            }
          />
          <Input
            className="w-64"
            size={InputSize.Small}
            label="Search"
            type={InputType.Search}
            placeholder="Find a component"
            endAdornment={
              <Search className="text-muted-foreground size-3" aria-hidden />
            }
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">
          Pass <code>error</code> and the field owns the whole failure: the
          border, the ring, and the label turn destructive, and the message
          renders below. The field grows downward only, never sideways. There is
          no shake — the mood is soft, so errors arrive calmly.
        </p>
        <ModePreview>
          <Input
            className="w-64"
            label="Email"
            type={InputType.Email}
            defaultValue="not-an-address"
            error="Enter a valid email address"
          />
          <Input
            className="w-64"
            size={InputSize.Small}
            label="Email"
            type={InputType.Email}
            defaultValue="not-an-address"
            error="Enter a valid email address"
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> puts the spinner in the end slot, replacing any{' '}
          <code>endAdornment</code>.{' '}
          <strong className="text-foreground">The field stays editable.</strong>{' '}
          Input loading means background work — async validation, a search — and
          the submit button is what locks a flow. With an error alongside it,
          both show and the spinner turns destructive too: hiding the message
          during a re-check would flash a validity the field has not earned.
        </p>
        <ModePreview>
          <Input
            className="w-64"
            label="Username"
            defaultValue="brian"
            loading
          />
          <Input
            className="w-64"
            label="Username"
            defaultValue="brian"
            loading
            error="That name is already taken"
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Disabled and read-only
        </h2>
        <p className="text-muted-foreground">
          Disabled dims the field and its label together and takes no pointer
          events. Read-only keeps full text contrast on a muted background,
          takes a normal cursor, and stays focusable so the value can still be
          read and copied.
        </p>
        <ModePreview>
          <Input
            className="w-64"
            label="Email"
            placeholder="you@example.com"
            disabled
          />
          <Input
            className="w-64"
            label="Account id"
            defaultValue="fs_8f252f6"
            readOnly
          />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Hover border, focus ring, and the destructive color changes are CSS
          transitions at <code>--motion-fast</code>. The error message is the
          one enter and exit: height and opacity on <code>spring-settle</code>{' '}
          both ways at <code>--motion-base</code>, because a bounce on a height
          change makes the fields below overshoot. The spinner runs its own
          800ms turn.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Input generates the field <code>id</code> and wires the label{' '}
          <code>htmlFor</code> itself, so clicking the label focuses the field.
          An error sets <code>aria-invalid</code> and links the message through{' '}
          <code>aria-describedby</code>, keeping any description you passed. A
          loading field sets <code>aria-busy</code> and hides its spinner from
          screen readers, so the wait is announced once. Tab reaches the field
          first and an interactive adornment second. <code>required</code> marks
          the label and reaches the <code>&lt;input&gt;</code>; the validation
          itself stays with your app.
        </p>
      </section>
    </article>
  )
}
