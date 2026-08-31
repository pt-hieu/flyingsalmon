import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'
import { Spinner } from '@/registry/ui/spinner'

const buttonVariantClasses = {
  default:
    'bg-primary text-primary-foreground ring-primary hover:bg-indigo-700 dark:hover:bg-indigo-500 dark:hover:text-white',
  outline:
    'border-input border bg-background text-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
  secondary:
    'bg-secondary text-secondary-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
  ghost:
    'text-foreground ring-ring hover:bg-accent hover:text-accent-foreground',
  destructive:
    'bg-error text-error-foreground ring-destructive hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200',
} as const

const buttonSizes = {
  default: {
    classes: 'h-9 gap-2 px-4 text-sm',
    spinnerSize: 'default',
    leadingIconClasses: '[&_svg]:size-4',
  },
  sm: {
    classes: 'h-8 gap-1.5 px-3 text-sm',
    spinnerSize: 'sm',
    leadingIconClasses: '[&_svg]:size-3',
  },
  icon: {
    classes: 'size-9',
    spinnerSize: 'default',
    leadingIconClasses: '[&_svg]:size-4',
  },
  'icon-sm': {
    classes: 'size-8',
    spinnerSize: 'sm',
    leadingIconClasses: '[&_svg]:size-3',
  },
} as const

const pressRingClasses =
  'active:ring-offset-background active:ring-2 active:ring-offset-2'

export type ButtonVariant = keyof typeof buttonVariantClasses
export type ButtonSize = keyof typeof buttonSizes

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
  const sizeStyles = buttonSizes[size]

  const childrenAsIcon = rendersLabel ? null : children

  const leadingContent = loading ? (
    <Spinner aria-hidden size={sizeStyles.spinnerSize} />
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
        'outline-none focus-visible:ring-offset-background focus-visible:ring-3 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        buttonVariantClasses[variant],
        sizeStyles.classes,
        loading ? 'cursor-default' : pressRingClasses,
        className,
      )}
      {...props}
    >
      {leadingContent ? (
        <motion.span
          layout
          transition={springBounce}
          className={cn(
            'flex shrink-0 items-center',
            sizeStyles.leadingIconClasses,
          )}
        >
          {leadingContent}
        </motion.span>
      ) : null}

      {rendersLabel ? (
        <motion.span layout transition={springBounce}>
          {children}
        </motion.span>
      ) : null}
    </motion.button>
  )
}
