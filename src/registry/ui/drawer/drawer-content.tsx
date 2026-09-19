import { cn } from '@/lib/utils'
import { DialogSurface, type DialogSurfaceProps } from '@/registry/ui/dialog'

import { drawerContentVariants } from './classnames'

export interface DrawerContentProps extends DialogSurfaceProps {
  fitContent?: boolean
}

export function DrawerContent({
  className,
  fitContent = false,
  ...props
}: DrawerContentProps) {
  return (
    <DialogSurface
      className={cn(drawerContentVariants({ fitContent }), className)}
      {...props}
    />
  )
}
