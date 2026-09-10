import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarDays,
  Compass,
  MapPinned,
  PanelLeft,
  Receipt,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarLayout,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

export const Route = createFileRoute('/components/sidebar')({
  component: SidebarPage,
})

function SidebarPage() {
  return (
    <article className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Sidebar
        </h1>
        <p className="text-muted-foreground text-lg">
          An <code>aside</code> with header, content, and footer slots that
          morphs between an expanded column and an icon rail, and becomes one
          sticky horizontal strip under a 700px container. The app&apos;s top
          bar and its sidebar are the same component.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Three layouts</h2>
        <p className="text-muted-foreground">
          <code>SidebarProvider</code> is the container. It holds the collapsed
          state, declares the <code>@container</code> the layout is measured
          against, and watches that same element with a{' '}
          <code>ResizeObserver</code>.{' '}
          <strong className="text-foreground">
            One <code>collapsed</code> boolean and one 700px threshold resolve
            all three layouts.
          </strong>{' '}
          Expanded is the full column, rail is the icon column a collapse
          produces, and strip is forced under the threshold whatever{' '}
          <code>collapsed</code> says. CSS paints the three;{' '}
          <code>useSidebar().layout</code> reports which one is live so a
          consumer&apos;s header, footer, or rail content can follow without
          re-deriving the query. The observer reads{' '}
          <code>sidebarStripThreshold</code>; the container query spells the
          same number as <code>@min-[700px]:</code>, because Tailwind scans
          class names as literals and cannot read a JavaScript constant.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">App nav</h2>
        <p className="text-muted-foreground">
          The whole app shell: header with the trip name and the trigger, nav
          groups in the scrolling content, and a footer holding the avatar menu
          and the theme toggle. Collapse it and the column morphs to the rail —
          labels fade out, group labels fade to nothing but keep their space so
          the groups below them do not jump, and each label reappears in a
          tooltip on hover and on focus.{' '}
          <strong className="text-foreground">
            The accessible name never depends on that tooltip:
          </strong>{' '}
          the label stays in the DOM, clipped rather than removed, so a screen
          reader reads the same nav in either layout. The rail tooltip needs a
          string label; an item whose children are markup keeps its own visible
          text in the rail instead.
        </p>
        <ModePreview stacked>
          <div className="w-full overflow-x-auto">
            <AppNavExample />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">A second rail</h2>
        <p className="text-muted-foreground">
          Nothing about the component is navigation. A day-detail rail puts
          plain content in <code>SidebarContent</code> and its own trigger in
          the header, and collapses the same way.{' '}
          <strong className="text-foreground">
            This is why the threshold is a container query and not a media query
          </strong>{' '}
          — a rail nested inside a pane has no relationship to the viewport, and
          the pane it lives in is what decides whether it still fits.
        </p>
        <ModePreview stacked>
          <div className="w-full overflow-x-auto">
            <DayDetailExample />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">The strip</h2>
        <p className="text-muted-foreground">
          Under 700px the aside becomes one sticky <code>top-0</code> row with{' '}
          <code>border-b</code> in place of <code>border-r</code>: header
          content leads, the nav scrolls horizontally with its groups flattened,
          and footer content trails. The trigger is gone, because there is
          nothing left to collapse.{' '}
          <strong className="text-foreground">
            That is the whole of the app&apos;s top bar
          </strong>{' '}
          — the registry ships no separate header component (#128). The preview
          below is 420px wide, so the same markup as the app nav demo renders as
          the strip.
        </p>
        <ModePreview stacked>
          <div className="w-full">
            <StripExample />
          </div>
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Items and the bar</h2>
        <p className="text-muted-foreground">
          <code>SidebarItem</code> takes an <code>icon</code> slot and its label
          as children, and reads active from{' '}
          <code>aria-current=&quot;page&quot;</code> — on the item or on the
          element <code>asChild</code> renders, so a router link that already
          sets it needs nothing else. Idle is <code>--muted-foreground</code> at
          36px, hover steps the background to <code>--accent</code>, and active
          is <code>--foreground</code> in medium with its icon and a 2px bar
          both in <code>--indicator</code>, the bar on the leading edge and on
          the bottom edge in the strip.{' '}
          <strong className="text-foreground">
            The bar is one shared <code>motion.span</code> that slides between
            items on <code>spring-bounce</code>, so the sidebar has to stay
            mounted across routes for the slide to happen.
          </strong>{' '}
          Put it in a persistent layout route. A sidebar that remounts on every
          navigation is not wrong — it just draws the bar in place instead of
          moving it there. Items square off against the edges — no radius — and{' '}
          <code>SidebarContent</code> scrolls without a scrollbar, nudging the
          active item fully into view when it sits half outside the visible
          area, down the column or across the strip.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Widths and tokens</h2>
        <p className="text-muted-foreground">
          <code>--sidebar-width</code> is 18.125rem and{' '}
          <code>--sidebar-width-rail</code> is 3.5rem, both set on the root and
          overridable through <code>className</code> rather than through props.
          The component adds no tokens of its own: it paints{' '}
          <code>--background</code>, <code>--border</code>,{' '}
          <code>--accent</code>, <code>--indicator</code>, and{' '}
          <code>--ring</code>.{' '}
          <strong className="text-foreground">
            The width morph runs on <code>spring-settle</code>
          </strong>{' '}
          because it displaces the pane beside it (ADR 0001), labels fade on{' '}
          <code>--motion-fast</code>, and the switch into the strip is a
          breakpoint and is not animated.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          <code>SidebarNav</code> is a <code>nav</code> landmark and requires an{' '}
          <code>aria-label</code>, so a screen reader can tell the app nav from
          any other nav on the page. <code>SidebarTrigger</code> is an outline
          icon button carrying <code>aria-expanded</code> and{' '}
          <code>aria-controls</code> pointed at the aside, labelled
          &quot;Collapse sidebar&quot; or &quot;Expand sidebar&quot;; it takes
          its glyph as children, because the registry ships no icons.{' '}
          <strong className="text-foreground">
            Tab reaches every item and the trigger, and there are no arrow keys.
          </strong>{' '}
          These are links in a landmark, not a menu. A focused item takes the
          same <code>--accent</code> background as a hovered one and draws no
          ring: the pointer and the keyboard land on the same mark, and the
          current page keeps its own — the bar and the <code>--foreground</code>{' '}
          label — so the two stay distinguishable.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          The docs site still has its own sidebar
        </h2>
        <p className="text-muted-foreground">
          The nav on the left of this page is docs-site chrome, not this
          component.{' '}
          <strong className="text-foreground">
            Rebuilding it on Sidebar is an open dogfooding question on the batch
            map (#113),
          </strong>{' '}
          not a decision this build made.
        </p>
      </section>
    </article>
  )
}

interface TripNavLink {
  key: string
  label: string
  icon: React.ReactNode
}

const planningLinks: TripNavLink[] = [
  { key: 'itinerary', label: 'Itinerary', icon: <MapPinned /> },
  { key: 'days', label: 'Days', icon: <CalendarDays /> },
  { key: 'places', label: 'Places', icon: <Compass /> },
]

const moneyLinks: TripNavLink[] = [
  { key: 'budget', label: 'Budget', icon: <Wallet /> },
  { key: 'receipts', label: 'Receipts', icon: <Receipt /> },
]

const travellerLinks: TripNavLink[] = [
  { key: 'travellers', label: 'Travellers', icon: <Users /> },
  { key: 'settings', label: 'Settings', icon: <Settings /> },
]

function TripNav({
  currentKey,
  onCurrentKeyChange,
}: {
  currentKey: string
  onCurrentKeyChange: (key: string) => void
}) {
  const renderGroup = (label: string, links: TripNavLink[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      {links.map((link) => (
        <SidebarItem
          key={link.key}
          icon={link.icon}
          aria-current={currentKey === link.key ? 'page' : undefined}
          onClick={() => onCurrentKeyChange(link.key)}
        >
          {link.label}
        </SidebarItem>
      ))}
    </SidebarGroup>
  )

  return (
    <SidebarNav aria-label="Trip">
      {renderGroup('Planning', planningLinks)}
      {renderGroup('Money', moneyLinks)}
      {renderGroup('People', travellerLinks)}
    </SidebarNav>
  )
}

function TravellerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button" aria-label="Brian, account menu">
          <Avatar name="Brian Pham" size={AvatarSize.Small} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Brian Pham</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TripHeader() {
  const { layout } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarTrigger>
        <PanelLeft />
      </SidebarTrigger>
      {layout === SidebarLayout.Rail ? null : (
        <span className="font-heading truncate text-base font-bold">
          Lisbon, 6 days
        </span>
      )}
    </SidebarHeader>
  )
}

function TripShell({ containerClassName }: { containerClassName: string }) {
  const [currentKey, setCurrentKey] = useState('itinerary')

  return (
    <SidebarProvider className={containerClassName}>
      <Sidebar>
        <TripHeader />
        <SidebarContent>
          <TripNav currentKey={currentKey} onCurrentKeyChange={setCurrentKey} />
        </SidebarContent>
        <SidebarFooter>
          <TravellerMenu />
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        The pane beside the sidebar. Collapse the sidebar and this pane takes
        the width back.
      </div>
    </SidebarProvider>
  )
}

function AppNavExample() {
  return <TripShell containerClassName="h-96 min-w-[760px]" />
}

function StripExample() {
  return (
    <TripShell containerClassName="border-border h-96 max-w-[420px] border" />
  )
}

function DayDetailExample() {
  return (
    <SidebarProvider
      defaultCollapsed
      className="border-border h-96 min-w-[760px] border"
    >
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        Day 3, Alfama. The rail on the right keeps the day&apos;s details within
        reach without taking the pane over.
      </div>
      <DayDetailRail />
    </SidebarProvider>
  )
}

const dayStops = [
  { hour: '09', time: '09:00', place: 'Miradouro de Santa Luzia' },
  { hour: '12', time: '12:30', place: 'Lunch at Ti Natércia' },
  { hour: '15', time: '15:00', place: 'Museu do Fado' },
]

function DayDetailRail() {
  const { layout } = useSidebar()

  const isRail = layout === SidebarLayout.Rail

  return (
    <Sidebar className="border-border border-r-0 border-l">
      <SidebarHeader>
        <SidebarTrigger>
          <PanelLeft />
        </SidebarTrigger>
        {isRail ? null : (
          <span className="font-heading truncate text-base font-bold">
            Day 3
          </span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <ul
          className={cn(
            'text-muted-foreground space-y-3',
            isRail ? 'px-1 text-center text-xs' : 'px-3 text-sm',
          )}
        >
          {dayStops.map((stop) => (
            <li key={stop.time} className="truncate">
              {isRail ? stop.hour : `${stop.time} — ${stop.place}`}
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-muted-foreground truncate text-sm">
          {isRail ? '3/6' : '3 of 6 days planned'}
        </span>
      </SidebarFooter>
    </Sidebar>
  )
}
