import { Calendar, CalendarMode } from 'flyingsalmon'

// Dates are pinned ISO strings, not `today()`, so the card renders the same
// image on every re-sync instead of drifting a day at a time.

export function SingleDay() {
  return <Calendar aria-label="Departure" value="2026-11-14" min="2026-11-01" />
}

export function TripRange() {
  return (
    <Calendar
      aria-label="Trip dates"
      mode={CalendarMode.Range}
      months={2}
      value={{ start: '2026-11-14', end: '2026-11-21' }}
    />
  )
}

export function UnavailableWeekends() {
  return (
    <Calendar
      aria-label="Abreise"
      locale="de-DE"
      value="2026-11-16"
      isDateDisabled={(date) => {
        const day = new Date(`${date}T00:00:00`).getDay()
        return day === 0 || day === 6
      }}
    />
  )
}
