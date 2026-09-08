import { cn } from '@/lib/utils'

import { SeparatorOrientation } from './types'

const separatorAxisClassNames: Record<SeparatorOrientation, string> = {
  [SeparatorOrientation.Horizontal]: 'h-px w-full',
  [SeparatorOrientation.Vertical]: 'w-px self-stretch',
}

export function separatorClassName(orientation: SeparatorOrientation) {
  return cn('bg-border shrink-0', separatorAxisClassNames[orientation])
}
