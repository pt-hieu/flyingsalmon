import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { spinnerVariants } from './classnames'
import { SpinnerSize } from './types'

export interface SpinnerProps extends React.ComponentProps<'svg'> {
  size?: SpinnerSize
  label?: string
}

export function Spinner({
  size = SpinnerSize.Default,
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}
