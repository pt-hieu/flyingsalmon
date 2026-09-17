import { useEffect, useRef, useState } from 'react'

import { carouselScrollRestInterval } from './carousel-scroll-rest-interval'
import { nearestItemIndex } from './utils'

export interface CarouselRestState {
  current: number
  scrollLeft: number
  clientWidth: number
  scrollWidth: number
}

export function useCarouselRestState({
  scrollerRef,
  itemElements,
  defaultIndex,
  onCurrentChange,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>
  itemElements: HTMLElement[]
  defaultIndex: number
  onCurrentChange?: (index: number) => void
}): CarouselRestState {
  const [restState, setRestState] = useState<CarouselRestState>({
    current: defaultIndex,
    scrollLeft: 0,
    clientWidth: 0,
    scrollWidth: 0,
  })

  const reportedCurrentRef = useRef(defaultIndex)
  const onCurrentChangeRef = useRef(onCurrentChange)

  useEffect(() => {
    onCurrentChangeRef.current = onCurrentChange
  }, [onCurrentChange])

  useEffect(() => {
    const scrollerElement = scrollerRef.current

    if (!scrollerElement) return

    const readScrollerBox = () => ({
      scrollLeft: scrollerElement.scrollLeft,
      clientWidth: scrollerElement.clientWidth,
      scrollWidth: scrollerElement.scrollWidth,
    })

    const measure = () => {
      setRestState((rest) => ({ ...rest, ...readScrollerBox() }))
    }

    const settle = () => {
      const current = nearestItemIndex(
        itemElements.map((itemElement) => itemElement.offsetLeft),
        scrollerElement.scrollLeft,
      )

      setRestState({ current, ...readScrollerBox() })

      if (current !== reportedCurrentRef.current) {
        reportedCurrentRef.current = current
        onCurrentChangeRef.current?.(current)
      }
    }

    let restTimer: ReturnType<typeof setTimeout> | undefined

    const settleNow = () => {
      clearTimeout(restTimer)
      settle()
    }

    const settleAfterRest = () => {
      clearTimeout(restTimer)
      restTimer = setTimeout(settle, carouselScrollRestInterval)
    }

    measure()

    scrollerElement.addEventListener('scrollend', settleNow)
    scrollerElement.addEventListener('scroll', settleAfterRest)

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(scrollerElement)

    return () => {
      clearTimeout(restTimer)
      scrollerElement.removeEventListener('scrollend', settleNow)
      scrollerElement.removeEventListener('scroll', settleAfterRest)
      resizeObserver.disconnect()
    }
  }, [itemElements, scrollerRef])

  return restState
}
