import { X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { use } from 'react'

import { cn } from '@/lib/utils'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

import {
  dialogCloseSlotVariants,
  dialogContentVariants,
  dialogOverlayVariants,
} from './classnames'
import { DialogContext } from './context'

export interface DialogContentProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  'onEscapeKeyDown' | 'onPointerDownOutside' | 'onInteractOutside'
> {}

export function DialogContent({
  className,
  children,
  ...props
}: DialogContentProps) {
  const { size, dismissible, pending } = use(DialogContext)

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayVariants()} />

      <DialogPrimitive.Content
        aria-busy={pending || undefined}
        onEscapeKeyDown={(event) => {
          if (pending) event.preventDefault()
        }}
        onPointerDownOutside={(event) => {
          if (pending || !dismissible) event.preventDefault()
        }}
        onInteractOutside={(event) => {
          if (pending || !dismissible) event.preventDefault()
        }}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}

        <div className={dialogCloseSlotVariants()}>
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
