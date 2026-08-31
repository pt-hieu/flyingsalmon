import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'
import { Button } from '@/registry/ui/button'

const alertVariants = {
  info: {
    role: 'status',
    StatusIcon: Info,
    surfaceClasses:
      'bg-accent text-accent-foreground border-indigo-200 dark:border-indigo-800',
    closeButtonClasses:
      'hover:bg-indigo-100 dark:hover:bg-indigo-900 focus-visible:ring-offset-accent active:ring-offset-accent',
  },
  success: {
    role: 'status',
    StatusIcon: CircleCheck,
    surfaceClasses:
      'bg-success text-success-foreground border-green-300 dark:border-green-800',
    closeButtonClasses:
      'hover:bg-green-200 dark:hover:bg-green-900 focus-visible:ring-offset-success active:ring-offset-success',
  },
  warning: {
    role: 'status',
    StatusIcon: TriangleAlert,
    surfaceClasses:
      'bg-warning text-warning-foreground border-amber-300 dark:border-amber-800',
    closeButtonClasses:
      'hover:bg-amber-200 dark:hover:bg-amber-900 focus-visible:ring-offset-warning active:ring-offset-warning',
  },
  error: {
    role: 'alert',
    StatusIcon: CircleAlert,
    surfaceClasses:
      'bg-error text-error-foreground border-red-300 dark:border-red-800',
    closeButtonClasses:
      'hover:bg-red-200 dark:hover:bg-red-900 focus-visible:ring-offset-error active:ring-offset-error',
  },
} as const

const alertSizes = {
  default: {
    surfaceClasses: 'gap-3 p-4',
    iconClasses: '[&_svg]:size-5',
  },
  sm: {
    surfaceClasses: 'gap-2.5 p-3',
    iconClasses: '[&_svg]:size-4',
  },
} as const

export type AlertVariant = keyof typeof alertVariants
export type AlertSize = keyof typeof alertSizes

export interface AlertProps extends React.ComponentProps<'div'> {
  variant?: AlertVariant
  size?: AlertSize
  icon?: React.ReactNode
  onClose?: () => void
  open?: boolean
}

export function Alert({
  variant = 'info',
  size = 'default',
  icon,
  onClose,
  open = true,
  role,
  className,
  children,
  ...props
}: AlertProps) {
  const variantStyles = alertVariants[variant]
  const sizeStyles = alertSizes[size]
  const { StatusIcon } = variantStyles
  const statusIcon = icon === undefined ? <StatusIcon /> : icon

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="alert"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: springBounce }}
          exit={{ height: 0, opacity: 0, transition: springSettle }}
          className="overflow-hidden"
        >
          <div
            role={role ?? variantStyles.role}
            className={cn(
              'flex items-start rounded-lg border text-sm',
              variantStyles.surfaceClasses,
              sizeStyles.surfaceClasses,
              className,
            )}
            {...props}
          >
            {statusIcon ? (
              <span
                aria-hidden
                className={cn(
                  'flex h-5 shrink-0 items-center',
                  sizeStyles.iconClasses,
                )}
              >
                {statusIcon}
              </span>
            ) : null}

            <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>

            {onClose ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Dismiss"
                onClick={onClose}
                className={cn(
                  '-my-1.5 -mr-1.5 text-current hover:text-current',
                  variantStyles.closeButtonClasses,
                )}
              >
                <X />
              </Button>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('font-sans font-medium', className)} {...props} />
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={className} {...props} />
}
