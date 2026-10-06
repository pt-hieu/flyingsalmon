import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { NumberFieldBudget } from '@/examples/number-field/budget'
import budgetSource from '@/examples/number-field/budget.tsx?raw'
import { NumberFieldDemo } from '@/examples/number-field/demo'
import demoSource from '@/examples/number-field/demo.tsx?raw'
import { NumberFieldDescription } from '@/examples/number-field/description'
import descriptionSource from '@/examples/number-field/description.tsx?raw'
import { NumberFieldDisabled } from '@/examples/number-field/disabled'
import disabledSource from '@/examples/number-field/disabled.tsx?raw'
import { NumberFieldDuration } from '@/examples/number-field/duration'
import durationSource from '@/examples/number-field/duration.tsx?raw'
import { NumberFieldError } from '@/examples/number-field/error'
import errorSource from '@/examples/number-field/error.tsx?raw'
import { NumberFieldLoading } from '@/examples/number-field/loading'
import loadingSource from '@/examples/number-field/loading.tsx?raw'
import { NumberFieldReadOnly } from '@/examples/number-field/read-only'
import readOnlySource from '@/examples/number-field/read-only.tsx?raw'
import { NumberFieldSizes } from '@/examples/number-field/sizes'
import sizesSource from '@/examples/number-field/sizes.tsx?raw'
import usageSource from '@/examples/number-field/usage.tsx?raw'
import guidelines from '@/registry/ui/number-field/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/number-field')({
  component: NumberFieldPage,
})

