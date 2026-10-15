import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const aboveStretchedLinkClasses =
  '[&_:is(a,button,input,select,textarea,label,[tabindex]):not([aria-hidden=true],[type=hidden])]:relative [&_:is(a,button,input,select,textarea,label,[tabindex]):not([aria-hidden=true],[type=hidden])]:z-10'

const aboveStretchedLinkVariants = {
  variants: {
    interactive: {
      true: aboveStretchedLinkClasses,
      false: '',
    },
  },
  defaultVariants: {
    interactive: false,
  },
}

export const cardVariants = cva(
  cn(
    'bg-card text-card-foreground border-border flex flex-col rounded-lg border',
    'gap-(--card-spacing) py-(--card-spacing)',
  ),
  {
    variants: {
      interactive: {
        true: cn(
          'relative transition-colors duration-(--motion-fast)',
          'hover:border-indicator',
        ),
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
)

export const cardHeaderClassName = 'flex flex-col gap-1 px-(--card-spacing)'

export const cardTitleVariants = cva(
  'font-heading leading-none font-semibold',
  {
    variants: {
      interactive: {
        true: cn(
          "[&>a]:after:absolute [&>a]:after:inset-0 [&>a]:after:content-[''] [&>a]:after:rounded-lg",
          '[&>a]:after:ring-indicator [&>a]:after:ring-0',
          '[&>a]:after:transition-[box-shadow] [&>a]:after:duration-(--motion-fast)',
          '[&>a]:focus-visible:outline-none',
          '[&>a]:focus-visible:after:ring-ring [&>a]:focus-visible:after:ring-2',
          '[&>a]:active:after:ring-indicator [&>a]:active:after:ring-2',
        ),
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
)

export const cardDescriptionVariants = cva(
  'text-muted-foreground text-sm',
  aboveStretchedLinkVariants,
)

export const cardActionVariants = cva(
  'mt-auto flex items-center justify-end gap-2 px-(--card-spacing)',
  aboveStretchedLinkVariants,
)

export const cardContentVariants = cva(
  'px-(--card-spacing)',
  aboveStretchedLinkVariants,
)

export const cardFooterVariants = cva(
  'flex items-center gap-2 px-(--card-spacing)',
  aboveStretchedLinkVariants,
)
