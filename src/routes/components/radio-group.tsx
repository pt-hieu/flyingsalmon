import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/radio-group')({
  component: RadioGroupPage,
})

function RadioGroupPage() {
  return <ComponentStub name="Radio Group" />
}
