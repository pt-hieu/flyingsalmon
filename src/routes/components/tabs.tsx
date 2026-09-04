import { createFileRoute } from '@tanstack/react-router'

import { ModePreview } from '@/components/mode-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export const Route = createFileRoute('/components/tabs')({
  component: TabsPage,
})

function TabsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground text-lg">
          An in-page switcher between co-equal panels. Tabs owns the switch; the
          app owns the content. It is not navigation, and it is not a segmented
          control &mdash; a labelled switch covers two co-equal options, and
          select covers three or more with no panels.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          One variant, one size
        </h2>
        <p className="text-muted-foreground">
          Underline only, horizontal only, one size matching button{' '}
          <code>default</code>. Four exports &mdash; <code>Tabs</code>,{' '}
          <code>TabsList</code>, <code>TabsTrigger</code>,{' '}
          <code>TabsContent</code> &mdash; and every prop is a Radix
          pass-through: no <code>variant</code>, no <code>size</code>, no{' '}
          <code>orientation</code>. The sliding indicator lives inside{' '}
          <code>TabsTrigger</code> itself, never exported, so a consumer can
          never place it wrong.
        </p>
        <ModePreview>
          <Tabs defaultValue="account" className="w-full max-w-xs">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Billing
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              className="text-muted-foreground pt-4 text-sm"
            >
              Update your name and email.
            </TabsContent>
            <TabsContent
              value="password"
              className="text-muted-foreground pt-4 text-sm"
            >
              Change your password.
            </TabsContent>
          </Tabs>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Automatic activation
        </h2>
        <p className="text-muted-foreground">
          The default. Tab lands on the active trigger; Left and Right move
          focus and select at once. Safe because panels are local content that
          does not fetch on mount. Try it: focus the list below and use the
          arrow keys.
        </p>
        <ModePreview>
          <AutomaticExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Manual activation</h2>
        <p className="text-muted-foreground">
          Pass <code>activationMode=&quot;manual&quot;</code> when a panel is
          expensive to mount. Arrow keys move focus without selecting; Enter or
          Space selects the focused trigger. While focus and selection differ, a
          1px <code>--ring</code> bar appears under the focused trigger &mdash;
          the only case where it shows. Try it: focus the list, arrow to a
          different trigger, and note the thin bar before pressing Enter.
        </p>
        <ModePreview>
          <ManualExample />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">States and disabled</h2>
        <p className="text-muted-foreground">
          Inactive labels are <code>--muted-foreground</code>; active labels are{' '}
          <code>--foreground</code> under the 2px <code>--primary</code> bar.
          Hover steps an inactive label to <code>--foreground</code> in CSS at{' '}
          <code>--motion-fast</code>, with no fill and no border change &mdash;
          a click moves the indicator immediately, so a press ring would fire
          and be overtaken by the slide, and there is none. A disabled trigger
          dims to half opacity, takes no pointer events, and is skipped by the
          arrow keys, shown above as &ldquo;Billing&rdquo;.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Panel mounting</h2>
        <p className="text-muted-foreground">
          Panels unmount by default when inactive. Pass <code>forceMount</code>{' '}
          per panel to keep one panel&rsquo;s state &mdash; scroll position, a
          half-typed field &mdash; alive across a switch; a force-mounted
          inactive panel is hidden from the accessibility tree and the tab order
          rather than removed from the DOM.{' '}
          <strong className="text-foreground">
            The default costs that state on every switch
          </strong>{' '}
          &mdash; the consumer hoists it or sets <code>forceMount</code> for the
          panels that need it.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The active indicator is one shared <code>motion.span</code> with a{' '}
          <code>layoutId</code>, rendered only inside the active trigger and
          animated with <code>layout</code> on <code>spring-bounce</code>. The
          focus bar is a second, independent <code>layoutId</code> group on the
          same preset, so the two never interfere. The label color crossfades
          separately in CSS at <code>--motion-fast</code>. Panels carry no
          animation at all &mdash; automatic activation can replay a switch on
          every arrow key across a long tab set, and animating that would read
          as flicker.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          Tabs shows focus with no ring &mdash; its own state indicator moves
          with focus instead. Under automatic activation, focus and selection
          always coincide, so the moving 2px primary bar is the focus feedback;
          under manual activation, the 1px ring bar is the only cue. Measured
          with a real OKLCH-to-sRGB contrast check: the light inactive label is
          4.73:1, the light active bar 6.44:1, and the light focus bar 4.58:1;
          the dark inactive label is 7.63:1, the dark active bar 6.34:1, and the
          dark focus bar 4.32:1 &mdash; every pair clears WCAG AA (4.5:1 text,
          3:1 non-text) in both modes with no fallback needed.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Home and End move focus to the first and last trigger.
          </strong>{' '}
          Confirmed at build against Radix&rsquo;s roving focus group and pinned
          by a test &mdash; this was an open question in the resolved spec.
        </p>
      </section>
    </article>
  )
}

function AutomaticExample() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        A summary of the trip: dates, destination, and travellers.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground pt-4 text-sm"
      >
        A log of every change made to the itinerary.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-muted-foreground pt-4 text-sm"
      >
        Notification and sharing preferences for this trip.
      </TabsContent>
    </Tabs>
  )
}

function ManualExample() {
  return (
    <Tabs
      defaultValue="overview"
      activationMode="manual"
      className="w-full max-w-sm"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        A summary of the trip: dates, destination, and travellers.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground pt-4 text-sm"
      >
        A log of every change made to the itinerary.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-muted-foreground pt-4 text-sm"
      >
        Notification and sharing preferences for this trip.
      </TabsContent>
    </Tabs>
  )
}
