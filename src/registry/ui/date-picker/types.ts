import type { CalendarDate } from '@internationalized/date'

import type { CalendarRange } from '@/registry/ui/calendar'

export enum DatePickerMode {
  Single = 'single',
  Range = 'range',
}

export enum DatePickerSize {
  Default = 'default',
  Small = 'sm',
}

export enum DatePickerPanelSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum DatePickerPanelAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export type DatePickerRange = CalendarRange

export type DatePickerValue = string | DatePickerRange | null

export interface DatePickerEntry {
  start: CalendarDate | null
  end: CalendarDate | null
}

export interface DatePickerLimits {
  min?: string
  max?: string
  isDateDisabled?: (date: string) => boolean
}
