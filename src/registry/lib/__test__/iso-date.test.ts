import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import { formatIsoDate, parseOptionalIsoDate } from '../iso-date'

describe('formatIsoDate', () => {
  it('writes a date as an ISO day', () => {
    expect(formatIsoDate(new CalendarDate(2026, 3, 7))).toBe('2026-03-07')
  })

  it('drops the time of day from a date with a time', () => {
    expect(formatIsoDate(new CalendarDateTime(2026, 11, 20, 18, 45))).toBe(
      '2026-11-20',
    )
  })
})

describe('parseOptionalIsoDate', () => {
  it('reads an ISO day as that calendar date', () => {
    const date = parseOptionalIsoDate('2026-03-07')

    expect(date?.year).toBe(2026)
    expect(date?.month).toBe(3)
    expect(date?.day).toBe(7)
  })

  it('returns undefined when no date is given', () => {
    expect(parseOptionalIsoDate(undefined)).toBeUndefined()
  })
})
