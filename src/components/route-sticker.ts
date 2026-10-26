import { StickerPaint } from '@/registry/ui/sticker'
import type { StickerRoleClassNames } from '@/registry/ui/sticker'

export const routeStickerRoleClassNames: StickerRoleClassNames = {
  ink: {
    [StickerPaint.Fill]: 'fill-foreground',
    [StickerPaint.Stroke]: 'stroke-foreground',
  },
  trail: { [StickerPaint.Stroke]: 'stroke-foreground' },
  paper: { [StickerPaint.Fill]: 'fill-card' },
  fold: { [StickerPaint.Fill]: 'fill-muted' },
  water: { [StickerPaint.Fill]: 'fill-group-sky-soft' },
  hill: { [StickerPaint.Stroke]: 'stroke-group-teal' },
  start: { [StickerPaint.Fill]: 'fill-group-pink' },
  pin: { [StickerPaint.Fill]: 'fill-primary' },
  pencil: { [StickerPaint.Fill]: 'fill-group-cyan' },
  wood: { [StickerPaint.Fill]: 'fill-accent' },
  eraser: { [StickerPaint.Fill]: 'fill-group-pink' },
}

export const routeStickerLabel = 'A folded map with a route drawn to a pin'
