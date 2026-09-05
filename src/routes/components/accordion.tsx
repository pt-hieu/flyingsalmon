import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/accordion')({
  component: AccordionPage,
})

function AccordionPage() {
  return <ComponentStub name="Accordion" />
}
