import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { AlertCustomIcon } from '@/examples/alert/custom-icon'
import customIconSource from '@/examples/alert/custom-icon.tsx?raw'
import { AlertDemo } from '@/examples/alert/demo'
import demoSource from '@/examples/alert/demo.tsx?raw'
import { AlertDismissible } from '@/examples/alert/dismissible'
import dismissibleSource from '@/examples/alert/dismissible.tsx?raw'
import { AlertInAForm } from '@/examples/alert/in-a-form'
import inAFormSource from '@/examples/alert/in-a-form.tsx?raw'
import { AlertOpenAndClose } from '@/examples/alert/open-and-close'
import openAndCloseSource from '@/examples/alert/open-and-close.tsx?raw'
import { AlertSizes } from '@/examples/alert/sizes'
import sizesSource from '@/examples/alert/sizes.tsx?raw'
import { AlertTitleAndDescription } from '@/examples/alert/title-and-description'
import titleAndDescriptionSource from '@/examples/alert/title-and-description.tsx?raw'
import usageSource from '@/examples/alert/usage.tsx?raw'
import { AlertVariants } from '@/examples/alert/variants'
import variantsSource from '@/examples/alert/variants.tsx?raw'
import { AlertWithActions } from '@/examples/alert/with-actions'
import withActionsSource from '@/examples/alert/with-actions.tsx?raw'

export const Route = createFileRoute('/_docs/components/alert')({
  component: AlertPage,
})

