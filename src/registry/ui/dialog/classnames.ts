import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { verticalFocusRingClearance } from '@/registry/lib/interaction'

import { DialogSize } from './types'

export const dialogOverlayVariants = cva(
  cn(
    'fixed inset-0 z-50 bg-neutral-950 opacity-50',
    'data-[state=open]:animate-floating-overlay-enter',
    'data-[state=closed]:animate-floating-overlay-exit',
  ),
)

const dialogTitleTypeClassName = 'font-heading text-lg font-semibold'

export const dialogCloseSlotVariants = cva(
  cn(
    'absolute top-(--dialog-spacing) right-4 flex h-lh items-center',
    dialogTitleTypeClassName,
  ),
)

export const dialogContentVariants = cva(
  cn(
    'bg-popover text-popover-foreground border-border fixed inset-0 z-50 m-auto flex h-fit w-[calc(100%-(--spacing(8)))] flex-col gap-4',
    'max-h-[calc(100dvh-(--spacing(8)))] overflow-hidden rounded-xl border outline-hidden',
    'data-[state=open]:animate-floating-dialog-enter',
    'data-[state=closed]:animate-floating-dialog-exit',
  ),
  {
    variants: {
      size: {
        [DialogSize.Default]: 'max-w-md',
        [DialogSize.Large]: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: DialogSize.Default,
    },
  },
)

export const dialogTitleClassName = cn(
  'px-(--dialog-spacing) pt-(--dialog-spacing) pr-12',
  dialogTitleTypeClassName,
)

export const dialogDescriptionClassName =
  'text-muted-foreground -mt-3 px-(--dialog-spacing) text-sm'

export const dialogBodyClassName = cn(
  'min-h-0 flex-1 overflow-y-auto px-(--dialog-spacing)',
  verticalFocusRingClearance,
)

export const dialogFooterVariants = cva(
  cn(
    'flex flex-col-reverse gap-2 px-(--dialog-spacing) pb-(--dialog-spacing)',
    'sm:flex-row sm:justify-end',
    '[&>*]:w-full sm:[&>*]:w-auto',
  ),
)
