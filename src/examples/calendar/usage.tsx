import { useState } from 'react'

import { Calendar } from '@/registry/ui/calendar'

export function CalendarUsage() {
  const [departure, setDeparture] = useState<string | null>(null)

  return (
    <Calendar
      aria-label="Departure"
      value={departure}
      onChange={setDeparture}
    />
  )
}
