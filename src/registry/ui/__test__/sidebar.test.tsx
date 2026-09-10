import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

const resizeObserverOutsideThisFile = globalThis.ResizeObserver

function reportContainerWidth(width: number) {
  globalThis.ResizeObserver = class WidthReportingResizeObserver implements ResizeObserver {
    constructor(private readonly report: ResizeObserverCallback) {}

    observe(target: Element) {
      this.report(
        [{ target, contentRect: { width } } as unknown as ResizeObserverEntry],
        this,
      )
    }

    unobserve() {}

    disconnect() {}
  }
}

function LayoutReadout() {
  const { layout } = useSidebar()

  return <p>Layout is {layout}</p>
}

function TripSidebar(
  props: Partial<React.ComponentProps<typeof SidebarProvider>> = {},
) {
  return (
    <SidebarProvider {...props}>
      <Sidebar>
        <SidebarHeader>
          <span>Lisbon week</span>
          <SidebarTrigger>
            <svg data-testid="trigger-icon" />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            <SidebarGroup>
              <SidebarGroupLabel>Planning</SidebarGroupLabel>
              <SidebarItem aria-current="page">Itinerary</SidebarItem>
              <SidebarItem>Budget</SidebarItem>
            </SidebarGroup>
          </SidebarNav>
        </SidebarContent>
        <SidebarFooter>
          <span>Signed in as Brian</span>
        </SidebarFooter>
      </Sidebar>
      <LayoutReadout />
    </SidebarProvider>
  )
}

const activeIndicatorOf = (item: HTMLElement) =>
  item.querySelector('.bg-indicator')

describe('Sidebar', () => {
  beforeEach(() => {
    reportContainerWidth(1200)
  })

  afterEach(() => {
    globalThis.ResizeObserver = resizeObserverOutsideThisFile
  })

  it('collapses and expands itself when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<TripSidebar />)

    const collapseTrigger = screen.getByRole('button', {
      name: 'Collapse sidebar',
    })
    expect(collapseTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('complementary')).toHaveAttribute(
      'data-collapsed',
      'false',
    )

    await user.click(collapseTrigger)

    expect(
      screen.getByRole('button', { name: 'Expand sidebar' }),
    ).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('complementary')).toHaveAttribute(
      'data-collapsed',
      'true',
    )
  })

  it('leaves a controlled sidebar where the app put it and reports the flipped value', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    render(
      <TripSidebar collapsed={false} onCollapsedChange={onCollapsedChange} />,
    )

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(onCollapsedChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole('complementary')).toHaveAttribute(
      'data-collapsed',
      'false',
    )
    expect(
      screen.getByRole('button', { name: 'Collapse sidebar' }),
    ).toBeInTheDocument()
  })

  it('reports the rail layout when collapsed above the threshold', () => {
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is rail')).toBeInTheDocument()
  })

  it('reports the strip layout below the threshold however it is collapsed', () => {
    reportContainerWidth(699)
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is strip')).toBeInTheDocument()
  })

  it('draws the active bar only on the item marked as the current page', () => {
    render(<TripSidebar />)

    const currentItem = screen.getByRole('button', { name: 'Itinerary' })
    const otherItem = screen.getByRole('button', { name: 'Budget' })

    expect(activeIndicatorOf(currentItem)).toBeInTheDocument()
    expect(activeIndicatorOf(otherItem)).not.toBeInTheDocument()
  })

  it('keeps each label as the accessible name of its item in the rail', () => {
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is rail')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Itinerary' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Budget' })).toBeInTheDocument()
  })

  it('renders header and footer content in the strip', () => {
    reportContainerWidth(420)
    render(<TripSidebar />)

    expect(screen.getByText('Layout is strip')).toBeInTheDocument()
    expect(screen.getByText('Lisbon week')).toBeVisible()
    expect(screen.getByText('Signed in as Brian')).toBeVisible()
  })
})
