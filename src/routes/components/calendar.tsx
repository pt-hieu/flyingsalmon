import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/calendar')({
  component: CalendarPage,
})

function CalendarPage() {
  return <ComponentStub name="Calendar" />
}
