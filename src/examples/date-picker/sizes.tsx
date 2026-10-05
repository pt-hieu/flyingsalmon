import { getLocalTimeZone, today } from '@internationalized/date'

import { DatePicker, DatePickerSize } from '@/registry/ui/date-picker'

const departure = today(getLocalTimeZone()).add({ days: 3 }).toString()

export function DatePickerSizes() {
  return (
    <>
      <DatePicker className="w-64" label="Departure" defaultValue={departure} />
      <DatePicker
        className="w-64"
        size={DatePickerSize.Small}
        label="Departure"
        defaultValue={departure}
      />
    </>
  )
}
