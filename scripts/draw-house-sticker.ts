import { ink, writeSticker } from '../src/registry/ui/sticker/sticker-sketch.ts'
import type { Pen } from '../src/registry/ui/sticker/sticker-sketch.ts'

function flowerPetals(centreX: number, centreY: number, radius: number) {
  return Array.from({ length: 5 }, (_, index) => {
    const angle = (index / 5) * Math.PI * 2 - Math.PI / 2
    return [
      centreX + Math.cos(angle) * radius,
      centreY + Math.sin(angle) * radius,
    ] as const
  })
}

function drawFrame(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette(
    [
      'M 14 110 L 80 44 L 146 110 L 146 194 L 14 194 Z',
      'M 104 50 H 126 V 90 H 104 Z',
      'M 115 50 C 114 34 124 22 140 28 C 152 32 160 44 174 52',
      'M 174 52 m -16 0 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0',
      'M 168 50 C 220 20 280 18 334 34',
      'M 150 176 m -18 0 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0',
    ],
    frameSeed + 10,
  )

  draw(
    generator.path('M 106 56 H 122 V 88 H 106 Z', {
      ...ink,
      fill: 'brick',
      seed: frameSeed + 21,
    }),
  )
  draw(
    generator.path('M 32 100 H 128 V 188 H 32 Z', {
      ...ink,
      fill: 'wall',
      seed: frameSeed + 22,
    }),
  )
  draw(
    generator.path('M 20 106 L 80 50 L 140 106 Z', {
      ...ink,
      fill: 'roof',
      fillStyle: 'hachure',
      hachureGap: 5,
      hachureAngle: -30,
      fillWeight: 1.6,
      seed: frameSeed + 23,
    }),
  )
  draw(
    generator.path('M 66 188 V 150 Q 66 136 80 136 Q 94 136 94 150 V 188 Z', {
      ...ink,
      fill: 'door',
      seed: frameSeed + 24,
    }),
  )
  draw(
    generator.circle(52, 136, 20, {
      ...ink,
      fill: 'glass',
      seed: frameSeed + 25,
    }),
  )
  draw(
    generator.circle(89, 166, 3, { ...ink, fill: 'ink', seed: frameSeed + 26 }),
  )
  draw(
    generator.path('M 42 136 H 62 M 52 126 V 146', {
      ...ink,
      strokeWidth: 1.6,
      seed: frameSeed + 27,
    }),
  )
  draw(
    generator.circle(114, 42, 10, {
      ...ink,
      fill: 'smoke',
      roughness: 1.6,
      seed: frameSeed + 28,
    }),
  )
  draw(
    generator.circle(124, 28, 7, {
      ...ink,
      fill: 'smoke',
      roughness: 1.6,
      seed: frameSeed + 29,
    }),
  )

  draw(
    generator.path('M 184 46 C 230 24 280 22 330 34', {
      ...ink,
      stroke: 'trail',
      disableMultiStroke: true,
      roughness: 0.6,
      seed: frameSeed + 31,
    }),
  )
  draw(
    generator.path(
      'M 186 48 L 160 60 C 152 64 150 58 156 54 L 182 40 C 188 37 192 44 186 48 Z',
      { ...ink, fill: 'plane', strokeWidth: 2, seed: frameSeed + 32 },
    ),
  )
  draw(
    generator.path('M 174 50 L 186 64 L 180 66 L 166 54', {
      ...ink,
      fill: 'plane',
      strokeWidth: 2,
      seed: frameSeed + 33,
    }),
  )
  draw(
    generator.path('M 180 42 L 178 30 L 184 32 L 186 44', {
      ...ink,
      fill: 'plane',
      strokeWidth: 2,
      seed: frameSeed + 34,
    }),
  )

  draw(
    generator.path('M 150 188 Q 148 180 150 172', {
      ...ink,
      strokeWidth: 2,
      seed: frameSeed + 41,
    }),
  )
  for (const [index, [petalX, petalY]] of flowerPetals(150, 166, 7).entries()) {
    draw(
      generator.circle(petalX, petalY, 9, {
        ...ink,
        fill: 'petal',
        strokeWidth: 1.8,
        seed: frameSeed + 42 + index,
      }),
    )
  }
  draw(
    generator.circle(150, 166, 6, {
      ...ink,
      fill: 'paper',
      strokeWidth: 1.8,
      seed: frameSeed + 48,
    }),
  )
}

writeSticker({
  exportName: 'houseStickerArt',
  width: 360,
  height: 220,
  drawFrame,
  output: new URL('../src/components/house-sticker-art.ts', import.meta.url),
})
