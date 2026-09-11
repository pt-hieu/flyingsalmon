import { SpinnerSize } from '@/registry/ui/spinner'

import { DatePickerSize } from './types'

export const spinnerSizeByDatePickerSize: Record<DatePickerSize, SpinnerSize> =
  {
    [DatePickerSize.Default]: SpinnerSize.Default,
    [DatePickerSize.Small]: SpinnerSize.Small,
  }
