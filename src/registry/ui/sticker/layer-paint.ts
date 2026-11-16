import { StickerPaint } from './types'
import type { StickerLayer } from './types'

export function unpaintedFill({ paint }: StickerLayer) {
  return paint === StickerPaint.Fill ? undefined : 'none'
}

export function unpaintedStroke({ paint }: StickerLayer) {
  return paint === StickerPaint.Stroke ? undefined : 'none'
}
