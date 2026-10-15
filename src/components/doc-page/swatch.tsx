import { cn } from '@/lib/utils'

import { swatchClassName } from './classnames'
import { TokenSample } from './token-sample'

export interface SwatchProps {
  className: string
}

export function Swatch({ className }: SwatchProps) {
  return <TokenSample className={cn(swatchClassName, className)} />
}
