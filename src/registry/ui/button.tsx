import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'
import { Spinner } from '@/registry/ui/spinner'

const buttonVariantClasses = {
  default:
    'bg-primary text-primary-foreground hover:bg-indigo-700 dark:hover:bg-indigo-300',
  outline:
    'border-input border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700',
  ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
  destructive:
    'bg-error text-error-foreground hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200',
} as const

const buttonSizeClasses = {
  default: 'h-9 gap-2 px-4 text-sm',
  sm: 'h-8 gap-1.5 px-3 text-sm',
  icon: 'size-9',
  'icon-sm': 'size-8',
} as const

const leadingSlotSizes = {
  default: { spinner: 'default', icon: '[&_svg]:size-4' },
  sm: { spinner: 'sm', icon: '[&_svg]:size-3' },
  icon: { spinner: 'default', icon: '[&_svg]:size-4' },
  'icon-sm': { spinner: 'sm', icon: '[&_svg]:size-3' },
} as const

const pressRingClasses =
  'active:ring-primary active:ring-offset-background active:ring-2 active:ring-offset-2'

export type ButtonVariant = keyof typeof buttonVariantClasses
export type ButtonSize = keyof typeof buttonSizeClasses

export interface ButtonProps extends Omit<
  React.ComponentProps<'button'>,
  'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
}

export function Button({
  variant = 'default',
  size = 'default',
  loading = false,
  icon,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const rendersLabel = size !== 'icon' && size !== 'icon-sm'
  const leadingSlotSize = leadingSlotSizes[size]

  const childrenAsIcon = rendersLabel ? null : children

  const leadingContent = loading ? (
    <Spinner aria-hidden size={leadingSlotSize.spinner} />
  ) : (
    (icon ?? childrenAsIcon)
  )

  return (
    <motion.button
      layout
      transition={springBounce}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        onClick?.(event)
      }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap',
        'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast)',
        'outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-3 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        loading ? 'cursor-default' : pressRingClasses,
        className,
      )}
      {...props}
    >
      {leadingContent ? (
        <motion.span
          layout
          className={cn('flex shrink-0 items-center', leadingSlotSize.icon)}
        >
          {leadingContent}
        </motion.span>
      ) : null}

      {rendersLabel ? <motion.span layout>{children}</motion.span> : null}
    </motion.button>
  )
}
