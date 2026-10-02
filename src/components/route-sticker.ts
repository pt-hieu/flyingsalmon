import type { StickerRoleClassNames } from '@/registry/ui/sticker'

export const routeStickerRoleClassNames: StickerRoleClassNames = {
  ink: { fill: 'fill-foreground', stroke: 'stroke-foreground' },
  trail: { stroke: 'stroke-foreground' },
  paper: { fill: 'fill-card' },
  fold: { fill: 'fill-muted' },
  water: { fill: 'fill-group-sky-soft' },
  hill: { stroke: 'stroke-group-teal' },
  start: { fill: 'fill-group-pink' },
  pin: { fill: 'fill-primary' },
  pencil: { fill: 'fill-group-cyan' },
  wood: { fill: 'fill-accent' },
  eraser: { fill: 'fill-group-pink' },
}

export const routeStickerLabel = 'A folded map with a route drawn to a pin'
