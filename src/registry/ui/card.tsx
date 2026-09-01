import { createContext, use } from 'react'

import { cn } from '@/lib/utils'

const CardInteractiveContext = createContext(false)

const interactiveCardClasses = cn(
  'relative transition-colors duration-(--motion-fast)',
  'hover:border-primary',
)

const stretchedTitleLinkClasses = cn(
  "[&>a]:after:absolute [&>a]:after:inset-0 [&>a]:after:content-[''] [&>a]:after:rounded-lg",
  '[&>a]:after:ring-primary [&>a]:after:ring-0',
  '[&>a]:after:transition-[box-shadow] [&>a]:after:duration-(--motion-fast)',
  '[&>a]:focus-visible:outline-none',
  '[&>a]:focus-visible:after:ring-ring [&>a]:focus-visible:after:ring-2',
  '[&>a]:active:after:ring-primary [&>a]:active:after:ring-2',
)

const aboveStretchedLinkClasses =
  '[&_a]:relative [&_a]:z-10 [&_button]:relative [&_button]:z-10'

export interface CardProps extends React.ComponentProps<'div'> {
  interactive?: boolean
}

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <CardInteractiveContext value={interactive}>
      <div
        data-slot="card"
        data-interactive={interactive || undefined}
        className={cn(
          'bg-card text-card-foreground border-border flex flex-col rounded-lg border',
          'gap-(--card-spacing) py-(--card-spacing)',
          interactive && interactiveCardClasses,
          className,
        )}
        {...props}
      />
    </CardInteractiveContext>
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1 px-(--card-spacing)', className)}
      {...props}
    />
  )
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-heading leading-none font-semibold',
        interactive && stretchedTitleLinkClasses,
        className,
      )}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-muted-foreground text-sm',
        interactive && aboveStretchedLinkClasses,
        className,
      )}
      {...props}
    />
  )
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-action"
      className={cn(
        'mt-auto flex items-center justify-end gap-2 px-(--card-spacing)',
        interactive && aboveStretchedLinkClasses,
        className,
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-content"
      className={cn(
        'px-(--card-spacing)',
        interactive && aboveStretchedLinkClasses,
        className,
      )}
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const interactive = use(CardInteractiveContext)

  return (
    <div
      data-slot="card-footer"
      className={cn(
        'flex items-center gap-2 px-(--card-spacing)',
        interactive && aboveStretchedLinkClasses,
        className,
      )}
      {...props}
    />
  )
}
