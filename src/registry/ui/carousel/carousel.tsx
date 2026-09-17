import { LayoutGroup } from 'motion/react'
import { useId, useRef } from 'react'

import { cn } from '@/lib/utils'

import { carouselClassName } from './classnames'
import { CarouselContext } from './context'
import { useCarouselItems } from './use-carousel-items'
import { useCarouselMountScroll } from './use-carousel-mount-scroll'
import { useCarouselRestState } from './use-carousel-rest-state'
import { useCarouselVisibleItems } from './use-carousel-visible-items'
import { hasNextPage, scrollByPages, scrollToItem } from './utils'

export interface CarouselProps extends React.ComponentProps<'section'> {
  'aria-label': string
  defaultIndex?: number
  onCurrentChange?: (index: number) => void
}

export function Carousel({
  defaultIndex = 0,
  onCurrentChange,
  className,
  children,
  ...props
}: CarouselProps) {
  const layoutGroupId = useId()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const { itemElements, registerItem } = useCarouselItems()

  const restState = useCarouselRestState({
    scrollerRef,
    itemElements,
    defaultIndex,
    onCurrentChange,
  })

  const visible = useCarouselVisibleItems({ scrollerRef, itemElements })

  useCarouselMountScroll({ scrollerRef, itemElements, defaultIndex })

  const scrollTo = (index: number) => {
    if (scrollerRef.current) {
      scrollToItem(scrollerRef.current, itemElements, index)
    }
  }

  const scrollPages = (pages: number) => {
    if (scrollerRef.current) {
      scrollByPages(scrollerRef.current, scrollerRef.current.scrollLeft, pages)
    }
  }

  return (
    <CarouselContext
      value={{
        scrollerRef,
        itemElements,
        registerItem,
        visible,
        current: restState.current,
        count: itemElements.length,
        canScrollPrev: restState.current > 0,
        canScrollNext: hasNextPage(restState),
        scrollTo,
        scrollPrev: () => scrollPages(-1),
        scrollNext: () => scrollPages(1),
      }}
    >
      <LayoutGroup id={layoutGroupId}>
        <section
          data-slot="carousel"
          aria-roledescription="carousel"
          className={cn(carouselClassName, className)}
          {...props}
        >
          {children}
        </section>
      </LayoutGroup>
    </CarouselContext>
  )
}
