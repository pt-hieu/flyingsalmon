import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/progress')({
  component: ProgressPage,
})

function ProgressPage() {
  return <ComponentStub name="Progress" />
}
