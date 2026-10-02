import {
  Button,
  ButtonVariant,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateSticker,
  EmptyStateTitle,
  ErrorState,
} from 'flyingsalmon'
import type { StickerRoleClassNames } from 'flyingsalmon'

import { snappedPencilStickerArt } from '../../src/components/snapped-pencil-sticker-art'

const snappedPencilRoleClassNames: StickerRoleClassNames = {
  ink: { fill: 'fill-foreground', stroke: 'stroke-foreground' },
  paper: { fill: 'fill-card' },
  margin: { stroke: 'stroke-group-pink' },
  pencil: { fill: 'fill-group-cyan' },
  wood: { fill: 'fill-accent' },
  eraser: { fill: 'fill-group-pink' },
}

export function GenerationFailed() {
  return (
    <div className="w-full max-w-sm">
      <ErrorState>
        <EmptyStateSticker
          art={snappedPencilStickerArt}
          label="A pencil with its tip snapped off, lying on a half-written page"
          roleClassNames={snappedPencilRoleClassNames}
          popIn={false}
        />
        <EmptyStateTitle>Generation failed</EmptyStateTitle>
        <EmptyStateDescription>
          All 12 credits are back in your wallet. Your Brief is saved; try again
          or change it first.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Try again</Button>
          <Button variant={ButtonVariant.Outline}>Edit the Brief</Button>
        </EmptyStateActions>
      </ErrorState>
    </div>
  )
}
