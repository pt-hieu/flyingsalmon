import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'

import { describeRejection } from '@/registry/ui/date-picker/describe-rejection'
import { DatePickerMode } from '@/registry/ui/date-picker/types'

const messages = {
  unavailableMessage: 'That date is unavailable',
  rangeOrderMessage: 'The end date comes before the start date',
}

const septemberLimits = { min: '2026-09-01', max: '2026-09-30' }

function septemberDay(day: number) {
  return new CalendarDate(2026, 9, day)
}

describe('describeRejection in single mode', () => {
  const singleOptions = {
    ...messages,
    ...septemberLimits,
    mode: DatePickerMode.Single,
  }

  it('accepts a date inside the limits', () => {
    expect(
      describeRejection(
        { start: septemberDay(14), end: null, isBeingTyped: false },
        singleOptions,
      ),
    ).toBeUndefined()
  })

  it.each([
    ['before min', new CalendarDate(2026, 8, 31)],
    ['after max', new CalendarDate(2026, 10, 1)],
  ])('rejects a date %s', (_description, date) => {
    expect(
      describeRejection(
        { start: date, end: null, isBeingTyped: false },
        singleOptions,
      ),
    ).toBe('That date is unavailable')
  })

  it.each([
    ['min', septemberDay(1)],
    ['max', septemberDay(30)],
  ])('accepts the %s date itself', (_description, date) => {
    expect(
      describeRejection(
        { start: date, end: null, isBeingTyped: false },
        singleOptions,
      ),
    ).toBeUndefined()
  })

  it('rejects a date the consumer disables by its ISO string', () => {
    const options = {
      ...singleOptions,
      isDateDisabled: (date: string) => date === '2026-09-14',
    }

    expect(
      describeRejection(
        { start: septemberDay(14), end: null, isBeingTyped: false },
        options,
      ),
    ).toBe('That date is unavailable')
    expect(
      describeRejection(
        { start: septemberDay(15), end: null, isBeingTyped: false },
        options,
      ),
    ).toBeUndefined()
  })

  it('says nothing about an empty field', () => {
    expect(
      describeRejection(
        { start: null, end: null, isBeingTyped: false },
        singleOptions,
      ),
    ).toBeUndefined()
  })

  it('waits while the year is still being typed', () => {
    expect(
      describeRejection(
        { start: new CalendarDate(202, 9, 14), end: null, isBeingTyped: true },
        singleOptions,
      ),
    ).toBeUndefined()
  })
})

describe('describeRejection in range mode', () => {
  const rangeOptions = {
    ...messages,
    ...septemberLimits,
    mode: DatePickerMode.Range,
  }

  it('accepts an ordered range inside the limits', () => {
    expect(
      describeRejection(
        { start: septemberDay(14), end: septemberDay(20), isBeingTyped: false },
        rangeOptions,
      ),
    ).toBeUndefined()
  })

  it('accepts a one-day range', () => {
    expect(
      describeRejection(
        { start: septemberDay(14), end: septemberDay(14), isBeingTyped: false },
        rangeOptions,
      ),
    ).toBeUndefined()
  })

  it('rejects a range that ends before it starts', () => {
    expect(
      describeRejection(
        { start: septemberDay(20), end: septemberDay(14), isBeingTyped: false },
        rangeOptions,
      ),
    ).toBe('The end date comes before the start date')
  })

  it('rejects a range with an unavailable end', () => {
    expect(
      describeRejection(
        {
          start: septemberDay(20),
          end: new CalendarDate(2026, 10, 2),
          isBeingTyped: false,
        },
        rangeOptions,
      ),
    ).toBe('That date is unavailable')
  })

  it('reports an unavailable date ahead of a wrong order', () => {
    expect(
      describeRejection(
        {
          start: new CalendarDate(2026, 8, 30),
          end: new CalendarDate(2026, 8, 28),
          isBeingTyped: false,
        },
        rangeOptions,
      ),
    ).toBe('That date is unavailable')
  })

  it('says nothing until both ends are complete', () => {
    expect(
      describeRejection(
        { start: septemberDay(20), end: null, isBeingTyped: false },
        rangeOptions,
      ),
    ).toBeUndefined()
    expect(
      describeRejection(
        {
          start: septemberDay(20),
          end: new CalendarDate(202, 9, 14),
          isBeingTyped: true,
        },
        rangeOptions,
      ),
    ).toBeUndefined()
  })
})
