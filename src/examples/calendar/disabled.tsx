import { getLocalTimeZone, today } from '@internationalized/date'

import { Calendar } from '@/registry/ui/calendar'

export function CalendarDisabled() {
  return (
    <Calendar
      aria-label="Departure"
      value={today(getLocalTimeZone()).add({ days: 3 }).toString()}
      disabled
    />
  )
}
