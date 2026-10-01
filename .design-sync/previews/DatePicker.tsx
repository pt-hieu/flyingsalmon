import { DatePicker, DatePickerMode } from 'flyingsalmon'

// Dates are pinned ISO strings, not `today()`, so the card renders the same
// image on every re-sync instead of drifting a day at a time. `defaultValue`
// stands in for the docs' controlled `value`/`onChange` pair since these
// cards render statically.

export function Departure() {
  return (
    <div className="w-64">
      <DatePicker
        label="Departure"
        name="departure"
        defaultValue="2026-11-14"
        min="2026-11-01"
      />
    </div>
  )
}

export function TripDates() {
  return (
    <div className="w-80">
      <DatePicker
        label="Trip dates"
        mode={DatePickerMode.Range}
        startName="tripStart"
        endName="tripEnd"
        defaultValue={{ start: '2026-11-14', end: '2026-11-21' }}
        min="2026-11-01"
      />
    </div>
  )
}

export function States() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <DatePicker
        label="Departure"
        defaultValue="2026-11-14"
        error="That flight is sold out"
      />
      <DatePicker label="Departure" loading />
      <DatePicker label="Departure" disabled defaultValue="2026-11-14" />
      <DatePicker
        label="Departure"
        defaultValue="2026-11-14"
        isDateDisabled={(date) => {
          const day = new Date(`${date}T00:00:00`).getDay()
          return day === 0 || day === 6
        }}
      />
    </div>
  )
}

export function Description() {
  return (
    <div className="flex w-64 flex-col gap-6">
      <DatePicker
        label="Departure"
        defaultValue="2026-11-14"
        description="The day you fly out"
      />
      <DatePicker
        label="Departure"
        defaultValue="2026-11-14"
        description="The day you fly out"
        error="That flight is sold out"
      />
    </div>
  )
}
