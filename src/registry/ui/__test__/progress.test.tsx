import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Progress } from '@/registry/ui/progress'

describe('Progress', () => {
  it('reports a determinate value through the ARIA range attributes', () => {
    render(<Progress value={40} />)

    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    expect(progressbar).toHaveAttribute('aria-valuenow', '40')
  })

  it('reports a custom max and the value inside it', () => {
    render(<Progress value={3} max={4} />)

    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toHaveAttribute('aria-valuemax', '4')
    expect(progressbar).toHaveAttribute('aria-valuenow', '3')
  })

  it('announces no value when the fraction is unknown', () => {
    render(<Progress />)

    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).not.toHaveAttribute('aria-valuenow')
    expect(progressbar).toHaveAttribute('data-state', 'indeterminate')
  })

  it('clamps a value above max down to max', () => {
    render(<Progress value={150} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    )
  })

  it('clamps a value below zero up to zero', () => {
    render(<Progress value={-20} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    )
  })

  it('is loading while the value is short of max', () => {
    render(<Progress value={99} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'data-state',
      'loading',
    )
  })

  it('is complete once the value reaches max', () => {
    render(<Progress value={100} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'data-state',
      'complete',
    )
  })

  it('is complete at a custom max too', () => {
    render(<Progress value={4} max={4} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'data-state',
      'complete',
    )
  })

  it('names itself Loading when no label is given', () => {
    render(<Progress value={10} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-label',
      'Loading',
    )
  })

  it('takes the label a caller gives it', () => {
    render(<Progress value={10} label="Building your trip" />)

    expect(
      screen.getByRole('progressbar', { name: 'Building your trip' }),
    ).toBeInTheDocument()
  })

  it('is not focusable', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Progress value={10} />
        <button type="button">After the bar</button>
      </>,
    )

    await user.tab()

    expect(screen.getByRole('button', { name: 'After the bar' })).toHaveFocus()
  })

  it('forwards consumer attributes to the bar it renders', () => {
    render(<Progress value={10} id="trip-generation-progress" />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'id',
      'trip-generation-progress',
    )
  })

  it('keeps announcing the value it derives when a caller passes a stale one', () => {
    const callerProps: React.ComponentProps<'div'> = { 'aria-valuenow': 99 }
    render(<Progress value={10} {...callerProps} />)

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '10',
    )
  })
})
