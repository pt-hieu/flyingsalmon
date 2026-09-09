export enum CalendarMode {
  Single = 'single',
  Range = 'range',
}

export enum CalendarPageDirection {
  Forward = 'forward',
  Backward = 'backward',
}

export interface CalendarRange {
  start: string
  end: string
}

export interface DayAppearance {
  hidden: boolean
  unavailable: boolean
  filled: boolean
  interior: boolean
  bandStart: boolean
  bandEnd: boolean
  highlighted: boolean
  today: boolean
}
