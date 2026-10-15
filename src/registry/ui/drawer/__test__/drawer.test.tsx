import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

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
  type DrawerProps,
} from '@/registry/ui/drawer'

function FilterDrawer(props: DrawerProps) {
  return (
    <Drawer {...props}>
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
  it('opens from the trigger as a dialog named by its title', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer />)

    await user.click(screen.getByRole('button', { name: 'Filter trips' }))

    expect(
      await screen.findByRole('dialog', { name: 'Filter trips' }),
    ).toBeInTheDocument()
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

  it('closes from a DrawerClose in the footer', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer defaultOpen />)

    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Clear' }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('stays open on Escape while pending, and exposes aria-busy', async () => {
    const user = userEvent.setup()
    render(<FilterDrawer defaultOpen pending />)

    const drawer = await screen.findByRole('dialog')
    expect(drawer).toHaveAttribute('aria-busy', 'true')

    await user.keyboard('{Escape}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
