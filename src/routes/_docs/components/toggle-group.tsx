import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { ToggleGroupDemo } from '@/examples/toggle-group/demo'
import demoSource from '@/examples/toggle-group/demo.tsx?raw'
import { ToggleGroupDisabled } from '@/examples/toggle-group/disabled'
import disabledSource from '@/examples/toggle-group/disabled.tsx?raw'
import { ToggleGroupError } from '@/examples/toggle-group/error'
import errorSource from '@/examples/toggle-group/error.tsx?raw'
import { ToggleGroupInAForm } from '@/examples/toggle-group/in-a-form'
import inAFormSource from '@/examples/toggle-group/in-a-form.tsx?raw'
import { ToggleGroupMax } from '@/examples/toggle-group/max'
import maxSource from '@/examples/toggle-group/max.tsx?raw'
import { ToggleGroupRequired } from '@/examples/toggle-group/required'
import requiredSource from '@/examples/toggle-group/required.tsx?raw'
import { ToggleGroupSingle } from '@/examples/toggle-group/single'
import singleSource from '@/examples/toggle-group/single.tsx?raw'
import { ToggleGroupSizes } from '@/examples/toggle-group/sizes'
import sizesSource from '@/examples/toggle-group/sizes.tsx?raw'
import usageSource from '@/examples/toggle-group/usage.tsx?raw'

import { TextLink } from '@/registry/ui/text-link'
import guidelines from '@/registry/ui/toggle-group/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/toggle-group')({
  component: ToggleGroupPage,
})

