import { routeStickerArt } from '@/components/route-sticker-art'
import {
  routeStickerLabel,
  routeStickerRoleClassNames,
} from '@/components/route-sticker'
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateSize,
  EmptyStateSticker,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'

export function EmptyStateSmallSticker() {
  return (
    <EmptyState size={EmptyStateSize.Small}>
      <EmptyStateSticker
        art={routeStickerArt}
        label={routeStickerLabel}
        roleClassNames={routeStickerRoleClassNames}
      />
      <EmptyStateTitle as={EmptyStateTitleElement.H3}>
        No packing list yet
      </EmptyStateTitle>
      <EmptyStateDescription>
        Add what you are bringing and travellers can claim the shared items.
      </EmptyStateDescription>
    </EmptyState>
  )
}
