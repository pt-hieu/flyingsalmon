import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/text-link')({
  component: TextLinkPage,
})

function TextLinkPage() {
  return <ComponentStub name="Text Link" />
}
