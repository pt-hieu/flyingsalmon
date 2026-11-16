import type { StickerArt } from './types'

const silhouetteMargin = 16

const boilFrameDuration = 150

export const drawingStrokeWidth = 2.2

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
