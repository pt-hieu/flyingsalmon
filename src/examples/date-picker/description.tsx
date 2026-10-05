import { getLocalTimeZone, today } from '@internationalized/date'

import { DatePicker } from '@/registry/ui/date-picker'

export function DatePickerDescription() {
  return (
    <DatePicker
      className="w-64"
      label="Departure"
      defaultValue={today(getLocalTimeZone()).add({ days: 3 }).toString()}
      description="The day you fly out"
    />
  )
}
