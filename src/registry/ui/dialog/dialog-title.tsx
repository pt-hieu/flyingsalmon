import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { dialogTitleClassName } from './classnames'

export interface DialogTitleProps extends React.ComponentProps<
  typeof DialogPrimitive.Title
> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      {...props}
    />
  )
}
