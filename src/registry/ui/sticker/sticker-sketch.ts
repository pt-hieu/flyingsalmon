import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import rough from 'roughjs'
import type { Options } from 'roughjs/bin/core'

import type { StickerArt, StickerLayer } from './types'

type Drawable = ReturnType<typeof generator.path>

export interface Pen {
  generator: typeof generator
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

const generator = rough.generator()
const frameCount = 3
const frameSeedStep = 100

export const ink: Options = {
  stroke: 'ink',
  strokeWidth: 2.5,
  roughness: 1.3,
  bowing: 1.2,
  fillStyle: 'solid',
}

const silhouettePen: Options = {
  stroke: 'cut',
  fillStyle: 'solid',
  strokeWidth: 1,
  roughness: 0.8,
  bowing: 0.5,
  disableMultiStroke: true,
}

function isClosedPiece(piece: string) {
  return piece.endsWith('Z') || piece.includes(' a ')
}

function createPen(layers: StickerLayer[]): Pen {
  function draw(drawable: Drawable) {
    for (const { d: rawPath, fill, stroke } of generator.toPaths(drawable)) {
      const d = rawPath.replaceAll(/(\.\d)\d+/g, '$1')

      if (fill && fill !== 'none') {
        layers.push({ role: fill, paint: 'fill', d })
      } else if (stroke && stroke !== 'none') {
        layers.push({ role: stroke, paint: 'stroke', d })
      }
    }
  }

  function drawSilhouette(pieces: string[], seed: number) {
    for (const [index, piece] of pieces.entries()) {
      draw(
        generator.path(piece, {
          ...silhouettePen,
          fill: isClosedPiece(piece) ? 'cut' : undefined,
          seed: seed + index,
        }),
      )
    }
  }

  return { generator, draw, drawSilhouette }
}

export function drawSticker({
  width,
  height,
  drawFrame,
}: StickerDrawing): StickerArt {
  const frames = Array.from({ length: frameCount }, (_, frameIndex) => {
    const layers: StickerLayer[] = []
    drawFrame(createPen(layers), frameIndex * frameSeedStep)
    return layers
  })

  return { width, height, frames }
}

function formatLayer({ role, paint, d }: StickerLayer) {
  return [
    '      {',
    `        role: '${role}',`,
    `        paint: '${paint}',`,
    `        d: '${d}',`,
    '      },',
  ].join('\n')
}

function formatFrame(layers: readonly StickerLayer[]) {
  return ['    [', ...layers.map(formatLayer), '    ],'].join('\n')
}

function formatArtModule(
  exportName: string,
  { width, height, frames }: StickerArt,
) {
  return [
    `export const ${exportName} = {`,
    `  width: ${width},`,
    `  height: ${height},`,
    '  frames: [',
    ...frames.map(formatFrame),
    '  ],',
    '} as const',
    '',
  ].join('\n')
}

export function writeSticker({
  exportName,
  output,
  ...drawing
}: StickerOutput) {
  const art = drawSticker(drawing)

  writeFileSync(output, formatArtModule(exportName, art))
  console.log(`Wrote ${art.frames.length} frames to ${fileURLToPath(output)}`)
}
