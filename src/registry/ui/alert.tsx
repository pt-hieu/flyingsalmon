import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'
import { Button } from '@/registry/ui/button'

const alertVariants = cva(
  'bg-card text-card-foreground border-border flex items-start rounded-lg border text-sm',
  {
    variants: {
      size: {
        default: 'gap-3 p-4',
        sm: 'gap-2.5 p-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const alertIconVariants = cva('flex h-5 shrink-0 items-center', {
  variants: {
    variant: {
      info: 'text-primary',
      success: 'text-success-foreground',
      warning: 'text-warning-foreground',
      error: 'text-error-foreground',
    },
    size: {
      default: '[&_svg]:size-5',
      sm: '[&_svg]:size-4',
    },
  },
  defaultVariants: {
    variant: 'info',
    size: 'default',
  },
})

export type AlertVariant = NonNullable<
  VariantProps<typeof alertIconVariants>['variant']
>
export type AlertSize = NonNullable<VariantProps<typeof alertVariants>['size']>

const alertStatusByVariant = {
  info: { role: 'status', StatusIcon: Info },
  success: { role: 'status', StatusIcon: CircleCheck },
  warning: { role: 'status', StatusIcon: TriangleAlert },
  error: { role: 'alert', StatusIcon: CircleAlert },
} as const satisfies Record<
  AlertVariant,
  { role: string; StatusIcon: React.ElementType }
>

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
  const { role: variantRole, StatusIcon } = alertStatusByVariant[variant]
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
            role={role ?? variantRole}
            className={cn(alertVariants({ size }), className)}
            {...props}
          >
            {statusIcon ? (
              <span
                aria-hidden
                className={alertIconVariants({ variant, size })}
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
