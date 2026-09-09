import { createContext } from 'react'

import { CalendarMode, type CalendarAppearance } from './types'

export const CalendarAppearanceContext = createContext<CalendarAppearance>({
  mode: CalendarMode.Single,
  calendarDisabled: false,
})
