import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/form')({
  component: FormPage,
})

function FormPage() {
  return <ComponentStub name="Form" />
}
