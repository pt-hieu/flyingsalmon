import { Accordion as AccordionPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

import { accordionRootClassName } from './classnames'
import { AccordionType } from './types'

type AccordionSharedProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root>,
  'type' | 'value' | 'defaultValue' | 'onValueChange' | 'orientation' | 'dir'
>

export interface AccordionSingleProps extends AccordionSharedProps {
  type: AccordionType.Single
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

export interface AccordionMultipleProps extends AccordionSharedProps {
  type?: AccordionType.Multiple
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

export function Accordion(props: AccordionProps) {
  const className = cn(accordionRootClassName, props.className)

  if (props.type === AccordionType.Single) {
    const { collapsible = true, ...singleProps } = props

    return (
      <AccordionPrimitive.Root
        {...singleProps}
        collapsible={collapsible}
        className={className}
      />
    )
  }

  return (
    <AccordionPrimitive.Root
      {...props}
      type={AccordionType.Multiple}
      className={className}
    />
  )
}
