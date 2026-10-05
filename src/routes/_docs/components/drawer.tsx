import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { DrawerDemo } from '@/examples/drawer/demo'
import demoSource from '@/examples/drawer/demo.tsx?raw'
import { DrawerEditOnSubmit } from '@/examples/drawer/edit-on-submit'
import editOnSubmitSource from '@/examples/drawer/edit-on-submit.tsx?raw'
import { DrawerFitContent } from '@/examples/drawer/fit-content'
import fitContentSource from '@/examples/drawer/fit-content.tsx?raw'
import { DrawerNonDismissible } from '@/examples/drawer/non-dismissible'
import nonDismissibleSource from '@/examples/drawer/non-dismissible.tsx?raw'
import { DrawerPending } from '@/examples/drawer/pending'
import pendingSource from '@/examples/drawer/pending.tsx?raw'
import { DrawerRowDetail } from '@/examples/drawer/row-detail'
import rowDetailSource from '@/examples/drawer/row-detail.tsx?raw'
import usageSource from '@/examples/drawer/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/drawer')({
  component: DrawerPage,
})

function DrawerPage() {
  return (
    <DocPage
      title="Drawer"
      lead="A modal panel at the right edge for content that accompanies the page: filters for a list, the detail of a selected row."
      preview={{ source: demoSource, demo: <DrawerDemo /> }}
      installation="drawer"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="The detail of a selected row"
            description={
              <>
                One drawer serves every row. The app holds the selected row and
                drives <code>open</code>, so there is no{' '}
                <code>DrawerTrigger</code>: the buttons in the table are plain
                buttons that happen to open it.
              </>
            }
            source={rowDetailSource}
          >
            <DrawerRowDetail />
          </Example>

          <Example
            caption="Closing on submit"
            description="Save closes the panel and the trip card shows the new name and dates. The card is where the traveller was already looking, so it carries the result."
            source={editOnSubmitSource}
          >
            <DrawerEditOnSubmit />
          </Example>

          <Example
            caption="Fit to content"
            description={
              <>
                <code>fitContent</code> grows the panel to the width of a table.
                Remove it and the same table scrolls inside the standard panel.
              </>
            }
            source={fitContentSource}
          >
            <DrawerFitContent />
          </Example>

          <Example
            caption="A form that survives a stray click"
            description={
              <>
                <code>dismissible={'{false}'}</code> ignores a click on the page
                beside the panel. Escape and the close button still work.
              </>
            }
            source={nonDismissibleSource}
          >
            <DrawerNonDismissible />
          </Example>

          <Example
            caption="Waiting inside the drawer"
            description={
              <>
                <code>pending</code> holds every exit while the address is
                looked up, because the answer decides what happens next. A wrong
                address keeps the panel open with the error on the field.
              </>
            }
            source={pendingSource}
          >
            <DrawerPending />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For filters on a list, so the list stays in view and changes while the traveller adjusts them.',
          'For the detail of one selected row, with the table still beside it.',
          'For a short edit form where the item being edited should stay visible.',
        ],
        whenNotToUse: [
          {
            situation:
              'to confirm an action or stop the page for a decision. A dialog sits in the centre and the page behind it stops mattering.',
            alternative: { to: '/components/dialog', label: 'Dialog' },
          },
          {
            situation:
              'to move between sections of the app. Navigation belongs to the sidebar at every width, including the strip it collapses to on a narrow screen.',
            alternative: { to: '/components/sidebar', label: 'Sidebar' },
          },
          {
            situation:
              'to show the result of an action. A result needs only to be seen, not answered.',
            alternative: { to: '/components/notice', label: 'Notice' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Pick a drawer when the traveller benefits from seeing the page while the panel is open.',
            reason:
              'A drawer accompanies the page and a dialog interrupts it. If nothing behind the panel matters, use a dialog.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Close a form drawer on submit and show the result on the item that changed.',
            reason:
              'The item is still on screen beside the panel, so the updated trip is the clearest confirmation.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put the destructive confirmation of a trip in a drawer.',
            reason:
              'A confirmation demands a decision, and a drawer invites the traveller to keep working on the page behind it.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Set pending to wait for a save.',
            reason:
              'Pending blocks every exit. Keep it for an answer the next step depends on, such as looking up an invite.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give a body that should widen the panel its own width.',
            reason:
              'Loose prose has no widest layout other than one long line, so it pushes a fit-content panel straight to its cap.',
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
                  'On the trigger, opens the drawer and moves focus to its first control.',
              },
              {
                keys: ['Tab', 'Shift+Tab'],
                description:
                  'Cycles through the controls inside the drawer. The close button comes last.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the drawer and returns focus to the trigger. Does nothing while the drawer is pending.',
              },
            ]}
          />
          <p>
            The drawer is a modal dialog. It is labelled by its required title
            and described by <code>DrawerDescription</code> when there is one,
            and it sets <code>aria-busy</code> while pending. Focus lands on the
            first body or footer control, never the close button, and returns to
            the trigger on close. Everything outside an open drawer is hidden
            from assistive technology.
          </p>
          <p>
            A drawer opened from your own state has no{' '}
            <code>DrawerTrigger</code>, so the button that opens it is a plain
            button without <code>aria-expanded</code>.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Drawer"
            description="The root. It takes the dialog root's props except size, so every prop means what it means on a dialog."
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
                description: 'Called when the drawer opens or closes.',
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
                  'Blocks Escape, a click outside, and the close button, disables the close button, and sets aria-busy.',
              },
            ]}
          />
          <PropsTable
            component="DrawerContent"
            description="The panel. Renders the scrim and the close button for you."
            rows={[
              {
                name: 'fitContent',
                type: 'boolean',
                default: 'false',
                description:
                  'Grows the panel to the width of its body, between the standard width and the viewport.',
              },
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
            <code>DrawerTrigger</code> and <code>DrawerClose</code> take one
            element, usually a Button. <code>DrawerTitle</code> is required.{' '}
            <code>DrawerDescription</code>, <code>DrawerBody</code>, and{' '}
            <code>DrawerFooter</code> are optional and take the props of the
            element they render. <code>DrawerBody</code> is the only part that
            scrolls.
          </p>
        </>
      }
      notes={
        <>
          <p>
            Every part except <code>DrawerContent</code> is the dialog part
            re-exported under a drawer name, so a drawer composes exactly as a
            dialog does. There is no <code>side</code> prop and no size prop:
            the edge is the right edge and the width is one number.
          </p>
          <p>
            The panel is inset 8px from the top, the bottom, and the right, with
            a full border, the <code>rounded-xl</code> radius, and the popover
            surface a dialog paints, so it reads as a surface on the page rather
            than the page&rsquo;s edge. It is 448px wide, capped at the viewport
            minus 16px, which fills a phone screen without a separate phone
            layout.
          </p>
          <p>
            <code>fitContent</code> never shrinks the panel below 448px or grows
            it past the viewport cap. The title and description never drive the
            width; they wrap inside whatever the body sets.
          </p>
          <p>
            The close button is always rendered, top right and last in the DOM.
            On a narrow screen the panel covers almost everything and there is
            little scrim left to click. The footer is the dialog footer: a
            right-aligned row with an 8px gap from 640px, a full-width reversed
            column below it, with the primary action last in the DOM for the
            keyboard.
          </p>
          <p>
            The panel travels 24px from the right with a fade, 250ms on the
            bounce curve in and 350ms on the settle curve out. It does not slide
            in from off screen: the bounce overshoots by 4%, which over a full
            448px travel would be 18px past the resting position and visibly
            widen the 8px inset, and over 24px is about 1px. The scrim is solid{' '}
            <code>neutral-950</code> faded to 0.5 element opacity, so no colour
            carries alpha. The surface, text, and border are the dialog&rsquo;s
            colours and add no pair of their own.
          </p>
        </>
      }
      related={[
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'The centred modal for a decision that stops the page.',
        },
        {
          to: '/components/sidebar',
          label: 'Sidebar',
          description: 'Where app navigation lives.',
        },
        {
          to: '/components/table',
          label: 'Table',
          description: 'The rows whose detail a drawer often shows.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'The focus and contrast rules every component follows.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The springs the panel enters and leaves on.',
        },
      ]}
    />
  )
}
