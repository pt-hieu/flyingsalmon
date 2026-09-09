import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/toggle-group')({
  component: ToggleGroupPage,
})

function ToggleGroupPage() {
  return <ComponentStub name="Toggle Group" />
}
