import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  NoticeFrame,
  PropsTable,
  docPageHead,
} from '@/components/doc-page'
import { DialogServerError } from '@/examples/dialog/server-error'
import dialogServerErrorSource from '@/examples/dialog/server-error.tsx?raw'
import { NoticeDemo } from '@/examples/notice/demo'
import demoSource from '@/examples/notice/demo.tsx?raw'
import { NoticeDismissFromHandle } from '@/examples/notice/dismiss-from-handle'
import dismissFromHandleSource from '@/examples/notice/dismiss-from-handle.tsx?raw'
import { NoticePlacedInAppShell } from '@/examples/notice/placed-in-app-shell'
import placedInAppShellSource from '@/examples/notice/placed-in-app-shell.tsx?raw'
import { NoticeReplacement } from '@/examples/notice/replacement'
import replacementSource from '@/examples/notice/replacement.tsx?raw'
import usageSource from '@/examples/notice/usage.tsx?raw'
import { NoticeVariants } from '@/examples/notice/variants'
import variantsSource from '@/examples/notice/variants.tsx?raw'
import guidelines from '@/registry/ui/notice/guidelines.md?raw'

const title = 'Notice'

const lead =
  'The shell’s one persistent surface for a result with no visible home: one at a time, announced without moving focus, and always linked back to its subject.'

export const Route = createFileRoute('/_docs/components/notice')({
  head: () => docPageHead(title, lead),
  component: NoticePage,
})

function NoticePage() {
  return (
    <DocPage
      title={title}
      lead={lead}
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
            description="The four alert variants. The icon carries the variant on a plain white card, and error is the one that interrupts a screen reader."
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

          <Example
            caption="Placed in an app shell"
            description={
              <>
                Save the trip. The notice lands below the page header and
                centres on the content beside the sidebar, so the title and
                actions stay in view while it shows. The shell sets{' '}
                <code>--notice-offset-top</code> and{' '}
                <code>--notice-offset-left</code> around the provider, and
                follows the sidebar as it collapses or becomes a strip.
              </>
            }
            source={placedInAppShellSource}
          >
            <NoticeFrame ownsAppShell>
              <NoticePlacedInAppShell />
            </NoticeFrame>
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
            description={
              <>
                Mount it once in the app shell: a second provider would give the
                page two notices that do not know about each other. It renders
                the live regions, the notice outlet, then your children. To keep
                the notice clear of your shell, set{' '}
                <code>--notice-offset-top</code> to the height of what stays
                above the content, such as a page header, and{' '}
                <code>--notice-offset-left</code> or{' '}
                <code>--notice-offset-right</code> to the width of a sidebar or
                panel, on any element around the provider. Each defaults to
                zero, the edge of the viewport. A shell with a sidebar maps the
                sidebar’s layout and its page header’s height onto these
                offsets, so the notice follows the sidebar as it collapses or
                becomes a strip.
              </>
            }
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
                type: 'NoticeSubject',
                required: true,
                description:
                  'A bare anchor or button. The notice places it under the description and styles it as a link with its focus ring.',
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
            The card is fixed 16px below <code>--notice-offset-top</code>,
            centred between <code>--notice-offset-left</code> and{' '}
            <code>--notice-offset-right</code> with 16px inside each, and at
            most <code>max-w-md</code> wide. With no offsets set it sits 16px
            from the top of the viewport and centres on it. It sits on{' '}
            <code>z-50</code> and overlays whatever scrolls beneath it, because
            a reserved strip would displace content.
          </p>
          <p>
            Custom properties inherit, so the offsets work from any element
            around <code>NoticeProvider</code>, including a{' '}
            <code>display: contents</code> wrapper inside the sidebar shell that
            reads the sidebar’s layout.
          </p>
          <p>
            A fixed top offset such as <code>var(--bar-height)</code> assumes a
            one-row page header. A header whose title or actions wrap is taller,
            so a shell with one measures the header’s height and sets{' '}
            <code>--notice-offset-top</code> from it.
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
