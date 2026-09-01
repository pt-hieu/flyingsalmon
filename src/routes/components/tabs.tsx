import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/tabs')({
  component: TabsPage,
})

function TabsPage() {
  return <ComponentStub name="Tabs" />
}
