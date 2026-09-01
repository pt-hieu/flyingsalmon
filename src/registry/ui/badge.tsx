import { cn } from '@/lib/utils'

const badgeVariantClasses = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  outline: 'border-border text-foreground',
  success: 'border-transparent bg-success text-success-foreground',
  warning: 'border-transparent bg-warning text-warning-foreground',
  error: 'border-transparent bg-error text-error-foreground',
} as const

export type BadgeVariant = keyof typeof badgeVariantClasses

export interface BadgeProps extends Omit<
  React.ComponentProps<'span'>,
  'tabIndex'
> {
  variant?: BadgeVariant
  icon?: React.ReactNode
}

export function Badge({
  variant = 'default',
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-5 w-fit shrink-0 items-center gap-1 rounded-full border px-2 text-xs font-medium whitespace-nowrap',
        badgeVariantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span aria-hidden className="flex shrink-0 [&>svg]:size-3">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  )
}
