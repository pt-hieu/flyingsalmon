import { describe, expect, it } from 'vitest'

import { StickerPaint } from '../types'
import type { StickerLayer } from '../types'
import {
  cutLayers,
  drawingLayers,
  layerContent,
  stickerViewBox,
  unpaintedFill,
  unpaintedStroke,
  withContentKeys,
} from '../utils'

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

describe('stickerViewBox', () => {
  it('frames the art with room for the die-cut edge on every side', () => {
    expect(stickerViewBox({ width: 360, height: 220, frames: [] })).toBe(
      '-16 -16 392 252',
    )
  })
})

describe('unpaintedFill', () => {
  it('leaves a fill layer to its class and turns fill off for a line', () => {
    expect(unpaintedFill(layers[1])).toBeUndefined()
    expect(unpaintedFill(layers[3])).toBe('none')
  })
})

describe('unpaintedStroke', () => {
  it('leaves a line to its class and turns stroke off for a fill layer', () => {
    expect(unpaintedStroke(layers[3])).toBeUndefined()
    expect(unpaintedStroke(layers[1])).toBe('none')
  })
})

describe('withContentKeys', () => {
  it('keeps every item in order and gives repeated content distinct keys', () => {
    const keyed = withContentKeys(['cut', 'roof', 'roof'], (role) => role)

    expect(keyed.map(({ item }) => item)).toEqual(['cut', 'roof', 'roof'])
    expect(new Set(keyed.map(({ key }) => key)).size).toBe(3)
  })

  it('keeps an item on the same key when an earlier, different item goes away', () => {
    const before = withContentKeys(layers, layerContent)
    const after = withContentKeys(layers.slice(1), layerContent)

    expect(after.map(({ key }) => key)).toEqual(
      before.slice(1).map(({ key }) => key),
    )
  })

  it('gives layers that differ only in paint different keys', () => {
    const keyed = withContentKeys(
      [
        { role: 'cut', paint: StickerPaint.Fill, d: 'M0 0 L10 0' },
        { role: 'cut', paint: StickerPaint.Stroke, d: 'M0 0 L10 0' },
      ],
      layerContent,
    )

    expect(keyed[0].key).not.toBe(keyed[1].key)
  })
})
