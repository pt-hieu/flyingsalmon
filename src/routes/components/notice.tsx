import { Link, createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/registry/ui/dialog'
import { Input } from '@/registry/ui/input'
import { NoticeProvider, useNotice } from '@/registry/ui/notice'
import type { NoticeHandle, NoticeInput } from '@/registry/ui/notice'

export const Route = createFileRoute('/components/notice')({
  component: NoticePage,
})

const subjectFocusClassName = cn(
  offsetFocusRingGeometry,
  'ring-ring focus-visible:ring-offset-card rounded-sm',
)

function NoticePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Notice
        </h1>
        <p className="text-muted-foreground text-lg">
          The shell's one persistent surface for a result with no visible home:
          after navigation, from a closed dialog form, for a confirm-only action
          such as a copied link. One notice at a time, fixed top-centre, staying
          until the user dismisses it or the app replaces it, announced without
          moving focus, and always linked back to its subject.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Where a result belongs
        </h2>
        <p className="text-muted-foreground">
          Feedback appears where the user's attention already is and stays until
          they have seen it (ADR 0008). Homes for a result, in order: the{' '}
          <strong className="text-foreground">affected item</strong>, which
          appears, updates, or shows a failed state with a retry; the{' '}
          <strong className="text-foreground">acting surface</strong>, meaning
          the form's result slot below its actions row; and the{' '}
          <strong className="text-foreground">notice</strong>, last, only when
          neither is on screen. A notice about an item the user can see is a bug
          — the item state is the right home.
        </p>
        <p className="text-muted-foreground">
          This is not a toast. Nothing auto-dismisses, nothing stacks, there is
          no action row, and every notice carries a link back to its subject.
          There is no <code>size</code>, no <code>children</code>, and no timer
          to configure, because those are the properties the ban is written
          against. An anchored mode, positioned against the trigger that
          produced the result, is deferred until a screen needs one (#145);
          today every notice is fixed top-centre.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Two exports. <code>NoticeProvider</code> is mounted once in the app
          shell: it renders the two live regions, then the notice outlet, then
          your children, and holds the single notice. <code>useNotice()</code>{' '}
          hands back <code>show</code>, which takes a variant, a title, an
          optional description, a required subject element, and an optional{' '}
          <code>onDismiss</code>, and a bare <code>dismiss</code> that closes
          whatever is showing with the <code>app</code> reason. It throws
          outside a provider.
        </p>
        <p className="text-muted-foreground">
          The card is an <code>Alert</code> at <code>role="presentation"</code>,
          so the variant icon, the title, the description, and the close button
          all come from alert and the announcement comes only from the
          provider's regions.{' '}
          <strong className="text-foreground">
            The subject is yours: an anchor or a button
          </strong>{' '}
          — a router <code>Link</code>, or a button that reopens the dialog with
          the data the user submitted. The registry places it under the
          description and paints the link styling; you keep the focus ring, so
          put <code>offsetFocusRingGeometry</code> from the{' '}
          <code>interaction</code> lib on it. Anything that is neither an anchor
          nor a button nor a component of its own fails in development.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Variants</h2>
        <p className="text-muted-foreground">
          The four alert variants, unchanged: <code>info</code>,{' '}
          <code>success</code>, <code>warning</code>, and <code>error</code>.
          The icon carries the variant on a neutral card, and <code>error</code>{' '}
          is the one that interrupts a screen reader. Each preview below is a
          frame of its own, so the card lands inside the panel instead of at the
          top of this page.
        </p>
        <ModePreview>
          <NoticeFrame>
            <VariantExamples />
          </NoticeFrame>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Replacement</h2>
        <p className="text-muted-foreground">
          One notice at a time. A second <code>show</code> swaps the content in
          place — no exit, no enter, no movement — and calls the previous
          notice's <code>onDismiss</code> with the <code>replaced</code> reason,
          so the app that owned it knows it is gone. The new text is announced
          again even when it reads the same as the old.
        </p>
        <ModePreview>
          <NoticeFrame>
            <ReplacementExample />
          </NoticeFrame>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Dismissing from the handle
        </h2>
        <p className="text-muted-foreground">
          <code>show</code> returns a handle with one method,{' '}
          <code>dismiss</code>, so a page can take its own notice down once it
          renders the subject the notice points at. The handle goes quiet as
          soon as that notice has been replaced:{' '}
          <strong className="text-foreground">
            a stale handle cannot kill a newer, unrelated notice
          </strong>
          . Dismissing from the handle reports the <code>app</code> reason;
          dismissing from the close button reports <code>user</code>.
        </p>
        <ModePreview>
          <NoticeFrame>
            <SubjectOnScreenExample />
          </NoticeFrame>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A result after a closed dialog
        </h2>
        <p className="text-muted-foreground">
          A dialog form closes on submit and leaves its result slot empty, so a
          server error has nowhere inline to land. It becomes a notice whose
          subject reopens the dialog with the data the user typed, which is the
          case ADR 0008 was written around. Save the trip below and the planner
          fails on purpose.
        </p>
        <ModePreview>
          <NoticeFrame>
            <ClosedDialogExample />
          </NoticeFrame>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Placement and motion
        </h2>
        <p className="text-muted-foreground">
          The card is fixed 16px from the top, centred, at most{' '}
          <code>max-w-md</code> wide, and full width minus 16px each side on a
          narrow viewport. It sits on <code>z-50</code>, the floating layer, and
          overlays the header: a reserved strip would displace content, which
          ADR 0008 bans.{' '}
          <strong className="text-foreground">
            It enters and leaves on opacity and an 8px vertical travel,{' '}
            <code>spring-settle</code> both ways
          </strong>{' '}
          through the notice's own <code>AnimatePresence</code>, so nothing the
          app renders has to know about motion. The card is an{' '}
          <code>Alert</code> with <code>animateOpen</code> off, so alert's own
          height animation stays out of the way and the travel is the only thing
          moving. Replacement animates nothing, because a card that re-enters on
          every new result reads as a stack arriving.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The provider mounts two empty visually hidden live regions before your
          content: <code>role="status"</code> for <code>info</code>,{' '}
          <code>success</code>, and <code>warning</code>, and{' '}
          <code>role="alert"</code> for <code>error</code>. On every{' '}
          <code>show</code> the matching region is emptied and written on the
          next frame with the title, the description, and the subject's text, so
          the same words are read again when the same result happens twice.
          Dismissal announces nothing.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Focus never moves</strong> to the
          notice: the button the user pressed keeps it. Because the outlet sits
          before your children in the DOM, Tab reaches the subject and then the
          dismiss button before page content, which matches where the card
          visually sits. Escape does nothing — that key stays with dialogs — and
          a route change clears nothing, because the registry knows no router.
          Focus return after a dismissal is the app's job, as it is with alert.
        </p>
        <p className="text-muted-foreground">
          Colour comes from alert, so the icon, the title, and the description
          carry the ratios measured on that page. The subject is underlined in{' '}
          <code>--card-foreground</code>, 18.3:1 light and 15.5:1 dark, which
          keeps it apart from the description without relying on colour, and
          takes <code>--indicator</code> on hover and press: 4.7:1 light and
          5.1:1 dark on the card, the accordion trigger's hover colour rather
          than <code>--primary</code>, which would not clear AA for text.
        </p>
      </section>
    </article>
  )
}

function NoticeFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full transform-gpu">
      <NoticeProvider>
        <div className="flex flex-col items-center gap-3 pt-44">{children}</div>
      </NoticeProvider>
    </div>
  )
}

function ShowNoticeButton({
  label,
  variant = ButtonVariant.Outline,
  notice,
}: {
  label: string
  variant?: ButtonVariant
  notice: NoticeInput
}) {
  const { show } = useNotice()

  return (
    <Button
      variant={variant}
      size={ButtonSize.Small}
      onClick={() => show(notice)}
    >
      {label}
    </Button>
  )
}

const tripLink = (
  <Link to="/components/notice" className={subjectFocusClassName}>
    View the trip
  </Link>
)

function VariantExamples() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <ShowNoticeButton
        label="Info"
        notice={{
          variant: AlertVariant.Info,
          title: 'Link copied',
          description: 'Anyone with the link can open this trip.',
          subject: tripLink,
        }}
      />

      <ShowNoticeButton
        label="Success"
        notice={{
          variant: AlertVariant.Success,
          title: 'Trip saved',
          description: 'Six days in Da Nang, ready to share.',
          subject: tripLink,
        }}
      />

      <ShowNoticeButton
        label="Warning"
        notice={{
          variant: AlertVariant.Warning,
          title: 'Two credits left',
          description: 'Planning another trip uses your last one.',
          subject: tripLink,
        }}
      />

      <ShowNoticeButton
        label="Error"
        notice={{
          variant: AlertVariant.Error,
          title: 'The trip could not be saved',
          description: 'Our planner did not answer.',
          subject: tripLink,
        }}
      />
    </div>
  )
}

function ReplacementExample() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <ShowNoticeButton
        label="Save the trip"
        notice={{
          variant: AlertVariant.Success,
          title: 'Trip saved',
          description: 'Six days in Da Nang, ready to share.',
          subject: tripLink,
        }}
      />

      <ShowNoticeButton
        label="Pay for the trip"
        notice={{
          variant: AlertVariant.Error,
          title: 'The payment failed',
          description: 'Your card was declined.',
          subject: tripLink,
        }}
      />
    </div>
  )
}

function SubjectOnScreenExample() {
  const { show } = useNotice()
  const noticeHandle = useRef<NoticeHandle | null>(null)
  const [tripVisible, setTripVisible] = useState(false)

  const openTheTrip = () => {
    setTripVisible(true)
    noticeHandle.current?.dismiss()
  }

  const saveTheTrip = () => {
    setTripVisible(false)
    noticeHandle.current = show({
      variant: AlertVariant.Success,
      title: 'Trip saved',
      description: 'Six days in Da Nang, ready to share.',
      subject: (
        <button
          type="button"
          onClick={openTheTrip}
          className={subjectFocusClassName}
        >
          Open the trip
        </button>
      ),
    })
  }

  return (
    <>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={saveTheTrip}
      >
        Save the trip
      </Button>

      {tripVisible ? (
        <p className="border-border bg-card text-card-foreground rounded-lg border px-4 py-3 text-sm">
          Da Nang, six days
        </p>
      ) : null}
    </>
  )
}

function ClosedDialogExample() {
  const { show } = useNotice()
  const [formOpen, setFormOpen] = useState(false)
  const [destination, setDestination] = useState('Da Nang')

  const saveTheTrip = () => {
    setFormOpen(false)
    show({
      variant: AlertVariant.Error,
      title: 'The trip could not be saved',
      description: `Our planner did not answer. Your ${destination} details are kept.`,
      subject: (
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className={subjectFocusClassName}
        >
          Reopen the form
        </button>
      ),
    })
  }

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={() => setFormOpen(true)}
      >
        Plan a trip
      </Button>

      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>Where are you going?</DialogDescription>
        <DialogBody>
          <Input
            aria-label="Destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button onClick={saveTheTrip}>Save trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
