import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/pagination')({
  component: PaginationPage,
})

function PaginationPage() {
  return <ComponentStub name="Pagination" />
}
