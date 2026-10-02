import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '@/registry/ui/button'
import {
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'

describe('ErrorState', () => {
  it('is an alert named by its title', () => {
    render(
      <ErrorState>
        <EmptyStateIcon>
          <img src="/pencil.svg" alt="Pencil" />
        </EmptyStateIcon>
        <EmptyStateTitle>Generation failed</EmptyStateTitle>
        <EmptyStateDescription>
          It stopped while planning the days for Japan.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Try again</Button>
        </EmptyStateActions>
      </ErrorState>,
    )

    expect(
      screen.getByRole('alert', { name: 'Generation failed' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('stays an alert when a caller passes another role', () => {
    const callerProps: React.ComponentProps<'section'> = { role: 'region' }
    render(
      <ErrorState {...callerProps}>
        <EmptyStateTitle>Generation failed</EmptyStateTitle>
      </ErrorState>,
    )

    expect(
      screen.getByRole('alert', { name: 'Generation failed' }),
    ).toBeInTheDocument()
  })
})
