import type { StickerLayer } from './types'

const cutRole = 'cut'

export function cutLayers(layers: readonly StickerLayer[]) {
  return layers.filter((layer) => layer.role === cutRole)
}

export function drawingLayers(layers: readonly StickerLayer[]) {
  return layers.filter((layer) => layer.role !== cutRole)
}
