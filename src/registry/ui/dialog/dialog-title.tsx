import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { dialogTitleClassName } from './classnames'

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(dialogTitleClassName, className)}
      {...props}
    />
  )
}
