import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { dialogDescriptionClassName } from './classnames'

export interface DialogDescriptionProps extends React.ComponentProps<
  typeof DialogPrimitive.Description
> {}

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      {...props}
    />
  )
}
