import { cva } from 'class-variance-authority'
import { motion } from 'motion/react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import {
  disabledInteraction,
  offsetFocusRingGeometry,
} from '@/registry/lib/interaction'
import { springBounce } from '@/registry/lib/motion'

const switchVariants = cva(
  cn(
    'group inline-flex h-6 w-11 shrink-0 items-center rounded-full p-1',
    'data-[state=unchecked]:justify-start data-[state=checked]:justify-end',
    'data-[state=unchecked]:bg-muted-foreground data-[state=checked]:bg-primary',
    'transition-[background-color,box-shadow] duration-(--motion-fast)',
    'focus-visible:ring-ring',
    offsetFocusRingGeometry,
    disabledInteraction,
  ),
  {
    variants: {
      loading: {
        true: 'cursor-not-allowed',
        false: cn(
          'data-[state=unchecked]:hover:bg-neutral-600 dark:data-[state=unchecked]:hover:bg-neutral-500',
          'data-[state=checked]:hover:bg-indigo-700 dark:data-[state=checked]:hover:bg-indigo-500',
        ),
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)

const switchThumbVariants = cva(
  cn(
    'block size-full rounded-full',
    'group-data-[state=unchecked]:bg-background group-data-[state=checked]:bg-primary-foreground',
  ),
  {
    variants: {
      loading: {
        true: 'animate-switch-thumb-pulse',
        false: '',
      },
    },
    defaultVariants: {
      loading: false,
    },
  },
)

const switchLabelVariants = cva(
  'text-foreground text-sm font-medium transition-opacity duration-(--motion-fast)',
  {
    variants: {
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export interface SwitchProps extends Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  'asChild' | 'children'
> {
  label?: string
  loading?: boolean
}

export function Switch({
  label,
  loading = false,
  className,
  id,
  disabled,
  onClick,
  ...props
}: SwitchProps) {
  const generatedId = useId()
  const switchId = id ?? generatedId

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <SwitchPrimitive.Root
        id={switchId}
        disabled={disabled}
        aria-disabled={loading || undefined}
        onClick={(event) => {
          if (loading) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
        className={switchVariants({ loading })}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span layout transition={springBounce} className="size-4">
            <span className={switchThumbVariants({ loading })} />
          </motion.span>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>

      {label ? (
        <label
          htmlFor={switchId}
          className={switchLabelVariants({ disabled: Boolean(disabled) })}
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}
