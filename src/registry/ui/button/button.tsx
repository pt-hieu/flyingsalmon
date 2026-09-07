import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'
import { Spinner } from '@/registry/ui/spinner'

import { buttonLeadingIconVariants, buttonVariants } from './classnames'
import { spinnerSizeByButtonSize } from './spinner-size-by-button-size'
import { ButtonSize, ButtonVariant } from './types'

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
  variant = ButtonVariant.Default,
  size = ButtonSize.Default,
  loading = false,
  icon,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const rendersLabel = size !== ButtonSize.Icon && size !== ButtonSize.IconSmall

  const childrenAsIcon = rendersLabel ? null : children

  const leadingContent = loading ? (
    <Spinner aria-hidden size={spinnerSizeByButtonSize[size]} />
  ) : (
    (icon ?? childrenAsIcon)
  )

  return (
    <motion.button
      type="button"
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
