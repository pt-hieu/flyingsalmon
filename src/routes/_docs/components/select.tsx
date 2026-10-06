import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { SelectDemo } from '@/examples/select/demo'
import demoSource from '@/examples/select/demo.tsx?raw'
import { SelectDescription } from '@/examples/select/description'
import descriptionSource from '@/examples/select/description.tsx?raw'
import { SelectDisabled } from '@/examples/select/disabled'
import disabledSource from '@/examples/select/disabled.tsx?raw'
import { SelectError } from '@/examples/select/error'
import errorSource from '@/examples/select/error.tsx?raw'
import { SelectGroups } from '@/examples/select/groups'
import groupsSource from '@/examples/select/groups.tsx?raw'
import { SelectLoading } from '@/examples/select/loading'
import loadingSource from '@/examples/select/loading.tsx?raw'
import { SelectLongList } from '@/examples/select/long-list'
import longListSource from '@/examples/select/long-list.tsx?raw'
import { SelectSizes } from '@/examples/select/sizes'
import sizesSource from '@/examples/select/sizes.tsx?raw'
import usageSource from '@/examples/select/usage.tsx?raw'
import guidelines from '@/registry/ui/select/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/select')({
  component: SelectPage,
})

function SelectPage() {
  return (
    <DocPage
      title="Select"
      lead="A form field that opens a short list and takes exactly one value."
      preview={{ source: demoSource, demo: <SelectDemo /> }}
      installation="select"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Sizes"
            description="Two trigger sizes match Input and Button. Items inside the panel stay the same height at both, because a list is dense by nature."
            source={sizesSource}
          >
            <SelectSizes />
          </Example>

          <Example
            caption="Groups, icons, and a disabled item"
            description="Open the trigger. Groups take a label and a separator, the checked item shows a mark in a reserved slot, and a disabled item stays in the list so positions never shift."
            source={groupsSource}
          >
            <SelectGroups />
          </Example>

          <Example
            caption="Description"
            description="Helper text sits under the trigger and joins its accessible description."
            source={descriptionSource}
          >
            <SelectDescription />
          </Example>

          <Example
            caption="Error"
            description="The message renders under the trigger. It can be covered while the panel is open and reappears once it closes."
            source={errorSource}
          >
            <SelectError />
          </Example>

          <Example
            caption="Loading"
            description="Choose who can see the trip. The trigger shows a spinner while the change saves, the card shows the result, and Anyone with the link fails and becomes the field's own error."
            source={loadingSource}
          >
            <SelectLoading />
          </Example>

          <Example
            caption="Disabled"
            description="The trigger and its label dim together and leave the tab order. Say why in the description."
            source={disabledSource}
          >
            <SelectDisabled />
          </Example>

          <Example
            caption="Long lists scroll and truncate"
            description="The panel matches the trigger's width and scrolls inside a maximum height. Long item text ends in an ellipsis, and so does the chosen label in the trigger."
            source={longListSource}
          >
            <SelectLongList />
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
                  'Moves focus to the trigger. A loading trigger stays in the tab order; a disabled one leaves it.',
              },
              {
                keys: ['Enter', 'Space', 'ArrowDown', 'ArrowUp'],
                description:
                  'Opens a closed trigger. Opening never changes the value.',
              },
              {
                keys: ['ArrowDown', 'ArrowUp'],
                description: 'Moves the highlight through the open list.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Moves the highlight to the first or last item.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Chooses the highlighted item and closes the list.',
              },
              {
                keys: ['Escape'],
                description: 'Closes the list with no change.',
              },
            ]}
          />
          <p>
            Typing characters moves the highlight to the next matching item.
            Focus always returns to the trigger when the list closes. Select
            generates the trigger <code>id</code> and wires the label to it, so
            clicking the label focuses the trigger without opening the list. An
            error sets <code>aria-invalid</code>, and{' '}
            <code>aria-describedby</code> lists any ids you passed, then the
            error message, then the description. A loading trigger sets{' '}
            <code>aria-busy</code>. <code>required</code> marks the label, sets{' '}
            <code>aria-required</code>, and takes part in native validation. The
            states every field shares are described on{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Select"
            description={
              <>
                Also takes the props of the Radix select root, including{' '}
                <code>value</code>, <code>defaultValue</code>,{' '}
                <code>onValueChange</code>, <code>name</code>,{' '}
                <code>disabled</code>, and <code>required</code>.{' '}
                <code>className</code> styles the wrapper.
              </>
            }
            rows={[
              {
                name: 'label',
                type: 'string',
                description:
                  'The visible label. Renders above the trigger and is wired to it.',
              },
              {
                name: 'placeholder',
                type: 'string',
                description: 'Shown in the trigger while no value is chosen.',
              },
              {
                name: 'size',
                type: 'SelectSize',
                default: 'SelectSize.Default',
                description: 'Default or Small, matching Input and Button.',
              },
              {
                name: 'description',
                type: 'string',
                description: 'Helper text under the trigger.',
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
                  'Swaps the chevron for a spinner and blocks opening. The trigger keeps focus and shows its value.',
              },
              {
                name: 'side',
                type: 'SelectPanelSide',
                default: 'SelectPanelSide.Bottom',
                description: 'Which side of the trigger the list opens on.',
              },
              {
                name: 'align',
                type: 'SelectPanelAlign',
                default: 'SelectPanelAlign.Center',
                description: 'How the list aligns to the trigger on that side.',
              },
            ]}
          />
          <PropsTable
            component="SelectItem"
            description="Also takes the props of the Radix select item."
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description:
                  'The value the select reports when this item is chosen.',
              },
              {
                name: 'children',
                type: 'string',
                required: true,
                description:
                  'The item text, as a plain string. It is also what the trigger shows and what typeahead matches.',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                description:
                  'An icon ahead of the text. Hidden from screen readers and not shown in the trigger.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Dims the item and keeps it in the list.',
              },
            ]}
          />
          <p>
            <code>SelectGroup</code>, <code>SelectLabel</code>, and{' '}
            <code>SelectSeparator</code> take their element&rsquo;s props.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The trigger is 36px tall at the default size and 32px at small.
            Items stay 32px at both. The checked item shows its mark in a
            reserved trailing slot, so every label starts at the same left edge.
            The panel matches the trigger&rsquo;s width and scrolls inside a
            maximum height with no scroll buttons.
          </p>
          <p>
            Only <code>Select</code>, <code>SelectItem</code>,{' '}
            <code>SelectGroup</code>, <code>SelectLabel</code>, and{' '}
            <code>SelectSeparator</code> are exported. The Radix trigger, value,
            portal, content, and viewport stay internal, so the field owns its
            label and message. A plain form posts the chosen value through
            Radix&rsquo;s hidden native <code>&lt;select&gt;</code>.
          </p>
          <p>
            Typeahead matches only the start of an item, so a list of fifty or
            more strands a traveller who cannot remember the first letters. That
            is the point where a list needs a field they can search.
          </p>
          <p>
            Hover border and focus ring are CSS transitions at{' '}
            <code>--motion-fast</code>. The chevron rotates 180 degrees on open,
            a CSS transition at <code>--motion-base</code>. The panel grows from
            the trigger: scale from <code>0.96</code> plus a fade, 250ms on the
            bounce curve in and 350ms on the settle curve out. Items snap to
            their highlighted state with no transition, and the check mark has
            no animation, because the panel closes the moment it appears.
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
          to: '/components/combobox',
          label: 'Combobox',
          description: 'The searchable field for long or remote lists.',
        },
        {
          to: '/components/radio-group',
          label: 'Radio group',
          description: 'Keeps a few options visible at once.',
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
