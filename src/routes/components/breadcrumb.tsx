import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/breadcrumb')({
  component: BreadcrumbPage,
})

function BreadcrumbPage() {
  return <ComponentStub name="Breadcrumb" />
}
