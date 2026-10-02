import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateSticker,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'
import { StickerPaint } from '@/registry/ui/sticker'
import type { StickerArt, StickerRoleClassNames } from '@/registry/ui/sticker'

const pencilArt: StickerArt = {
  width: 80,
  height: 40,
  frames: [
    [
      {
        role: 'cut',
        paint: StickerPaint.Fill,
        d: 'M10 10 L70 10 L70 30 L10 30',
      },
      {
        role: 'pencil',
        paint: StickerPaint.Fill,
        d: 'M12 12 L68 12 L68 28 L12 28',
      },
      {
        role: 'ink',
        paint: StickerPaint.Stroke,
        d: 'M12 12 L68 12 L68 28 L12 28 Z',
      },
    ],
  ],
}

const pencilRoleClassNames: StickerRoleClassNames = {
  ink: { stroke: 'stroke-foreground' },
  pencil: { fill: 'fill-group-cyan' },
}

describe('EmptyState', () => {
  it('labels its region with the title', () => {
    render(
      <EmptyState>
        <EmptyStateTitle>No trips yet</EmptyStateTitle>
        <EmptyStateDescription>
          Tell hottrip where you want to go and it drafts the route.
        </EmptyStateDescription>
      </EmptyState>,
    )

    expect(
      screen.getByRole('region', { name: 'No trips yet' }),
    ).toBeInTheDocument()
  })

  it('labels its region with the title when the title renders another heading level', () => {
    render(
      <EmptyState>
        <EmptyStateTitle as={EmptyStateTitleElement.H3}>
          No credits yet
        </EmptyStateTitle>
      </EmptyState>,
    )

    expect(
      screen.getByRole('region', { name: 'No credits yet' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'No credits yet' }),
    ).toBeInTheDocument()
  })

  it('keeps the icon out of the accessible tree', () => {
    render(
      <EmptyState>
        <EmptyStateIcon>
          <img src="/compass.svg" alt="Compass" />
        </EmptyStateIcon>
        <EmptyStateTitle>No trips yet</EmptyStateTitle>
      </EmptyState>,
    )

    expect(screen.getByAltText('Compass')).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Compass' }),
    ).not.toBeInTheDocument()
  })

  it('gives a tab stop to the action buttons and to nothing else', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <EmptyState>
          <EmptyStateIcon>
            <img src="/compass.svg" alt="Compass" />
          </EmptyStateIcon>
          <EmptyStateTitle>No trips yet</EmptyStateTitle>
          <EmptyStateDescription>
            Tell hottrip where you want to go and it drafts the route.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button>Plan a trip</Button>
            <Button variant={ButtonVariant.Outline}>Browse ideas</Button>
          </EmptyStateActions>
        </EmptyState>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Plan a trip' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Browse ideas' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('announces nothing on its own', () => {
    const { container } = render(
      <EmptyState>
        <EmptyStateIcon>
          <img src="/compass.svg" alt="Compass" />
        </EmptyStateIcon>
        <EmptyStateTitle>This trip link has expired</EmptyStateTitle>
        <EmptyStateDescription>
          The owner stopped sharing it, or the trip was deleted.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Plan your own trip</Button>
        </EmptyStateActions>
      </EmptyState>,
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-live]')).toBeNull()
  })

  it('shows its sticker as one image named by the sticker label', () => {
    render(
      <EmptyState>
        <EmptyStateSticker
          art={pencilArt}
          label="A pencil with its tip snapped off"
          roleClassNames={pencilRoleClassNames}
        />
        <EmptyStateTitle>Your route is on its way</EmptyStateTitle>
      </EmptyState>,
    )

    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(
      screen.getByRole('img', { name: 'A pencil with its tip snapped off' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: 'Your route is on its way' }),
    ).toBeInTheDocument()
  })
})
