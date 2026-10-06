import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { CheckboxDemo } from '@/examples/checkbox/demo'
import demoSource from '@/examples/checkbox/demo.tsx?raw'
import { CheckboxError } from '@/examples/checkbox/error'
import errorSource from '@/examples/checkbox/error.tsx?raw'
import { CheckboxInAForm } from '@/examples/checkbox/in-a-form'
import inAFormSource from '@/examples/checkbox/in-a-form.tsx?raw'
import { CheckboxSelectAll } from '@/examples/checkbox/select-all'
import selectAllSource from '@/examples/checkbox/select-all.tsx?raw'
import { CheckboxStates } from '@/examples/checkbox/states'
import statesSource from '@/examples/checkbox/states.tsx?raw'
import usageSource from '@/examples/checkbox/usage.tsx?raw'
import guidelines from '@/registry/ui/checkbox/guidelines.md?raw'

import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/checkbox')({
  component: CheckboxPage,
})

function CheckboxPage() {
  return (
    <DocPage
      title="Checkbox"
      lead="A checkbox records a yes or no that the form collects and submits later, and it owns its label and its error message."
      preview={{ source: demoSource, demo: <CheckboxDemo /> }}
      installation="checkbox"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="States"
            description="Checked and indeterminate share one orange fill, so a mixed state reads as part of the same control. There is one size and no loading state: a checkbox states intent, and the submit button shows the busyness."
            source={statesSource}
          >
            <CheckboxStates />
          </Example>

          <Example
            caption="Select all"
            description='The parent takes true, false, or "indeterminate" from what its children hold. Toggle the parent and the mark morphs between the check and the dash.'
            source={selectAllSource}
          >
            <CheckboxSelectAll />
          </Example>

          <Example
            caption="Error"
            description="The border, the focus ring, and the label turn red and the message appears below. A checked box keeps the red fill, so the whole control carries one colour."
            source={errorSource}
          >
            <CheckboxError />
          </Example>

          <Example
            caption="In a form"
            description="Press Book trip without ticking the box, then tick it and try again. The app validates; the checkbox shows the message, and the card shows the result."
            source={inAFormSource}
          >
            <CheckboxInAForm />
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
                  'Moves focus to the box. A disabled checkbox leaves the tab order.',
              },
              {
                keys: ['Space'],
                description:
                  'Toggles the box. An indeterminate box resolves to checked.',
              },
            ]}
          />
          <p>
            Clicking the label toggles the box, so the click target covers both.
            An indeterminate box reports{' '}
            <code>aria-checked=&quot;mixed&quot;</code>. An error sets{' '}
            <code>aria-invalid</code> and links the message through{' '}
            <code>aria-describedby</code>, keeping any description you pass. The
            focus ring appears on keyboard focus only. <code>required</code>{' '}
            marks the label and sets <code>aria-required</code>; the validation
            itself stays with your app. The{' '}
            <TextLink asChild>
              <Link to="/accessibility">accessibility page</Link>
            </TextLink>{' '}
            covers the rules every component follows.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Checkbox"
          description={
            <>
              Every other prop passes through to the Radix checkbox root.
              Checkbox ships no group, so grouping is the app&rsquo;s job. The{' '}
              <TextLink asChild>
                <Link to="/fields">fields page</Link>
              </TextLink>{' '}
              describes the label, error, and wrapper behaviour that every field
              shares.
            </>
          }
          rows={[
            {
              name: 'label',
              type: 'string',
              description:
                'The text beside the box. It is part of the click target and the accessible name, so give every box one: nearby text names nothing.',
            },
            {
              name: 'error',
              type: 'string',
              description:
                'Turns the control red and shows the message below it.',
            },
            {
              name: 'checked',
              type: 'boolean | "indeterminate"',
              description:
                'Controls the box. Pass "indeterminate" for a parent whose children are mixed.',
            },
            {
              name: 'defaultChecked',
              type: 'boolean | "indeterminate"',
              default: 'false',
              description:
                'The starting state when the app does not control it.',
            },
            {
              name: 'onCheckedChange',
              type: '(checked: boolean | "indeterminate") => void',
              description: 'Called with the next state after each toggle.',
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
              description:
                'Dims the box and its label and removes them from the tab order.',
            },
            {
              name: 'className',
              type: 'string',
              description:
                'Styles the wrapper that holds the box, label, and message, not the box itself.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The box is 20px square in a 20px row, so a checkbox that starts a
            row leaves no dead space above or below it. Checked and
            indeterminate both fill with <code>--indicator</code>, orange-600.
            The fill turns red in the error state because a red border on a 20px
            box is too small to read against an orange fill.
          </p>
          <p>
            The focus ring is 3px and sits 2px clear of the box, the same ring
            Button and Switch draw. There is no press ring, because a held state
            means nothing on an instant toggle.
          </p>
          <p>
            The check scales in with opacity on <code>springBounce</code> at{' '}
            <code>--motion-base</code>. Entry cannot morph, because a morph
            needs two shapes. Checked to indeterminate is the signature move:
            the <code>d</code> attribute of one path animates between the check
            and the dash. Both marks are one move-to plus two line-tos, which is
            what lets motion interpolate them, so keep the command counts
            identical if you redraw either mark. Unchecking fades and shrinks
            the mark out on <code>springSettle</code>, with no reverse draw. The
            fill, the hover shade, the focus ring, and the red colours are CSS
            transitions at <code>--motion-fast</code>.
          </p>
        </>
      }
      related={[
        {
          to: '/components/switch',
          label: 'Switch',
          description: 'The control for a setting that applies at once.',
        },
        {
          to: '/components/radio-group',
          label: 'Radio group',
          description: 'One answer from a short list of visible options.',
        },
        {
          to: '/components/toggle-group',
          label: 'Toggle group',
          description:
            'Chips for picking several options without a column of boxes.',
        },
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, error, and wrapper behaviour every field shares.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description:
            'Focus, keyboard, and contrast rules for every component.',
        },
      ]}
    />
  )
}
