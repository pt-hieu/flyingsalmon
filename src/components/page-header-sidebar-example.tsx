import { CalendarDays, PanelLeft, Receipt, Share2, Wallet } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLayout,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

const tripPages = [
  { key: 'itinerary', label: 'Itinerary', icon: <CalendarDays /> },
  { key: 'wallet', label: 'Wallet', icon: <Wallet /> },
  { key: 'receipts', label: 'Receipts', icon: <Receipt /> },
]

function TripSidebarHeader() {
  const { layout } = useSidebar()

  return (
    <SidebarHeader>
      <SidebarTrigger>
        <PanelLeft />
      </SidebarTrigger>
      {layout === SidebarLayout.Collapsed ? null : (
        <span className="font-heading truncate text-base font-bold">
          Kyoto, 10 days
        </span>
      )}
    </SidebarHeader>
  )
}

export function PageHeaderSidebarExample({
  className,
}: {
  className?: string
}) {
  const [currentKey, setCurrentKey] = useState('itinerary')
  const currentPage =
    tripPages.find((page) => page.key === currentKey) ?? tripPages[0]

  return (
    <SidebarProvider
      className={cn('[--page-header-inset:--spacing(6)]', className)}
    >
      <Sidebar>
        <TripSidebarHeader />
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            {tripPages.map((page) => (
              <SidebarItem
                key={page.key}
                icon={page.icon}
                aria-current={currentKey === page.key ? 'page' : undefined}
                onClick={() => setCurrentKey(page.key)}
              >
                {page.label}
              </SidebarItem>
            ))}
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <div className="min-w-0 flex-1 px-6 pb-6">
        <PageHeader>
          <PageHeaderTitle>{currentPage.label}</PageHeaderTitle>
          <PageHeaderActions>
            <Button icon={<Share2 />} variant={ButtonVariant.Outline}>
              Share
            </Button>
            <Button>Book stays</Button>
          </PageHeaderActions>
        </PageHeader>
      </div>
    </SidebarProvider>
  )
}
