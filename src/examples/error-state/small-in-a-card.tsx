import { TriangleAlert } from 'lucide-react'

import { Button } from '@/registry/ui/button'
import { Card, CardContent } from '@/registry/ui/card'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSize,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'

export function ErrorStateSmallInACard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <ErrorState size={EmptyStateSize.Small}>
          <EmptyStateIcon>
            <TriangleAlert />
          </EmptyStateIcon>
          <EmptyStateTitle as={EmptyStateTitleElement.H3}>
            Travellers did not load
          </EmptyStateTitle>
          <EmptyStateDescription>
            The list of people on this trip could not be fetched.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button>Try again</Button>
          </EmptyStateActions>
        </ErrorState>
      </CardContent>
    </Card>
  )
}
