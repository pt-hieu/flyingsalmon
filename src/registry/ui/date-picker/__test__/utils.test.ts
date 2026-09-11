import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import {
  isCompleteDate,
  toEntry,
  toValueKey,
} from '@/registry/ui/date-picker/utils'

describe('isCompleteDate', () => {
  it('treats an empty field as incomplete', () => {
    expect(isCompleteDate(null, false)).toBe(false)
  })

  it('treats a committed date as complete, whatever its year', () => {
    expect(isCompleteDate(new CalendarDate(2026, 9, 14), false)).toBe(true)
    expect(isCompleteDate(new CalendarDate(20, 9, 14), false)).toBe(true)
  })

  it('treats a date as incomplete while its year is still short of four digits', () => {
    expect(isCompleteDate(new CalendarDate(202, 9, 14), true)).toBe(false)
  })

  it('treats a typed date as complete once its year has four digits', () => {
    expect(isCompleteDate(new CalendarDate(2026, 9, 14), true)).toBe(true)
  })
})

describe('toEntry', () => {
  it('turns no value into an empty entry', () => {
    expect(toEntry(null)).toEqual({
      start: null,
      end: null,
      isBeingTyped: false,
    })
  })

  it('turns a single ISO date into a start date', () => {
    expect(toEntry('2026-09-14')).toEqual({
      start: new CalendarDate(2026, 9, 14),
      end: null,
      isBeingTyped: false,
    })
  })

  it('turns an ISO range into start and end dates', () => {
    expect(toEntry({ start: '2026-09-14', end: '2026-09-20' })).toEqual({
      start: new CalendarDate(2026, 9, 14),
      end: new CalendarDate(2026, 9, 20),
      isBeingTyped: false,
    })
  })
})

describe('toValueKey', () => {
  it.each([
    ['no value', null, ''],
    ['a single date', '2026-09-14', '2026-09-14'],
    [
      'a range',
      { start: '2026-09-14', end: '2026-09-20' },
      '2026-09-14/2026-09-20',
    ],
  ])('keys %s', (_description, value, expectedKey) => {
    expect(toValueKey(value)).toBe(expectedKey)
  })
})
