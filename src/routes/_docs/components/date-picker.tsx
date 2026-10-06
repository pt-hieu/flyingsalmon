import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { DatePickerDemo } from '@/examples/date-picker/demo'
import demoSource from '@/examples/date-picker/demo.tsx?raw'
import { DatePickerDescription } from '@/examples/date-picker/description'
import descriptionSource from '@/examples/date-picker/description.tsx?raw'
import { DatePickerDisabled } from '@/examples/date-picker/disabled'
import disabledSource from '@/examples/date-picker/disabled.tsx?raw'
import { DatePickerError } from '@/examples/date-picker/error'
import errorSource from '@/examples/date-picker/error.tsx?raw'
import { DatePickerLoading } from '@/examples/date-picker/loading'
import loadingSource from '@/examples/date-picker/loading.tsx?raw'
import { DatePickerRangeExample } from '@/examples/date-picker/range'
import rangeSource from '@/examples/date-picker/range.tsx?raw'
import { DatePickerReadOnly } from '@/examples/date-picker/read-only'
import readOnlySource from '@/examples/date-picker/read-only.tsx?raw'
import { DatePickerSizes } from '@/examples/date-picker/sizes'
import sizesSource from '@/examples/date-picker/sizes.tsx?raw'
import { DatePickerUnavailableDays } from '@/examples/date-picker/unavailable-days'
import unavailableDaysSource from '@/examples/date-picker/unavailable-days.tsx?raw'
import usageSource from '@/examples/date-picker/usage.tsx?raw'
import guidelines from '@/registry/ui/date-picker/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/date-picker')({
  component: DatePickerPage,
})

