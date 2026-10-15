import { Portal } from 'radix-ui'
import { DismissableLayer, Popper, Presence } from 'radix-ui/internal'

import type { PanelAlign, PanelSide } from '@/registry/lib/panel'

import { comboboxPanelClassName } from './classnames'

export interface ComboboxPanelProps {
  open: boolean
  side: PanelSide
  align: PanelAlign
  listProps: React.ComponentProps<'div'>
  emptyChildren: React.ReactNode
  onDismiss: () => void
  children?: React.ReactNode
}

export function ComboboxPanel({
  open,
  side,
  align,
  listProps,
  emptyChildren,
  onDismiss,
  children,
}: ComboboxPanelProps) {
  return (
    <Portal.Root>
      <Presence.Root present={open}>
        <Popper.Content
          asChild
          side={side}
          align={align}
          sideOffset={8}
          collisionPadding={8}
        >
          <DismissableLayer.Root
            data-state={open ? 'open' : 'closed'}
            className={comboboxPanelClassName}
            onDismiss={onDismiss}
          >
            <div {...listProps}>{children}</div>

            {emptyChildren}
          </DismissableLayer.Root>
        </Popper.Content>
      </Presence.Root>
    </Portal.Root>
  )
}
