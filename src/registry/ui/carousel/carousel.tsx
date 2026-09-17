import { useRef } from 'react'

import { cn } from '@/lib/utils'

import { carouselClassName } from './classnames'
import { CarouselContext } from './context'
import { useCarouselItems } from './use-carousel-items'
import { useCarouselMountScroll } from './use-carousel-mount-scroll'
import { useCarouselScrollState } from './use-carousel-scroll-state'
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
  const scrollerRef = useRef<HTMLDivElement>(null)

  const { itemElements, registerItem } = useCarouselItems()

  const scrollState = useCarouselScrollState({
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
        current: scrollState.current,
        count: itemElements.length,
        canScrollPrev: scrollState.current > 0,
        canScrollNext: hasNextPage(scrollState),
        scrollTo,
        scrollPrev: () => scrollPages(-1),
        scrollNext: () => scrollPages(1),
      }}
    >
      <section
        data-slot="carousel"
        aria-roledescription="carousel"
        className={cn(carouselClassName, className)}
        {...props}
      >
        {children}
      </section>
    </CarouselContext>
  )
}
