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
        Pick where you want to go and the route is drafted for you.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>Plan a trip</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
