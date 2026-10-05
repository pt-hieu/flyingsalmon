import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  NoticeFrame,
  PropsTable,
} from '@/components/doc-page'
import { DialogDemo } from '@/examples/dialog/demo'
import demoSource from '@/examples/dialog/demo.tsx?raw'
import { DialogDestructiveConfirm } from '@/examples/dialog/destructive-confirm'
import destructiveConfirmSource from '@/examples/dialog/destructive-confirm.tsx?raw'
import { DialogLarge } from '@/examples/dialog/large'
import largeSource from '@/examples/dialog/large.tsx?raw'
import { DialogManyTriggers } from '@/examples/dialog/many-triggers'
import manyTriggersSource from '@/examples/dialog/many-triggers.tsx?raw'
import { DialogPending } from '@/examples/dialog/pending'
import pendingSource from '@/examples/dialog/pending.tsx?raw'
import { DialogScrollingBody } from '@/examples/dialog/scrolling-body'
import scrollingBodySource from '@/examples/dialog/scrolling-body.tsx?raw'
import { DialogServerError } from '@/examples/dialog/server-error'
import serverErrorSource from '@/examples/dialog/server-error.tsx?raw'
import usageSource from '@/examples/dialog/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/dialog')({
  component: DialogPage,
})

function DialogPage() {
  return (
    <DocPage
      title="Dialog"
      lead="A modal surface for a short task that stops the page: a form, a choice, or a confirmation."
      preview={{ source: demoSource, demo: <DialogDemo /> }}
      installation="dialog"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Large size"
            description={
              <>
                <code>DialogSize.Large</code> fits a two-column form.
              </>
            }
            source={largeSource}
          >
            <DialogLarge />
          </Example>

          <Example
            caption="Scrolling body"
            description="The body scrolls while the title and footer stay put, so Done never leaves reach."
            source={scrollingBodySource}
          >
            <DialogScrollingBody />
          </Example>

          <Example
            caption="Destructive confirm"
            description={
              <>
                <code>dismissible={'{false}'}</code> ignores a click outside, so
                the decision ends on a button or Escape. The trip disappearing
                is the confirmation.
              </>
            }
            source={destructiveConfirmSource}
          >
            <DialogDestructiveConfirm />
          </Example>

          <Example
            caption="Waiting inside the dialog"
            description={
              <>
                <code>pending</code> holds every exit while the code is checked,
                because the answer decides what happens next. Try any code, then
                KYOTO-2026.
              </>
            }
            source={pendingSource}
          >
            <DialogPending />
          </Example>

          <Example
            caption="One dialog, many triggers"
            description="Leave out DialogTrigger and drive open from your own state, so a toolbar button and a menu item open the same dialog."
            source={manyTriggersSource}
          >
            <DialogManyTriggers />
          </Example>

          <Example
            caption="Error after closing"
            description="This demo's server always fails. The dialog closes on submit, the failure arrives as a notice, and the notice's link reopens the form with the place you typed."
            source={serverErrorSource}
          >
            <NoticeFrame>
              <DialogServerError />
            </NoticeFrame>
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For a short form that creates or edits one thing: plan a trip, add a place, edit a traveller.',
          'To confirm an action that cannot be undone, such as deleting a trip.',
        ],
        whenNotToUse: [
          {
            situation:
              'for content that accompanies the page, such as filters or the detail of a row. A drawer sits at the edge and leaves the page in view; a dialog stops it.',
            alternative: { to: '/components/drawer', label: 'Drawer' },
          },
          {
            situation:
              'to report a result. A dialog demands a decision; a result needs only to be seen.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
          {
            situation:
              'for a long task with several stages, which deserves a page of its own and a visible sense of progress.',
            alternative: { to: '/components/stepper', label: 'Stepper' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Close a form dialog on submit and show the result on the item that changed.',
            reason:
              'The new trip appearing in the list is the clearest success there is, and nobody waits for the server with a modal in their face.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Turn a server error after closing into a notice whose link reopens the dialog with what the traveller typed.',
            reason:
              'The dialog is gone, so the notice is the one home that stays until it is seen, and nothing typed is lost.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Hold a dialog open with pending just to wait for a save.',
            reason:
              'Pending blocks every exit. Keep it for an answer the next step depends on, such as checking an invite code.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep client-side validation inside the dialog, on the field.',
            reason:
              'The traveller is still looking at the form, so the error belongs under the field they need to fix.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Name the action on the confirm button: "Delete trip", not "OK".',
            reason:
              'The button is the last thing read before the decision, so it says what will happen.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Enter', 'Space'],
                description:
                  'On the trigger, opens the dialog and moves focus to its first control.',
              },
              {
                keys: ['Tab', 'Shift+Tab'],
                description:
                  'Cycles through the controls inside the dialog. The close button comes last.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the dialog and returns focus to the trigger. Does nothing while the dialog is pending.',
              },
            ]}
          />
          <p>
            The dialog is labelled by its title and described by{' '}
            <code>DialogDescription</code> when there is one. Focus never lands
            on the close button on open. Everything outside an open dialog is
            hidden from assistive technology, and the page behind it does not
            scroll. A pending dialog sets <code>aria-busy</code> and disables
            its close button.
          </p>
          <p>
            Only a real <code>DialogTrigger</code> gives its button{' '}
            <code>aria-haspopup</code>, <code>aria-expanded</code>, and{' '}
            <code>aria-controls</code>. A button that opens a trigger-less
            dialog through state is a plain button.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Dialog"
            description="The root. Holds the open state and the rules for leaving."
            rows={[
              {
                name: 'open',
                type: 'boolean',
                description: 'The controlled open state.',
              },
              {
                name: 'defaultOpen',
                type: 'boolean',
                default: 'false',
                description: 'The initial open state when uncontrolled.',
              },
              {
                name: 'onOpenChange',
                type: '(open: boolean) => void',
                description: 'Called when the dialog opens or closes.',
              },
              {
                name: 'size',
                type: 'DialogSize',
                default: 'DialogSize.Default',
                description:
                  'Default for a confirmation or a short form; Large for a two-column form.',
              },
              {
                name: 'dismissible',
                type: 'boolean',
                default: 'true',
                description:
                  'false ignores a click outside. Escape and the close button still work.',
              },
              {
                name: 'pending',
                type: 'boolean',
                default: 'false',
                description:
                  'Blocks Escape, a click outside, and the close button, and sets aria-busy.',
              },
            ]}
          />
          <PropsTable
            component="DialogTrigger"
            rows={[
              {
                name: 'children',
                type: 'ReactElement',
                required: true,
                description:
                  'One element, usually a Button, that opens the dialog.',
              },
            ]}
          />
          <PropsTable
            component="DialogClose"
            rows={[
              {
                name: 'children',
                type: 'ReactElement',
                required: true,
                description: 'One element, usually a Button, that closes it.',
              },
            ]}
          />
          <PropsTable
            component="DialogContent"
            description="The surface. Renders the overlay and the close button for you."
            rows={[
              {
                name: 'onOpenAutoFocus',
                type: '(event: Event) => void',
                description:
                  'Runs as focus moves in. Prevent the default to place focus yourself.',
              },
              {
                name: 'onCloseAutoFocus',
                type: '(event: Event) => void',
                description:
                  'Runs as focus returns. Prevent the default to send it elsewhere.',
              },
            ]}
          />
          <p>
            <code>DialogTitle</code> is required in every dialog.{' '}
            <code>DialogDescription</code>, <code>DialogBody</code>, and{' '}
            <code>DialogFooter</code> are optional and take the props of the
            element they render. <code>DialogBody</code> is the only part that
            scrolls.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The default size is 448px wide and the large size 672px, a ratio of
            1.5. Both are centred and leave 16px of page on every side of a
            small screen. Spacing inside comes from{' '}
            <code>--dialog-spacing</code>.
          </p>
          <p>
            There is no <code>DialogHeader</code>: the content stacks title,
            description, body, and footer with one gap, and the description
            pulls itself up under the title. There is no alert dialog either:
            Radix&rsquo;s <code>AlertDialog</code> adds an announcement mode and
            no keyboard difference, so a destructive confirm is a{' '}
            <code>Dialog</code> with <code>dismissible={'{false}'}</code>.
          </p>
          <p>
            The footer is a full-width column, reversed, below 640px, so the
            primary action sits under the thumb and stays last for the keyboard.
            From 640px it is a right-aligned row with an 8px gap.
          </p>
          <p>
            The dialog enters with a fade and a scale from 0.98, 250ms on the
            bounce curve, and leaves on the settle curve over 350ms. The overlay
            is solid <code>neutral-950</code> faded to 0.5 element opacity, so
            no colour carries alpha. The description measures 7.44:1 against the
            surface.
          </p>
        </>
      }
      related={[
        {
          to: '/components/drawer',
          label: 'Drawer',
          description: 'The edge panel for content that accompanies the page.',
        },
        {
          to: '/components/notice',
          label: 'Notice',
          description: 'Carries a result once the dialog has closed.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Field layout, the actions row, and validation.',
        },
        {
          to: '/components/dropdown-menu',
          label: 'Dropdown menu',
          description: 'A second way to open the same dialog.',
        },
      ]}
    />
  )
}
