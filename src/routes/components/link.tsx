import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/link')({
  component: LinkPage,
})

function LinkPage() {
  return <ComponentStub name="Link" />
}
