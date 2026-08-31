import { motion } from 'motion/react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

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
        className={cn(
          'group inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5',
          'data-[state=unchecked]:justify-start data-[state=checked]:justify-end',
          'data-[state=unchecked]:bg-muted-foreground data-[state=checked]:bg-primary',
          'transition-[background-color,box-shadow] duration-(--motion-fast)',
          'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          loading
            ? 'cursor-not-allowed'
            : [
                'data-[state=unchecked]:hover:bg-neutral-600 dark:data-[state=unchecked]:hover:bg-neutral-300',
                'data-[state=checked]:hover:bg-indigo-700 dark:data-[state=checked]:hover:bg-indigo-300',
              ],
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span layout transition={springBounce} className="size-5">
            <span
              className={cn(
                'block size-full rounded-full',
                'group-data-[state=unchecked]:bg-background group-data-[state=checked]:bg-primary-foreground',
                loading && 'animate-switch-thumb-pulse',
              )}
            />
          </motion.span>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>

      {label ? (
        <label
          htmlFor={switchId}
          className={cn(
            'text-foreground text-sm font-medium transition-opacity duration-(--motion-fast)',
            disabled && 'opacity-50',
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  )
}
