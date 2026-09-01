import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/select')({
  component: SelectPage,
})

function SelectPage() {
  return <ComponentStub name="Select" />
}
