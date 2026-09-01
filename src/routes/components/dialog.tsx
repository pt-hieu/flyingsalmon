import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/dialog')({
  component: DialogPage,
})

function DialogPage() {
  return <ComponentStub name="Dialog" />
}
