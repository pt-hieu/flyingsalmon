import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { RadioGroupControlled } from '@/examples/radio-group/controlled'
import controlledSource from '@/examples/radio-group/controlled.tsx?raw'
import { RadioGroupDemo } from '@/examples/radio-group/demo'
import demoSource from '@/examples/radio-group/demo.tsx?raw'
import { RadioGroupDisabled } from '@/examples/radio-group/disabled'
import disabledSource from '@/examples/radio-group/disabled.tsx?raw'
import { RadioGroupError } from '@/examples/radio-group/error'
import errorSource from '@/examples/radio-group/error.tsx?raw'
import { RadioGroupHorizontal } from '@/examples/radio-group/horizontal'
import horizontalSource from '@/examples/radio-group/horizontal.tsx?raw'
import usageSource from '@/examples/radio-group/usage.tsx?raw'

import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/radio-group')({
  component: RadioGroupPage,
})

function RadioGroupPage() {
  return (
    <DocPage
      title="Radio group"
      lead="A radio group picks exactly one option from a small set that stays visible, and it owns its label and its error message."
      preview={{ source: demoSource, demo: <RadioGroupDemo /> }}
      installation="radio-group"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Horizontal"
            description="Horizontal lays the options out in a row and the arrow keys follow. Keep it for short labels: a row of full sentences wraps unpredictably and loses the alignment that makes options scannable."
            source={horizontalSource}
          >
            <RadioGroupHorizontal />
          </Example>

          <Example
            caption="Disabled"
            description="Disabling the group dims every option. Disabling one item takes that option out while the rest stay live."
            source={disabledSource}
          >
            <RadioGroupDisabled />
          </Example>

          <Example
            caption="Error"
            description="The group label, the item borders, and the focus ring turn red and the message appears below. The checked disc keeps its knocked-out dot; only its fill changes colour."
            source={errorSource}
          >
            <RadioGroupError />
          </Example>

          <Example
            caption="Controlled"
            description="value and onValueChange hand the selection to the app. name also puts the chosen value into the surrounding form's FormData, so a plain native submit works."
            source={controlledSource}
          >
            <RadioGroupControlled />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To pick exactly one option from two to five choices, where seeing every option helps the decision.',
          'For an answer a form collects and submits later, such as a room type or a cost split.',
        ],
        whenNotToUse: [
          {
            situation:
              'when the traveller must be able to clear the choice, because a radio group cannot be emptied once it holds a value.',
            alternative: {
              to: '/components/toggle-group',
              label: 'Toggle group',
            },
          },
          {
            situation:
              'for more than about five options, where the list outgrows the form.',
            alternative: { to: '/components/select', label: 'Select' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give the group a label that names the question: "Room", "Cost split".',
            reason:
              'The label is the group’s accessible name, so a screen reader announces the question before the options.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Preselect the option most travellers want.',
            reason:
              'A group with no selection is invalid until the traveller acts, and the default saves them the click.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put a single radio item in a group.',
            reason:
              'One option offers no choice and cannot be unselected. Use a checkbox for a yes or no.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Use horizontal for options with long labels.',
            reason:
              'Long labels wrap unevenly across the row and the options stop lining up.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Enters the group once, on the checked option or the first enabled one. A second Tab leaves the group.',
              },
              {
                keys: ['ArrowDown', 'ArrowRight'],
                description:
                  'Moves to the next enabled option and selects it, wrapping at the last. ArrowDown works in a vertical group and ArrowRight in a horizontal one.',
              },
              {
                keys: ['ArrowUp', 'ArrowLeft'],
                description:
                  'Moves to the previous enabled option and selects it, wrapping at the first. ArrowUp works in a vertical group and ArrowLeft in a horizontal one.',
              },
              {
                keys: ['Space'],
                description: 'Selects the focused option.',
              },
            ]}
          />
          <p>
            The group exposes <code>role=&quot;radiogroup&quot;</code> and is
            named by its label. Clicking an option&rsquo;s label selects that
            option. An error sets <code>aria-invalid</code> on the group and
            links the message through <code>aria-describedby</code>, keeping any
            description you pass. The focus ring appears on keyboard focus only.{' '}
            <code>required</code> marks the label and sets{' '}
            <code>aria-required</code> on the group; the validation itself stays
            with your app.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="RadioGroup"
            description={
              <>
                Every other prop passes through to the Radix radio group root.
                The{' '}
                <TextLink asChild>
                  <Link to="/fields">fields page</Link>
                </TextLink>{' '}
                describes the label, error, and wrapper behaviour that every
                field shares.
              </>
            }
            rows={[
              {
                name: 'label',
                type: 'string',
                description:
                  'The question the group answers, shown above the options.',
              },
              {
                name: 'error',
                type: 'string',
                description:
                  'Turns the group red and shows the message below it.',
              },
              {
                name: 'value',
                type: 'string',
                description: 'The selected option when the app controls it.',
              },
              {
                name: 'defaultValue',
                type: 'string',
                description:
                  'The starting option when the app does not control it.',
              },
              {
                name: 'onValueChange',
                type: '(value: string) => void',
                description:
                  'Called with the value of the newly selected option.',
              },
              {
                name: 'orientation',
                type: 'RadioGroupOrientation',
                default: 'RadioGroupOrientation.Vertical',
                description:
                  'Vertical stacks the options; Horizontal lays them in a row.',
              },
              {
                name: 'name',
                type: 'string',
                description:
                  "Puts the chosen value into the surrounding form's FormData.",
              },
              {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description:
                  'Marks the label and sets aria-required. It does not block submission.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Dims and disables every option.',
              },
              {
                name: 'className',
                type: 'string',
                description:
                  'Styles the wrapper that holds the label, options, and message, not the option list.',
              },
            ]}
          />
          <PropsTable
            component="RadioGroupItem"
            description="Takes nothing beyond these props and the Radix item's own. There is no description line and no node label."
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description:
                  'The value the group reports when this option is selected.',
              },
              {
                name: 'label',
                type: 'string',
                description:
                  'The text beside the circle. It is part of the click target.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Takes this option out while the rest stay live.',
              },
              {
                name: 'className',
                type: 'string',
                description:
                  'Styles the row that holds the circle and its label.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            The circle is 20px on a 20px row, matching the checkbox box. The
            checked item fills with <code>--indicator</code> and knocks an 8px
            dot out of it, so a radio beside a checkbox in the same form reads
            as the same family. Hover steps an unchecked border to{' '}
            <code>--indicator</code> and a checked disc a shade lighter.
          </p>
          <p>
            The group has no <code>fieldset</code> and no legend, because{' '}
            <code>role=&quot;radiogroup&quot;</code> already carries the
            grouping. The focus ring is 3px and sits 2px clear of the circle,
            the same ring Button, Checkbox, and Switch use.
          </p>
          <p>
            The dot is always mounted and fades between opacity 0 and 1 with a
            CSS <code>transition-opacity</code> at <code>--motion-base</code>.
            It does not scale, because a spring describes movement and a lone
            opacity value has none. The disc fill, the border, and the focus
            ring are CSS transitions at <code>--motion-fast</code>. Radio group
            has no <code>motion</code> dependency of its own; the animated error
            message comes from the shared <code>field</code> item.
          </p>
        </>
      }
      related={[
        {
          to: '/components/checkbox',
          label: 'Checkbox',
          description: 'A yes or no, or any number of independent options.',
        },
        {
          to: '/components/toggle-group',
          label: 'Toggle group',
          description: 'Chips for one choice the traveller can clear.',
        },
        {
          to: '/components/select',
          label: 'Select',
          description: 'One choice from a list too long to show.',
        },
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, error, and wrapper behaviour every field shares.',
        },
      ]}
    />
  )
}
