import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { InputDemo } from '@/examples/input/demo'
import demoSource from '@/examples/input/demo.tsx?raw'
import { InputDescription } from '@/examples/input/description'
import descriptionSource from '@/examples/input/description.tsx?raw'
import { InputDisabled } from '@/examples/input/disabled'
import disabledSource from '@/examples/input/disabled.tsx?raw'
import { InputEndAction } from '@/examples/input/end-action'
import endActionSource from '@/examples/input/end-action.tsx?raw'
import { InputEndAdornment } from '@/examples/input/end-adornment'
import endAdornmentSource from '@/examples/input/end-adornment.tsx?raw'
import { InputError } from '@/examples/input/error'
import errorSource from '@/examples/input/error.tsx?raw'
import { InputLoading } from '@/examples/input/loading'
import loadingSource from '@/examples/input/loading.tsx?raw'
import { InputReadOnly } from '@/examples/input/read-only'
import readOnlySource from '@/examples/input/read-only.tsx?raw'
import { InputSizes } from '@/examples/input/sizes'
import sizesSource from '@/examples/input/sizes.tsx?raw'
import { InputTypes } from '@/examples/input/types'
import typesSource from '@/examples/input/types.tsx?raw'
import usageSource from '@/examples/input/usage.tsx?raw'
import guidelines from '@/registry/ui/input/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/input')({
  component: InputPage,
})

function InputPage() {
  return (
    <DocPage
      title="Input"
      lead="A single-line text field that owns its label, its error message, and its busyness."
      preview={{ source: demoSource, demo: <InputDemo /> }}
      installation="input"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Types"
            description="Pick the type that matches the text. It chooses the mobile keyboard and the browser's autofill. Password hides the characters."
            source={typesSource}
          >
            <InputTypes />
          </Example>

          <Example
            caption="Sizes"
            description="Default and small match the two button heights, so a field and its submit button line up in a row."
            source={sizesSource}
          >
            <InputSizes />
          </Example>

          <Example
            caption="End adornment: icon"
            description="A plain icon describes the field. Mark it aria-hidden, because the label already says what the field is."
            source={endAdornmentSource}
          >
            <InputEndAdornment />
          </Example>

          <Example
            caption="End adornment: action"
            description="A ghost field-icon button acts on the field. Tab reaches the field first and the button second."
            source={endActionSource}
          >
            <InputEndAction />
          </Example>

          <Example
            caption="Description"
            description="Helper text sits under the field and joins its accessible description."
            source={descriptionSource}
          >
            <InputDescription />
          </Example>

          <Example
            caption="Error"
            description="The description stays where it is and the message grows in below it."
            source={errorSource}
          >
            <InputError />
          </Example>

          <Example
            caption="Loading"
            description="Tab out of the field after typing. The spinner shows while the check runs, the field stays editable, and the answer lands in the field's own error."
            source={loadingSource}
          >
            <InputLoading />
          </Example>

          <Example
            caption="Disabled"
            description="The field and its label dim together and take no pointer events."
            source={disabledSource}
          >
            <InputDisabled />
          </Example>

          <Example
            caption="Read-only"
            description="The value stays readable and copyable on a muted background, and the field stays focusable."
            source={readOnlySource}
          >
            <InputReadOnly />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Moves focus into the field, then to an interactive end adornment.',
              },
              {
                keys: ['Shift+Tab'],
                description: 'Moves focus back the same way.',
              },
              {
                keys: ['Enter'],
                description:
                  'Submits the enclosing form through native implicit submission.',
              },
            ]}
          />
          <p>
            Input generates the field <code>id</code> and wires the label to it,
            so clicking the label focuses the field. An error sets{' '}
            <code>aria-invalid</code>, and <code>aria-describedby</code> lists
            any ids you passed, then the error message, then the description. A
            loading field sets <code>aria-busy</code> and hides its spinner from
            screen readers, so the wait is announced once. <code>required</code>{' '}
            marks the label and reaches the <code>&lt;input&gt;</code>; the
            validation itself stays with your app. The states every field shares
            are described on{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <PropsTable
          component="Input"
          description={
            <>
              Also takes every <code>&lt;input&gt;</code> attribute except{' '}
              <code>size</code> and <code>type</code>, which it redefines.{' '}
              <code>className</code> styles the wrapper that holds the label,
              the field, and the message, so a width set there sizes the whole
              field.
            </>
          }
          rows={[
            {
              name: 'label',
              type: 'string',
              description:
                'The visible label. Renders above the field and is wired to it.',
            },
            {
              name: 'type',
              type: 'InputType',
              default: 'InputType.Text',
              description:
                'Text, Email, Password, Number, Search, Telephone, or Url. A quantity takes Number field instead, which reports a number and enforces its bounds.',
            },
            {
              name: 'size',
              type: 'InputSize',
              default: 'InputSize.Default',
              description: 'Default or Small, matching the two button heights.',
            },
            {
              name: 'description',
              type: 'string',
              description: 'Helper text under the field.',
            },
            {
              name: 'error',
              type: 'string',
              description:
                'The failure message. Turns the border, the ring, and the label destructive.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Shows a spinner in the end slot, replacing endAdornment. The field stays editable. Set it, not disabled, while a check runs.',
            },
            {
              name: 'endAdornment',
              type: 'ReactNode',
              description:
                'An icon or a ghost field-icon button inside the border, on the right.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the field and its label and removes both from the tab order.',
            },
            {
              name: 'readOnly',
              type: 'boolean',
              default: 'false',
              description:
                'Keeps the value readable on a muted background. The field stays focusable.',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Marks the label and sets the native attribute.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The field is 36px tall at the default size and 32px at small,
            matching <code>Button</code>. The end slot holds a{' '}
            <code>field-icon</code> button 4px from the outer edge, which is 3px
            inside the 1px border, and the field padding grows so text never
            runs under it.
          </p>
          <p>
            There is no leading slot and no variant prop: a leading icon
            competes with the label, and one look keeps every field in an app
            the same. <code>className</code> lands on the wrapper because the
            wrapper is what holds the label, the field, and the message.
          </p>
          <p>
            Hover border, focus ring, and the destructive colour change are CSS
            transitions at <code>--motion-fast</code>. The error message is the
            one enter and exit: height and opacity on <code>springSettle</code>{' '}
            both ways, because a bounce on a height change makes the fields
            below overshoot. The error does not shake, so it arrives calmly. The
            spinner runs its own 800ms turn.
          </p>
          <p>
            With an error and loading together, both show and the spinner turns
            destructive: hiding the message during a re-check would flash a
            validity the field has not earned.
          </p>
        </>
      }
      related={[
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, description, error, loading, and disabled behaviour every field shares.',
        },
        {
          to: '/components/textarea',
          label: 'Textarea',
          description: 'The multiline counterpart for longer notes.',
        },
        {
          to: '/components/number-field',
          label: 'Number field',
          description: 'The field for quantities, with steps and bounds.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Lays fields out with an actions row and a result slot.',
        },
      ]}
    />
  )
}
