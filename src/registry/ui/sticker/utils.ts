import type { StickerArt, StickerLayer } from './types'

const cutRole = 'cut'

const silhouetteMargin = 16

const boilFrameDuration = 150

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
