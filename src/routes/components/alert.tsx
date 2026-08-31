import { createFileRoute } from '@tanstack/react-router'
import { PartyPopper } from 'lucide-react'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'
import { Button } from '@/registry/ui/button'

export const Route = createFileRoute('/components/alert')({
  component: AlertPage,
})

function AlertPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Alert
        </h1>
        <p className="text-muted-foreground text-lg">
          The app's inline vehicle for the result of an action. The app places
          it in the layout and owns its lifecycle. Inline only, never floating —
          toast stays banned.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Variants</h2>
        <p className="text-muted-foreground">
          Four variants on soft tints: <code>info</code> is the default, then{' '}
          <code>success</code>, <code>warning</code>, and <code>error</code>.
          Every variant is a tinted background, a colored border, and colored
          text — no solid fill and no shadow. Each brings its own lucide icon.
        </p>
        <ModePreview>
          <div className="flex w-72 flex-col gap-3">
            <Alert>Saved as a draft</Alert>
            <Alert variant="success">Trip saved</Alert>
            <Alert variant="warning">Two seats left at this price</Alert>
            <Alert variant="error">The payment failed</Alert>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          <code>default</code> takes 16px padding and a 20px icon;{' '}
          <code>sm</code> takes 12px padding and a 16px icon.{' '}
          <strong className="text-foreground">
            The text is <code>text-sm</code> in both.
          </strong>{' '}
          A message surface does not shrink its type. The close button is{' '}
          <code>icon-sm</code> in both.
        </p>
        <ModePreview>
          <div className="flex w-72 flex-col gap-3">
            <Alert variant="success">Trip saved</Alert>
            <Alert variant="success" size="sm">
              Trip saved
            </Alert>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Title and description
        </h2>
        <p className="text-muted-foreground">
          <code>AlertTitle</code> is optional — "Saved." alone is legal. The
          title uses Onest at medium weight, not Baloo 2, because an alert is a
          message and not a heading. The status icon aligns with the first line
          of text.
        </p>
        <ModePreview>
          <div className="flex w-72 flex-col gap-3">
            <Alert variant="success">
              <AlertTitle>Trip saved</AlertTitle>
              <AlertDescription>
                Six days in Da Nang, ready to share.
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>The payment failed</AlertTitle>
              <AlertDescription>
                Your card was declined. Try another card.
              </AlertDescription>
            </Alert>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Icon</h2>
        <p className="text-muted-foreground">
          Pass <code>icon</code> to replace the variant icon, or{' '}
          <code>icon={'{null}'}</code> to drop it. The alert owns the icon size
          and the gap, so any node you pass lands at the size of the current
          alert size.
        </p>
        <ModePreview>
          <div className="flex w-72 flex-col gap-3">
            <Alert variant="success" icon={<PartyPopper />}>
              Trip saved
            </Alert>
            <Alert variant="success" icon={null}>
              Trip saved
            </Alert>
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Dismissing</h2>
        <p className="text-muted-foreground">
          Pass <code>onClose</code> and the alert renders a ghost icon button
          labelled "Dismiss".{' '}
          <strong className="text-foreground">
            The alert never hides itself.
          </strong>{' '}
          It calls <code>onClose</code> and the app decides what happens — set{' '}
          <code>open</code> to <code>false</code>, drop the alert, or retry the
          action first. Without <code>onClose</code> there is no close button
          and no tab stop.
        </p>
        <ModePreview>
          <DismissDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          <code>open</code> defaults to <code>true</code> and drives the one
          animation: height and opacity, <code>spring-bounce</code> in and{' '}
          <code>spring-settle</code> out, both at <code>--motion-base</code>.
          The alert carries its own <code>AnimatePresence</code>, so the app
          needs no motion boilerplate to get the exit.{' '}
          <strong className="text-foreground">
            Unmounting <code>&lt;Alert&gt;</code> directly skips the exit
          </strong>{' '}
          — <code>AnimatePresence</code> cannot animate its own unmount. That is
          the documented trade for the boilerplate you save.
        </p>
        <ModePreview>
          <OpenToggleDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          <code>error</code> renders <code>role="alert"</code>, so a screen
          reader interrupts with it; the other three render{' '}
          <code>role="status"</code> and wait their turn. Pass <code>role</code>{' '}
          yourself to override the mapping. The status icon is{' '}
          <code>aria-hidden</code>, so the message is announced once.{' '}
          <strong className="text-foreground">
            Focus return after a dismissal is the app's job.
          </strong>{' '}
          The alert does no focus management: when you remove an alert whose
          close button holds focus, send focus back to the control that produced
          the alert. Every variant meets WCAG AA for text in both modes, and the
          close button's focus ring clears 3:1 on all four tints.
        </p>
      </section>
    </article>
  )
}

function DismissDemo() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant="success" open={open} onClose={() => setOpen(false)}>
        <AlertTitle>Trip saved</AlertTitle>
        <AlertDescription>
          Six days in Da Nang, ready to share.
        </AlertDescription>
      </Alert>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Save again
      </Button>
    </div>
  )
}

function OpenToggleDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant="error" open={open}>
        <AlertTitle>The payment failed</AlertTitle>
        <AlertDescription>Your card was declined.</AlertDescription>
      </Alert>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {open ? 'Close the alert' : 'Open the alert'}
      </Button>
    </div>
  )
}
