import { ButtonSize } from './types'

export const rendersLabelByButtonSize: Record<ButtonSize, boolean> = {
  [ButtonSize.Default]: true,
  [ButtonSize.Small]: true,
  [ButtonSize.Icon]: false,
  [ButtonSize.IconSmall]: false,
  [ButtonSize.FieldIcon]: false,
  [ButtonSize.FieldIconSmall]: false,
}
