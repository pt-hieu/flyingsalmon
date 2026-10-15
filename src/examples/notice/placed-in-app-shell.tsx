import { CalendarDays, PanelLeft, Receipt, Wallet } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { AlertVariant } from '@/registry/ui/alert'
import { Button } from '@/registry/ui/button'
import { NoticeProvider, useNotice } from '@/registry/ui/notice'
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

const noticeOffsetsByLayout = {
  [SidebarLayout.Expanded]:
    '[--notice-offset-top:var(--bar-height)] [--notice-offset-left:var(--sidebar-width)]',
  [SidebarLayout.Collapsed]:
    '[--notice-offset-top:var(--bar-height)] [--notice-offset-left:var(--sidebar-width-collapsed)]',
  [SidebarLayout.Strip]: '[--notice-offset-top:calc(var(--bar-height)*2)]',
}

export function NoticePlacedInAppShell() {
  const [currentKey, setCurrentKey] = useState('itinerary')
  const currentPage =
    tripPages.find((page) => page.key === currentKey) ?? tripPages[0]

  return (
    <SidebarProvider
      defaultCollapsed
      className="h-96 w-full [--page-header-inset:--spacing(6)]"
    >
      <ShellNoticeProvider>
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
        <main className="min-w-0 flex-1 px-6 pb-6">
          <PageHeader>
            <PageHeaderTitle>{currentPage.label}</PageHeaderTitle>
            <PageHeaderActions>
              <SaveTripButton />
            </PageHeaderActions>
          </PageHeader>
        </main>
      </ShellNoticeProvider>
    </SidebarProvider>
  )
}

function ShellNoticeProvider({ children }: { children: React.ReactNode }) {
  const { layout } = useSidebar()

  return (
    <div className={cn('contents', noticeOffsetsByLayout[layout])}>
      <NoticeProvider>{children}</NoticeProvider>
    </div>
  )
}

function SaveTripButton() {
  const { show } = useNotice()

  function saveTrip() {
    show({
      variant: AlertVariant.Success,
      title: 'Trip saved',
      description: 'Ten days in Kyoto, ready to share.',
      subject: <a href="https://example.com/trips/kyoto">View the trip</a>,
    })
  }

  return <Button onClick={saveTrip}>Save the trip</Button>
}

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
