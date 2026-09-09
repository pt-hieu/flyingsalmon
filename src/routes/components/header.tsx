import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/header')({
  component: HeaderPage,
})

function HeaderPage() {
  return <ComponentStub name="Header" />
}