function ToggleGroupPage() {
  return (
    <DocPage
      title="Toggle group"
      lead="A toggle group is a row of chips that answers a question, in single mode or multiple mode, wrapping across lines as needed."
      preview={{ source: demoSource, demo: <ToggleGroupDemo /> }}
      installation="toggle-group"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Single choice with icons"
            description="Single mode is the default. Pressing the pressed chip clears the choice and reports an empty string. Each chip takes an optional leading icon."
            source={singleSource}
          >
            <ToggleGroupSingle />
          </Example>

          <Example
            caption="Multiple with a maximum"
            description="At the cap every unpressed chip dims and stops toggling, while pressed chips stay live so the traveller can always back out. The registry renders no counter, so the label states the limit."
            source={maxSource}
          >
            <ToggleGroupMax />
          </Example>

          <Example
            caption="Sizes"
            description="Size sits on the group, not on each chip. Default and small match the two field heights, so a group lines up with an input or a button."
            source={sizesSource}
          >
            <ToggleGroupSizes />
          </Example>

          <Example
            caption="Disabled"
            description="Disable one chip for an option that is unavailable right now, or the whole group to lock it. A capped chip looks the same, because both are unavailable and the label says why."
            source={disabledSource}
          >
            <ToggleGroupDisabled />
          </Example>

          <Example
            caption="Required"
            description="Required means the group must hold a value, so the deselect that would empty it does nothing. Try pressing the pressed chip."
            source={requiredSource}
          >
            <ToggleGroupRequired />
          </Example>

          <Example
            caption="Error"
            description="A group mounted empty is reachable, and a submit while it is empty is your validation error. Pass it as error and the label, the chips, and the message turn red."
            source={errorSource}
          >
            <ToggleGroupError />
          </Example>

          <Example
            caption="In a form"
            description="Press a chip and save. name posts each pressed value through hidden inputs, and the card shows what was saved."
            source={inAFormSource}
          >
            <ToggleGroupInAForm />
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
                  'Moves focus into the row once, onto the pressed chip or the first one. A second Tab leaves the row.',
              },
              {
                keys: ['ArrowLeft', 'ArrowRight'],
                description:
                  'Moves between chips and wraps at the ends. Disabled and capped chips are skipped.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Moves to the first or the last chip.',
              },
              {
                keys: ['Space', 'Enter'],
                description:
                  'Toggles the focused chip. In required mode the press that would empty the group does nothing.',
              },
              {
                keys: ['ArrowUp', 'ArrowDown'],
                description:
                  'Do nothing, because a wrapped row has no vertical order to follow.',
              },
            ]}
          />
          <p>
            Single mode exposes <code>role=&quot;radiogroup&quot;</code> with{' '}
            <code>role=&quot;radio&quot;</code> chips carrying{' '}
            <code>aria-checked</code>. Multiple mode exposes a group of buttons
            carrying <code>aria-pressed</code>. The group is named by its label,
            takes <code>aria-required</code> in single mode, and an error sets{' '}
            <code>aria-invalid</code> and links the message through{' '}
            <code>aria-describedby</code>. The focus ring appears on keyboard
            focus only. The{' '}
            <TextLink asChild>
              <Link to="/accessibility">accessibility page</Link>
            </TextLink>{' '}
            covers the rules every component follows.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="ToggleGroup"
            description={
              <>
                The group is a field: the{' '}
                <TextLink asChild>
                  <Link to="/fields">fields page</Link>
                </TextLink>{' '}
                describes the label, error, and wrapper behaviour it shares. The
                value types change with <code>mode</code>.
              </>
            }
            rows={[
              {
                name: 'mode',
                type: 'ToggleGroupMode',
                default: 'ToggleGroupMode.Single',
                description:
                  'Single holds a string. Multiple holds an array and adds max.',
              },
              {
                name: 'label',
                type: 'string',
                description:
                  'The question the group answers, shown above the chips.',
              },
              {
                name: 'error',
                type: 'string',
                description:
                  'Turns the group red and shows the message below it.',
              },
              {
                name: 'value',
                type: 'string | string[]',
                description:
                  'The pressed chips when the app controls them: a string in single mode, an array in multiple mode.',
              },
              {
                name: 'defaultValue',
                type: 'string | string[]',
                description:
                  'The starting chips when the app does not control them.',
              },
              {
                name: 'onValueChange',
                type: '(value: string | string[]) => void',
                description:
                  'Called with the next value. Single mode reports an empty string when the chip is cleared. Enforce a chip that stands alone, such as "Decide for me", here: drop the other values when it is pressed, and drop it when another is.',
              },
              {
                name: 'max',
                type: 'number',
                description:
                  'Multiple mode only. At the cap, unpressed chips stop toggling.',
              },
              {
                name: 'size',
                type: 'ToggleGroupSize',
                default: 'ToggleGroupSize.Default',
                description:
                  'Default and Small match the field heights of the same names.',
              },
              {
                name: 'required',
                type: 'boolean',
                default: 'false',
                description:
                  'Blocks the deselect that would empty the group and marks the label. It is not a submit-time check.',
              },
              {
                name: 'name',
                type: 'string',
                description:
                  'Posts the pressed values through hidden inputs: one in single mode, one per chip in multiple mode, none while empty.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Dims and disables every chip.',
              },
              {
                name: 'className',
                type: 'string',
                description:
                  'Styles the wrapper that holds the label, chips, and message, not the chip row.',
              },
            ]}
          />
          <PropsTable
            component="ToggleGroupItem"
            description="Also takes the Radix toggle group item's own props."
            rows={[
              {
                name: 'value',
                type: 'string',
                required: true,
                description:
                  'The value the group reports when this chip is pressed.',
              },
              {
                name: 'icon',
                type: 'ReactNode',
                description: 'A leading icon, hidden from screen readers.',
              },
              {
                name: 'disabled',
                type: 'boolean',
                default: 'false',
                description: 'Takes this chip out while the rest stay live.',
              },
              {
                name: 'className',
                type: 'string',
                description: 'Styles the chip.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            <code>ToggleGroupSize.Default</code> is 36px tall and{' '}
            <code>ToggleGroupSize.Small</code> is 32px, matching Input and
            Button. Chips are fully rounded. The icon slot is 16px, on
            Button&rsquo;s slot rule.
          </p>
          <p>
            A chip rests on <code>--secondary</code> with its border in the same
            colour, so hover shows as the border stepping to{' '}
            <code>--accent</code>. A pressed chip fills with{' '}
            <code>--primary</code> and steps to orange-700 on hover. Rings
            follow Button: an unpressed chip rings in <code>--accent</code>, the
            colour its hover border turns, and a pressed chip in{' '}
            <code>--indicator</code>, its own fill colour. A held press draws
            Button&rsquo;s tight 2px ring with no scale and no translate.
          </p>
          <p>
            <code>required</code> blocks the deselect in both modes, so a group
            can never be emptied by the traveller. A group that mounts empty is
            still reachable, which is why an empty submit is the app&rsquo;s
            validation error.
          </p>
          <p>
            The fill and the border swap on a CSS transition at{' '}
            <code>--motion-fast</code>, and that is all the motion. The toggle
            group has no <code>motion</code> dependency: chips added while the
            group is mounted appear with no enter animation, and an app that
            mounts options dynamically animates them itself. The animated error
            message below the row comes from the shared <code>field</code> item.
          </p>
        </>
      }
      related={[
        {
          to: '/components/radio-group',
          label: 'Radio group',
          description: 'One answer that stays chosen, shown as a list.',
        },
        {
          to: '/components/tabs',
          label: 'Tabs',
          description:
            'For switching the panel underneath, not answering a question.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'A read-only chip that summarises a value.',
        },
        {
          to: '/components/switch',
          label: 'Switch',
          description: 'A setting that is only on or off.',
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
