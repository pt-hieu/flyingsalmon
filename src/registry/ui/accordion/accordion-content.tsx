import { Accordion as AccordionPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import {
  accordionContentBodyClassName,
  accordionContentClassName,
} from './classnames'

export type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={accordionContentClassName}
      {...props}
    >
      <div className={cn(accordionContentBodyClassName, className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
