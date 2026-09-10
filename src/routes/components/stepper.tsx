import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/stepper')({
  component: StepperPage,
})

function StepperPage() {
  return <ComponentStub name="Stepper" />
}