function DatePickerPage() {
  return (
    <DocPage
      title="Date picker"
      lead="A form field for one calendar day or one range, entered by typing into date segments or by picking from a calendar."
      preview={{ source: demoSource, demo: <DatePickerDemo /> }}
      installation="date-picker"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="A range"
            description={
              <>
                <code>mode={'{DatePickerMode.Range}'}</code> takes a{' '}
                <code>{'{ start, end }'}</code> pair. Both groups of segments
                share one box, one label, and one error message. Picking the end
                day commits and closes the panel; Escape mid-range leaves the
                committed range in place.
              </>
            }
            source={rangeSource}
          >
            <DatePickerRangeExample />
          </Example>

          <Example
            caption="Unavailable days"
            description="The field holds a Saturday against an isDateDisabled that refuses weekends, so it renders rejected: the invalid ring, the built-in message, and nothing posted."
            source={unavailableDaysSource}
          >
            <DatePickerUnavailableDays />
          </Example>

          <Example
            caption="Sizes"
            description="Default and small use the same heights as Select, so a date field lines up with its neighbours."
            source={sizesSource}
          >
            <DatePickerSizes />
          </Example>

          <Example
            caption="Description"
            description="Helper text sits under the box and joins the group's accessible description."
            source={descriptionSource}
          >
            <DatePickerDescription />
          </Example>

          <Example
            caption="Error"
            description="The app's error wins over the built-in rejection messages."
            source={errorSource}
          >
            <DatePickerError />
          </Example>

          <Example
            caption="Loading"
            description="Pick a day. The calendar button becomes a spinner while the flight check runs, and Monday fails into the field's own error."
            source={loadingSource}
          >
            <DatePickerLoading />
          </Example>

          <Example
            caption="Disabled"
            description="The whole field leaves the tab order and dims with its label."
            source={disabledSource}
          >
            <DatePickerDisabled />
          </Example>

          <Example
            caption="Read-only"
            description="The date stays readable and focusable. The clear button and the calendar are not offered."
            source={readOnlySource}
          >
            <DatePickerReadOnly />
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
                  'Moves through each segment, then the clear button when it is shown, then the calendar button. In a range, Tab is also the way from the start group to the end group.',
              },
              {
                keys: ['0-9'],
                description: 'Types into the focused segment.',
              },
              {
                keys: ['ArrowUp', 'ArrowDown'],
                description: 'Steps the focused segment.',
              },
              {
                keys: ['ArrowLeft', 'ArrowRight'],
                description: 'Moves between segments of the same date.',
              },
              {
                keys: ['Backspace'],
                description: 'Clears the focused segment.',
              },
              {
                keys: ['Alt+ArrowDown'],
                description: 'Opens the panel from anywhere in the box.',
              },
              {
                keys: ['Enter', 'Space'],
                description: 'Opens the panel from the calendar button.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the panel and returns focus to whatever opened it.',
              },
            ]}
          />
          <p>
            Inside the panel, the keys are those of{' '}
            <TextLink asChild>
              <Link to="/components/calendar">Calendar</Link>
            </TextLink>
            . Screen readers hear the group name, then &ldquo;Start date&rdquo;
            and &ldquo;End date&rdquo; in a range, then each segment. A partly
            typed entry is silent: no ring, no message, and no{' '}
            <code>onChange</code>. A complete entry the limits refuse takes{' '}
            <code>aria-invalid</code> and shows the built-in message, and
            nothing is posted, so a form cannot submit a value the field
            refused. A loading field sets <code>aria-busy</code>. The states
            every field shares are described on{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <PropsTable
          component="DatePicker"
          description={
            <>
              <code>mode</code> selects the value shape, and the value, handler,
              and name props follow it. <code>className</code> styles the
              wrapper.
            </>
          }
          rows={[
            {
              name: 'mode',
              type: 'DatePickerMode',
              default: 'DatePickerMode.Single',
              description: 'Single takes one day. Range takes a pair.',
            },
            {
              name: 'value',
              type: 'string | DatePickerRange | null',
              description:
                'The controlled value: an ISO YYYY-MM-DD day in single mode, { start, end } in range mode, or null.',
            },
            {
              name: 'defaultValue',
              type: 'string | DatePickerRange | null',
              description:
                'The initial value of an uncontrolled field, in the same shape as value.',
            },
            {
              name: 'onChange',
              type: '(value) => void',
              description:
                'Fires with ISO YYYY-MM-DD days when the value changes to a complete, accepted entry, or with null when cleared. A partly typed entry never reaches it.',
            },
            {
              name: 'name',
              type: 'string',
              description:
                'Single mode: the name the hidden input posts under.',
            },
            {
              name: 'startName, endName',
              type: 'string',
              description:
                'Range mode: the names the two hidden inputs post under.',
            },
            {
              name: 'label',
              type: 'string',
              description: 'The visible label.',
            },
            {
              name: 'labelPlacement',
              type: 'FieldLabelPlacement',
              default: 'FieldLabelPlacement.Above',
              description: 'Above the box, or beside it.',
            },
            {
              name: 'size',
              type: 'DatePickerSize',
              default: 'DatePickerSize.Default',
              description: 'Default or Small, matching Select.',
            },
            {
              name: 'min, max',
              type: 'string',
              description:
                'ISO YYYY-MM-DD bounds for the segments and the grid. Set them instead of validating afterwards: an earlier day is refused in the panel and rejected when typed.',
            },
            {
              name: 'isDateDisabled',
              type: '(date: string) => boolean',
              description:
                'Refuses days the traveller cannot pick. They stay reachable by arrow key but cannot be chosen.',
            },
            {
              name: 'locale',
              type: 'string',
              default: '"en-US"',
              description:
                'Sets the segment order, the weekday names, and the week start.',
            },
            {
              name: 'description',
              type: 'string',
              description: 'Helper text under the box.',
            },
            {
              name: 'error',
              type: 'string',
              description: 'The failure message. Wins over the built-in ones.',
            },
            {
              name: 'unavailableMessage',
              type: 'string',
              default: '"That date isn\'t available"',
              description:
                'Shown when a complete entry fails the limits. Pass a translation.',
            },
            {
              name: 'rangeOrderMessage',
              type: 'string',
              default: '"End date must be after the start date"',
              description:
                'Shown when a range ends before it starts. Pass a translation.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Replaces the calendar button with a spinner, blocks opening, and makes the segments read-only.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Takes the whole field out of the tab order.',
            },
            {
              name: 'readOnly',
              type: 'boolean',
              default: 'false',
              description:
                'Keeps the value readable and hides the clear button.',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description:
                'Marks the label and lets native validation block an empty submit.',
            },
            {
              name: 'side',
              type: 'DatePickerPanelSide',
              default: 'DatePickerPanelSide.Bottom',
              description: 'Which side of the box the panel opens on.',
            },
            {
              name: 'align',
              type: 'DatePickerPanelAlign',
              default: 'DatePickerPanelAlign.Center',
              description: 'How the panel aligns to the box.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Values are ISO <code>YYYY-MM-DD</code> strings because a trip date
            is a calendar day, not an instant, so no time zone shifts it. It is
            the same shape Calendar uses, and it posts as it is.
          </p>
          <p>
            One bordered box holds the segments and the end slot, and draws the
            focus ring on <code>focus-within</code>, because the segments take
            focus and own no border. The end slot holds the clear button and the
            calendar button, both ghost buttons at the <code>field-icon</code>{' '}
            size: each sits 4px from the outer edge, which is 3px inside the 1px
            border, with corners rounded to match. Neither draws a focus ring.
            Tabbing to one paints its hover fill, and the box&rsquo;s ring stays
            on.
          </p>
          <p>
            Clear shows once a value is set, on a field that is not{' '}
            <code>required</code>, <code>readOnly</code>, <code>loading</code>,
            or <code>disabled</code>, which are the states where emptying the
            value is not the traveller&rsquo;s to do. Visually hidden native
            inputs behind the box carry the ISO values, the names, and{' '}
            <code>required</code>, so the browser&rsquo;s constraint validation
            blocks an empty submit and puts its bubble at the field. A read-only
            field is exempt, as a read-only native control is. Native validation
            is the one place this field uses a browser bubble.
          </p>
          <p>
            The panel is a popover portalled to <code>document.body</code>, 8px
            from the box, flipping then shifting at a viewport edge. Calendar is
            its only content: one month in single mode and two in range mode,
            with no footer. Focus lands on the selected day, or today when the
            field is empty. In range mode the two groups are two date fields,
            because the date library ships no range field, so ArrowRight at the
            end of the start group stops there.
          </p>
          <p>
            The panel grows from the box: 250ms bouncing in from{' '}
            <code>scale-96</code> and 350ms settling out. The grid&rsquo;s
            motion is Calendar&rsquo;s. The focused segment&rsquo;s colour and
            the box border move at <code>--motion-fast</code>, messages ride the
            field error settle, and the clear button and the spinner swap
            instantly.
          </p>
          <p>
            Measured contrast on the white box: a filled segment 18.25:1, a
            placeholder segment and the dash 7.44:1, the invalid ring 4.57:1.
            The focused segment paints <code>--primary-text</code> at 5.23:1.
            The icon buttons sit at 7.44:1 at rest and 11.96:1 on the fill they
            share between hover and focus.
          </p>
        </>
      }
      related={[
        {
          to: '/components/calendar',
          label: 'Calendar',
          description: 'The month grid inside the panel, for use on its own.',
        },
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, description, error, loading, and disabled behaviour every field shares.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Lays fields out with an actions row and a result slot.',
        },
        {
          to: '/components/number-field',
          label: 'Number field',
          description: 'For a count of days rather than a calendar position.',
        },
      ]}
    />
  )
}
