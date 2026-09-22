import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { Preview } from '@/components/preview'
import { Switch } from '@/registry/ui/switch'

export const Route = createFileRoute('/_docs/components/switch')({
  component: SwitchPage,
})

function SwitchPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Switch
        </h1>
        <p className="text-muted-foreground text-lg">
          An instant-apply on/off control that owns its label and its own
          busyness. A switch applies its effect at once; a checkbox collects a
          value for a later submit.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          className styles the wrapper
        </h2>
        <p className="text-muted-foreground">
          Switch renders a wrapper around the control so it can hold the label.{' '}
          <strong className="text-foreground">
            <code>className</code> styles that wrapper, not the track.
          </strong>{' '}
          Every other Radix prop passes through to the control. This matches
          Input and diverges from stock shadcn, which puts{' '}
          <code>className</code> on the track itself.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">On and off</h2>
        <p className="text-muted-foreground">
          One size, no variants. Off is <code>--muted-foreground</code> as the
          track under a <code>--background</code> thumb; on is{' '}
          <code>--indicator</code> under an <code>--indicator-foreground</code>{' '}
          thumb. The thumb clears 3:1 against its track in both states — 7.01:1
          off, 5.08:1 on — so the state is readable without color vision. The
          off track sits at 7.01:1 on the page and the on track at 3.38:1, both
          clearing the 3:1 non-text bar (ADR 0004).
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            The off thumb takes the page color.
          </strong>{' '}
          The on thumb takes <code>--indicator-foreground</code>, neutral-950,
          the color that carries content on every indicator fill. Travel is a
          morph, so the thumb stays one object across the whole journey, and its
          color swaps with the state.
        </p>
        <Preview>
          <Switch label="Wi-Fi" />
          <Switch label="Wi-Fi" defaultChecked />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Instant apply</h2>
        <p className="text-muted-foreground">
          A switch applies at once, so the app owns the call. Control{' '}
          <code>checked</code>, set <code>loading</code> while the call runs,
          and revert <code>checked</code> if it fails. The example below
          confirms first: the thumb stays put until the call returns.
        </p>
        <Preview>
          <ConfirmFirstDemo />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Loading</h2>
        <p className="text-muted-foreground">
          <code>loading</code> pulses the thumb and locks the toggle. Click,
          Space, and Enter are ignored, and a label click is ignored too.{' '}
          <strong className="text-foreground">Focus stays put</strong> — the
          switch never leaves the tab order mid-action. The thumb sits where{' '}
          <code>checked</code> puts it, so you choose optimistic flip or
          confirm-first.
        </p>
        <Preview>
          <Switch label="Wi-Fi" loading />
          <Switch label="Wi-Fi" loading checked />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Disabled</h2>
        <p className="text-muted-foreground">
          Disabled dims the track and the label together and takes no pointer
          events. Use it when the setting cannot be changed at all; use{' '}
          <code>loading</code> when a change is in flight.
        </p>
        <Preview>
          <Switch label="Wi-Fi" disabled />
          <Switch label="Wi-Fi" disabled checked />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Without a label</h2>
        <p className="text-muted-foreground">
          Drop <code>label</code> when a table row or a section heading already
          names the setting. Pass <code>aria-label</code> so the control keeps
          an accessible name.
        </p>
        <Preview>
          <Switch aria-label="Airplane mode" />
          <Switch aria-label="Airplane mode" defaultChecked />
        </Preview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A failed toggle is a result
        </h2>
        <p className="text-muted-foreground">
          There is no <code>error</code> prop. A switch that fails to apply is
          an action result, not a field error, so the app reverts{' '}
          <code>checked</code> and shows the reason where the user is looking,
          on the switch's row or through alert. That is the feedback rule: the
          acting component shows its own busyness, the app shows the outcome,
          and the outcome stays until seen.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The thumb travels on <code>spring-bounce</code> in both directions
          through motion&rsquo;s <code>layout</code> prop — travel is a morph,
          not an exit, so it bounces on the way back too. The track color
          crossfades under it in CSS at <code>--motion-fast</code>, as do the
          hover shade and the focus ring. The loading pulse is a continuous
          animation: the thumb color fades and returns on an 800ms CSS keyframes
          cycle, matched to the spinner&rsquo;s tempo. The thumb never changes
          size, so it never reads as travel.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Switch generates the control <code>id</code> and wires the label{' '}
          <code>htmlFor</code> itself, so clicking the label toggles the
          setting. Tab reaches the control and shows a 3px ring on{' '}
          <code>:focus-visible</code> only. Space and Enter both toggle. A
          loading switch announces <code>aria-disabled</code> rather than{' '}
          <code>aria-busy</code>, which screen readers support poorly, and it
          never sets the <code>disabled</code> attribute, which would drop it
          from the tab order.
        </p>
      </section>
    </article>
  )
}

function ConfirmFirstDemo() {
  const [enabled, setEnabled] = useState(false)
  const [applying, setApplying] = useState(false)
  const applyTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => () => clearTimeout(applyTimeout.current), [])

  function apply(next: boolean) {
    setApplying(true)
    applyTimeout.current = setTimeout(() => {
      setEnabled(next)
      setApplying(false)
    }, 1200)
  }

  return (
    <Switch
      label="Sync over cellular"
      checked={enabled}
      loading={applying}
      onCheckedChange={apply}
    />
  )
}