function AlertPage() {
  return (
    <DocPage
      title="Alert"
      lead="An in-flow message that reports the result of an action where the traveller is already looking, and stays until they have seen it."
      preview={{ source: demoSource, demo: <AlertDemo /> }}
      installation="alert"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Variants"
            description="Info is the default, then success, warning, and error. The card and its border stay plain, and the icon alone carries the variant, so an alert reads as a message on the page and never as a coloured block."
            source={variantsSource}
          >
            <AlertVariants />
          </Example>

          <Example
            caption="Sizes"
            description="Small tightens the padding and the icon for an alert inside a dense surface. The text size does not change: a message does not shrink its type."
            source={sizesSource}
          >
            <AlertSizes />
          </Example>

          <Example
            caption="Title and description"
            description="The title is optional; a short message works on its own. When both are present the description steps back to the muted colour, so the title is read first."
            source={titleAndDescriptionSource}
          >
            <AlertTitleAndDescription />
          </Example>

          <Example
            caption="Custom icon"
            description="Pass icon to replace the variant icon, or null to drop it. The alert sizes and colours whatever node you pass."
            source={customIconSource}
          >
            <AlertCustomIcon />
          </Example>

          <Example
            caption="Dismissible"
            description="Pass onClose and the alert shows a Dismiss button. The alert never hides itself: it calls onClose and your app decides what happens, so the app can retry or keep the message until the traveller has seen it."
            source={dismissibleSource}
          >
            <AlertDismissible />
          </Example>

          <Example
            caption="With actions"
            description="Put the buttons in the children, under the description. Two at most, one outline and one ghost, both small. A third action means the message belongs somewhere bigger than an alert."
            source={withActionsSource}
          >
            <AlertWithActions />
          </Example>

          <Example
            caption="Open and close"
            description="open drives the one animation, height and opacity, in both directions. The alert carries its own exit, so you toggle open and write no motion code."
            source={openAndCloseSource}
          >
            <AlertOpenAndClose />
          </Example>

          <Example
            caption="In a form's result slot"
            description="Submit the form. The button shows its own busyness, then the failure appears below the actions row, where the traveller is already looking, with their input kept."
            source={inAFormSource}
          >
            <AlertInAForm />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To report the result of a form submit, in the form’s result slot below the actions row.',
          'To show a warning or notice that belongs to a region of the page and should sit in the flow beside it.',
        ],
        whenNotToUse: [
          {
            situation:
              'for a result with no visible home, such as the outcome of a dialog form that has already closed. A notice stays on screen and links back to its subject.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
          {
            situation:
              'when a region failed to load. The region itself says so, with a retry.',
            alternative: {
              to: '/components/error-state',
              label: 'Error state',
            },
          },
          {
            situation:
              'for the error on a single field. The field shows its own error beside its input.',
            alternative: { to: '/fields', label: 'Fields' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Place the alert where the traveller is already looking, and keep it until they have seen it.',
            reason:
              'A message that appears elsewhere or disappears on a timer is missed, and a missed failure looks like a success.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Pick the variant by what the traveller must do: error for a failure, warning for something to check, success and info for the rest.',
            reason:
              'Error interrupts a screen reader and the others wait their turn, so the variant sets how loudly the message arrives.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Hide the alert from inside the component or on a timer.',
            reason:
              'The app owns the lifecycle. A message that removes itself cannot be read at the traveller’s pace.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Stack several alerts for one action.',
            reason:
              'Several messages for one result make the traveller work out which one matters. Write one alert that says it.',
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
                  'Moves focus to the Dismiss button when onClose is passed, after any action buttons in the body. Without onClose the alert has no tab stop.',
              },
              {
                keys: ['Enter', 'Space'],
                description: 'On the Dismiss button, calls onClose.',
              },
            ]}
          />
          <p>
            An error alert has <code>role="alert"</code>, so a screen reader
            interrupts with it. The other three variants have{' '}
            <code>role="status"</code> and wait their turn. Pass{' '}
            <code>role</code> to override the mapping. The icon is hidden from
            assistive technology, so the message is announced once.
          </p>
          <p>
            The alert does no focus management. When you remove an alert whose
            Dismiss button holds focus, send focus back to the control that
            produced it.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Alert"
          description={
            <>
              Also takes every <code>&lt;div&gt;</code> attribute.{' '}
              <code>AlertTitle</code> and <code>AlertDescription</code> take
              only their element’s props.
            </>
          }
          rows={[
            {
              name: 'variant',
              type: 'AlertVariant',
              default: 'AlertVariant.Info',
              description: 'Info, Success, Warning, or Error.',
            },
            {
              name: 'size',
              type: 'AlertSize',
              default: 'AlertSize.Default',
              description:
                'Default or Small. The text size is the same in both.',
            },
            {
              name: 'icon',
              type: 'ReactNode',
              description:
                'Replaces the variant icon. Pass null to show no icon.',
            },
            {
              name: 'onClose',
              type: '() => void',
              description:
                'Shows a Dismiss button that calls it. The alert does not hide itself.',
            },
            {
              name: 'open',
              type: 'boolean',
              default: 'true',
              description: 'Shows or hides the alert, animating the change.',
            },
            {
              name: 'animateOpen',
              type: 'boolean',
              default: 'true',
              description:
                'Set false to skip the height animation, as the notice does.',
            },
            {
              name: 'role',
              type: 'string',
              description:
                'Overrides the role the variant sets: alert for error, status for the rest.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Default takes 16px of padding and a 20px icon; small takes 12px and
            a 16px icon. The text is <code>text-sm</code> in both and the close
            button is <code>icon-sm</code> in both. The title is Onest at medium
            weight, not Bricolage Grotesque, because an alert is a message and
            not a heading.
          </p>
          <p>
            Weight alone does not separate the title from the description at{' '}
            <code>text-sm</code>, so the description uses{' '}
            <code>muted-foreground</code> and the title keeps the full
            foreground colour.
          </p>
          <p>
            <code>open</code> animates height and opacity on{' '}
            <code>springSettle</code> both ways, with no bounce: a bounce on a
            height change makes the content below overshoot. The exit comes from
            the alert’s own <code>AnimatePresence</code>, so unmounting{' '}
            <code>&lt;Alert&gt;</code> directly skips it.
          </p>
          <p>
            The description text is 7.44:1 on the card, the floor for text here.
            The close button’s focus ring clears 3:1 on the card. The info icon
            is <code>--indicator</code> at 3.59:1 on the card, which clears the
            3:1 bar for non-text marks.
          </p>
        </>
      }
      related={[
        {
          to: '/components/notice',
          label: 'Notice',
          description:
            'The persistent shell surface for a result with no visible home.',
        },
        {
          to: '/components/error-state',
          label: 'Error state',
          description: 'The failed state of a region that did not load.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Defines the result slot an alert sits in.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'The feedback rule that ranks where a result belongs.',
        },
      ]}
    />
  )
}
