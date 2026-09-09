import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/timeline')({
  component: TimelinePage,
})

function TimelinePage() {
  return <ComponentStub name="Timeline" />
}
