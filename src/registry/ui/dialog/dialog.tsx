import { Dialog as DialogPrimitive } from 'radix-ui'

import { DialogContext } from './context'
import { DialogSize } from './types'

export interface DialogProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Root>,
  'modal'
> {
  size?: DialogSize
  dismissible?: boolean
  pending?: boolean
}

export function Dialog({
  size = DialogSize.Default,
  dismissible = true,
  pending = false,
  ...props
}: DialogProps) {
  return (
    <DialogContext value={{ size, dismissible, pending }}>
      <DialogPrimitive.Root modal {...props} />
    </DialogContext>
  )
}
