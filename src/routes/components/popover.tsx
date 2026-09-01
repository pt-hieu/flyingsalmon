import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/popover')({
  component: PopoverPage,
})

function PopoverPage() {
  return <ComponentStub name="Popover" />
}
