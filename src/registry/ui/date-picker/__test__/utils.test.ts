import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import { isCompleteDate } from '@/registry/ui/date-picker/utils'

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
