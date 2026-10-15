import { Outlet, createFileRoute } from '@tanstack/react-router'

import { DocsShell } from '@/components/docs-shell'

export const Route = createFileRoute('/_docs')({
  component: DocsLayout,
})

function DocsLayout() {
  return (
    <DocsShell>
      <Outlet />
    </DocsShell>
  )
}
