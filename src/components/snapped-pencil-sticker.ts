import { StickerPaint } from '@/registry/ui/sticker'
import type { StickerRoleClassNames } from '@/registry/ui/sticker'

export const snappedPencilStickerRoleClassNames: StickerRoleClassNames = {
  ink: {
    [StickerPaint.Fill]: 'fill-foreground',
    [StickerPaint.Stroke]: 'stroke-foreground',
  },
  paper: { [StickerPaint.Fill]: 'fill-card' },
  margin: { [StickerPaint.Stroke]: 'stroke-group-pink' },
  pencil: { [StickerPaint.Fill]: 'fill-group-cyan' },
  wood: { [StickerPaint.Fill]: 'fill-accent' },
  eraser: { [StickerPaint.Fill]: 'fill-group-pink' },
}

export const snappedPencilStickerLabel =
  'A pencil with its tip snapped off, lying on a half-written page'
