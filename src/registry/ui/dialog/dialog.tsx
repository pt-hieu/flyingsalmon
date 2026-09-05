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
  exhibitionMode?: boolean
}

export function Dialog({
  size = DialogSize.Default,
  dismissible = true,
  pending = false,
  exhibitionMode = false,
  ...props
}: DialogProps) {
  return (
    <DialogContext value={{ size, dismissible, pending, exhibitionMode }}>
      <DialogPrimitive.Root modal={!exhibitionMode} {...props} />
    </DialogContext>
  )
}
