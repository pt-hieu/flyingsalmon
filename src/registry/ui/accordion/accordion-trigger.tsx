import { ChevronDown } from 'lucide-react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { cloneElement } from 'react'

import { cn } from '@/lib/utils'

import {
  accordionChevronClassName,
  accordionHeaderClassName,
  accordionTriggerClassName,
  accordionTriggerLabelClassName,
} from './classnames'
import { onlyHeadingElement } from './only-heading-element'

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>

export function AccordionTrigger({
  asChild = false,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const heading = asChild ? onlyHeadingElement(children) : undefined

  const trigger = (
    <AccordionPrimitive.Trigger
      className={cn(accordionTriggerClassName, className)}
      {...props}
    >
      <span className={accordionTriggerLabelClassName}>
        {heading ? heading.props.children : children}
      </span>
      <ChevronDown aria-hidden className={accordionChevronClassName} />
    </AccordionPrimitive.Trigger>
  )

  return (
    <AccordionPrimitive.Header
      asChild={Boolean(heading)}
      className={accordionHeaderClassName}
    >
      {heading ? cloneElement(heading, undefined, trigger) : trigger}
    </AccordionPrimitive.Header>
  )
}
