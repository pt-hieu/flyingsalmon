import { NumberParser } from '@internationalized/number'

export function parseNumber(text: string, locale: string): number | null {
  const parsed = new NumberParser(locale).parse(text)

  return Number.isNaN(parsed) ? null : parsed
}
