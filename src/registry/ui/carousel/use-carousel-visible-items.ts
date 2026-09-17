import { useEffect, useState } from 'react'

import { visibleItemIndexes } from './utils'

export function useCarouselVisibleItems({
  scrollerRef,
  itemElements,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>
  itemElements: HTMLElement[]
}): number[] {
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    const scrollerElement = scrollerRef.current

    if (!scrollerElement || itemElements.length === 0) return

    const visibleElements = new Set<HTMLElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleElements.add(entry.target as HTMLElement)
          } else {
            visibleElements.delete(entry.target as HTMLElement)
          }
        }

        setVisible(visibleItemIndexes(itemElements, visibleElements))
      },
      { root: scrollerElement },
    )

    for (const itemElement of itemElements) {
      observer.observe(itemElement)
    }

    return () => observer.disconnect()
  }, [itemElements, scrollerRef])

  return visible
}
