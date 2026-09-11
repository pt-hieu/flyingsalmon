import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tooltip, TooltipProvider } from '@/registry/ui/tooltip'

const tooltipWithText = (text: string) =>
  screen.queryAllByRole('tooltip').find((node) => node.textContent === text)

const waitPastTheSkipWindow = () =>
  new Promise((resolve) => setTimeout(resolve, 1200))

function renderTooltip() {
  return render(
    <TooltipProvider>
      <Tooltip content="Add to favorites">
        <button type="button">Star</button>
      </Tooltip>
      <button type="button">After</button>
    </TooltipProvider>,
  )
}

describe('Tooltip', () => {
  it('opens on keyboard focus and closes on blur', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Star' })).toHaveFocus()

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Add to favorites')

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('opens on hover and closes on pointer-down', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.hover(screen.getByRole('button', { name: 'Star' }))

    await screen.findByRole('tooltip', {}, { timeout: 1000 })

    await user.pointer({
      keys: '[MouseLeft]',
      target: screen.getByRole('button', { name: 'After' }),
    })

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.tab()
    await screen.findByRole('tooltip', {}, { timeout: 1000 })

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('describes the trigger through aria-describedby pointing at the tooltip content', async () => {
    const user = userEvent.setup()
    renderTooltip()

    await user.tab()

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    const trigger = screen.getByRole('button', { name: 'Star' })

    expect(tooltip).toHaveTextContent('Add to favorites')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('opens the next tooltip instantly inside the shared skip window', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <Tooltip content="Add item">
          <button type="button">Add</button>
        </Tooltip>
        <Tooltip content="Share">
          <button type="button">Share</button>
        </Tooltip>
      </TooltipProvider>,
    )

    await user.hover(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(tooltipWithText('Add item')).toBeDefined(), {
      timeout: 1500,
    })

    await waitPastTheSkipWindow()
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(tooltipWithText('Add item')).toBeUndefined())

    await user.hover(screen.getByRole('button', { name: 'Share' }))
    await waitFor(() => expect(tooltipWithText('Share')).toBeDefined(), {
      timeout: 1500,
    })

    expect(tooltipWithText('Share')).toHaveAttribute(
      'data-state',
      'instant-open',
    )
  })
})
