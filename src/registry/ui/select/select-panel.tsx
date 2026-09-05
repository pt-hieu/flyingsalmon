import { Select as SelectPrimitive } from 'radix-ui'

import { selectPanelClassName } from './classnames'
import type { SelectPanelAlign, SelectPanelSide } from './types'

export interface SelectPanelProps {
  side: SelectPanelSide
  align: SelectPanelAlign
  children?: React.ReactNode
}

export function SelectPanel({ side, align, children }: SelectPanelProps) {
  return (
    <SelectPrimitive.Content
      position="popper"
      side={side}
      align={align}
      sideOffset={8}
      collisionPadding={8}
      className={selectPanelClassName}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
}
