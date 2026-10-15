import { useLayoutEffect, useState } from 'react'

export function useHorizontalOverflow(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const [overflows, setOverflows] = useState(false)

  useLayoutEffect(() => {
    const container = containerRef.current

    if (!container) return

    const measure = () =>
      setOverflows(container.scrollWidth > container.clientWidth)

    measure()

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(container)

    if (container.firstElementChild) {
      resizeObserver.observe(container.firstElementChild)
    }

    return () => resizeObserver.disconnect()
  }, [containerRef])

  return overflows
}
