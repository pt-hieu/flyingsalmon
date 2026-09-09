import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/notice')({
  component: NoticePage,
})

function NoticePage() {
  return <ComponentStub name="Notice" />
}
