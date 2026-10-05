import { Button } from '@/registry/ui/button'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'

export function ErrorStateUsage({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState>
      <EmptyStateTitle>The places did not load</EmptyStateTitle>
      <EmptyStateDescription>
        The planner did not answer. Nothing was changed.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button onClick={onRetry}>Try again</Button>
      </EmptyStateActions>
    </ErrorState>
  )
}
