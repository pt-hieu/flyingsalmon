import { SpinnerSize } from '../spinner'

import { ComboboxSize } from './types'

export const spinnerSizeByComboboxSize: Record<ComboboxSize, SpinnerSize> = {
  [ComboboxSize.Default]: SpinnerSize.Default,
  [ComboboxSize.Small]: SpinnerSize.Small,
}
