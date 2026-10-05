import {
  CalendarDays,
  Landmark,
  PanelLeft,
  PlaneLanding,
  Wallet,
} from 'lucide-react'
import { useState } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarNest,
  SidebarNestItems,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/ui/sidebar'

export function SidebarNestedItems() {
  const [currentKey, setCurrentKey] = useState('alfama')

  function currentProps(key: string) {
    return {
      'aria-current': currentKey === key ? ('page' as const) : undefined,
      onClick: () => setCurrentKey(key),
    }
  }

  return (
    <SidebarProvider className="h-72 w-full">
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            <SidebarNest>
              <SidebarItem icon={<CalendarDays />} {...currentProps('days')}>
                Days
              </SidebarItem>
              <SidebarNestItems>
                <SidebarItem
                  icon={<PlaneLanding />}
                  {...currentProps('arrival')}
                >
                  Arrival
                </SidebarItem>
                <SidebarItem icon={<Landmark />} {...currentProps('alfama')}>
                  Alfama
                </SidebarItem>
              </SidebarNestItems>
            </SidebarNest>
            <SidebarItem icon={<Wallet />} {...currentProps('budget')}>
              Budget
            </SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <div className="min-w-0 flex-1" />
    </SidebarProvider>
  )
}
