import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { ComboboxBasic } from '@/examples/combobox/basic'
import basicSource from '@/examples/combobox/basic.tsx?raw'
import { ComboboxDemo } from '@/examples/combobox/demo'
import demoSource from '@/examples/combobox/demo.tsx?raw'
import { ComboboxDescription } from '@/examples/combobox/description'
import descriptionSource from '@/examples/combobox/description.tsx?raw'
import { ComboboxDisabled } from '@/examples/combobox/disabled'
import disabledSource from '@/examples/combobox/disabled.tsx?raw'
import { ComboboxError } from '@/examples/combobox/error'
import errorSource from '@/examples/combobox/error.tsx?raw'
import { ComboboxFreeText } from '@/examples/combobox/free-text'
import freeTextSource from '@/examples/combobox/free-text.tsx?raw'
import { ComboboxGroups } from '@/examples/combobox/groups'
import groupsSource from '@/examples/combobox/groups.tsx?raw'
import { ComboboxInAForm } from '@/examples/combobox/in-a-form'
import inAFormSource from '@/examples/combobox/in-a-form.tsx?raw'
import { ComboboxMultiple } from '@/examples/combobox/multiple'
import multipleSource from '@/examples/combobox/multiple.tsx?raw'
import { ComboboxMultipleFreeText } from '@/examples/combobox/multiple-free-text'
import multipleFreeTextSource from '@/examples/combobox/multiple-free-text.tsx?raw'
import { ComboboxRemoteResults } from '@/examples/combobox/remote-results'
import remoteResultsSource from '@/examples/combobox/remote-results.tsx?raw'
import { ComboboxSmall } from '@/examples/combobox/small'
import smallSource from '@/examples/combobox/small.tsx?raw'
import usageSource from '@/examples/combobox/usage.tsx?raw'
import guidelines from '@/registry/ui/combobox/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/combobox')({
  component: ComboboxPage,
})

