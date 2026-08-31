import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Skeleton } from '@/registry/ui/skeleton'

function renderSkeleton(element: React.ReactElement) {
  const { container } = render(element)
  const skeleton = container.querySelector('[data-variant]')

  if (!skeleton) throw new Error('No skeleton rendered')

  return skeleton
}

describe('Skeleton', () => {
  it('stays out of the accessibility tree so the region owns the announcement', () => {
    const skeleton = renderSkeleton(<Skeleton />)

    expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  })

  it('stays hidden even when a caller asks for it to be exposed', () => {
    const callerProps: React.ComponentProps<'div'> = { 'aria-hidden': false }
    const skeleton = renderSkeleton(<Skeleton {...callerProps} />)

    expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  })

  it('costs no tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Skeleton />
        <button type="button">After the skeleton</button>
      </>,
    )

    await user.tab()

    expect(
      screen.getByRole('button', { name: 'After the skeleton' }),
    ).toHaveFocus()
  })

  it('takes the text shape when no variant is given', () => {
    const skeleton = renderSkeleton(<Skeleton />)

    expect(skeleton).toHaveAttribute('data-variant', 'text')
  })

  it('takes the circle shape when asked for it', () => {
    const skeleton = renderSkeleton(<Skeleton variant="circle" />)

    expect(skeleton).toHaveAttribute('data-variant', 'circle')
  })

  it('takes the rectangle shape when asked for it', () => {
    const skeleton = renderSkeleton(<Skeleton variant="rectangle" />)

    expect(skeleton).toHaveAttribute('data-variant', 'rectangle')
  })

  it('forwards consumer attributes to the block it renders', () => {
    const skeleton = renderSkeleton(<Skeleton id="trip-card-title" />)

    expect(skeleton).toHaveAttribute('id', 'trip-card-title')
  })
})
