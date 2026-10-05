import { Compass } from 'lucide-react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'

export function EmptyStateTwoActions() {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <Compass />
      </EmptyStateIcon>
      <EmptyStateTitle>No places saved yet</EmptyStateTitle>
      <EmptyStateDescription>
        Save places you like and they wait here until you pick a day.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>Add a place</Button>
        <Button variant={ButtonVariant.Outline}>Browse ideas</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
