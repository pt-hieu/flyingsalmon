import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { SwitchConfirmFirst } from '@/examples/switch/confirm-first'
import confirmFirstSource from '@/examples/switch/confirm-first.tsx?raw'
import { SwitchDemo } from '@/examples/switch/demo'
import demoSource from '@/examples/switch/demo.tsx?raw'
import { SwitchDisabled } from '@/examples/switch/disabled'
import disabledSource from '@/examples/switch/disabled.tsx?raw'
import { SwitchFailedToggle } from '@/examples/switch/failed-toggle'
import failedToggleSource from '@/examples/switch/failed-toggle.tsx?raw'
import { SwitchInARowOfFields } from '@/examples/switch/in-a-row-of-fields'
import inARowOfFieldsSource from '@/examples/switch/in-a-row-of-fields.tsx?raw'
import { SwitchLoading } from '@/examples/switch/loading'
import loadingSource from '@/examples/switch/loading.tsx?raw'
import { SwitchSizes } from '@/examples/switch/sizes'
import sizesSource from '@/examples/switch/sizes.tsx?raw'
import usageSource from '@/examples/switch/usage.tsx?raw'
import { SwitchWithoutALabel } from '@/examples/switch/without-a-label'
import withoutALabelSource from '@/examples/switch/without-a-label.tsx?raw'

import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/switch')({
  component: SwitchPage,
})

