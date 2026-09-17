import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

import { alertStatusByVariant } from './alert-status-by-variant'
import {
  alertCloseButtonClassName,
  alertContentClassName,
  alertIconVariants,
  alertPresenceClassName,
  alertVariants,
} from './classnames'
import { AlertSize, AlertVariant } from './types'

export interface AlertProps extends React.ComponentProps<'div'> {
  variant?: AlertVariant
  size?: AlertSize
  icon?: React.ReactNode
  onClose?: () => void
  open?: boolean
  animateOpen?: boolean
}

export function Alert({
  variant = AlertVariant.Info,
  size = AlertSize.Default,
  icon,
  onClose,
  open = true,
  animateOpen = true,
  role,
  className,
  children,
  ...props
}: AlertProps) {
  const { role: variantRole, StatusIcon } = alertStatusByVariant[variant]
  const statusIcon = icon === undefined ? <StatusIcon /> : icon

  /**
   * A surface that brings its own entrance, such as notice, would otherwise run
   * two springs on the same card and read as two separate arrivals.
   */
  const openAnimation = animateOpen
    ? {
        initial: { height: 0, opacity: 0 },
        animate: { height: 'auto', opacity: 1, transition: springSettle },
        exit: { height: 0, opacity: 0, transition: springSettle },
      }
    : {}

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="alert"
          {...openAnimation}
          className={alertPresenceClassName}
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

            <div className={alertContentClassName}>{children}</div>

            {onClose ? (
              <Button
                variant={ButtonVariant.Ghost}
                size={ButtonSize.IconSmall}
                aria-label="Dismiss"
                onClick={onClose}
                className={alertCloseButtonClassName}
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
