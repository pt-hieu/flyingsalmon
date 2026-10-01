import { describe, expect, it } from 'vitest'

import type { StickerLayer } from '../types'
import { cutLayers, drawingLayers, stickerViewBox } from '../utils'

const layers: StickerLayer[] = [
  { role: 'cut', paint: 'fill', d: 'M0 0 L10 0 L10 10 Z' },
  { role: 'roof', paint: 'fill', d: 'M1 1 L9 1 L5 5 Z' },
  { role: 'cut', paint: 'stroke', d: 'M0 0 L10 0' },
  { role: 'ink', paint: 'stroke', d: 'M1 1 L9 1' },
]

describe('cutLayers', () => {
  it('keeps the silhouette layers in drawing order', () => {
    expect(cutLayers(layers)).toEqual([
      { role: 'cut', paint: 'fill', d: 'M0 0 L10 0 L10 10 Z' },
      { role: 'cut', paint: 'stroke', d: 'M0 0 L10 0' },
    ])
  })
})

describe('drawingLayers', () => {
  it('keeps every other layer in drawing order', () => {
    expect(drawingLayers(layers)).toEqual([
      { role: 'roof', paint: 'fill', d: 'M1 1 L9 1 L5 5 Z' },
      { role: 'ink', paint: 'stroke', d: 'M1 1 L9 1' },
    ])
  })
})

describe('stickerViewBox', () => {
  it('frames the art with room for the die-cut edge on every side', () => {
    expect(stickerViewBox({ width: 360, height: 220, frames: [] })).toBe(
      '-16 -16 392 252',
    )
  })
})
