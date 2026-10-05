import { Plus } from 'lucide-react'

import { routeStickerArt } from '@/components/route-sticker-art'
import {
  routeStickerLabel,
  routeStickerRoleClassNames,
} from '@/components/route-sticker'
import { Button } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateSticker,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'

export function EmptyStateDemo() {
  return (
    <EmptyState>
      <EmptyStateSticker
        art={routeStickerArt}
        label={routeStickerLabel}
        roleClassNames={routeStickerRoleClassNames}
      />
      <EmptyStateTitle>No trips yet</EmptyStateTitle>
      <EmptyStateDescription>
        Tell hottrip where you want to go and it drafts the route.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button icon={<Plus />}>Plan a trip</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
