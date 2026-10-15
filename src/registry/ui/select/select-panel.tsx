import { Select as SelectPrimitive } from 'radix-ui'

import type { PanelAlign, PanelSide } from '@/registry/lib/panel'

import { selectPanelClassName } from './classnames'

export interface SelectPanelProps {
  side: PanelSide
  align: PanelAlign
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
