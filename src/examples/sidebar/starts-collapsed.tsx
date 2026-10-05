import { CalendarDays, PanelLeft, Wallet } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/ui/sidebar'

export function SidebarStartsCollapsed() {
  return (
    <SidebarProvider defaultCollapsed className="h-60 w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            <SidebarItem icon={<CalendarDays />} aria-current="page">
              Itinerary
            </SidebarItem>
            <SidebarItem icon={<Wallet />}>Wallet</SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <div className="text-muted-foreground min-w-0 flex-1 p-6 text-sm">
        Hover or focus an icon to read its label.
      </div>
    </SidebarProvider>
  )
}
