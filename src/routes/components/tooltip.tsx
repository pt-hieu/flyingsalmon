import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/tooltip')({
  component: TooltipPage,
})

function TooltipPage() {
  return <ComponentStub name="Tooltip" />
}