function NumberFieldPage() {
  return (
    <DocPage
      title="Number field"
      lead="A quantity field that formats for the page’s locale, clamps to its bounds, and steps from the keyboard or its own spin buttons."
      preview={{ source: demoSource, demo: <NumberFieldDemo /> }}
      installation="number-field"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Budget with a prefix"
            description={
              <>
                <code>prefix</code> puts a symbol before the value and{' '}
                <code>step</code> sizes one press of a spin button. The prefix
                is plain text, so it reads the way your product writes money,
                and the value still groups for the locale.
              </>
            }
            source={budgetSource}
          >
            <NumberFieldBudget />
          </Example>

          <Example
            caption="Duration with a unit"
            description="With min and max both set, Home and End jump to the ends of the range, and each spin button dims as its end arrives."
            source={durationSource}
          >
            <NumberFieldDuration />
          </Example>

          <Example
            caption="Sizes"
            description="Two sizes match Input, so a number field and a text field line up in a row."
            source={sizesSource}
          >
            <NumberFieldSizes />
          </Example>

          <Example
            caption="Description"
            description="Helper text shows the other view of the amount: the group total for a per-person budget. Step below $100 and the error grows in beneath it."
            source={descriptionSource}
          >
            <NumberFieldDescription />
          </Example>

          <Example
            caption="Error"
            description="The border, the dividers, and the label turn destructive together."
            source={errorSource}
          >
            <NumberFieldError />
          </Example>

          <Example
            caption="Loading"
            description="Change the budget. A spinner replaces the spin buttons in exactly their width while the trips are counted, and the field stays typeable."
            source={loadingSource}
          >
            <NumberFieldLoading />
          </Example>

          <Example
            caption="Disabled"
            description="The spin buttons stay in place and dim with the field, so the control never changes shape as it locks."
            source={disabledSource}
          >
            <NumberFieldDisabled />
          </Example>

          <Example
            caption="Read-only"
            description="The value stays readable and copyable, and the field still posts with its form."
            source={readOnlySource}
          >
            <NumberFieldReadOnly />
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
                  'Moves focus into the field and then out. The spin buttons are outside the tab order, because the arrow keys already do their job.',
              },
              {
                keys: ['ArrowUp', 'ArrowDown'],
                description: 'Steps the value by step.',
              },
              {
                keys: [
                  'PageUp',
                  'PageDown',
                  'Shift+ArrowUp',
                  'Shift+ArrowDown',
                ],
                description:
                  'Steps the value by largeStep, ten times step unless you set it.',
              },
              {
                keys: ['Home', 'End'],
                description:
                  'Jumps to min or max. Does nothing when that bound is unset.',
              },
              {
                keys: ['Enter'],
                description: 'Commits the typed text and lets the form submit.',
              },
              {
                keys: ['Escape'],
                description:
                  'Does nothing here, so it still closes an enclosing dialog.',
              },
            ]}
          />
          <p>
            The mouse wheel never steps the value, so scrolling through a form
            cannot change an answer. The text input is the{' '}
            <code>spinbutton</code>. Its value text includes the prefix and the
            unit, so a screen reader hears &ldquo;$1,500&rdquo; rather than
            &ldquo;1500&rdquo;, and an empty field omits its value attributes
            instead of announcing a number it does not have. The spin buttons
            are named Decrease and Increase. <code>required</code> marks the
            label and sets <code>aria-required</code>; the validation itself
            stays with your app. The states every field shares are described on{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <PropsTable
          component="NumberField"
          description={
            <>
              Also takes every <code>&lt;input&gt;</code> attribute except{' '}
              <code>type</code>, <code>size</code>, and the value props it
              redefines. <code>className</code> styles the wrapper, so a width
              set there sizes the whole field.
            </>
          }
          rows={[
            {
              name: 'label',
              type: 'string',
              description: 'The visible label, wired to the input.',
            },
            {
              name: 'value',
              type: 'number | null',
              description:
                'The controlled value. null is an empty field, never NaN or 0, so a blank and a zero stay apart.',
            },
            {
              name: 'defaultValue',
              type: 'number | null',
              description: 'The initial value of an uncontrolled field.',
            },
            {
              name: 'onValueChange',
              type: '(value: number | null) => void',
              description:
                'Reports the parsed number while typing, in range or not, and null when the field is empty. It is always a plain number, so read it rather than the typed text, which carries the locale’s group separator. Blur and Enter clamp into [min, max] and reformat.',
            },
            {
              name: 'min',
              type: 'number',
              description:
                'The floor. Set it on every count that cannot go negative: it bounds the clamp, gives Home somewhere to jump, disables Decrease at the floor, and picks the numeric mobile keyboard when it is zero or above.',
            },
            {
              name: 'max',
              type: 'number',
              description: 'The ceiling.',
            },
            {
              name: 'step',
              type: 'number',
              default: '1',
              description:
                'One arrow key or spin button press. A fractional step picks the decimal keyboard.',
            },
            {
              name: 'largeStep',
              type: 'number',
              default: 'step * 10',
              description: 'One Page Up, Page Down, or shifted arrow press.',
            },
            {
              name: 'prefix',
              type: 'string',
              description: 'Plain text before the value, such as "$".',
            },
            {
              name: 'unit',
              type: 'string',
              description: 'Plain text after the value, such as "days".',
            },
            {
              name: 'locale',
              type: 'string',
              description:
                'The locale for grouping and the decimal mark. Defaults to the page’s language.',
            },
            {
              name: 'size',
              type: 'NumberFieldSize',
              default: 'NumberFieldSize.Default',
              description: 'Default or Small, matching Input.',
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
                'The failure message. Text the parser cannot read reverts to the last value without raising one.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Replaces the spin buttons with a spinner. The field stays typeable. Set it, not disabled, while a background check runs.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the field, takes no pointer events, and posts nothing.',
            },
            {
              name: 'readOnly',
              type: 'boolean',
              default: 'false',
              description:
                'Keeps the value readable and focusable. The field still posts.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The field is 36px tall at the default size and 32px at small. The
            spin buttons are squares the height of the field, so the control
            keeps its proportions at both sizes. Disabled and read-only mark the
            spin buttons <code>aria-disabled</code> instead of removing them.
            There is no width prop: constrain the wrapper with{' '}
            <code>className</code>.
          </p>
          <p>
            Text the parser cannot read reverts to the last committed value and
            raises no error, because the <code>error</code> prop is the only
            error channel. Native <code>onChange</code> still reaches the inner
            input when you want the keystrokes. The prefix and unit are
            decoration: they are <code>aria-hidden</code> because the value text
            already says them.
          </p>
          <p>
            The box draws the focus ring on <code>focus-within</code>, since the
            input inside owns no border. Holding a spin button repeats after
            400ms at 60ms intervals. The border, the field background, and the
            spin button backgrounds transition at <code>--motion-fast</code>,
            and the error message is the one enter and exit, on{' '}
            <code>springSettle</code>. Digits never tween and the reformat on
            blur is instant, because a number that animates cannot be read.
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
          to: '/components/input',
          label: 'Input',
          description: 'The single-line field for text that is not a quantity.',
        },
        {
          to: '/components/slider',
          label: 'Slider',
          description: 'Picks a value on a range by dragging.',
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
