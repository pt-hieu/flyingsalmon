import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { ButtonSize, ButtonVariant, buttonVariants } from '../button'

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

const bandHoverTint = 'bg-orange-300'

export const calendarCellVariants = cva(
  cn(
    'relative flex size-9 cursor-pointer items-center justify-center text-sm outline-hidden select-none',
    'before:absolute before:inset-y-0.5 before:hidden before:bg-orange-200',
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
      filled: {
        true: '',
        false: '',
      },
      interior: {
        true: 'before:inset-x-0 before:block',
        false: '',
      },
      bandStart: {
        true: 'before:right-0 before:left-1/2 before:block',
        false: '',
      },
      bandEnd: {
        true: 'before:right-1/2 before:left-0 before:block',
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
        filled: false,
        interior: false,
        className: 'text-accent-foreground',
      },
    ],
    defaultVariants: {
      hidden: false,
      unavailable: false,
      filled: false,
      interior: false,
      bandStart: false,
      bandEnd: false,
      highlighted: false,
    },
  },
)

export const calendarCellFillVariants = cva(
  cn(
    'absolute inset-0.5 flex items-center justify-center rounded-md',
    'transition-[border-radius,inset] duration-(--motion-fast)',
  ),
  {
    variants: {
      filled: {
        true: 'bg-indicator text-indicator-foreground',
        false: '',
      },
      interior: {
        true: '',
        false: '',
      },
      bandStart: {
        true: 'right-0 rounded-r-none',
        false: '',
      },
      bandEnd: {
        true: 'left-0 rounded-l-none',
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
        className: 'bg-orange-500',
      },
      {
        filled: false,
        interior: true,
        highlighted: true,
        className: bandHoverTint,
      },
      {
        filled: false,
        interior: false,
        highlighted: true,
        className: 'bg-accent',
      },
    ],
    defaultVariants: {
      filled: false,
      interior: false,
      bandStart: false,
      bandEnd: false,
      highlighted: false,
    },
  },
)

export const calendarTodayDashVariants = cva(
  'absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full',
  {
    variants: {
      filled: {
        true: 'bg-indicator-foreground',
        false: 'bg-indicator',
      },
    },
    defaultVariants: {
      filled: false,
    },
  },
)
