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
  SidebarNest,
  SidebarNestItems,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

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
      {
        key: 'sintra',
        label: 'Sintra, Cabo da Roca, and the coast road back to Cascais',
        icon: <Mountain />,
      },
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

export function SidebarDemo() {
  const [currentKey, setCurrentKey] = useState('itinerary')

  function renderLink(link: TripNavLink) {
    return (
      <SidebarItem
        key={link.key}
        icon={link.icon}
        aria-current={currentKey === link.key ? 'page' : undefined}
        onClick={() => setCurrentKey(link.key)}
      >
        {link.label}
      </SidebarItem>
    )
  }

  function renderGroup(label: string, links: TripNavLink[]) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
        {links.map((link) =>
          link.children ? (
            <SidebarNest key={link.key}>
              {renderLink(link)}
              <SidebarNestItems>
                {link.children.map(renderLink)}
              </SidebarNestItems>
            </SidebarNest>
          ) : (
            renderLink(link)
          ),
        )}
      </SidebarGroup>
    )
  }

  return (
    <SidebarProvider className="h-96 w-full">
      <Sidebar>
        <TripHeader />
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            {renderGroup('Planning', planningLinks)}
            {renderGroup('Money', moneyLinks)}
            {renderGroup('People', travellerLinks)}
          </SidebarNav>
        </SidebarContent>
        <SidebarFooter>
          <TravellerMenu />
        </SidebarFooter>
      </Sidebar>
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        The pane beside the sidebar. Collapse the sidebar and this pane takes
        the width back.
      </div>
    </SidebarProvider>
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

function TravellerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          aria-label="Brian Nguyen, account menu"
        >
          <Avatar name="Brian Nguyen" size={AvatarSize.Small} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Brian Nguyen</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
