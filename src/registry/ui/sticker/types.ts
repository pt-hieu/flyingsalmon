import type { Drawable } from 'roughjs/bin/core'
import type { RoughGenerator } from 'roughjs/bin/generator'

export enum StickerPaint {
  Fill = 'fill',
  Stroke = 'stroke',
}

export interface StickerLayer {
  readonly role: string
  readonly paint: StickerPaint
  readonly d: string
}

export interface StickerArt {
  readonly width: number
  readonly height: number
  readonly frames: readonly (readonly StickerLayer[])[]
}

export type StickerRoleClassNames = Readonly<
  Record<string, Readonly<Partial<Record<StickerPaint, string>>>>
>

export interface Pen {
  generator: RoughGenerator
  draw: (drawable: Drawable) => void
  drawSilhouette: (pieces: string[], seed: number) => void
}

export interface StickerDrawing {
  width: number
  height: number
  drawFrame: (pen: Pen, frameSeed: number) => void
}

export interface StickerOutput extends StickerDrawing {
  exportName: string
  output: URL
}
