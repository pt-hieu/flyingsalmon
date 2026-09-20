import { use } from 'react'

import { cn } from '@/lib/utils'

import { dialogContentVariants } from './classnames'
import { DialogContext } from './context'
import { DialogSurface, type DialogSurfaceProps } from './dialog-surface'

export interface DialogContentProps extends DialogSurfaceProps {}

export function DialogContent({ className, ...props }: DialogContentProps) {
  const { size } = use(DialogContext)

  return (
    <DialogSurface
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    />
  )
}
