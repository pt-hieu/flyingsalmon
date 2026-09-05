import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'

function ControlledDialog({
  onOpenChange,
  ...dialogProps
}: Partial<React.ComponentProps<typeof Dialog>>) {
  return (
    <Dialog onOpenChange={onOpenChange} {...dialogProps}>
      <DialogTrigger>
        <Button>Open trip form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Plan a trip</DialogTitle>
        <DialogDescription>Choose a destination and dates.</DialogDescription>
        <DialogBody>
          <input aria-label="Destination" />
        </DialogBody>
        <DialogFooter>
          <DialogClose>
            <Button variant={ButtonVariant.Outline}>Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('opens from the trigger on click', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog />)

    await user.click(screen.getByRole('button', { name: 'Open trip form' }))

    expect(
      await screen.findByRole('dialog', { name: 'Plan a trip' }),
    ).toBeInTheDocument()
  })

  it('opens from the trigger on Enter', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog />)

    screen.getByRole('button', { name: 'Open trip form' }).focus()
    await user.keyboard('{Enter}')

    expect(
      await screen.findByRole('dialog', { name: 'Plan a trip' }),
    ).toBeInTheDocument()
  })

  it('opens from the trigger on Space', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog />)

    screen.getByRole('button', { name: 'Open trip form' }).focus()
    await user.keyboard(' ')

    expect(
      await screen.findByRole('dialog', { name: 'Plan a trip' }),
    ).toBeInTheDocument()
  })

  it('names the dialog by its required title', async () => {
    render(<ControlledDialog defaultOpen />)

    expect(
      await screen.findByRole('dialog', { name: 'Plan a trip' }),
    ).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog defaultOpen />)

    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('closes on an outside click', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <>
        <div data-testid="outside">Outside</div>
        <ControlledDialog defaultOpen />
      </>,
    )

    await screen.findByRole('dialog')
    await user.click(screen.getByTestId('outside'))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('blocks an outside click but not Escape when dismissible is false', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <>
        <div data-testid="outside">Outside</div>
        <ControlledDialog defaultOpen dismissible={false} />
      </>,
    )

    await screen.findByRole('dialog')
    await user.click(screen.getByTestId('outside'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('blocks Escape, outside click, and the close button while pending, and exposes aria-busy', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <>
        <div data-testid="outside">Outside</div>
        <ControlledDialog defaultOpen pending />
      </>,
    )

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('aria-busy', 'true')

    await user.keyboard('{Escape}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByTestId('outside'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toBeDisabled()

    await user.click(closeButton)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('lands focus inside on open, not on the close button, and ends the tab order on it', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog />)

    await user.click(screen.getByRole('button', { name: 'Open trip form' }))
    await screen.findByRole('dialog')

    const destination = screen.getByLabelText('Destination')
    const cancel = screen.getByRole('button', { name: 'Cancel' })
    const save = screen.getByRole('button', { name: 'Save' })
    const close = screen.getByRole('button', { name: 'Close' })

    await waitFor(() => expect(destination).toHaveFocus())

    await user.tab()
    expect(cancel).toHaveFocus()

    await user.tab()
    expect(save).toHaveFocus()

    await user.tab()
    expect(close).toHaveFocus()
  })

  it('returns focus to the trigger on close', async () => {
    const user = userEvent.setup()
    render(<ControlledDialog />)

    const trigger = screen.getByRole('button', { name: 'Open trip form' })
    await user.click(trigger)
    await screen.findByRole('dialog')

    await user.keyboard('{Escape}')

    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('hides page content outside an open dialog from the accessibility tree', async () => {
    render(
      <>
        <div data-testid="outside">Outside</div>
        <ControlledDialog defaultOpen />
      </>,
    )

    await screen.findByRole('dialog')

    await waitFor(() => {
      expect(screen.getByTestId('outside').parentElement).toHaveAttribute(
        'aria-hidden',
        'true',
      )
    })
  })

  it('reports open state changes to onOpenChange', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<ControlledDialog onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Open trip form' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false))
  })

  it('keeps exhibitionMode content inside the render container with no focus trap', async () => {
    render(
      <div>
        <div style={{ position: 'relative' }}>
          <Dialog defaultOpen exhibitionMode>
            <DialogContent>
              <DialogTitle>Exhibit</DialogTitle>
              <DialogBody>
                <input aria-label="Only field" />
              </DialogBody>
            </DialogContent>
          </Dialog>
        </div>
        <button type="button">Outside the exhibit</button>
      </div>,
    )

    const dialog = await screen.findByRole('dialog')
    const container = dialog.closest('div[style]')
    expect(container).toContainElement(dialog)

    const outsideButton = screen.getByRole('button', {
      name: 'Outside the exhibit',
    })
    outsideButton.focus()

    expect(outsideButton).toHaveFocus()
  })
})
