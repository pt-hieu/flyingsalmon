import { Sticker } from 'flyingsalmon'
import type { StickerRoleClassNames } from 'flyingsalmon'

import { houseStickerArt } from '../../src/components/house-sticker-art'

const houseRoleClassNames: StickerRoleClassNames = {
  ink: { fill: 'fill-foreground', stroke: 'stroke-foreground' },
  trail: {
    stroke: 'stroke-foreground stroke-[2.4] [stroke-dasharray:0.5_7]',
  },
  paper: { fill: 'fill-card' },
  wall: { fill: 'fill-group-sky-soft' },
  roof: { stroke: 'stroke-group-pink' },
  brick: { fill: 'fill-group-fuchsia-border' },
  door: { fill: 'fill-group-teal' },
  glass: { fill: 'fill-group-sky' },
  smoke: { fill: 'fill-muted' },
  plane: { fill: 'fill-card' },
  petal: { fill: 'fill-group-pink' },
}

export function House() {
  return (
    <Sticker
      art={houseStickerArt}
      label="A house with a plane flying home"
      roleClassNames={houseRoleClassNames}
      popIn={false}
      className="max-w-sm"
    />
  )
}

export function Tilted() {
  return (
    <div className="flex items-center gap-8">
      <Sticker
        art={houseStickerArt}
        label="A house with a plane flying home"
        roleClassNames={houseRoleClassNames}
        popIn={false}
        className="max-w-52 -rotate-2"
      />
      <Sticker
        art={houseStickerArt}
        label="A house with a plane flying home"
        roleClassNames={houseRoleClassNames}
        popIn={false}
        className="max-w-60 rotate-3"
      />
    </div>
  )
}
