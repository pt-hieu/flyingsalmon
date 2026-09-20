import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer'

function FilterDrawer({
  onOpenChange,
  ...drawerProps
}: Partial<React.ComponentProps<typeof Drawer>>) {
  return (
    <Drawer onOpenChange={onOpenChange} {...drawerProps}>
      <DrawerTrigger>
        <Button>Filter trips</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Filter trips</DrawerTitle>
        <DrawerDescription>Narrow the list beside you.</DrawerDescription>
        <DrawerBody>
          <input aria-label="Destination" />
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>
            <Button variant={ButtonVariant.Outline}>Clear</Button>
          </DrawerClose>
          <Button>Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('opens from the trigger on click', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer />)

    await user.click(screen.getByRole('button', { name: 'Filter trips' }))

    expect(
      await screen.findByRole('dialog', { name: 'Filter trips' }),
    ).toBeInTheDocument()
  })

  it('opens from the trigger on Enter', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer />)

    screen.getByRole('button', { name: 'Filter trips' }).focus()
    await user.keyboard('{Enter}')

    expect(
      await screen.findByRole('dialog', { name: 'Filter trips' }),
    ).toBeInTheDocument()
  })

  it('opens from the trigger on Space', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer />)

    screen.getByRole('button', { name: 'Filter trips' }).focus()
    await user.keyboard(' ')

    expect(
      await screen.findByRole('dialog', { name: 'Filter trips' }),
    ).toBeInTheDocument()
  })

  it('names the drawer by its required title', async () => {
    render(<FilterDrawer defaultOpen />)

    expect(
      await screen.findByRole('dialog', { name: 'Filter trips' }),
    ).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer defaultOpen />)

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
        <FilterDrawer defaultOpen />
      </>,
    )

    await screen.findByRole('dialog')
    await user.click(screen.getByTestId('outside'))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('closes from the always-present X', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer defaultOpen />)

    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Close' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('blocks an outside click but not Escape when dismissible is false', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(
      <>
        <div data-testid="outside">Outside</div>
        <FilterDrawer defaultOpen dismissible={false} />
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
        <FilterDrawer defaultOpen pending />
      </>,
    )

    const drawer = await screen.findByRole('dialog')
    expect(drawer).toHaveAttribute('aria-busy', 'true')

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
    render(<FilterDrawer />)

    await user.click(screen.getByRole('button', { name: 'Filter trips' }))
    await screen.findByRole('dialog')

    const destination = screen.getByLabelText('Destination')
    const clear = screen.getByRole('button', { name: 'Clear' })
    const apply = screen.getByRole('button', { name: 'Apply' })
    const close = screen.getByRole('button', { name: 'Close' })

    await waitFor(() => expect(destination).toHaveFocus())

    await user.tab()
    expect(clear).toHaveFocus()

    await user.tab()
    expect(apply).toHaveFocus()

    await user.tab()
    expect(close).toHaveFocus()
  })

  it('returns focus to the trigger on close', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer />)

    const trigger = screen.getByRole('button', { name: 'Filter trips' })
    await user.click(trigger)
    await screen.findByRole('dialog')

    await user.keyboard('{Escape}')

    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('hides page content outside an open drawer from the accessibility tree', async () => {
    render(
      <>
        <div data-testid="outside">Outside</div>
        <FilterDrawer defaultOpen />
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
    render(<FilterDrawer onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Filter trips' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')

    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false))
  })
})
