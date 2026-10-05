import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { Calendar } from '@/registry/ui/calendar'

const localToday = today(getLocalTimeZone())

export function CalendarDemo() {
  const [departure, setDeparture] = useState<string | null>(
    localToday.add({ days: 3 }).toString(),
  )

  return (
    <Calendar
      aria-label="Departure"
      value={departure}
      onChange={setDeparture}
      min={localToday.toString()}
    />
  )
}
