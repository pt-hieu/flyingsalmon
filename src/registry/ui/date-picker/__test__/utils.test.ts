import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import { readEntryValue } from '@/registry/ui/date-picker/read-entry-value'
import { DatePickerMode } from '@/registry/ui/date-picker/types'
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
  it.each([
    ['no value', null, DatePickerMode.Single],
    ['a single date', '2026-09-14', DatePickerMode.Single],
    [
      'a range',
      { start: '2026-09-14', end: '2026-09-20' },
      DatePickerMode.Range,
    ],
  ])(
    'turns %s into an entry that reads back as the same value',
    (_description, value, mode) => {
      expect(readEntryValue(toEntry(value), mode)).toEqual(value)
    },
  )
})

describe('toValueKey', () => {
  it('gives equal values the same key', () => {
    expect(toValueKey({ start: '2026-09-14', end: '2026-09-20' })).toBe(
      toValueKey({ start: '2026-09-14', end: '2026-09-20' }),
    )
  })

  it('gives different values different keys', () => {
    const keys = [
      null,
      '2026-09-14',
      '2026-09-20',
      { start: '2026-09-14', end: '2026-09-20' },
      { start: '2026-09-14', end: '2026-09-21' },
    ].map(toValueKey)

    expect(new Set(keys).size).toBe(5)
  })
})
