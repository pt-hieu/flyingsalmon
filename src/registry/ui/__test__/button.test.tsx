import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button, ButtonSize } from '@/registry/ui/button'

describe('Button', () => {
  it('calls the click handler when it is idle', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('activates on Enter when it is idle', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('activates on Space when it is idle', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.tab()
    await user.keyboard('[Space]')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('ignores a click while loading and keeps focus', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save' })
    await user.tab()
    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
    expect(button).toHaveFocus()
  })

  it('ignores Enter while loading and keeps focus', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })

  it('ignores Space while loading and keeps focus', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    )

    await user.tab()
    await user.keyboard('[Space]')

    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })

  it('reports busyness without leaving the tab order while loading', async () => {
    const user = userEvent.setup()
    render(<Button loading>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).not.toHaveAttribute('disabled')
    expect(button).toBeEnabled()

    await user.tab()

    expect(button).toHaveFocus()
  })

  it('is not busy when it is idle', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).not.toHaveAttribute(
      'aria-busy',
    )
  })

  it('keeps its label readable and announced once while loading', () => {
    render(<Button loading>Save</Button>)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeVisible()
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('replaces the leading icon with the spinner while loading', () => {
    const { rerender } = render(
      <Button icon={<span role="img" aria-label="Trash" />}>Delete</Button>,
    )

    expect(screen.getByRole('img', { name: 'Trash' })).toBeInTheDocument()
    expect(
      screen.queryByRole('status', { hidden: true }),
    ).not.toBeInTheDocument()

    rerender(
      <Button loading icon={<span role="img" aria-label="Trash" />}>
        Delete
      </Button>,
    )

    expect(screen.queryByRole('img', { name: 'Trash' })).not.toBeInTheDocument()
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('shows the spinner alone on an icon size and keeps its name', () => {
    render(
      <Button
        size={ButtonSize.Icon}
        aria-label="Delete"
        loading
        icon={<span role="img" aria-label="Trash" />}
      >
        Delete
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument()
  })

  it('renders the icon of an icon-size button that has no icon prop', () => {
    render(
      <Button size={ButtonSize.IconSmall} aria-label="Search">
        <span role="img" aria-label="Magnifier" />
      </Button>,
    )

    expect(screen.getByRole('img', { name: 'Magnifier' })).toBeInTheDocument()
  })

  it('does not submit its form while loading', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button loading type="submit">
          Save
        </Button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).not.toHaveBeenCalled()

    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit">Save</Button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('does not activate when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toBeDisabled()

    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('passes native props through to the underlying button', () => {
    render(
      <Button name="action" value="save" form="settings">
        Save
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('name', 'action')
    expect(button).toHaveAttribute('value', 'save')
    expect(button).toHaveAttribute('form', 'settings')
  })
})
