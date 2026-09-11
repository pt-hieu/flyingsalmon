import {
  CalendarDate,
  CalendarDateTime,
  parseZonedDateTime,
} from '@internationalized/date'
import type { CalendarCellRenderProps } from 'react-aria-components'
import { describe, expect, it } from 'vitest'

import { CalendarMode } from '@/registry/ui/calendar/types'
import { describeDay, formatIsoDate } from '@/registry/ui/calendar/utils'

const plainDay = {
  hidden: false,
  unavailable: false,
  filled: false,
  interior: false,
  bandStart: false,
  bandEnd: false,
  highlighted: false,
  today: false,
}

function cellState(
  overrides: Partial<CalendarCellRenderProps> = {},
): CalendarCellRenderProps {
  return {
    date: new CalendarDate(2026, 9, 14),
    formattedDate: '14',
    isHovered: false,
    isPressed: false,
    isSelected: false,
    isSelectionStart: false,
    isSelectionEnd: false,
    isFocused: false,
    isFocusVisible: false,
    isDisabled: false,
    isOutsideVisibleRange: false,
    isOutsideMonth: false,
    isUnavailable: false,
    isInvalid: false,
    isToday: false,
    ...overrides,
  }
}

describe('formatIsoDate', () => {
  it('writes a date as an ISO calendar date', () => {
    expect(formatIsoDate(new CalendarDate(2026, 9, 1))).toBe('2026-09-01')
  })

  it('drops the time of a date-time', () => {
    expect(formatIsoDate(new CalendarDateTime(2026, 9, 1, 23, 30))).toBe(
      '2026-09-01',
    )
  })

  it('keeps the local calendar date of a zoned date-time', () => {
    expect(
      formatIsoDate(parseZonedDateTime('2026-09-01T23:30[Asia/Ho_Chi_Minh]')),
    ).toBe('2026-09-01')
  })
})

describe('describeDay', () => {
  it('describes an untouched day as plain', () => {
    expect(describeDay(cellState(), CalendarMode.Single, false)).toEqual(
      plainDay,
    )
  })

  it('fills the selected day in single mode without drawing a band', () => {
    expect(
      describeDay(
        cellState({
          isSelected: true,
          isSelectionStart: true,
          isSelectionEnd: true,
        }),
        CalendarMode.Single,
        false,
      ),
    ).toEqual({ ...plainDay, filled: true })
  })

  it('marks today', () => {
    expect(
      describeDay(cellState({ isToday: true }), CalendarMode.Single, false),
    ).toEqual({ ...plainDay, today: true })
  })

  it.each([
    ['hovered', { isHovered: true }],
    ['keyboard-focused', { isFocusVisible: true }],
  ])('highlights a %s day', (_description, overrides) => {
    expect(
      describeDay(cellState(overrides), CalendarMode.Single, false),
    ).toEqual({ ...plainDay, highlighted: true })
  })

  it('marks a day the consumer made unavailable', () => {
    expect(
      describeDay(
        cellState({ isUnavailable: true }),
        CalendarMode.Single,
        false,
      ),
    ).toEqual({ ...plainDay, unavailable: true })
  })

  it('marks a day outside min and max as unavailable', () => {
    expect(
      describeDay(cellState({ isDisabled: true }), CalendarMode.Single, false),
    ).toEqual({ ...plainDay, unavailable: true })
  })

  it('does not mark each day unavailable when the whole calendar is disabled', () => {
    expect(
      describeDay(cellState({ isDisabled: true }), CalendarMode.Single, true),
    ).toEqual(plainDay)
  })

  it('hides a day outside the month without marking it unavailable', () => {
    expect(
      describeDay(
        cellState({ isOutsideMonth: true, isDisabled: true }),
        CalendarMode.Single,
        false,
      ),
    ).toEqual({ ...plainDay, hidden: true })
  })

  it('fills the first day of a range and starts the band there', () => {
    expect(
      describeDay(
        cellState({ isSelected: true, isSelectionStart: true }),
        CalendarMode.Range,
        false,
      ),
    ).toEqual({ ...plainDay, filled: true, bandStart: true })
  })

  it('fills the last day of a range and ends the band there', () => {
    expect(
      describeDay(
        cellState({ isSelected: true, isSelectionEnd: true }),
        CalendarMode.Range,
        false,
      ),
    ).toEqual({ ...plainDay, filled: true, bandEnd: true })
  })

  it('draws a day between the ends of a range as band interior, not filled', () => {
    expect(
      describeDay(cellState({ isSelected: true }), CalendarMode.Range, false),
    ).toEqual({ ...plainDay, interior: true })
  })

  it('fills a one-day range without a band', () => {
    expect(
      describeDay(
        cellState({
          isSelected: true,
          isSelectionStart: true,
          isSelectionEnd: true,
        }),
        CalendarMode.Range,
        false,
      ),
    ).toEqual({ ...plainDay, filled: true })
  })
})
