import { ink, writeSticker } from './sticker-sketch.ts'
import type { Pen } from './sticker-sketch.ts'

const page = 'M 30 24 L 190 16 L 198 176 L 38 184 Z'
const pencil =
  'M 205.8 195 L 201.8 188.1 L 207.6 180.1 L 282 137.1 L 290 150.9 L 215.6 193.9 Z'
const snappedTip = 'M 176 190 L 186 184 L 186 196 Z'

function drawFrame(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette([page, pencil, snappedTip], frameSeed + 10)

  draw(generator.path(page, { ...ink, fill: 'paper', seed: frameSeed + 21 }))
  draw(
    generator.path('M 54 23 L 62 183', {
      ...ink,
      stroke: 'margin',
      strokeWidth: 2,
      disableMultiStroke: true,
      seed: frameSeed + 22,
    }),
  )
  for (const [index, pathData] of [
    'M 72 52 C 90 44 102 60 120 50 S 152 58 176 46',
    'M 74 82 C 92 74 104 90 124 80 S 156 88 178 76',
    'M 76 112 C 88 104 98 120 112 110',
  ].entries()) {
    draw(
      generator.path(pathData, {
        ...ink,
        strokeWidth: 2,
        roughness: 1.6,
        seed: frameSeed + 31 + index,
      }),
    )
  }

  draw(
    generator.path('M 207.6 180.1 L 282 137.1 L 290 150.9 L 215.6 193.9 Z', {
      ...ink,
      fill: 'pencil',
      seed: frameSeed + 41,
    }),
  )
  draw(
    generator.path(
      'M 207.6 180.1 L 201.8 188.1 L 206 189 L 205.8 195 L 215.6 193.9 Z',
      { ...ink, fill: 'wood', strokeWidth: 2, seed: frameSeed + 42 },
    ),
  )
  draw(
    generator.path('M 269.9 144.1 L 282 137.1 L 290 150.9 L 277.9 157.9 Z', {
      ...ink,
      fill: 'eraser',
      strokeWidth: 2,
      seed: frameSeed + 43,
    }),
  )
  draw(
    generator.path(snappedTip, {
      ...ink,
      fill: 'wood',
      strokeWidth: 2,
      seed: frameSeed + 44,
    }),
  )
  draw(
    generator.path('M 176 190 L 180 187.6 L 180 192.4 Z', {
      ...ink,
      fill: 'ink',
      strokeWidth: 1.6,
      seed: frameSeed + 45,
    }),
  )
}

writeSticker({
  exportName: 'snappedPencilStickerArt',
  width: 300,
  height: 200,
  drawFrame,
  output: new URL(
    '../src/components/snapped-pencil-sticker-art.ts',
    import.meta.url,
  ),
})
