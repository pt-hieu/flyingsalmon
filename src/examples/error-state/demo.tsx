import { snappedPencilStickerArt } from '@/components/snapped-pencil-sticker-art'
import {
  snappedPencilStickerLabel,
  snappedPencilStickerRoleClassNames,
} from '@/components/snapped-pencil-sticker'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateSticker,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'

export function ErrorStateDemo() {
  return (
    <ErrorState>
      <EmptyStateSticker
        art={snappedPencilStickerArt}
        label={snappedPencilStickerLabel}
        roleClassNames={snappedPencilStickerRoleClassNames}
      />
      <EmptyStateTitle>Planning failed</EmptyStateTitle>
      <EmptyStateDescription>
        It stopped while planning the days in Lisbon. All 12 credits are back in
        your wallet and your trip details are saved. Try again or change them
        first.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>Try again</Button>
        <Button variant={ButtonVariant.Outline}>Edit the trip</Button>
      </EmptyStateActions>
    </ErrorState>
  )
}
