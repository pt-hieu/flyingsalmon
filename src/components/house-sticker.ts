import { StickerPaint } from '@/registry/ui/sticker'
import type { StickerRoleClassNames } from '@/registry/ui/sticker'

export const houseStickerRoleClassNames: StickerRoleClassNames = {
  ink: {
    [StickerPaint.Fill]: 'fill-foreground',
    [StickerPaint.Stroke]: 'stroke-foreground',
  },
  trail: {
    [StickerPaint.Stroke]:
      'stroke-foreground stroke-[2.4] [stroke-dasharray:0.5_7]',
  },
  paper: { [StickerPaint.Fill]: 'fill-card' },
  wall: { [StickerPaint.Fill]: 'fill-group-sky-soft' },
  roof: { [StickerPaint.Stroke]: 'stroke-group-pink' },
  brick: { [StickerPaint.Fill]: 'fill-group-fuchsia-border' },
  door: { [StickerPaint.Fill]: 'fill-group-teal' },
  glass: { [StickerPaint.Fill]: 'fill-group-sky' },
  smoke: { [StickerPaint.Fill]: 'fill-muted' },
  plane: { [StickerPaint.Fill]: 'fill-card' },
  petal: { [StickerPaint.Fill]: 'fill-group-pink' },
}

export const houseStickerLabel = 'A house with a plane flying home'
