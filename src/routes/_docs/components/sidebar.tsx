import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarDays,
  Compass,
  Landmark,
  MapPinned,
  Mountain,
  PanelLeft,
  PlaneLanding,
  Receipt,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
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
  SidebarSubmenu,
  SidebarSubmenuItems,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

export const Route = createFileRoute('/_docs/components/sidebar')({
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
          sticky horizontal strip under a 700px viewport. The app&apos;s top bar
          and its sidebar are the same component.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Three layouts</h2>
        <p className="text-muted-foreground">
          <code>SidebarProvider</code> holds the collapsed state and matches the
          same 700px media query the class names use, through{' '}
          <code>matchMedia</code>.{' '}
          <strong className="text-foreground">
            One <code>collapsed</code> boolean and one 700px threshold resolve
            all three layouts.
          </strong>{' '}
          Expanded is the full column, collapsed is the icon rail, and strip is
          forced under the threshold whatever <code>collapsed</code> says. CSS
          paints the three; <code>useSidebar().layout</code> reports which one
          is live so a consumer&apos;s header, footer, or rail content can
          follow without re-deriving the query. <code>matchMedia</code> reads{' '}
          <code>sidebarStripThreshold</code>; the class names spell the same
          number as <code>min-[700px]:</code>, because Tailwind scans class
          names as literals and cannot read a JavaScript constant. The server
          has no viewport, so <code>layout</code> resolves at hydration and the
          aside leaves its width to CSS until it does.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">App nav</h2>
        <p className="text-muted-foreground">
          The whole app shell: header with the trip name and the trigger, nav
          groups in the scrolling content, and a footer holding the avatar menu
          and the theme toggle. Every icon sits on one axis, the centre line of
          the rail, in both layouts: the trigger and the avatar button are 36px
          controls inside a 10px inset, and each item's icon sits 20px in.
          Collapse it and only the aside's width moves; the labels fade and the
          narrowing edge clips them, so nothing in the column shifts.{' '}
          <strong className="text-foreground">
            A group label keeps its row and becomes a rule:
          </strong>{' '}
          the text fades out and a 1px <code>--border</code> line fades in
          across the same slot, so the groups still read as groups in the rail
          and the items below never jump. Each label reappears in a tooltip on
          hover and on focus. The accessible name never depends on that tooltip:
          the label stays in the DOM, clipped rather than removed, so a screen
          reader reads the same nav in either layout. Items are the
          component&apos;s to reshape; header and footer are slots, and content
          too wide for the rail is the app&apos;s to swap on{' '}
          <code>useSidebar().layout</code> — this demo drops the trip name and
          the theme toggle in the rail. The rail tooltip needs a string label;
          an item whose children are markup keeps its own visible text in the
          rail instead.
        </p>
        <ModePreview stacked>
          <AppNavExample />
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
          — the registry ships no separate header component (#128). Narrow the
          window below 700px and the demo above becomes this, with no change to
          its markup.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Items and the bar</h2>
        <p className="text-muted-foreground">
          <code>SidebarItem</code> takes an <code>icon</code> slot and its label
          as children, and reads active from{' '}
          <code>aria-current=&quot;page&quot;</code> — on the item or on the
          element <code>asChild</code> renders, so a router link that already
          sets it needs nothing else. Idle is <code>--muted-foreground</code> at
          36px, hover steps the background to <code>--accent</code> on the
          item&apos;s own <code>rounded-md</code> box, the ghost button&apos;s
          shape, and active is <code>--foreground</code> in medium with its icon
          and a 2px bar both in <code>--indicator</code>. The bar sits outside
          the box, on the aside&apos;s own edge: the left edge in the column and
          the bottom edge in the strip, over the strip&apos;s border, where the
          tabs bar sits.{' '}
          <strong className="text-foreground">
            The bar is one shared <code>motion.span</code> that slides between
            items on <code>spring-bounce</code>, so the sidebar has to stay
            mounted across routes for the slide to happen.
          </strong>{' '}
          Put it in a persistent layout route. A sidebar that remounts on every
          navigation is not wrong — it just draws the bar in place instead of
          moving it there. <code>SidebarContent</code> scrolls without a
          scrollbar, nudging the active item fully into view when it sits half
          outside the visible area, down the column or across the strip.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Nested items</h2>
        <p className="text-muted-foreground">
          <code>SidebarSubmenu</code> wraps a parent <code>SidebarItem</code>{' '}
          and a <code>SidebarSubmenuItems</code> list of more items. The parent
          is a page like any other; a chevron at its trailing edge opens and
          closes the list, pointing right when closed and down when open.
          Children carry the parent&apos;s styling on the same icon axis, with
          no indent: a 1px <code>--border</code> line runs under the chevron
          from the top of the first child to the bottom of the last. Children
          end 7px short of the line, so a hover fill never crosses it, and a
          current child takes the bar on the aside&apos;s edge like any item.{' '}
          <strong className="text-foreground">
            In the rail the line goes: the parent and its children share one{' '}
            <code>--muted</code> block, and the parent&apos;s icon gives way to
            the chevron on hover, so the whole cell toggles the list.
          </strong>{' '}
          The parent page stays one Tab stop ahead of the toggle. Close the list
          on a current child and the bar springs up to the parent; a submenu
          whose child becomes current opens itself. The strip shows the block
          flat and open, with no chevron. <code>open</code>,{' '}
          <code>defaultOpen</code>, and <code>onOpenChange</code> control it
          otherwise, and the toggle carries <code>aria-expanded</code> and{' '}
          <code>aria-controls</code> pointed at the list. The demo above nests
          the trip&apos;s days under Days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Widths and tokens</h2>
        <p className="text-muted-foreground">
          <code>--sidebar-width</code> is 18.125rem and{' '}
          <code>--sidebar-width-collapsed</code> is 3.5rem, both set on the root
          and overridable through <code>className</code> rather than through
          props. The component adds no tokens of its own: it paints{' '}
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
  children?: TripNavLink[]
}

const planningLinks: TripNavLink[] = [
  { key: 'itinerary', label: 'Itinerary', icon: <MapPinned /> },
  {
    key: 'days',
    label: 'Days',
    icon: <CalendarDays />,
    children: [
      { key: 'arrival', label: 'Arrival', icon: <PlaneLanding /> },
      { key: 'alfama', label: 'Alfama', icon: <Landmark /> },
      { key: 'sintra', label: 'Sintra', icon: <Mountain /> },
    ],
  },
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
  const renderLink = (link: TripNavLink) => (
    <SidebarItem
      key={link.key}
      icon={link.icon}
      aria-current={currentKey === link.key ? 'page' : undefined}
      onClick={() => onCurrentKeyChange(link.key)}
    >
      {link.label}
    </SidebarItem>
  )

  const renderGroup = (label: string, links: TripNavLink[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      {links.map((link) =>
        link.children ? (
          <SidebarSubmenu key={link.key}>
            {renderLink(link)}
            <SidebarSubmenuItems>
              {link.children.map(renderLink)}
            </SidebarSubmenuItems>
          </SidebarSubmenu>
        ) : (
          renderLink(link)
        ),
      )}
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
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label="Brian, account menu"
        >
          <Avatar name="Brian Pham" size={AvatarSize.Small} />
        </Button>
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
      {layout === SidebarLayout.Collapsed ? null : (
        <span className="font-heading truncate text-base font-bold">
          Lisbon, 6 days
        </span>
      )}
    </SidebarHeader>
  )
}

function TripFooter() {
  const { layout } = useSidebar()

  return (
    <SidebarFooter>
      <TravellerMenu />
      {layout === SidebarLayout.Collapsed ? null : <ThemeToggle />}
    </SidebarFooter>
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
        <TripFooter />
      </Sidebar>
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        The pane beside the sidebar. Collapse the sidebar and this pane takes
        the width back.
      </div>
    </SidebarProvider>
  )
}

function AppNavExample() {
  return <TripShell containerClassName="h-96" />
}
