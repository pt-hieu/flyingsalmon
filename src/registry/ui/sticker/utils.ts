import { StickerPaint } from './types'
import type { StickerArt, StickerLayer } from './types'

const cutRole = 'cut'

const silhouetteMargin = 16

const boilFrameDuration = 150

export const drawingStrokeWidth = 2.2

export function cutLayers(layers: readonly StickerLayer[]) {
  return layers.filter((layer) => layer.role === cutRole)
}

export function drawingLayers(layers: readonly StickerLayer[]) {
  return layers.filter((layer) => layer.role !== cutRole)
}

export function stickerViewBox({ width, height }: StickerArt) {
  return [
    -silhouetteMargin,
    -silhouetteMargin,
    width + silhouetteMargin * 2,
    height + silhouetteMargin * 2,
  ].join(' ')
}

export function boilFrameDelay(frameIndex: number) {
  return `${-frameIndex * boilFrameDuration}ms`
}

export function unpaintedFill({ paint }: StickerLayer) {
  return paint === StickerPaint.Fill ? undefined : 'none'
}

export function unpaintedStroke({ paint }: StickerLayer) {
  return paint === StickerPaint.Stroke ? undefined : 'none'
}

export function withContentKeys<Item>(
  items: readonly Item[],
  contentOf: (item: Item) => string,
) {
  const occurrencesByContent = new Map<string, number>()

  return items.map((item) => {
    const content = contentOf(item)
    const occurrence = occurrencesByContent.get(content) ?? 0
    occurrencesByContent.set(content, occurrence + 1)

    return { key: `${occurrence} ${content}`, item }
  })
}

export function layerContent({ role, paint, d: pathData }: StickerLayer) {
  return `${role} ${paint} ${pathData}`
}

export function frameContent(layers: readonly StickerLayer[]) {
  return layers.map(layerContent).join(' ')
}
