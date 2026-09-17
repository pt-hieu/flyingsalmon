import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Stepper } from '@/registry/ui/stepper'

describe('Stepper', () => {
  it('marks only the current segment as the current step', () => {
    render(<Stepper count={4} current={2} />)

    const segments = screen.getAllByRole('listitem')
    const currentFlags = segments.map((segment) =>
      segment.getAttribute('aria-current'),
    )

    expect(currentFlags).toEqual([null, 'step', null, null])
  })

  it('clamps a current above the count to the last segment', () => {
    render(<Stepper count={3} current={9} />)

    const segments = screen.getAllByRole('listitem')
    const currentFlags = segments.map((segment) =>
      segment.getAttribute('aria-current'),
    )

    expect(currentFlags).toEqual([null, null, 'step'])
  })

  it('clamps a current below one to the first segment', () => {
    render(<Stepper count={3} current={0} />)

    const segments = screen.getAllByRole('listitem')
    const currentFlags = segments.map((segment) =>
      segment.getAttribute('aria-current'),
    )

    expect(currentFlags).toEqual(['step', null, null])
  })

  it('reports each segment as complete, current, or upcoming', () => {
    render(<Stepper count={4} current={2} />)

    const segments = screen.getAllByRole('listitem')
    const states = segments.map((segment) => segment.getAttribute('data-state'))

    expect(states).toEqual(['complete', 'current', 'upcoming', 'upcoming'])
  })

  it('names each segment by its position in the count', () => {
    render(<Stepper count={3} current={1} />)

    const segments = screen.getAllByRole('listitem')
    const names = segments.map((segment) => segment.getAttribute('aria-label'))

    expect(names).toEqual(['1 of 3', '2 of 3', '3 of 3'])
  })

  it('names the bar Progress when no label is given', () => {
    render(<Stepper count={2} current={1} />)

    expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Progress')
  })

  it('takes the label a caller gives it', () => {
    render(<Stepper count={4} current={2} label="Intake turn" />)

    expect(
      screen.getByRole('list', { name: 'Intake turn' }),
    ).toBeInTheDocument()
  })

  it('adds upcoming segments when the count grows while mounted', () => {
    const { rerender } = render(<Stepper count={3} current={2} />)

    rerender(<Stepper count={5} current={2} />)

    const segments = screen.getAllByRole('listitem')
    const states = segments.map((segment) => segment.getAttribute('data-state'))
    const names = segments.map((segment) => segment.getAttribute('aria-label'))

    expect(states).toEqual([
      'complete',
      'current',
      'upcoming',
      'upcoming',
      'upcoming',
    ])
    expect(names).toEqual(['1 of 5', '2 of 5', '3 of 5', '4 of 5', '5 of 5'])
  })

  it('is not focusable', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Stepper count={3} current={2} />
        <button type="button">After the bar</button>
      </>,
    )

    await user.tab()

    expect(screen.getByRole('button', { name: 'After the bar' })).toHaveFocus()
  })

  it('forwards consumer attributes to the bar it renders', () => {
    render(<Stepper count={3} current={2} id="intake-turns" />)

    expect(screen.getByRole('list')).toHaveAttribute('id', 'intake-turns')
  })
})
