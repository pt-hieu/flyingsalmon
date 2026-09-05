import { Dialog as DialogPrimitive } from 'radix-ui'

export interface DialogCloseProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Close>,
  'asChild'
> {
  children: React.ReactElement
}

export function DialogClose({ children, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close asChild {...props}>
      {children}
    </DialogPrimitive.Close>
  )
}
