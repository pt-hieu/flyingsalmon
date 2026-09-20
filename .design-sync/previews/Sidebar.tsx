import {
  Avatar,
  AvatarSize,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
} from 'flyingsalmon'
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

function TripNav() {
  return (
    <SidebarNav aria-label="Trip">
      <SidebarGroup>
        <SidebarGroupLabel>Planning</SidebarGroupLabel>
        <SidebarItem icon={<MapPinned />} aria-current="page">
          Itinerary
        </SidebarItem>
        <SidebarItem icon={<CalendarDays />}>Days</SidebarItem>
        <SidebarItem icon={<Compass />}>Places</SidebarItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Money</SidebarGroupLabel>
        <SidebarItem icon={<Wallet />}>Budget</SidebarItem>
        <SidebarItem icon={<Receipt />}>Receipts</SidebarItem>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>People</SidebarGroupLabel>
        <SidebarItem icon={<Users />}>Travellers</SidebarItem>
        <SidebarItem icon={<Settings />}>Settings</SidebarItem>
      </SidebarGroup>
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
      {layout === SidebarLayout.Collapsed ? null : (
        <span className="font-heading truncate text-base font-bold">
          Lisbon, 6 days
        </span>
      )}
    </SidebarHeader>
  )
}

function TripFooter() {
  return (
    <SidebarFooter>
      <TravellerMenu />
    </SidebarFooter>
  )
}

export function Expanded() {
  return (
    <SidebarProvider className="h-[34rem]">
      <Sidebar>
        <TripHeader />
        <SidebarContent>
          <TripNav />
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

export function Collapsed() {
  return (
    <SidebarProvider defaultCollapsed className="h-[34rem]">
      <Sidebar>
        <TripHeader />
        <SidebarContent>
          <TripNav />
        </SidebarContent>
        <TripFooter />
      </Sidebar>
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        The icon rail: labels fade out and reappear in a tooltip on hover.
      </div>
    </SidebarProvider>
  )
}
