import { Dialog as DialogPrimitive } from 'radix-ui'

export interface DialogTriggerProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Trigger>,
  'asChild'
> {
  children: React.ReactElement
}

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild {...props}>
      {children}
    </DialogPrimitive.Trigger>
  )
}
