import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const drawerContentVariants = cva(
  cn(
    'bg-popover text-popover-foreground border-border fixed inset-y-2 right-2 z-50 flex flex-col gap-4',
    'overflow-hidden rounded-xl border outline-hidden',
    'data-[state=open]:animate-floating-drawer-enter',
    'data-[state=closed]:animate-floating-drawer-exit',
  ),
  {
    variants: {
      fitContent: {
        true: 'w-fit max-w-[calc(100vw-1rem)] min-w-[min(28rem,calc(100vw-1rem))]',
        false: 'w-[min(28rem,calc(100vw-1rem))]',
      },
    },
    defaultVariants: {
      fitContent: false,
    },
  },
)
