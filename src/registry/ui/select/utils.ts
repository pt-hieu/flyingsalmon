import { SpinnerSize } from '../spinner'

import { SelectSize } from './types'

export function spinnerSizeFor(size: SelectSize): SpinnerSize {
  return size === SelectSize.Small ? SpinnerSize.Small : SpinnerSize.Default
}
