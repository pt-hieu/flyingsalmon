import { Dialog as DialogPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { dialogDescriptionClassName } from './classnames'

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(dialogDescriptionClassName, className)}
      {...props}
    />
  )
}
