import { ink, writeSticker } from './sticker-sketch.ts'
import type { Pen } from './sticker-sketch.ts'

const pin =
  'M 225 96 C 212 80 208 70 208 52 A 17 17 0 1 1 242 52 C 242 70 238 80 225 96 Z'
const pencil = 'M 196 196 L 207.6 180.1 L 282 137.1 L 290 150.9 L 215.6 193.9 Z'

function drawFrame(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette(
    [
      'M 20 40 L 100 30 L 180 44 L 260 34 L 260 174 L 180 184 L 100 170 L 20 180 Z',
      pin,
      pencil,
    ],
    frameSeed + 10,
  )

  draw(
    generator.path('M 20 40 L 100 30 L 100 170 L 20 180 Z', {
      ...ink,
      fill: 'paper',
      seed: frameSeed + 21,
    }),
  )
  draw(
    generator.path('M 100 30 L 180 44 L 180 184 L 100 170 Z', {
      ...ink,
      fill: 'fold',
      seed: frameSeed + 22,
    }),
  )
  draw(
    generator.path('M 180 44 L 260 34 L 260 174 L 180 184 Z', {
      ...ink,
      fill: 'paper',
      seed: frameSeed + 23,
    }),
  )

  draw(
    generator.path(
      'M 34 64 C 44 54 70 56 80 66 C 88 76 72 90 56 86 C 40 84 28 74 34 64 Z',
      { ...ink, fill: 'water', strokeWidth: 2, seed: frameSeed + 31 },
    ),
  )
  for (const [index, pathData] of [
    'M 190 140 Q 206 110 222 140 Z',
    'M 212 140 Q 228 118 244 140 Z',
  ].entries()) {
    draw(
      generator.path(pathData, {
        ...ink,
        fill: 'hill',
        fillStyle: 'hachure',
        hachureGap: 4,
        hachureAngle: 60,
        fillWeight: 1.4,
        strokeWidth: 2,
        seed: frameSeed + 32 + index,
      }),
    )
  }

  draw(
    generator.path('M 50 140 C 90 150 110 70 150 100 S 200 124 222 98', {
      ...ink,
      stroke: 'trail',
      disableMultiStroke: true,
      roughness: 0.6,
      seed: frameSeed + 41,
    }),
  )
  draw(
    generator.circle(50, 140, 20, {
      ...ink,
      fill: 'start',
      strokeWidth: 2,
      seed: frameSeed + 42,
    }),
  )
  draw(generator.path(pin, { ...ink, fill: 'pin', seed: frameSeed + 43 }))
  draw(
    generator.circle(225, 52, 12, {
      ...ink,
      fill: 'paper',
      strokeWidth: 2,
      seed: frameSeed + 44,
    }),
  )

  draw(
    generator.path(pencil, {
      ...ink,
      fill: 'pencil',
      seed: frameSeed + 51,
    }),
  )
  draw(
    generator.path('M 207.6 180.1 L 196 196 L 215.6 193.9 Z', {
      ...ink,
      fill: 'wood',
      strokeWidth: 2,
      seed: frameSeed + 52,
    }),
  )
  draw(
    generator.path('M 199.9 190.7 L 196 196 L 202.5 195.3 Z', {
      ...ink,
      fill: 'ink',
      strokeWidth: 1.6,
      seed: frameSeed + 53,
    }),
  )
  draw(
    generator.path('M 269.9 144.1 L 282 137.1 L 290 150.9 L 277.9 157.9 Z', {
      ...ink,
      fill: 'eraser',
      strokeWidth: 2,
      seed: frameSeed + 54,
    }),
  )
}

writeSticker({
  exportName: 'routeStickerArt',
  width: 300,
  height: 200,
  drawFrame,
  output: new URL('../src/components/route-sticker-art.ts', import.meta.url),
})
