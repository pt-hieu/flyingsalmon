import { Button } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'

export function EmptyStateUsage() {
  return (
    <EmptyState>
      <EmptyStateTitle>No trips yet</EmptyStateTitle>
      <EmptyStateDescription>
        Tell hottrip where you want to go and it drafts the route.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>Plan a trip</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
