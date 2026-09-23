import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { Preview } from '@/components/preview'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import { Input } from '@/registry/ui/input'

export const Route = createFileRoute('/_docs/components/dialog')({
  component: DialogPage,
})

function DialogPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Dialog
        </h1>
        <p className="text-muted-foreground text-lg">
          A modal surface for a task that stops the page: a form, a choice, a
          confirmation. The dialog owns the surface, the scrim, the focus trap,
          the scroll lock, and every exit. The app owns the content, the{' '}
          <code>open</code> state, and the result of the operation, shown inline
          via alert after close.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Parts</h2>
        <p className="text-muted-foreground">
          Nine parts: <code>Dialog</code>, <code>DialogTrigger</code>,{' '}
          <code>DialogContent</code>, <code>DialogTitle</code>,{' '}
          <code>DialogDescription</code>, <code>DialogBody</code>,{' '}
          <code>DialogFooter</code>, <code>DialogClose</code>, and the built-in
          X close button.{' '}
          <strong className="text-foreground">
            There is no <code>DialogHeader</code>
          </strong>{' '}
          — <code>DialogContent</code> stacks title, description, body, and
          footer with a fixed gap; the title-to-description gap is tightened by
          margin on <code>DialogDescription</code>. <code>DialogTitle</code> is
          required and set in Bricolage Grotesque, because a modal that stops
          the page must say what it is. <code>DialogDescription</code> is
          optional. <code>DialogBody</code> is the only scroll region. The X is
          always rendered, positioned top-right, and last in the DOM.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">There is no alert-dialog.</strong>{' '}
          A destructive confirm is a plain <code>Dialog</code> with{' '}
          <code>dismissible={'{false}'}</code> and a destructive button in the
          footer — Radix's <code>AlertDialog</code> adds an announcement mode
          and no keyboard difference, so this system ships one component instead
          of two.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two sizes, both centered and capped to the viewport minus 32px on
          every side. <code>default</code> is 448px, wide enough for a
          confirmation or a short form. <code>lg</code> is 672px, a 1.5 ratio
          that fits a two-column form. There is no bottom sheet.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Scroll and footer</h2>
        <p className="text-muted-foreground">
          <code>DialogBody</code> scrolls while the title and footer stay
          pinned, so a confirm button never scrolls out of reach under a phone
          keyboard. The footer is <code>justify-end gap-2</code> from 640px and
          full-width, column-reversed below it, so the primary action sits under
          the thumb and last in the DOM for the keyboard.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Dismissible and pending
        </h2>
        <p className="text-muted-foreground">
          <code>dismissible={'{false}'}</code> blocks an outside click only,
          permanently — Escape and the X still close. <code>pending</code>{' '}
          blocks Escape, outside click, and the X all at once, disables the X,
          and sets <code>aria-busy</code> on the surface. The dialog shows no
          other busyness of its own; the button inside carries the spinner.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Live example</h2>
        <p className="text-muted-foreground">
          Open the dialog to see the enter and exit motion, the focus trap, and
          the disabled X. Save sets <code>pending</code> on the dialog while the
          button carries its own spinner.
        </p>
        <Preview>
          <ControlledDialogDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          One dialog, many triggers
        </h2>
        <p className="text-muted-foreground">
          An app composes its own <code>TripDialog</code> around{' '}
          <code>Dialog</code> and <code>DialogContent</code>, taking the trigger
          as <code>children</code> and forwarding <code>open</code> and{' '}
          <code>onOpenChange</code> optionally. hottrip reuses one{' '}
          <code>TripDialog</code> behind a toolbar button and a menu item below
          by passing no trigger at all —{' '}
          <strong className="text-foreground">
            the trigger-less controlled form
          </strong>{' '}
          — and driving <code>open</code> from its own state.{' '}
          <strong className="text-foreground">
            Only a real <code>DialogTrigger</code> sets{' '}
            <code>aria-haspopup</code>, <code>aria-expanded</code>, and{' '}
            <code>aria-controls</code> on its Button.
          </strong>{' '}
          A button driving the trigger-less form, like the two below, gets none
          of that wiring — it is a plain button that happens to open a dialog.
        </p>
        <Preview>
          <ReusableTripDialogDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          Enter scales from 0.98 plus a fade over 250ms on the bounce curve;
          exit runs 150ms on the settle curve. The overlay animates opacity
          only, from 0 to 0.5 over a solid <code>neutral-950</code>, so no color
          in the system carries alpha.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The dialog is labelled by its required title and, when present,
          described by <code>DialogDescription</code>. Focus lands inside on
          open — on the first body or footer control, never the X — and returns
          to the trigger on close. Tab cycles inside and ends on the X. Content
          outside an open dialog is hidden from the accessibility tree. Every
          text pair meets WCAG AA — the tightest is the description at 7.44:1
          against its 4.5:1 floor, measured by converting each OKLCH color to
          sRGB and computing the WCAG ratio directly, not estimated.
        </p>
      </section>
    </article>
  )
}

function TripFormFields() {
  return (
    <div className="flex flex-col gap-3">
      <Input label="Destination" placeholder="Lisbon" />
      <Input label="Dates" placeholder="12–19 Oct" />
    </div>
  )
}

function ControlledDialogDemo() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const pendingTimeout = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current)
    }
  }, [])

  function handleSave() {
    setPending(true)
    pendingTimeout.current = setTimeout(() => {
      setPending(false)
      setOpen(false)
    }, 1600)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} pending={pending}>
      <DialogTrigger>
        <Button>Plan a trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Choose a destination and travel dates.
        </DialogDescription>
        <DialogBody>
          <TripFormFields />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button loading={pending} onClick={handleSave}>
            Save trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TripDialog({
  children,
  open,
  defaultOpen,
  onOpenChange,
}: {
  children?: React.ReactElement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children ? <DialogTrigger>{children}</DialogTrigger> : null}
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>
          Choose a destination and travel dates.
        </DialogDescription>
        <DialogBody>
          <TripFormFields />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button>Save trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ReusableTripDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={() => setOpen(true)}>Plan from the toolbar</Button>
      <Button variant={ButtonVariant.Outline} onClick={() => setOpen(true)}>
        Plan from a menu item
      </Button>
      <TripDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