function SwitchPage() {
  return (
    <DocPage
      title="Switch"
      lead="A switch turns a setting on or off the moment the traveller flips it, and it shows its own busyness while the change applies."
      preview={{ source: demoSource, demo: <SwitchDemo /> }}
      installation="switch"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Sizes"
            description="Default and small match the two field heights, so a switch lines up with the input beside it. The label stays the same size at both."
            source={sizesSource}
          >
            <SwitchSizes />
          </Example>

          <Example
            caption="Without a label"
            description="Drop the label when a row already names the setting, and pass aria-label so the switch keeps an accessible name."
            source={withoutALabelSource}
          >
            <SwitchWithoutALabel />
          </Example>

          <Example
            caption="Loading"
            description="Loading pulses the thumb and ignores clicks and keys, while focus stays where it is. The thumb sits wherever checked puts it."
            source={loadingSource}
          >
            <SwitchLoading />
          </Example>

          <Example
            caption="Disabled"
            description="Disabled dims the track and the label together. Use it when the setting cannot change at all, and loading when a change is in flight."
            source={disabledSource}
          >
            <SwitchDisabled />
          </Example>

          <Example
            caption="Confirm first"
            description="Flip the switch. It loads and the thumb stays put until the call returns, then moves. The app controls checked and sets loading while the call runs."
            source={confirmFirstSource}
          >
            <SwitchConfirmFirst />
          </Example>

          <Example
            caption="A failed toggle"
            description="The call fails, so the switch stays off and the failure appears beside it with a retry. A failed toggle is an action result, not a field error, so the result lives on the setting itself."
            source={failedToggleSource}
          >
            <SwitchFailedToggle />
          </Example>

          <Example
            caption="In a row of fields"
            description="A row of fields aligns its controls to the bottom edge. A switch of the same size is exactly one box tall, so it lines up with the fields beside it without extra classes."
            source={inARowOfFieldsSource}
          >
            <SwitchInARowOfFields />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For a setting that takes effect the moment it flips, such as offline maps or link sharing.',
          'For an on or off state the traveller will want to see at a glance.',
        ],
        whenNotToUse: [
          {
            situation:
              'for a yes or no that a form collects and submits later. A checkbox says the value waits for a submit.',
            alternative: { to: '/components/checkbox', label: 'Checkbox' },
          },
          {
            situation:
              'to choose between two named options such as "Day" and "Night". A switch means on or off, not this or that.',
            alternative: {
              to: '/components/toggle-group',
              label: 'Toggle group',
            },
          },
          {
            situation: 'for an action that runs once and has no state to show.',
            alternative: { to: '/components/button', label: 'Button' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Label the switch with the setting, not the state: "Offline maps", not "Turn on offline maps".',
            reason:
              'The thumb already shows on or off, so a label that names the state can contradict it.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Control checked, set loading while the call runs, and keep the old value if the call fails.',
            reason:
              'The switch then never claims a state the server does not hold.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show a failed toggle as an error on the switch.',
            reason:
              'There is no error prop. The app shows the failure on the setting’s row, with a retry, where the traveller is already looking.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Disable a switch while its change applies.',
            reason:
              'Use loading. A disabled switch leaves the tab order and drops keyboard focus mid-action.',
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
                  'Moves focus to the switch. A loading switch stays in the tab order; a disabled one leaves it.',
              },
              {
                keys: ['Space', 'Enter'],
                description:
                  'Toggles the switch. A loading switch ignores both.',
              },
            ]}
          />
          <p>
            Clicking the label toggles the setting. The focus ring appears on
            keyboard focus only. A loading switch announces{' '}
            <code>aria-disabled</code> rather than <code>aria-busy</code>, which
            screen readers support poorly, and it never sets the{' '}
            <code>disabled</code> attribute, which would drop it from the tab
            order. The{' '}
            <TextLink asChild>
              <Link to="/accessibility">accessibility page</Link>
            </TextLink>{' '}
            covers the rules every component follows.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Switch"
          description="Every other prop passes through to the Radix switch root."
          rows={[
            {
              name: 'label',
              type: 'string',
              description:
                'The text beside the switch. It is part of the click target. Without it, pass aria-label.',
            },
            {
              name: 'size',
              type: 'SwitchSize',
              default: 'SwitchSize.Default',
              description:
                'Default and Small match the field heights of the same names.',
            },
            {
              name: 'checked',
              type: 'boolean',
              description: 'The on state when the app controls it.',
            },
            {
              name: 'defaultChecked',
              type: 'boolean',
              default: 'false',
              description:
                'The starting state when the app does not control it.',
            },
            {
              name: 'onCheckedChange',
              type: '(checked: boolean) => void',
              description: 'Called with the requested state after each toggle.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Pulses the thumb and ignores clicks and keys while keeping focus.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the switch and its label and removes it from the tab order.',
            },
            {
              name: 'className',
              type: 'string',
              description:
                'Styles the wrapper that holds the track and the label, not the track itself.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            <code>SwitchSize.Default</code> sets the row to 36px and{' '}
            <code>SwitchSize.Small</code> to 32px, matching Input, Number field,
            and Toggle group. The track is centred in that row: 24px tall at the
            default size and 20px at the small one, with a thumb to match.
          </p>
          <p>
            Off is <code>--muted-foreground</code> under a{' '}
            <code>--background</code> thumb. On is <code>--indicator</code>{' '}
            under an <code>--indicator-foreground</code> thumb, the white that
            carries content on every indicator fill. The thumb clears 3:1
            against its track in both states: 7.01:1 off and 3.59:1 on. The off
            track measures 7.01:1 on the page and the on track 3.38:1, both
            clearing the 3:1 non-text bar.
          </p>
          <p>
            The thumb travels on <code>springBounce</code> in both directions
            through motion&rsquo;s <code>layout</code> prop. Travel is a morph,
            not an exit, so it bounces on the way back too. The thumb stays one
            object across the journey and its colour swaps with the state. The
            track colour crossfades under it in CSS at{' '}
            <code>--motion-fast</code>, as do the hover shade and the focus
            ring. The loading pulse is a continuous 800ms CSS keyframes cycle
            that fades the thumb colour, matched to the spinner&rsquo;s tempo.
            The thumb never changes size, so it never reads as travel. The focus
            ring is 3px.
          </p>
        </>
      }
      related={[
        {
          to: '/components/checkbox',
          label: 'Checkbox',
          description: 'A yes or no that waits for a form submit.',
        },
        {
          to: '/components/toggle-group',
          label: 'Toggle group',
          description: 'Chips for choosing between named options.',
        },
        {
          to: '/components/number-field',
          label: 'Number field',
          description: 'The field a switch commonly sits beside.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'Where a result belongs: the feedback rule.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The spring presets and timings behind the thumb.',
        },
      ]}
    />
  )
}
