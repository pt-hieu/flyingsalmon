import {
  getLocalTimeZone,
  isWeekend,
  parseDate,
  today,
} from '@internationalized/date'
import { useState } from 'react'

import { Calendar } from '@/registry/ui/calendar'

const localToday = today(getLocalTimeZone())

export function CalendarUnavailableDays() {
  const [departure, setDeparture] = useState<string | null>(null)

  return (
    <Calendar
      aria-label="Weekday departure"
      value={departure}
      onChange={setDeparture}
      min={localToday.toString()}
      isDateDisabled={(date) => isWeekend(parseDate(date), 'en-US')}
    />
  )
}
