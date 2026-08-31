import { Outlet, createFileRoute } from '@tanstack/react-router'

import { ComponentSidebar } from '@/components/component-sidebar'

export const Route = createFileRoute('/components')({
  component: ComponentsLayout,
})

function ComponentsLayout() {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-start">
      <ComponentSidebar />
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
