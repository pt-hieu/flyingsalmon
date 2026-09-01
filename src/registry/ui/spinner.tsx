import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spinner shrink-0', {
  variants: {
    size: {
      default: 'size-4',
      sm: 'size-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type SpinnerSize = NonNullable<
  VariantProps<typeof spinnerVariants>['size']
>

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
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  )
}
