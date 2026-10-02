import { isValidElement } from 'react'

export function onlyHeadingElement(children: React.ReactNode) {
  if (
    !isValidElement<{
      children?: React.ReactNode
      className?: string
    }>(children)
  ) {
    throw new Error(
      'AccordionTrigger with asChild expects a single heading element as its child',
    )
  }

  return children
}
