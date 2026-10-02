import { createFileRoute } from '@tanstack/react-router'

import { Preview } from '@/components/preview'
import { Textarea } from '@/registry/ui/textarea'

export const Route = createFileRoute('/_docs/components/textarea')({
  component: TextareaPage,
})

const eightLinesOfNotes = [
  'Day 1 — land at Da Nang, drop bags, walk the beach.',
  'Day 2 — Marble Mountains in the morning, Hoi An after lunch.',
  'Day 3 — lantern market, then the tailor for a fitting.',
  'Day 4 — Ba Na Hills, leave early to beat the queue.',
  'Day 5 — cooking class, then the river boat at dusk.',
  'Day 6 — My Son sanctuary, back for a late lunch.',
  'Day 7 — pick up the tailored jacket, last swim.',
  'Day 8 — fly home.',
].join('\n')

const aLineThatWrapsPastTheSpinner =
  'Saving this draft of the Da Nang itinerary, which runs long enough to wrap onto a second line.'

function TextareaPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Textarea
        </h1>
        <p className="text-muted-foreground text-lg">
          The input's multiline counterpart. It owns its label, its error
          message, and its busyness, and it grows with what you type.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          Textarea renders a wrapper around the <code>&lt;textarea&gt;</code> so
          it can hold the label and the error message.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the field.
          </strong>{' '}
          Every other native prop passes through to the{' '}
          <code>&lt;textarea&gt;</code>. Stock shadcn puts{' '}
          <code>className</code> on the field itself, so a copied snippet lands
          somewhere else than you expect. Every example on this page sets{' '}
          <code>w-72</code> on the wrapper.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Autosize</h2>
        <p className="text-muted-foreground">
          There is no <code>size</code> prop and no drag handle. One scale
          matches the input's default size so fields line up, and the height
          comes from the content instead: <code>minRows</code> (default 3) sets
          the empty height, <code>maxRows</code> (default 8) caps the growth,
          and the native scrollbar takes over past the cap. Growth is instant —
          a spring per keystroke would fight the caret.
        </p>
        <Preview>
          <Textarea
            className="w-72"
            label="Notes"
            placeholder="Tell us about the trip"
          />
          <Textarea
            className="w-72"
            label="Notes"
            maxRows={4}
            defaultValue={eightLinesOfNotes}
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Description</h2>
        <p className="text-muted-foreground">
          <code>description</code> is helper text in muted type directly under
          the field, and it joins the field&rsquo;s accessible description, so a
          screen reader reads it with the field. It stays put when an error
          arrives: the message renders below it, and a screen reader hears the
          error first, then the description. A disabled field dims its
          description with its label.
        </p>
        <Preview>
          <Textarea
            className="w-72"
            label="Notes"
            placeholder="Tell us about the trip"
            description="Everyone on the trip can read these"
          />
          <Textarea
            className="w-72"
            label="Notes"
            defaultValue="Too short."
            description="Everyone on the trip can read these"
            error="Write at least ten characters"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">
          Pass <code>error</code> and the field owns the whole failure: the
          border, the ring, and the label turn destructive, and the message
          renders below. The field grows downward only, never sideways. There is
          no shake, so errors arrive calmly.
        </p>
        <Preview>
          <Textarea
            className="w-72"
            label="Notes"
            defaultValue="Too short."
            error="Write at least ten characters"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> pins the spinner to the top-right corner inside
          the padding. A textarea has no end slot — text flows across every
          line, so the spinner overlays the corner instead of sitting beside the
          content. The field reserves that column while it loads, so no line
          ever runs under the spinner.{' '}
          <strong className="text-foreground">The field stays editable.</strong>{' '}
          Loading here means background work — an autosave, an async check — and
          the submit button is what locks a flow. With an error alongside it,
          both show and the spinner turns destructive too.
        </p>
        <Preview>
          <Textarea
            className="w-72"
            label="Notes"
            defaultValue={aLineThatWrapsPastTheSpinner}
            loading
          />
          <Textarea
            className="w-72"
            label="Notes"
            defaultValue={aLineThatWrapsPastTheSpinner}
            loading
            error="That draft failed to save"
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Disabled and read-only
        </h2>
        <p className="text-muted-foreground">
          Disabled dims the field and its label together and takes no pointer
          events. Read-only keeps full text contrast on a muted background,
          takes a normal cursor, and stays focusable so the value can still be
          read and copied. It keeps the focus ring: a keyboard user must always
          see where focus landed, and the muted background is what says the
          field is not editable.
        </p>
        <Preview>
          <Textarea
            className="w-72"
            label="Notes"
            placeholder="Tell us about the trip"
            disabled
          />
          <Textarea
            className="w-72"
            label="Itinerary"
            defaultValue={'Day 1 — arrive.\nDay 2 — depart.'}
            readOnly
          />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Hover border, focus ring, and the destructive color changes are CSS
          transitions at <code>--motion-fast</code>. The error message is the
          one enter and exit: height and opacity on <code>spring-settle</code>{' '}
          both ways at <code>--motion-base</code>, because a bounce on a height
          change makes the fields below overshoot. The spinner runs its own
          800ms turn. Autosize growth is deliberately unanimated.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Textarea generates the field <code>id</code> and wires the label{' '}
          <code>htmlFor</code> itself, so clicking the label focuses the field.
          An error sets <code>aria-invalid</code>, and{' '}
          <code>aria-describedby</code> lists any ids you passed, then the error
          message, then the <code>description</code>. A loading field sets{' '}
          <code>aria-busy</code> and hides its spinner from screen readers, so
          the wait is announced once. The keyboard path is native: Enter inserts
          a newline, and Tab always moves focus out of the field rather than
          inserting a tab character. A submit shortcut such as Cmd+Enter belongs
          to your form, not to this component. <code>required</code> marks the
          label and reaches the <code>&lt;textarea&gt;</code>; the validation
          itself stays with your app.
        </p>
      </section>
    </article>
  )
}
