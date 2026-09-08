import { Separator as SeparatorPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { separatorClassName } from './classnames'
import { SeparatorOrientation, type SeparatorRootProps } from './types'

export interface SeparatorProps extends Omit<
  SeparatorRootProps,
  'asChild' | 'children' | 'orientation'
> {
  orientation?: SeparatorOrientation
}

export function Separator({
  orientation = SeparatorOrientation.Horizontal,
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={cn(separatorClassName(orientation), className)}
      {...props}
    />
  )
}
