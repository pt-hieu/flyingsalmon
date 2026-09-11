import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

function TripMenu({
  onSelectRename,
  onSelectDuplicate,
  disableDuplicate = false,
}: {
  onSelectRename?: (event: Event) => void
  onSelectDuplicate?: (event: Event) => void
  disableDuplicate?: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Trip actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelectRename}>Rename</DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onSelectDuplicate}
          disabled={disableDuplicate}
        >
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/trips/1">Open trip</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

describe('DropdownMenu', () => {
  it('opens from the trigger on click', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    await user.click(screen.getByRole('button', { name: 'Trip actions' }))

    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })

  it('opens from the trigger on Enter with the first item highlighted', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')

    await screen.findByRole('menu')
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()
    })
  })

  it('opens from the trigger on Space', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard(' ')

    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })

  it('opens from the trigger on ArrowDown', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{ArrowDown}')

    expect(await screen.findByRole('menu')).toBeInTheDocument()
  })

  it('keeps the highlight on the last item when ArrowDown runs past it', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')

    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}')

    expect(screen.getByRole('menuitem', { name: 'Open trip' })).toHaveFocus()
  })

  it('moves the highlight with Home, End, and typeahead', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')

    await user.keyboard('{End}')
    expect(screen.getByRole('menuitem', { name: 'Open trip' })).toHaveFocus()

    await user.keyboard('{Home}')
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()

    await user.keyboard('d')
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus()
  })

  it('fires onSelect and closes on Enter', async () => {
    const user = userEvent.setup()
    const onSelectRename = vi.fn()
    render(<TripMenu onSelectRename={onSelectRename} />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()
    })

    await user.keyboard('{Enter}')

    expect(onSelectRename).toHaveBeenCalledOnce()
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  it('fires onSelect and closes on Space', async () => {
    const user = userEvent.setup()
    const onSelectRename = vi.fn()
    render(<TripMenu onSelectRename={onSelectRename} />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()
    })

    await user.keyboard(' ')

    expect(onSelectRename).toHaveBeenCalledOnce()
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  it('skips a disabled item and never fires its onSelect', async () => {
    const user = userEvent.setup()
    const onSelectDuplicate = vi.fn()
    render(<TripMenu onSelectDuplicate={onSelectDuplicate} disableDuplicate />)

    screen.getByRole('button', { name: 'Trip actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Open trip' })).toHaveFocus()
    expect(onSelectDuplicate).not.toHaveBeenCalled()
  })

  it('renders an asChild link item as a real link with its href', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    await user.click(screen.getByRole('button', { name: 'Trip actions' }))
    await screen.findByRole('menu')

    const link = screen.getByRole('menuitem', { name: 'Open trip' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/trips/1')
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    const trigger = screen.getByRole('button', { name: 'Trip actions' })
    await user.click(trigger)
    await screen.findByRole('menu')

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
    expect(trigger).toHaveFocus()
  })

  it('closes on an outside click and returns focus to the trigger', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <>
        <div data-testid="outside">Outside</div>
        <TripMenu />
      </>,
    )

    const trigger = screen.getByRole('button', { name: 'Trip actions' })
    await user.click(trigger)
    await screen.findByRole('menu')

    await user.click(screen.getByTestId('outside'))

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('exposes aria-haspopup and aria-expanded on the trigger', async () => {
    const user = userEvent.setup()
    render(<TripMenu />)

    const trigger = screen.getByRole('button', { name: 'Trip actions' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    await screen.findByRole('menu')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
