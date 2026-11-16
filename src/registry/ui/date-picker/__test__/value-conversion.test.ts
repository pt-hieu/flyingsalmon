import { describe, expect, it } from 'vitest'

import { readEntryValue } from '@/registry/ui/date-picker/read-entry-value'
import { DatePickerMode } from '@/registry/ui/date-picker/types'
import { toEntry, toValueKey } from '@/registry/ui/date-picker/value-conversion'

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
