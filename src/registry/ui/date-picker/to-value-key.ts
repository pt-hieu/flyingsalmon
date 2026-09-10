import type { DatePickerValue } from './types'

export function toValueKey(value: DatePickerValue): string {
  if (value === null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return `${value.start}/${value.end}`
}
