import { describe, expect, it } from 'vitest'

import { cutLayers, drawingLayers } from '../layer-roles'
import { StickerPaint } from '../types'
import type { StickerLayer } from '../types'

const layers: StickerLayer[] = [
  { role: 'cut', paint: StickerPaint.Fill, d: 'M0 0 L10 0 L10 10 Z' },
  { role: 'roof', paint: StickerPaint.Fill, d: 'M1 1 L9 1 L5 5 Z' },
  { role: 'cut', paint: StickerPaint.Stroke, d: 'M0 0 L10 0' },
  { role: 'ink', paint: StickerPaint.Stroke, d: 'M1 1 L9 1' },
]

describe('cutLayers', () => {
  it('keeps the silhouette layers in drawing order', () => {
    expect(cutLayers(layers)).toEqual([
      { role: 'cut', paint: StickerPaint.Fill, d: 'M0 0 L10 0 L10 10 Z' },
      { role: 'cut', paint: StickerPaint.Stroke, d: 'M0 0 L10 0' },
    ])
  })
})

describe('drawingLayers', () => {
  it('keeps every other layer in drawing order', () => {
    expect(drawingLayers(layers)).toEqual([
      { role: 'roof', paint: StickerPaint.Fill, d: 'M1 1 L9 1 L5 5 Z' },
      { role: 'ink', paint: StickerPaint.Stroke, d: 'M1 1 L9 1' },
    ])
  })
})
