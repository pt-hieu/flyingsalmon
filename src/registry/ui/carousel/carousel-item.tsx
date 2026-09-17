import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { carouselItemClassName } from './classnames'
import { useCarouselSharedState } from './use-carousel'

export interface CarouselItemProps extends React.ComponentProps<'div'> {
  'aria-label': string
}

export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { registerItem, itemElements, current, visible } =
    useCarouselSharedState()

  const [itemElement, setItemElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!itemElement) return

    return registerItem(itemElement)
  }, [itemElement, registerItem])

  const index = itemElement ? itemElements.indexOf(itemElement) : -1

  return (
    <div
      ref={setItemElement}
      data-slot="carousel-item"
      role="group"
      data-current={index === current ? 'true' : undefined}
      data-visible={visible.includes(index) ? 'true' : undefined}
      className={cn(carouselItemClassName, className)}
      {...props}
    />
  )
}
