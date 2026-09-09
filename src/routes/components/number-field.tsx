import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/number-field')({
  component: NumberFieldPage,
})

function NumberFieldPage() {
  return <ComponentStub name="Number Field" />
}
