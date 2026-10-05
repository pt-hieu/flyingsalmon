import { Users } from 'lucide-react'

import { Button } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'

export function EmptyStateIconArt() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Users />
      </EmptyStateIcon>
      <EmptyStateTitle>No travellers yet</EmptyStateTitle>
      <EmptyStateDescription>
        Invite the people coming to Lisbon and they can vote on the plan.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>Invite travellers</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
