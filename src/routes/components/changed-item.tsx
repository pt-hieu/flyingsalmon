import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/changed-item')({
  component: ChangedItemPage,
})

function ChangedItemPage() {
  return <ComponentStub name="Changed Item" />
}
