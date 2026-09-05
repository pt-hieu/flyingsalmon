import { SpinnerSize } from '@/registry/ui/spinner'

import { SelectSize } from './types'

export const spinnerSizeBySelectSize: Record<SelectSize, SpinnerSize> = {
  [SelectSize.Default]: SpinnerSize.Default,
  [SelectSize.Small]: SpinnerSize.Small,
}
