import { Route } from 'lucide-react'

import { Card, CardContent } from '@/registry/ui/card'
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSize,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'

export function EmptyStateNoAction() {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <EmptyState size={EmptyStateSize.Small}>
          <EmptyStateIcon>
            <Route />
          </EmptyStateIcon>
          <EmptyStateTitle as={EmptyStateTitleElement.H3}>
            Activities come after the route
          </EmptyStateTitle>
          <EmptyStateDescription>
            Approve the route and the days fill with activities.
          </EmptyStateDescription>
        </EmptyState>
      </CardContent>
    </Card>
  )
}
