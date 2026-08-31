import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

const spinnerSizeClasses = {
  default: 'size-4',
  sm: 'size-3',
} as const

export type SpinnerSize = keyof typeof spinnerSizeClasses

export interface SpinnerProps extends React.ComponentProps<'svg'> {
  size?: SpinnerSize
  label?: string
}

export function Spinner({
  size = 'default',
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label={label}
      className={cn(
        'animate-spinner shrink-0',
        spinnerSizeClasses[size],
        className,
      )}
      {...props}
    />
  )
}
