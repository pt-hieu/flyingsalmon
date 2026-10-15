import { ink } from '../src/registry/ui/sticker/sticker-sketch.ts'
import type { Pen } from '../src/registry/ui/sticker/sticker-sketch.ts'

export function drawPencilEraser({ generator, draw }: Pen, seed: number) {
  draw(
    generator.path('M 269.9 144.1 L 282 137.1 L 290 150.9 L 277.9 157.9 Z', {
      ...ink,
      fill: 'eraser',
      strokeWidth: 2,
      seed,
    }),
  )
}
