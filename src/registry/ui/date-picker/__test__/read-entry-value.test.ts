import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import { readEntryValue } from '@/registry/ui/date-picker/read-entry-value'
import { DatePickerMode } from '@/registry/ui/date-picker/types'

const september14 = new CalendarDate(2026, 9, 14)
const september20 = new CalendarDate(2026, 9, 20)

describe('readEntryValue', () => {
  it('reads a complete single date as an ISO date', () => {
    expect(
      readEntryValue(
        { start: september14, end: null, isBeingTyped: false },
        DatePickerMode.Single,
      ),
    ).toBe('2026-09-14')
  })

  it('reads only the start in single mode', () => {
    expect(
      readEntryValue(
        { start: september14, end: september20, isBeingTyped: false },
        DatePickerMode.Single,
      ),
    ).toBe('2026-09-14')
  })

  it('reads an empty single date as no value', () => {
    expect(
      readEntryValue(
        { start: null, end: null, isBeingTyped: false },
        DatePickerMode.Single,
      ),
    ).toBeNull()
  })

  it('reads a single date whose year is still being typed as no value', () => {
    expect(
      readEntryValue(
        { start: new CalendarDate(202, 9, 14), end: null, isBeingTyped: true },
        DatePickerMode.Single,
      ),
    ).toBeNull()
  })

  it('reads a complete range as ISO start and end dates', () => {
    expect(
      readEntryValue(
        { start: september14, end: september20, isBeingTyped: false },
        DatePickerMode.Range,
      ),
    ).toEqual({ start: '2026-09-14', end: '2026-09-20' })
  })

  it('reads a range without an end as no value', () => {
    expect(
      readEntryValue(
        { start: september14, end: null, isBeingTyped: false },
        DatePickerMode.Range,
      ),
    ).toBeNull()
  })

  it('reads a range whose end year is still being typed as no value', () => {
    expect(
      readEntryValue(
        {
          start: september14,
          end: new CalendarDate(202, 9, 20),
          isBeingTyped: true,
        },
        DatePickerMode.Range,
      ),
    ).toBeNull()
  })
})
