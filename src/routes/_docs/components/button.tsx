import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { ButtonDemo } from '@/examples/button/demo'
import demoSource from '@/examples/button/demo.tsx?raw'
import { ButtonDisabled } from '@/examples/button/disabled'
import disabledSource from '@/examples/button/disabled.tsx?raw'
import { ButtonIconOnly } from '@/examples/button/icon-only'
import iconOnlySource from '@/examples/button/icon-only.tsx?raw'
import { ButtonLeadingIcon } from '@/examples/button/leading-icon'
import leadingIconSource from '@/examples/button/leading-icon.tsx?raw'
import { ButtonLoading } from '@/examples/button/loading'
import loadingSource from '@/examples/button/loading.tsx?raw'
import { ButtonSizes } from '@/examples/button/sizes'
import sizesSource from '@/examples/button/sizes.tsx?raw'
import { ButtonSubmitInAForm } from '@/examples/button/submit-in-a-form'
import submitInAFormSource from '@/examples/button/submit-in-a-form.tsx?raw'
import usageSource from '@/examples/button/usage.tsx?raw'
import { ButtonVariants } from '@/examples/button/variants'
import variantsSource from '@/examples/button/variants.tsx?raw'

export const Route = createFileRoute('/_docs/components/button')({
  component: ButtonPage,
})

