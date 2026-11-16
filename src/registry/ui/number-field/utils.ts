import { SpinnerSize } from '../spinner'

import { NumberFieldSize } from './types'

export function inputModeForRange(
  min: number | undefined,
  fractionDigits: number,
): React.ComponentProps<'input'>['inputMode'] {
  if (min === undefined || min < 0) {
    return 'text'
  }

  return fractionDigits > 0 ? 'decimal' : 'numeric'
}

export function spinnerSizeFor(size: NumberFieldSize): SpinnerSize {
  return size === NumberFieldSize.Small
    ? SpinnerSize.Small
    : SpinnerSize.Default
}