function ComboboxPage() {
  return (
    <DocPage
      title="Combobox"
      lead="A field you type into, with a panel of the items your app supplies for that text: one value, several as chips, or whatever was typed."
      preview={{ source: demoSource, demo: <ComboboxDemo /> }}
      installation="combobox"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Filtering the list"
            description="The combobox shows exactly the items you pass. Read the text through onInputValueChange and pass the matches."
            source={basicSource}
          >
            <ComboboxBasic />
          </Example>

          <Example
            caption="Remote results"
            description="Debounce and fetch in your own code, show loading while the request runs, and render ComboboxEmpty when nothing comes back. The panel opens when the results land, unless the traveller has pressed Escape or left the field. Type r or ha for matches, zz for none."
            source={remoteResultsSource}
          >
            <ComboboxRemoteResults />
          </Example>

          <Example
            caption="Groups, icons, and descriptions"
            description="Groups take a label and a separator between them. An item's icon sits before its label and its description after; a disabled item keeps its place."
            source={groupsSource}
          >
            <ComboboxGroups />
          </Example>

          <Example
            caption="Free text as the value"
            description="With allowFreeText, a pick reports the item's key and anything else typed is reported as itself when the field loses focus."
            source={freeTextSource}
          >
            <ComboboxFreeText />
          </Example>

          <Example
            caption="Several values as chips"
            description="Multiple mode takes a string array. A pick adds a chip, keeps the panel open, and clears the text for the next search; picking a checked item removes it."
            source={multipleSource}
          >
            <ComboboxMultiple />
          </Example>

          <Example
            caption="Chips from free text"
            description="With allowFreeText in multiple mode, Enter with nothing highlighted turns the typed text into a chip."
            source={multipleFreeTextSource}
          >
            <ComboboxMultipleFreeText />
          </Example>

          <Example
            caption="Description"
            description="Helper text under the field. It stays put when an error arrives."
            source={descriptionSource}
          >
            <ComboboxDescription />
          </Example>

          <Example
            caption="Error"
            description="The field shows its own error under the box until the value is fixed. Pick a city to clear it."
            source={errorSource}
          >
            <ComboboxError />
          </Example>

          <Example
            caption="Disabled"
            description="Dims the field and takes it out of the tab order."
            source={disabledSource}
          >
            <ComboboxDisabled />
          </Example>

          <Example
            caption="Small size"
            description="Matches the small Input and Select, for dense filter bars."
            source={smallSource}
          >
            <ComboboxSmall />
          </Example>

          <Example
            caption="In a form"
            description="name posts the picked key with the form. Submit with no destination to see the field's error; plan the trip and the new trip appears above the form."
            source={inAFormSource}
          >
            <ComboboxInAForm />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['ArrowDown', 'ArrowUp'],
                description:
                  'Opens the panel, then moves the highlight through the items.',
              },
              {
                keys: ['Enter'],
                description:
                  'Picks the highlighted item. In multiple mode it toggles the item and keeps the panel open; with free text and no highlight, it adds the typed text as a chip.',
              },
              {
                keys: ['Escape'],
                description: 'Closes the panel and keeps the typed text.',
              },
              {
                keys: ['Tab', 'Shift+Tab'],
                description:
                  'Closes the panel without picking and moves to the next field.',
              },
              {
                keys: ['Home', 'End'],
                description:
                  'Move the caret to either end of the text, never the highlight.',
              },
              {
                keys: ['Backspace'],
                description:
                  'In multiple mode with an empty input, removes the last chip.',
              },
              {
                keys: ['ArrowLeft', 'ArrowRight'],
                description:
                  'In multiple mode, ArrowLeft at the start of the input focuses the last chip; both keys then move between chips and back to the input.',
              },
              {
                keys: ['Backspace', 'Delete'],
                description: 'On a focused chip, removes it.',
              },
            ]}
          />
          <p>
            The input is the only tab stop: the clear and chevron buttons are
            labelled but stay out of the tab order. Focus never leaves the input
            while the panel is open; the highlighted row is the focus indicator,
            wired through <code>aria-activedescendant</code>.
          </p>
          <p>
            <code>description</code> and <code>error</code> join the
            input&rsquo;s accessible description, error first.{' '}
            <code>required</code> sets <code>aria-required</code>,{' '}
            <code>loading</code> sets <code>aria-busy</code>, and{' '}
            <code>ComboboxEmpty</code> is announced politely when it appears. An
            item&rsquo;s icon is hidden from screen readers, so only its label
            is read.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Combobox"
            description={
              <>
                <code>className</code> styles the wrapper that holds the label,
                the field, and the messages.
              </>
            }
            rows={[
              {
                name: 'mode',
                type: 'ComboboxMode',
                required: true,
                description:
                  'Single takes one value; Multiple takes several as chips. There is no default.',
              },
              {
                name: 'value',
                type: 'string | null | string[]',
                required: true,
                description:
                  'The picked key or keys, or typed text when free text is on. A string array in Multiple mode.',
              },
              {
                name: 'onValueChange',
                type: '(value) => void',
                required: true,
                description: 'Called with the next value.',
              },
              {
                name: 'children',
                type: 'ReactNode',
                description:
                  'The items to show for the current text, with any groups, labels, separators, and an empty row. The combobox filters nothing and shows exactly what you pass, so filtering, fetching, debouncing, and cancelling a billed call stay in your code.',
              },
              {
                name: 'label',
                type: 'string',
                description: 'The visible label above the field.',
              },
              {
                name: 'placeholder',
                type: 'string',
                description: 'Shown while the input is empty.',
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
                  'Marks the field invalid and shows the message under it.',
              },
              {
                name: 'allowFreeText',
                type: 'boolean',
                default: 'false',
                description:
                  'Keeps typed text as the value instead of reverting it on blur.',
              },
              {
                name: 'inputValue',
                type: 'string',
                description: 'The controlled text in the input.',
              },
              {
                name: 'onInputValueChange',
                type: '(inputValue: string) => void',
                description:
                  'Called on every keystroke and pick. Filter or fetch from here.',
              },
              {
                name: 'loading',
                type: 'boolean',
                default: 'false',
                description:
                  'Shows a spinner in the field while your results load.',
              },
              {
                name: 'size',
                type: 'ComboboxSize',
                default: 'ComboboxSize.Default',
                description: 'Default or Small, matching Input and Select.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description:
                  'Dims the field and removes it from the tab order.',
              },
              {
                name: 'name',
                type: 'string',
                description:
                  'Posts a hidden input per value with the surrounding form.',
              },
              {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description: 'Marks the label and sets aria-required.',
              },
              {
                name: 'open',
                type: 'boolean',
                description: 'The controlled open state of the panel.',
              },
              {
                name: 'defaultOpen',
                type: 'boolean',
                description: 'The initial open state when uncontrolled.',
              },
              {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: 'Called when the panel opens or closes.',
              },
              {
                name: 'side',
                type: 'ComboboxPanelSide',
                default: 'ComboboxPanelSide.Bottom',
                description: 'Which side of the field the panel prefers.',
              },
              {
                name: 'align',
                type: 'ComboboxPanelAlign',
                default: 'ComboboxPanelAlign.Start',
                description: 'How the panel lines up along that side.',
              },
              {
                name: 'id',
                type: 'string',
                description: 'The input id. Generated when left out.',
              },
            ]}
          />
          <PropsTable
            component="ComboboxItem"
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description:
                  'The key reported when the item is picked. Use an id, not the label: with free text on, typed text that equals a key reads as a pick.',
              },
              {
                name: 'children',
                type: 'string',
                required: true,
                description:
                  'The label, shown in the list, the input, and the chip.',
              },
              {
                name: 'description',
                type: 'string',
                description: 'Muted text after the label, truncated to fit.',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                description: 'An icon before the label, in the list only.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Keeps the item in place but out of reach.',
              },
            ]}
          />
          <p>
            <code>ComboboxGroup</code>, <code>ComboboxLabel</code>,{' '}
            <code>ComboboxSeparator</code>, and <code>ComboboxEmpty</code> take
            the props of a <code>&lt;div&gt;</code>. There is no input, trigger,
            or content part: the root renders them. Pass{' '}
            <code>ComboboxEmpty</code> with your message when a search returns
            nothing. There is no footer slot, so a source&rsquo;s credit line
            goes under the field, in your own markup.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The field is 36px tall at the default size and 32px at small,
            matching Input and Select. Items stay 32px at both sizes. In
            multiple mode the field grows by rows as chips wrap.
          </p>
          <p>
            Chips commit on Enter only. A comma does not commit, because commas
            occur inside place names, and blur does not commit, because that
            would turn an abandoned keystroke into a value.
          </p>
          <p>
            The panel registers in the same layer stack as Dialog and Dropdown
            menu, so it opens, positions, and stays clickable inside a modal
            dialog. While open it may cover the error message under the field.
          </p>
          <p>
            The panel grows from the field with a fade and a scale from 0.96 on
            the bounce curve and leaves on the settle curve. The chevron turns
            180 degrees at <code>--motion-base</code>; the border and focus ring
            transition at <code>--motion-fast</code>. Chips, the item highlight,
            the check, the clear button, and the spinner change without motion.
          </p>
        </>
      }
      related={[
        {
          to: '/components/select',
          label: 'Select',
          description: 'A short, fixed list with no typing.',
        },
        {
          to: '/components/input',
          label: 'Input',
          description: 'Free text with no suggestions.',
        },
        {
          to: '/components/date-picker',
          label: 'Date picker',
          description: 'The field for a date or a range of dates.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Field layout, the actions row, and validation.',
        },
      ]}
    />
  )
}
