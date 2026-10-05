import { useState } from 'react'

import { Button } from '@/registry/ui/button'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'
import { Skeleton } from '@/registry/ui/skeleton'

export function ErrorStateRetry() {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(true)
  const [attempts, setAttempts] = useState(0)

  async function loadPlaces() {
    setFailed(false)
    setLoading(true)
    const loaded = await fetchPlaces(attempts)
    setAttempts(attempts + 1)
    setLoading(false)
    setFailed(!loaded)
  }

  if (loading) {
    return (
      <div aria-busy="true" className="w-full max-w-sm space-y-3">
        <Skeleton />
        <Skeleton className="w-3/4" />
        <Skeleton className="w-1/2" />
      </div>
    )
  }

  if (failed) {
    return (
      <ErrorState>
        <EmptyStateTitle>The places did not load</EmptyStateTitle>
        <EmptyStateDescription>
          The planner did not answer. Nothing was changed.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button onClick={loadPlaces}>Try again</Button>
        </EmptyStateActions>
      </ErrorState>
    )
  }

  return (
    <ul className="space-y-1 text-sm">
      <li>Time Out Market</li>
      <li>Miradouro da Senhora do Monte</li>
      <li>Pastéis de Belém</li>
    </ul>
  )
}

function fetchPlaces(attempts: number): Promise<boolean> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(attempts >= 1), 1000),
  )
}
