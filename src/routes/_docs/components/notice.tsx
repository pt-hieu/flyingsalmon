import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  NoticeFrame,
  PropsTable,
} from '@/components/doc-page'
import { DialogServerError } from '@/examples/dialog/server-error'
import dialogServerErrorSource from '@/examples/dialog/server-error.tsx?raw'
import { NoticeDemo } from '@/examples/notice/demo'
import demoSource from '@/examples/notice/demo.tsx?raw'
import { NoticeDismissFromHandle } from '@/examples/notice/dismiss-from-handle'
import dismissFromHandleSource from '@/examples/notice/dismiss-from-handle.tsx?raw'
import { NoticeReplacement } from '@/examples/notice/replacement'
import replacementSource from '@/examples/notice/replacement.tsx?raw'
import usageSource from '@/examples/notice/usage.tsx?raw'
import { NoticeVariants } from '@/examples/notice/variants'
import variantsSource from '@/examples/notice/variants.tsx?raw'

export const Route = createFileRoute('/_docs/components/notice')({
  component: NoticePage,
})

function NoticePage() {
  return (
    <DocPage
      title="Notice"
      lead="The shell’s one persistent surface for a result with no visible home: one at a time, announced without moving focus, and always linked back to its subject."
      preview={{
        source: demoSource,
        demo: (
          <NoticeFrame>
            <NoticeDemo />
          </NoticeFrame>
        ),
      }}
      installation="notice"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Variants"
            description="The four alert variants. The icon carries the variant on a plain white card, and error is the one that interrupts a screen reader. Each preview is a frame of its own, so the card lands inside the panel and not at the top of this page."
            source={variantsSource}
          >
            <NoticeFrame>
              <NoticeVariants />
            </NoticeFrame>
          </Example>

          <Example
            caption="Replacement"
            description="Press both buttons in turn. A second notice swaps the content in place, with no exit and no enter, and the new text is announced again even when it reads the same."
            source={replacementSource}
          >
            <NoticeFrame>
              <NoticeReplacement />
            </NoticeFrame>
          </Example>

          <Example
            caption="Dismissing from the handle"
            description="Save the trip, then open it from the notice. show returns a handle, and the page uses it to take its own notice down once the trip it points at is on screen."
            source={dismissFromHandleSource}
          >
            <NoticeFrame>
              <NoticeDismissFromHandle />
            </NoticeFrame>
          </Example>

          <Example
            caption="After a closed dialog"
            description="A dialog form closes on submit, so a server error has no inline home. Add a place and the planner fails on purpose: the error becomes a notice whose button reopens the form with what you typed."
            source={dialogServerErrorSource}
          >
            <NoticeFrame>
              <DialogServerError />
            </NoticeFrame>
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For the result of a dialog form after it has closed and the item it changed is not on screen.',
          'For a confirm-only action with nothing to update, such as a copied link.',
          'For a result that arrives after the traveller has navigated away from where they acted.',
        ],
        whenNotToUse: [
          {
            situation:
              'when the affected item is on screen. The item appears, updates, or shows a failed state with a retry, and that is the result.',
            alternative: { to: '/principles', label: 'the feedback rule' },
          },
          {
            situation:
              'for the result of a form that is still on screen. It goes in the form’s result slot, below the actions row.',
            alternative: { to: '/components/alert', label: 'Alert' },
          },
          {
            situation:
              'when a region failed to load. The region says so itself, with a retry.',
            alternative: {
              to: '/components/error-state',
              label: 'Error state',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Give every notice a subject: a link to the item it is about, or a button that reopens the dialog with what the traveller typed.',
            reason:
              'A message with no way back to its subject cannot be acted on, and the traveller has to hunt for what it meant.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Mount NoticeProvider once, in the app shell.',
            reason:
              'There is one notice at a time. A second provider would give the page two notices that do not know about each other.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Show a notice about an item the traveller can already see.',
            reason:
              'The item’s own state is the right home. A notice beside it says the same thing in a second place.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Expect it to dismiss itself, stack, or take extra buttons.',
            reason:
              'It has no timer, no queue, and no action row, so a message stays until it is seen. That is what separates it from a toast.',
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
                  'Reaches the subject, then the Dismiss button. The notice sits before your content in the document, so both come before the page, matching where the card appears.',
              },
              {
                keys: ['Enter', 'Space'],
                description:
                  'On the subject, follows the link or runs its button. On Dismiss, closes the notice.',
              },
              {
                keys: ['Escape'],
                description:
                  'Does nothing. The key stays with dialogs and menus.',
              },
            ]}
          />
          <p>
            The provider mounts two visually hidden live regions:{' '}
            <code>role="status"</code> for info, success, and warning, and{' '}
            <code>role="alert"</code> for error. Each <code>show</code> rewrites
            the matching region with the title, description, and subject text,
            so the same words are read again when the same result happens twice.
            Dismissal announces nothing.
          </p>
          <p>
            Focus never moves to the notice: the control the traveller pressed
            keeps it. A route change clears nothing, because the registry knows
            no router. Returning focus after a dismissal is the app’s job.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="NoticeProvider"
            description="Mount it once in the app shell. It renders the live regions, the notice outlet, then your children."
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                description: 'The app. Anything inside can call useNotice.',
              },
            ]}
          />
          <PropsTable
            component="useNotice()"
            description="Returns show and dismiss. It throws outside a NoticeProvider."
            rows={[
              {
                name: 'show',
                type: '(notice: NoticeInput) => NoticeHandle',
                description:
                  'Shows a notice, replacing any that is showing. The handle’s dismiss closes this notice only.',
              },
              {
                name: 'dismiss',
                type: '() => void',
                description: 'Closes whatever is showing, with the App reason.',
              },
            ]}
          />
          <PropsTable
            component="NoticeInput"
            description="The object passed to show."
            rows={[
              {
                name: 'variant',
                type: 'AlertVariant',
                required: true,
                description: 'Info, Success, Warning, or Error.',
              },
              {
                name: 'title',
                type: 'string',
                required: true,
                description: 'What happened.',
              },
              {
                name: 'description',
                type: 'string',
                description: 'One sentence of detail.',
              },
              {
                name: 'subject',
                type: 'ReactElement',
                required: true,
                description:
                  'An anchor or a button the notice places under the description and styles as a link. Put offsetFocusRingGeometry from the interaction lib on it for the focus ring.',
              },
              {
                name: 'onDismiss',
                type: '(reason: NoticeDismissReason) => void',
                description:
                  'Called when the notice goes: User for the Dismiss button, App for dismiss, Replaced when another notice takes over.',
              },
            ]}
          />
        </>
      }
      notes={
        <>
          <p>
            The card is an <code>Alert</code> with{' '}
            <code>role="presentation"</code> and <code>animateOpen</code> off,
            so the icon, title, description, and close button come from alert,
            and the announcement comes only from the provider’s live regions.
          </p>
          <p>
            The card is fixed 16px from the top, centred, at most{' '}
            <code>max-w-md</code> wide, and the viewport width minus 16px on
            each side when narrow. It sits on <code>z-50</code> and overlays the
            header, because a reserved strip would displace content.
          </p>
          <p>
            It enters and leaves on opacity and an 8px vertical travel, on{' '}
            <code>springSettle</code> both ways, through the notice’s own{' '}
            <code>AnimatePresence</code>. Replacement animates nothing: a card
            that re-enters on every new result reads as a stack arriving.
          </p>
          <p>
            The handle from <code>show</code> goes quiet once its notice has
            been replaced, so a stale handle cannot dismiss a newer, unrelated
            notice.
          </p>
          <p>
            The subject is underlined in <code>--card-foreground</code>, 18.25:1
            on the card, which keeps it apart from the description without
            relying on colour. It takes <code>--primary-text</code> on hover and
            press, 5.23:1 on the card.
          </p>
        </>
      }
      related={[
        {
          to: '/components/alert',
          label: 'Alert',
          description:
            'The in-flow message for a result that has a surface on screen.',
        },
        {
          to: '/components/dialog',
          label: 'Dialog',
          description:
            'Closes on submit, which is when a notice carries the error.',
        },
        {
          to: '/components/error-state',
          label: 'Error state',
          description: 'The failed state of a region, with a retry.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'The feedback rule behind where a result appears.',
        },
      ]}
    />
  )
}
