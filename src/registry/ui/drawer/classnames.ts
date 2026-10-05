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
        true: 'w-fit max-w-[calc(100vw-(--spacing(4)))] min-w-[min(--spacing(112),calc(100vw-(--spacing(4))))]',
        false: 'w-[min(--spacing(112),calc(100vw-(--spacing(4))))]',
      },
    },
    defaultVariants: {
      fitContent: false,
    },
  },
)
