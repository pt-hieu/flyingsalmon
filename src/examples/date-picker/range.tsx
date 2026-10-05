import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import type { DatePickerRange } from '@/registry/ui/date-picker'

const localToday = today(getLocalTimeZone())

export function DatePickerRangeExample() {
  const [tripDates, setTripDates] = useState<DatePickerRange | null>({
    start: localToday.add({ days: 9 }).toString(),
    end: localToday.add({ days: 16 }).toString(),
  })

  return (
    <DatePicker
      className="w-80"
      mode={DatePickerMode.Range}
      label="Trip dates"
      startName="tripStart"
      endName="tripEnd"
      value={tripDates}
      onChange={setTripDates}
      min={localToday.toString()}
    />
  )
}
