import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/table')({
  component: TablePage,
})

function TablePage() {
  return <ComponentStub name="Table" />
}
