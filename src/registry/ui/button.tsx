import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'
import { Spinner, type SpinnerSize } from '@/registry/ui/spinner'

const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow] duration-(--motion-fast)',
    'outline-none focus-visible:ring-offset-background focus-visible:ring-3 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  {
    variants: {
      variant: {
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
      },
      size: {
        default: 'h-9 gap-2 px-4 text-sm',
        sm: 'h-8 gap-1.5 px-3 text-sm',
        icon: 'size-9',
        'icon-sm': 'size-8',
      },
      loading: {
        true: 'cursor-default',
        false:
          'active:ring-offset-background active:ring-2 active:ring-offset-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  },
)

const buttonLeadingIconVariants = cva('flex shrink-0 items-center', {
  variants: {
    size: {
      default: '[&_svg]:size-4',
      sm: '[&_svg]:size-3',
      icon: '[&_svg]:size-4',
      'icon-sm': '[&_svg]:size-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>['variant']
>
export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>['size']
>

const spinnerSizeByButtonSize = {
  default: 'default',
  sm: 'sm',
  icon: 'default',
  'icon-sm': 'sm',
} as const satisfies Record<ButtonSize, SpinnerSize>

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

  const childrenAsIcon = rendersLabel ? null : children

  const leadingContent = loading ? (
    <Spinner aria-hidden size={spinnerSizeByButtonSize[size]} />
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
      className={cn(buttonVariants({ variant, size, loading }), className)}
      {...props}
    >
      {leadingContent ? (
        <motion.span
          layout
          transition={springBounce}
          className={buttonLeadingIconVariants({ size })}
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
