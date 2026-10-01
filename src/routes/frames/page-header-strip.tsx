import { createFileRoute } from '@tanstack/react-router'

import { PageHeaderSidebarExample } from '@/components/page-header-sidebar-example'

export const Route = createFileRoute('/frames/page-header-strip')({
  component: PageHeaderStripFrame,
})

function PageHeaderStripFrame() {
  return <PageHeaderSidebarExample className="h-screen w-full" />
}
