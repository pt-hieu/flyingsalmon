import { use } from 'react'

import { cn } from '@/lib/utils'

import { Sticker, type StickerProps } from '../sticker'

import { emptyStateStickerVariants } from './classnames'
import { EmptyStateContext } from './context'

export interface EmptyStateStickerProps extends StickerProps {}

export function EmptyStateSticker({
  className,
  ...props
}: EmptyStateStickerProps) {
  const { size, kind } = use(EmptyStateContext)

  return (
    <Sticker
      data-slot="empty-state-sticker"
      className={cn(emptyStateStickerVariants({ size, kind }), className)}
      {...props}
    />
  )
}
