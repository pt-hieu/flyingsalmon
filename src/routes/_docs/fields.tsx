import { createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict } from '@/components/doc-page'
import { FoundationPage } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'

export const Route = createFileRoute('/_docs/fields')({
  component: FieldsPage,
})

function boxSample(heightClassName: string) {
  return (
    <span
      aria-hidden
      className={`${heightClassName} border-input bg-card block w-20 rounded-md border`}
    />
  )
}

const sizeRows: TokenRow[] = [
  {
    sample: boxSample('h-9'),
    token: 'Default',
    value: 'h-9, px-3',
    job: 'The standard field. It matches the default button, so a field and its submit button line up in a row.',
  },
  {
    sample: boxSample('h-8'),
    token: 'Small',
    value: 'h-8, px-2.5',
    job: 'A dense field. It matches the small button and the small chip.',
  },
]

const stateRows: TokenRow[] = [
  {
    sample: boxSample('h-8'),
    token: 'description',
    value: 'Muted text under the box',
    job: 'Helper text that a screen reader reads with the field. It stays when an error arrives.',
  },
  {
    sample: (
      <span
        aria-hidden
        className="border-destructive bg-card block h-8 w-20 rounded-md border"
      />
    ),
    token: 'error',
    value: 'Destructive border, ring, label, and message',
    job: 'The field owns the whole failure. The message renders below the box and the field grows downward only.',
  },
  {
    sample: (
      <span
        aria-hidden
        className="border-input bg-card block h-8 w-20 rounded-md border"
      />
    ),
    token: 'loading',
    value: 'A spinner in the end slot',
    job: 'Background work such as a search or a name check. The field stays editable.',
  },
  {
    sample: (
      <span
        aria-hidden
        className="border-input bg-card block h-8 w-20 rounded-md border opacity-50"
      />
    ),
    token: 'disabled',
    value: 'Dimmed field and label',
    job: 'No pointer events, and nothing posts, like a native disabled control.',
  },
  {
    sample: (
      <span
        aria-hidden
        className="border-input bg-muted block h-8 w-20 rounded-md border"
      />
    ),
    token: 'readOnly',
    value: 'Muted background, full contrast',
    job: 'The value stays readable, focusable, and selectable.',
  },
]

function FieldsPage() {
  return (
    <FoundationPage
      title="Fields"
      principle="A field owns its label, its error, and its busyness, so a form is only fields in a column."
      introduction={
        <p>
          Input, textarea, select, number field, date picker, and combobox share
          one set of behaviours. Learn them here once. Each component page
          covers what is particular to that field: its value, its keys, and its
          panel.
        </p>
      }
      tokensTitle="Anatomy and states"
      tokenSections={[
        {
          title: 'Sizes',
          description:
            'Two sizes, shared across the family and matched to the button tiers. There is no variant prop, so every field has one look.',
          headings: ['Sample', 'Size', 'Value', 'Use it for'],
          rows: sizeRows,
        },
        {
          title: 'State props',
          description:
            'Each state is a prop on the field. A form never draws these itself.',
          headings: ['Sample', 'Prop', 'Looks like', 'Behaviour'],
          rows: stateRows,
        },
      ]}
      sections={[
        {
          title: 'className styles the wrapper',
          content: (
            <p>
              A field renders a wrapper around its box so it can hold the label,
              the description, and the error message.{' '}
              <strong>
                <code>className</code> styles that wrapper, not the box.
              </strong>{' '}
              That is where width belongs: set <code>w-64</code> on the field
              and the label, box, and message all take it. Every other native
              prop passes through to the control inside.
            </p>
          ),
        },
        {
          title: 'Description',
          content: (
            <p>
              <code>description</code> is helper text in muted type directly
              under the box. It joins the field&rsquo;s accessible description,
              so a screen reader reads it with the field. It stays put when an
              error arrives: the message renders below it, and a screen reader
              hears the error first, then the description. A disabled field dims
              its description with its label.
            </p>
          ),
        },
        {
          title: 'Error',
          content: (
            <>
              <p>
                Pass <code>error</code> and the field owns the whole failure:
                the border, the ring, and the label turn destructive, the field
                is marked <code>aria-invalid</code>, and the message renders
                below. The field grows downward only, never sideways, and
                nothing shakes, so errors arrive calmly.
              </p>
              <p>
                A form does not collect field errors or render a summary. Each
                field shows its own. A failure that spans fields, or that only
                the server can judge, goes in the form&rsquo;s result slot
                instead.
              </p>
            </>
          ),
        },
        {
          title: 'Loading',
          content: (
            <p>
              <code>loading</code> puts the spinner in the field&rsquo;s end
              slot and sets <code>aria-busy</code>.{' '}
              <strong>The field stays editable.</strong> Field loading means
              background work, and the submit button is what locks a flow. With
              an error alongside, both show and the spinner turns destructive:
              hiding the message during a re-check would flash a validity the
              field has not earned.
            </p>
          ),
        },
        {
          title: 'Disabled and read-only',
          content: (
            <p>
              Disabled dims the field and its label together, takes no pointer
              events, and posts nothing. Read-only keeps full text contrast on a
              muted background, shows a normal cursor, and stays focusable so
              the value can still be read, selected, and copied. Use disabled
              for a control that cannot apply right now and read-only for a
              value the person may see but not change.
            </p>
          ),
        },
        {
          title: 'Fields in a form',
          content: (
            <p>
              <code>Form</code> gives its children one vertical rhythm, an
              actions row, and a result slot. It needs no wrapper around a
              field, because the field already holds its own label and message.
              The submit button&rsquo;s <code>loading</code> is the only
              busyness a submitting form shows, and the fields stay editable
              while it runs.
            </p>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Pass label, description, and error to the field.',
          reason:
            'The field wires the label to the control and the message to its accessible description, so you never have to.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put width on the field with className.',
          reason:
            'The wrapper holds the label and the message, so they all take the same width as the box.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Match the field size to the buttons beside it.',
          reason:
            'Default and small share heights across the family, so a row lines up without adjustment.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Lock a field with loading.',
          reason:
            'Loading is background work and the field stays editable. Disable the submit button, or use disabled, to lock the flow.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Hold the error until submit when the field can tell sooner.',
          reason:
            'The error belongs under the field the person is looking at, as soon as you know.',
        },
      ]}
      notes={
        <>
          <p>
            A field generates its control&rsquo;s <code>id</code> and wires the
            label&rsquo;s <code>htmlFor</code>, so clicking the label focuses
            the control. <code>aria-describedby</code> lists any ids you passed,
            then the error message, then the description. A loading field hides
            its spinner from screen readers so the wait is announced once.
          </p>
          <p>
            An icon button inside a field box sits 3px inside the border. The
            end slot grows the field&rsquo;s padding (<code>pr-9</code> at the
            default size, <code>pr-8</code> at small) so text never runs under
            it.
          </p>
          <p>
            The error message enters and leaves with height and opacity on{' '}
            <code>springSettle</code>, because a bounce on a height change makes
            the fields below overshoot. Hover border, focus ring, and the
            destructive colour change are CSS transitions at{' '}
            <code>--motion-fast</code>.
          </p>
        </>
      }
      related={[
        {
          to: '/components/input',
          label: 'Input',
          description: 'A single-line text field.',
        },
        {
          to: '/components/select',
          label: 'Select',
          description: 'One value from a list.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'The rhythm, actions row, and result slot.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'Where a result belongs once the form submits.',
        },
      ]}
    />
  )
}
