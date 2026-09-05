import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/avatar-group')({
  component: AvatarGroupPage,
})

function AvatarGroupPage() {
  return <ComponentStub name="Avatar Group" />
}
