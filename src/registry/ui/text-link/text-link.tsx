import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

import { textLinkClassName } from './classnames'

export interface TextLinkProps extends React.ComponentProps<'a'> {
  asChild?: boolean
}

export function TextLink({
  asChild = false,
  className,
  ...props
}: TextLinkProps) {
  const Anchor = asChild ? Slot.Root : 'a'

  return <Anchor className={cn(textLinkClassName, className)} {...props} />
}
