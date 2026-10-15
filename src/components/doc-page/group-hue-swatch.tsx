import { cn } from '@/lib/utils'

import {
  groupHueBorderChipClassName,
  groupHueChipClassName,
  groupHueSwatchClassName,
} from './classnames'
import type { GroupHue } from './types'

export interface GroupHueSwatchProps {
  hue: GroupHue
}

export function GroupHueSwatch({ hue }: GroupHueSwatchProps) {
  return (
    <div className={groupHueSwatchClassName}>
      <span className={cn(hue.solidClassName, groupHueChipClassName)}>
        {hue.name}
      </span>
      <span className={cn(hue.softClassName, groupHueChipClassName)}>soft</span>
      <span
        className={cn(
          hue.borderClassName,
          groupHueChipClassName,
          groupHueBorderChipClassName,
        )}
      >
        border
      </span>
    </div>
  )
}
