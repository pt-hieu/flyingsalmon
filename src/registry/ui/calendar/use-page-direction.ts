import type { CalendarDate } from '@internationalized/date'
import { useState } from 'react'

import { CalendarPageDirection } from './types'

interface Page {
  start: CalendarDate
  direction?: CalendarPageDirection
}

export function usePageDirection(
  visibleStart: CalendarDate,
): CalendarPageDirection | undefined {
  const [page, setPage] = useState<Page>({ start: visibleStart })

  if (page.start.compare(visibleStart) !== 0) {
    setPage({
      start: visibleStart,
      direction:
        visibleStart.compare(page.start) > 0
          ? CalendarPageDirection.Forward
          : CalendarPageDirection.Backward,
    })
  }

  return page.direction
}
