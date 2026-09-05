import { cva } from 'class-variance-authority'

import { SpinnerSize } from './types'

export const spinnerVariants = cva('animate-spinner shrink-0', {
  variants: {
    size: {
      [SpinnerSize.Default]: 'size-4',
      [SpinnerSize.Small]: 'size-3',
    },
  },
  defaultVariants: {
    size: SpinnerSize.Default,
  },
})
