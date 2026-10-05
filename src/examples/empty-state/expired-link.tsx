import { Link2Off } from 'lucide-react'

import { Button } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'

export function EmptyStateExpiredLink() {
  return (
    <div className="w-full max-w-md">
      <EmptyState>
        <EmptyStateIcon>
          <Link2Off />
        </EmptyStateIcon>
        <EmptyStateTitle>This trip link has expired</EmptyStateTitle>
        <EmptyStateDescription>
          The owner stopped sharing it, or the trip was deleted.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Plan your own trip</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}
