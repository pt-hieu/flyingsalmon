import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Lock } from 'lucide-react'
import { describe, expect, it } from 'vitest'

import { IconTooltip } from '@/registry/ui/icon-tooltip'
import { TooltipProvider } from '@/registry/ui/tooltip'

describe('IconTooltip', () => {
  it('takes a Tab stop as an image named by its tooltip text', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <IconTooltip content="Locked, so the AI won’t change it">
          <Lock aria-hidden />
        </IconTooltip>
      </TooltipProvider>,
    )

    await user.tab()

    expect(
      screen.getByRole('img', { name: 'Locked, so the AI won’t change it' }),
    ).toHaveFocus()
  })

  it('names an emoji icon by its tooltip text, not by the emoji', () => {
    render(
      <TooltipProvider>
        <IconTooltip content="Food activities">🍜</IconTooltip>
      </TooltipProvider>,
    )

    expect(
      screen.getByRole('img', { name: 'Food activities' }),
    ).toBeInTheDocument()
  })

  it('opens the tooltip on keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <IconTooltip content="Tied to this date">
          <Lock aria-hidden />
        </IconTooltip>
      </TooltipProvider>,
    )

    await user.tab()

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Tied to this date')
  })

  it('takes its own Tab stop after the row link it sits beside', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <ul>
          <li>
            <a href="#day-1" aria-label="Day 1" />
            <IconTooltip content="Food activities">🍜</IconTooltip>
          </li>
        </ul>
        <button type="button">After</button>
      </TooltipProvider>,
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Day 1' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('img', { name: 'Food activities' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('opens the tooltip on hover', async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider>
        <IconTooltip content="Tied to this date">
          <Lock aria-hidden />
        </IconTooltip>
      </TooltipProvider>,
    )

    await user.hover(screen.getByRole('img', { name: 'Tied to this date' }))

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Tied to this date')
  })
})
