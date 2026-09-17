import { useEffect, useRef } from 'react'

import { clampIndex } from './utils'

export function useCarouselMountScroll({
  scrollerRef,
  itemElements,
  defaultIndex,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>
  itemElements: HTMLElement[]
  defaultIndex: number
}) {
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    if (hasScrolledRef.current) return

    const scrollerElement = scrollerRef.current
    const itemElement =
      itemElements[clampIndex(defaultIndex, itemElements.length)]

    if (!scrollerElement || !itemElement) return

    hasScrolledRef.current = true
    scrollerElement.scrollTo({
      left: itemElement.offsetLeft,
      behavior: 'instant',
    })
  }, [defaultIndex, itemElements, scrollerRef])
}