function ButtonPage() {
  return (
    <DocPage
      title="Button"
      lead="A button triggers one action on the current page and shows that action's busyness itself."
      preview={{ source: demoSource, demo: <ButtonDemo /> }}
      installation="button"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Variants"
            description="Default is the one primary action on a view; outline and secondary sit beside it, ghost lives inside dense rows, and destructive marks the action that removes something."
            source={variantsSource}
          >
            <ButtonVariants />
          </Example>

          <Example
            caption="Sizes"
            description="Default and small match the two field heights, so a button lines up with the input beside it."
            source={sizesSource}
          >
            <ButtonSizes />
          </Example>

          <Example
            caption="Leading icon"
            description="The icon prop fills the slot before the label. There is no trailing slot, because a trailing icon reads as a menu or a link."
            source={leadingIconSource}
          >
            <ButtonLeadingIcon />
          </Example>

          <Example
            caption="Icon only"
            description="A square size renders no label, so every icon-only button carries an aria-label."
            source={iconOnlySource}
          >
            <ButtonIconOnly />
          </Example>

          <Example
            caption="Loading"
            description="Press either button. The spinner takes the leading slot and the label stays, so the button never hides what it is doing."
            source={loadingSource}
          >
            <ButtonLoading />
          </Example>

          <Example
            caption="Disabled"
            description="A disabled button dims and leaves the tab order. Use it for an action that cannot run yet, never for one that is running."
            source={disabledSource}
          >
            <ButtonDisabled />
          </Example>

          <Example
            caption="Submit in a form"
            description='Rename the trip. Only the submit button says type="submit"; Reset stays a plain button and never posts the form. The new name lands on the trip itself.'
            source={submitInAFormSource}
          >
            <ButtonSubmitInAForm />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To run an action on the current page: save a trip, send an invite, open a dialog, delete a place.',
          'To submit a form, as the last control in its actions row.',
        ],
        whenNotToUse: [
          {
            situation:
              'to take the traveller to another page. A link navigates and a button acts, and browsers give links their own keyboard and context-menu behaviour.',
            alternative: { to: '/components/text-link', label: 'Text link' },
          },
          {
            situation:
              'for a setting that is on or off, because the switch shows its state and a button does not.',
            alternative: { to: '/components/switch', label: 'Switch' },
          },
          {
            situation:
              'to pick one option from a small set, because the group shows which option is chosen.',
            alternative: {
              to: '/components/toggle-group',
              label: 'Toggle group',
            },
          },
          {
            situation:
              'for more than two secondary actions on one item, so the row keeps one visible action and the rest wait in a menu.',
            alternative: {
              to: '/components/dropdown-menu',
              label: 'Dropdown menu',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give each view, card, dialog footer, and alert one default button. The alternative beside it is outline, and a quiet extra action is ghost.',
            reason:
              'The filled orange button is where the eye lands first. Two of them make the traveller choose before they act, and the step down to outline and ghost tells them which action matters.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Name the outcome in the label, such as "Replan the rest", and add the cost when the action spends something: "Rewrite 2 days · 1 credit".',
            reason:
              'The traveller knows what will happen and what it takes from them before they press, so nobody reads the surrounding copy to find out.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Put the outline Cancel on the left of a dialog or form footer and the one default action on the right.',
            reason:
              'The eye reads the row to its end and lands on the action that finishes the task. Cancel always sits in the same place, so leaving never needs reading.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show success or failure on the button.',
            reason:
              'The result belongs to the thing that changed: the trip updates, the field shows its error, or a notice links back when nothing is on screen.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Grey out a button while its action runs.',
            reason:
              'The button shows its own busyness with a spinner beside its label, keeps focus, and ignores repeat presses. A greyed-out button drops focus mid-action and looks broken.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Hide a button whose action cannot run yet. Leave it visible but disabled, with a line beside it that says what is missing.',
            reason:
              'The traveller sees where the task ends and learns what to do next, instead of hunting for a button that is not there.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show a destructive button before the traveller has asked to remove something.',
            reason:
              'Red belongs to the step that confirms a removal. As the first button on a view it shouts louder than the work and invites a slip.',
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
                  'Moves focus to the button. A loading button stays in the tab order; a disabled one leaves it.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'Runs the action. A loading button ignores both, including form submission.',
              },
            ]}
          />
          <p>
            A loading button sets <code>aria-busy</code> and keeps its label as
            its accessible name; the spinner is hidden from screen readers, so
            the wait is announced once. The focus ring appears on keyboard focus
            only, so a mouse click never leaves one behind. An icon-only button
            needs an <code>aria-label</code>, because it renders no text.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Button"
          description={
            <>
              Also takes every <code>&lt;button&gt;</code> attribute. There is
              no <code>asChild</code>: a button is always a{' '}
              <code>&lt;button&gt;</code>.
            </>
          }
          rows={[
            {
              name: 'variant',
              type: 'ButtonVariant',
              default: 'ButtonVariant.Default',
              description:
                'Default, Outline, Secondary, Ghost, or Destructive.',
            },
            {
              name: 'size',
              type: 'ButtonSize',
              default: 'ButtonSize.Default',
              description:
                'Default and Small carry a label. Icon and IconSmall are square. FieldIcon and FieldIconSmall are square buttons for inside a field box.',
            },
            {
              name: 'icon',
              type: 'ReactNode',
              description:
                'The leading icon. On a square size it is the whole content; children work too.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Swaps the leading slot for a spinner, sets aria-busy, and ignores presses while keeping focus. Set it, not disabled, while the action runs: disabled drops keyboard focus mid-action.',
            },
            {
              name: 'type',
              type: '"button" | "submit" | "reset"',
              default: '"button"',
              description:
                'Set "submit" on the one button that submits its form. Cancel and Reset beside it keep "button", so they never post the form.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description: 'Dims the button and removes it from the tab order.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Heights: <code>default</code> is 36px and <code>sm</code> 32px,
            matching the two input heights. <code>icon</code> is 36px square and{' '}
            <code>icon-sm</code> 32px. <code>field-icon</code> is 28px and{' '}
            <code>field-icon-sm</code> 24px: with <code>pr-0.75</code> on a 36px
            or 32px field box, the button sits 4px inside its top, bottom, and
            right edges, its corner radius set to the box radius minus 4px.
          </p>
          <p>
            Hover moves the surface one step. The three neutral variants wash to{' '}
            <code>--accent</code>, orange-200. Destructive steps its label with
            its surface, from red-700 on red-100 to red-800 on red-200, because
            the surface step alone drops the label under 4.5:1.
          </p>
          <p>
            The focus ring is 3px, held 2px off the button by a gap in the page
            colour, and takes the hue of the button under it:{' '}
            <code>--indicator</code> (orange-600, 3.38:1 against the page) on
            default, red on destructive, and <code>--accent</code> on the
            neutral variants. The press ring is the same colour at 2px and
            disappears on release; a loading button shows none. The two field
            sizes draw neither ring, because the field box already draws one;
            keyboard focus paints the hover fill instead.
          </p>
          <p>
            Hover colour and both rings are CSS transitions at{' '}
            <code>--motion-fast</code>. The loading morph runs on motion&rsquo;s{' '}
            <code>layout</code> prop with <code>springBounce</code>: with no
            icon the slot opens and the button widens; with an icon the spinner
            replaces it at once, because two icons cross-fading reads as a
            glitch. The width animates on transforms, so nothing around the
            button moves. The spinner turns on its own CSS keyframes.
          </p>
        </>
      }
      related={[
        {
          to: '/components/text-link',
          label: 'Text link',
          description: 'The control for navigation, where a button would act.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Lays out fields, the actions row, and the result slot.',
        },
        {
          to: '/components/dropdown-menu',
          label: 'Dropdown menu',
          description: 'Holds the secondary actions a row has no room for.',
        },
        {
          to: '/components/spinner',
          label: 'Spinner',
          description: 'The indicator a loading button shows in its slot.',
        },
      ]}
    />
  )
}
