import type { StickerRoleClassNames } from '@/registry/ui/sticker'

export const houseStickerRoleClassNames: StickerRoleClassNames = {
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

export const houseStickerLabel = 'A house with a plane flying home'
