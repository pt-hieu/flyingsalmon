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

export function SidebarUsage() {
  return (
    <SidebarProvider className="h-screen">
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
      <main className="flex-1 p-6">The page</main>
    </SidebarProvider>
  )
}
