import { writeFileSync } from 'node:fs'
import { dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import rough from 'roughjs'
import type { Drawable, Options } from 'roughjs/bin/core'

import type {
  Pen,
  StickerArt,
  StickerDrawing,
  StickerLayer,
  StickerOutput,
  StickerPaint,
} from './types'

export type { Pen, StickerDrawing, StickerOutput } from './types'

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
      const roundedPath = rawPath.replaceAll(/(\.\d)\d+/g, '$1')

      // Node strips types rather than compiling them, so this script cannot
      // load the StickerPaint enum at runtime and asserts its values instead.
      if (fill && fill !== 'none') {
        layers.push({
          role: fill,
          paint: 'fill' as StickerPaint.Fill,
          d: roundedPath,
        })
      } else if (stroke && stroke !== 'none') {
        layers.push({
          role: stroke,
          paint: 'stroke' as StickerPaint.Stroke,
          d: roundedPath,
        })
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

// Keyed by value, since this script cannot load the enum to key it by member.
const paintMembers: Record<StickerPaint, string> = {
  fill: 'StickerPaint.Fill',
  stroke: 'StickerPaint.Stroke',
}

function formatLayer({ role, paint, d }: StickerLayer) {
  return [
    '      {',
    `        role: '${role}',`,
    `        paint: ${paintMembers[paint]},`,
    `        d: '${d}',`,
    '      },',
  ].join('\n')
}

function formatFrame(layers: readonly StickerLayer[]) {
  return ['    [', ...layers.map(formatLayer), '    ],'].join('\n')
}

function stickerImportPath(output: URL) {
  const stickerFolder = dirname(fileURLToPath(import.meta.url))
  const path = relative(dirname(fileURLToPath(output)), stickerFolder)
    .split(sep)
    .join('/')

  return path.startsWith('.') ? path : `./${path}`
}

function formatArtModule(
  exportName: string,
  importPath: string,
  { width, height, frames }: StickerArt,
) {
  return [
    `import { StickerPaint } from '${importPath}'`,
    '',
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

  writeFileSync(
    output,
    formatArtModule(exportName, stickerImportPath(output), art),
  )
  process.stdout.write(
    `Wrote ${art.frames.length} frames to ${fileURLToPath(output)}\n`,
  )
}
