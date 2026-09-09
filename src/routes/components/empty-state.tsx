import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/empty-state')({
  component: EmptyStatePage,
})

function EmptyStatePage() {
  return <ComponentStub name="Empty State" />
}
