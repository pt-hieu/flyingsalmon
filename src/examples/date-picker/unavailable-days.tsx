import {
  getDayOfWeek,
  getLocalTimeZone,
  isWeekend,
  parseDate,
  today,
} from '@internationalized/date'

import { DatePicker } from '@/registry/ui/date-picker'

const localToday = today(getLocalTimeZone())
const nextSaturday = localToday.add({
  days: 6 - getDayOfWeek(localToday, 'en-US'),
})

export function DatePickerUnavailableDays() {
  return (
    <DatePicker
      className="w-64"
      label="Departure"
      description="Flights leave on weekdays only"
      defaultValue={nextSaturday.toString()}
      isDateDisabled={(date) => isWeekend(parseDate(date), 'en-US')}
    />
  )
}
