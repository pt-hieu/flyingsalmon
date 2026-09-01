import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/dropdown-menu')({
  component: DropdownMenuPage,
})

function DropdownMenuPage() {
  return <ComponentStub name="Dropdown Menu" />
}
