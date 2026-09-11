import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '@/registry/ui/accordion'

function ThreeItems() {
  return (
    <>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Ships in two days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Returns within 30 days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>Two years of cover.</AccordionContent>
      </AccordionItem>
    </>
  )
}

describe('Accordion', () => {
  it('reveals an item panel when its trigger is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>Ships in two days.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Shipping' }))

    expect(screen.getByText('Ships in two days.')).toBeVisible()
  })

  it('toggles a panel with Enter and with Space', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(screen.getByText('Ships in two days.')).toBeVisible()

    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()
    })

    await user.keyboard(' ')

    expect(screen.getByText('Ships in two days.')).toBeVisible()

    await user.keyboard(' ')

    await waitFor(() => {
      expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()
    })
  })

  it('keeps several panels open at once by default', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Shipping' }))
    await user.click(screen.getByRole('button', { name: 'Returns' }))

    expect(screen.getByText('Ships in two days.')).toBeVisible()
    expect(screen.getByText('Returns within 30 days.')).toBeVisible()
  })

  it('closes the open panel when another opens under type single', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type={AccordionType.Single}>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Shipping' }))
    await user.click(screen.getByRole('button', { name: 'Returns' }))

    expect(screen.getByText('Returns within 30 days.')).toBeVisible()
    await waitFor(() => {
      expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()
    })
  })

  it('collapses the open panel on a second press when collapsible', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type={AccordionType.Single}>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Shipping' }))
    await user.click(screen.getByRole('button', { name: 'Shipping' }))

    await waitFor(() => {
      expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()
    })
  })

  it('keeps the open panel open on a second press when collapsible is false', async () => {
    const user = userEvent.setup()
    render(
      <Accordion type={AccordionType.Single} collapsible={false}>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Shipping' }))
    await user.click(screen.getByRole('button', { name: 'Shipping' }))

    expect(screen.getByText('Ships in two days.')).toBeVisible()
  })

  it('reports the open values to onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Accordion onValueChange={onValueChange}>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Returns' }))

    expect(onValueChange).toHaveBeenCalledWith(['returns'])

    await user.click(screen.getByRole('button', { name: 'Warranty' }))

    expect(onValueChange).toHaveBeenCalledWith(['returns', 'warranty'])
  })

  it('reports the single open value to onValueChange under type single', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Accordion type={AccordionType.Single} onValueChange={onValueChange}>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Warranty' }))

    expect(onValueChange).toHaveBeenCalledWith('warranty')
  })

  it('moves focus between triggers with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    await user.tab()
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('button', { name: 'Returns' })).toHaveFocus()

    await user.keyboard('{ArrowUp}')

    expect(screen.getByRole('button', { name: 'Shipping' })).toHaveFocus()
  })

  it('jumps to the first trigger on Home and the last on End', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    await user.tab()
    await user.keyboard('{End}')

    expect(screen.getByRole('button', { name: 'Warranty' })).toHaveFocus()

    await user.keyboard('{Home}')

    expect(screen.getByRole('button', { name: 'Shipping' })).toHaveFocus()
  })

  it('skips a disabled item when arrowing through the triggers', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>Ships in two days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns" disabled>
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>Returns within 30 days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="warranty">
          <AccordionTrigger>Warranty</AccordionTrigger>
          <AccordionContent>Two years of cover.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    await user.tab()
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('button', { name: 'Warranty' })).toHaveFocus()
  })

  it('exposes the trigger state through aria-expanded', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    const trigger = screen.getByRole('button', { name: 'Shipping' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('labels the open panel with its trigger', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    await user.click(screen.getByRole('button', { name: 'Returns' }))

    expect(screen.getByRole('region', { name: 'Returns' })).toHaveTextContent(
      'Returns within 30 days.',
    )
  })

  it('renders each trigger inside a level three heading', () => {
    render(
      <Accordion>
        <ThreeItems />
      </Accordion>,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Shipping' }),
    ).toContainElement(screen.getByRole('button', { name: 'Shipping' }))
  })

  it('replaces the heading with the element given through asChild', () => {
    render(
      <Accordion>
        <AccordionItem value="shipping">
          <AccordionTrigger asChild>
            <h2>Shipping</h2>
          </AccordionTrigger>
          <AccordionContent>Ships in two days.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Shipping' }),
    ).toContainElement(screen.getByRole('button', { name: 'Shipping' }))
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument()
  })

  it('blocks a disabled item from opening while its neighbours still open', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="shipping" disabled>
          <AccordionTrigger>Shipping</AccordionTrigger>
          <AccordionContent>Ships in two days.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Returns</AccordionTrigger>
          <AccordionContent>Returns within 30 days.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    expect(screen.getByRole('button', { name: 'Shipping' })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Returns' }))

    expect(screen.getByText('Returns within 30 days.')).toBeVisible()
    expect(screen.queryByText('Ships in two days.')).not.toBeInTheDocument()
  })

  it('disables every trigger when the root is disabled', () => {
    render(
      <Accordion disabled>
        <ThreeItems />
      </Accordion>,
    )

    expect(screen.getByRole('button', { name: 'Shipping' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Returns' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Warranty' })).toBeDisabled()
  })

  it('opens the panels named by a controlled value', () => {
    const { rerender } = render(
      <Accordion value={['shipping']}>
        <ThreeItems />
      </Accordion>,
    )

    expect(screen.getByText('Ships in two days.')).toBeVisible()

    rerender(
      <Accordion value={['warranty']}>
        <ThreeItems />
      </Accordion>,
    )

    expect(screen.getByText('Two years of cover.')).toBeVisible()
  })

  it('opens the panels named by defaultValue', () => {
    render(
      <Accordion defaultValue={['shipping', 'warranty']}>
        <ThreeItems />
      </Accordion>,
    )

    expect(screen.getByText('Ships in two days.')).toBeVisible()
    expect(screen.getByText('Two years of cover.')).toBeVisible()
    expect(
      screen.queryByText('Returns within 30 days.'),
    ).not.toBeInTheDocument()
  })
})
