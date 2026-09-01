import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'
import { Button } from '@/registry/ui/button'

const alertVariants = {
  info: {
    role: 'status',
    StatusIcon: Info,
    iconColorClasses: 'text-primary',
  },
  success: {
    role: 'status',
    StatusIcon: CircleCheck,
    iconColorClasses: 'text-success-foreground',
  },
  warning: {
    role: 'status',
    StatusIcon: TriangleAlert,
    iconColorClasses: 'text-warning-foreground',
  },
  error: {
    role: 'alert',
    StatusIcon: CircleAlert,
    iconColorClasses: 'text-error-foreground',
  },
} as const

const alertSizes = {
  default: {
    surfaceClasses: 'gap-3 p-4',
    iconSizeClasses: '[&_svg]:size-5',
  },
  sm: {
    surfaceClasses: 'gap-2.5 p-3',
    iconSizeClasses: '[&_svg]:size-4',
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
              'bg-card text-card-foreground border-border flex items-start rounded-lg border text-sm',
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
                  variantStyles.iconColorClasses,
                  sizeStyles.iconSizeClasses,
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
                className="text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-offset-card active:ring-offset-card -my-1.5 -mr-1.5"
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
  return <div className={cn('text-muted-foreground', className)} {...props} />
}
