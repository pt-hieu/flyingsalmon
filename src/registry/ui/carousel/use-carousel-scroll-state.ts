import { useEffect, useRef, useState } from 'react'

import type { CarouselScrollState } from './types'
import { itemStarts, nearestItemIndex } from './utils'

export function useCarouselScrollState({
  scrollerRef,
  itemElements,
  defaultIndex,
  onCurrentChange,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>
  itemElements: HTMLElement[]
  defaultIndex: number
  onCurrentChange?: (index: number) => void
}): CarouselScrollState {
  const [scrollState, setScrollState] = useState<CarouselScrollState>({
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
      setScrollState((scroll) => ({ ...scroll, ...readScrollerBox() }))
    }

    const follow = () => {
      const current = nearestItemIndex(
        itemStarts(itemElements),
        scrollerElement.scrollLeft,
      )

      setScrollState({ current, ...readScrollerBox() })

      if (current !== reportedCurrentRef.current) {
        reportedCurrentRef.current = current
        onCurrentChangeRef.current?.(current)
      }
    }

    measure()

    scrollerElement.addEventListener('scroll', follow)

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(scrollerElement)

    return () => {
      scrollerElement.removeEventListener('scroll', follow)
      resizeObserver.disconnect()
    }
  }, [itemElements, scrollerRef])

  return scrollState
}
