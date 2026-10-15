import { X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { use } from 'react'

import { Button, ButtonSize, ButtonVariant } from '../button'

import { dialogCloseSlotClassName, dialogOverlayClassName } from './classnames'
import { DialogContext } from './context'

export interface DialogSurfaceProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  'onEscapeKeyDown' | 'onPointerDownOutside' | 'onInteractOutside'
> {}

export function DialogSurface({ children, ...props }: DialogSurfaceProps) {
  const { dismissible, pending } = use(DialogContext)

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayClassName} />

      <DialogPrimitive.Content
        aria-busy={pending || undefined}
        onEscapeKeyDown={(event) => {
          if (pending) event.preventDefault()
        }}
        onInteractOutside={(event) => {
          if (pending || !dismissible) event.preventDefault()
        }}
        {...props}
      >
        {children}

        <div className={dialogCloseSlotClassName}>
          <DialogPrimitive.Close asChild>
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.IconSmall}
              aria-label="Close"
              disabled={pending}
            >
              <X />
            </Button>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
