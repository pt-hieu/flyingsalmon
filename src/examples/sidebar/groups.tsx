import { CalendarDays, PanelLeft, Receipt, Users, Wallet } from 'lucide-react'
import { useState } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/ui/sidebar'

export function SidebarGroups() {
  const [currentKey, setCurrentKey] = useState('itinerary')

  function currentProps(key: string) {
    return {
      'aria-current': currentKey === key ? ('page' as const) : undefined,
      onClick: () => setCurrentKey(key),
    }
  }

  return (
    <SidebarProvider className="h-80 w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            <SidebarGroup>
              <SidebarGroupLabel>Planning</SidebarGroupLabel>
              <SidebarItem
                icon={<CalendarDays />}
                {...currentProps('itinerary')}
              >
                Itinerary
              </SidebarItem>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Money</SidebarGroupLabel>
              <SidebarItem icon={<Wallet />} {...currentProps('budget')}>
                Budget
              </SidebarItem>
              <SidebarItem icon={<Receipt />} {...currentProps('receipts')}>
                Receipts
              </SidebarItem>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>People</SidebarGroupLabel>
              <SidebarItem icon={<Users />} {...currentProps('travellers')}>
                Travellers
              </SidebarItem>
            </SidebarGroup>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <div className="min-w-0 flex-1" />
    </SidebarProvider>
  )
}
