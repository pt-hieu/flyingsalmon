import { Accordion as AccordionPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { accordionItemClassName } from './classnames'

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn(accordionItemClassName, className)}
      {...props}
    />
  )
}
