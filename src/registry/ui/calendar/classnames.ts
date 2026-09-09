import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { buttonVariants } from '@/registry/ui/button/classnames'

export const calendarRootClassName = cn(
  'text-foreground inline-flex gap-6',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
)

export const calendarMonthClassName = 'flex flex-col gap-2'

export const calendarMonthHeaderClassName = 'flex h-8 items-center gap-1'

export const calendarHeadingClassName = cn(
  'font-heading flex-1 text-center text-sm font-semibold',
  'data-direction:animate-calendar-heading-enter',
)

export const calendarNavButtonClassName = buttonVariants({
  variant: ButtonVariant.Ghost,
  size: ButtonSize.IconSmall,
})

export const calendarNavIconClassName = 'size-4'

export const calendarNavSpacerClassName = 'size-8 shrink-0'

export const calendarGridClassName = 'border-separate border-spacing-0'

export const calendarWeekdayClassName =
  'text-muted-foreground h-8 w-9 text-xs font-medium'

export const calendarGridBodyClassName = cn(
  'data-[direction=forward]:animate-calendar-page-forward',
  'data-[direction=backward]:animate-calendar-page-backward',
)

export const calendarCellVariants = cva(
  cn(
    'relative flex size-9 cursor-pointer items-center justify-center text-sm outline-hidden select-none',
    'transition-colors duration-(--motion-fast)',
    'before:absolute before:inset-y-0 before:hidden',
  ),
  {
    variants: {
      hidden: {
        true: 'invisible',
        false: '',
      },
      unavailable: {
        true: 'text-muted-foreground cursor-not-allowed line-through',
        false: 'text-foreground',
      },
      interior: {
        true: 'bg-indigo-100 dark:bg-indigo-950',
        false: '',
      },
      bandStart: {
        true: 'before:right-0 before:left-1/2 before:block before:bg-indigo-100 dark:before:bg-indigo-950',
        false: '',
      },
      bandEnd: {
        true: 'before:right-1/2 before:left-0 before:block before:bg-indigo-100 dark:before:bg-indigo-950',
        false: '',
      },
      highlighted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        highlighted: true,
        interior: false,
        className: 'bg-accent',
      },
      {
        highlighted: true,
        interior: true,
        className: 'bg-indigo-200 dark:bg-indigo-900',
      },
    ],
    defaultVariants: {
      hidden: false,
      unavailable: false,
      interior: false,
      bandStart: false,
      bandEnd: false,
      highlighted: false,
    },
  },
)

export const calendarCellFillVariants = cva(
  cn(
    'absolute inset-0 flex items-center justify-center rounded-md',
    'transition-colors duration-(--motion-fast)',
  ),
  {
    variants: {
      filled: {
        true: 'bg-primary text-primary-foreground',
        false: '',
      },
      highlighted: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        filled: true,
        highlighted: true,
        className: 'bg-indigo-300',
      },
    ],
    defaultVariants: {
      filled: false,
      highlighted: false,
    },
  },
)

export const calendarTodayDotVariants = cva(
  'absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full',
  {
    variants: {
      filled: {
        true: 'bg-primary-foreground',
        false: 'bg-primary',
      },
    },
    defaultVariants: {
      filled: false,
    },
  },
)
