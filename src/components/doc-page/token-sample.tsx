import { cn } from '@/lib/utils'

import { tokenSampleClassName } from './classnames'

export interface TokenSampleProps {
  className: string
}

export function TokenSample({ className }: TokenSampleProps) {
  return <span aria-hidden className={cn(tokenSampleClassName, className)} />
}
