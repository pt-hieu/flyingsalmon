import { SpinnerSize } from '@/registry/ui/spinner'

import { InputSize } from './types'

export const spinnerSizeByInputSize: Record<InputSize, SpinnerSize> = {
  [InputSize.Default]: SpinnerSize.Default,
  [InputSize.Small]: SpinnerSize.Small,
}
