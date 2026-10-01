import { Outlet, createFileRoute } from '@tanstack/react-router'

import { ComponentSidebar } from '@/components/component-sidebar'
import { SiteHeader } from '@/components/site-header'

export const Route = createFileRoute('/_docs')({
  component: DocsLayout,
})

function DocsLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto flex w-full max-w-6xl items-start">
          <ComponentSidebar />
          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
