import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/components/date-picker')({
  component: DatePickerPage,
})

function DatePickerPage() {
  return <ComponentStub name="Date Picker" />
}
