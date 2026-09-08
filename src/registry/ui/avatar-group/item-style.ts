import { revealSteps } from './reveal-steps'

export function itemStyle({
  layer,
  childIndex,
  revealedIndex,
}: {
  layer: number
  childIndex: number
  revealedIndex: number | null
}) {
  const steps = revealSteps({ childIndex, revealedIndex })

  return {
    '--avatar-group-layer': layer,
    translate: `calc(${steps} * var(--avatar-group-reveal))`,
  } as React.CSSProperties
}
