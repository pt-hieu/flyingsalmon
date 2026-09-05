import { SpinnerSize } from '@/registry/ui/spinner'

import { ButtonSize } from './types'

export const spinnerSizeByButtonSize: Record<ButtonSize, SpinnerSize> = {
  [ButtonSize.Default]: SpinnerSize.Default,
  [ButtonSize.Small]: SpinnerSize.Small,
  [ButtonSize.Icon]: SpinnerSize.Default,
  [ButtonSize.IconSmall]: SpinnerSize.Small,
}
