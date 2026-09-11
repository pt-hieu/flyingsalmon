import { SpinnerSize } from '@/registry/ui/spinner'

import { NumberFieldSize } from './types'

export const spinnerSizeByNumberFieldSize: Record<
  NumberFieldSize,
  SpinnerSize
> = {
  [NumberFieldSize.Default]: SpinnerSize.Default,
  [NumberFieldSize.Small]: SpinnerSize.Small,
}
