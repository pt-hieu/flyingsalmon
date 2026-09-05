import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/separator')({
  component: SeparatorPage,
})

function SeparatorPage() {
  return <ComponentStub name="Separator" />
}
