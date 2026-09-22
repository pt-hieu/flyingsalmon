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
  SidebarNest,
  SidebarNestItems,
  SidebarTrigger,
  useSidebar,
} from '@/registry/ui/sidebar'

/**
 * jsdom evaluates no media queries, so the viewport width is the test's to
 * state and the stub answers the sidebar's own query against it.
 */
function reportViewportWidth(width: number) {
  vi.stubGlobal('matchMedia', (query: string) => {
    const [, breakpoint] = query.match(/min-width:\s*(\d+)px/) ?? []

    return {
      matches: width >= Number(breakpoint),
      addEventListener() {},
      removeEventListener() {},
    }
  })
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

/**
 * jsdom does no layout, so the vertical bounds of the content box and of each
 * item are the test's to state. Keys are read from `data-slot` first, then the
 * element's own text.
 */
function reportVerticalBounds(bounds: Record<string, [number, number]>) {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    function (this: HTMLElement) {
      const [top, bottom] = bounds[
        this.dataset.slot ?? this.textContent ?? ''
      ] ?? [0, 0]

      return { top, bottom, left: 0, right: 0 } as DOMRect
    },
  )

  const scrollOffsets = new WeakMap<HTMLElement, number>()

  Object.defineProperty(HTMLElement.prototype, 'scrollTop', {
    configurable: true,
    get(this: HTMLElement) {
      return scrollOffsets.get(this) ?? 0
    },
    set(this: HTMLElement, offset: number) {
      scrollOffsets.set(this, offset)
    },
  })
}

function TripNavOnly({ currentLabel }: { currentLabel: string }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            {['Itinerary', 'Budget'].map((label) => (
              <SidebarItem
                key={label}
                aria-current={label === currentLabel ? 'page' : undefined}
              >
                {label}
              </SidebarItem>
            ))}
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function DaysNest({
  currentLabel,
  defaultOpen,
}: {
  currentLabel?: string
  defaultOpen?: boolean
}) {
  const renderItem = (label: string) => (
    <SidebarItem
      key={label}
      aria-current={label === currentLabel ? 'page' : undefined}
    >
      {label}
    </SidebarItem>
  )

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarNav aria-label="Trip">
            {renderItem('Itinerary')}
            <SidebarNest defaultOpen={defaultOpen}>
              {renderItem('Days')}
              <SidebarNestItems>
                {['Arrival', 'Sintra'].map(renderItem)}
              </SidebarNestItems>
            </SidebarNest>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function currentMarkOwner() {
  return document
    .querySelector('[data-slot="sidebar-active-indicator"]')
    ?.closest('button')?.textContent
}

describe('Sidebar', () => {
  beforeEach(() => {
    reportViewportWidth(1200)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTop
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

  it('reports the collapsed layout above the threshold', () => {
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is collapsed')).toBeInTheDocument()
  })

  it('reports the strip layout below the threshold however it is collapsed', () => {
    reportViewportWidth(699)
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is strip')).toBeInTheDocument()
  })

  it('keeps each label as the accessible name of its item in the rail', () => {
    render(<TripSidebar defaultCollapsed />)

    expect(screen.getByText('Layout is collapsed')).toBeInTheDocument()

    for (const label of ['Itinerary', 'Budget']) {
      const item = screen.getByRole('button', { name: label })

      expect(item).toHaveTextContent(label)
      expect(item).not.toHaveAttribute('aria-label')
      expect(item).not.toHaveAttribute('aria-labelledby')
    }
  })

  it('scrolls the content until an item hanging past its bottom edge is whole', () => {
    reportVerticalBounds({
      'sidebar-content': [0, 100],
      Budget: [80, 120],
    })
    render(<TripNavOnly currentLabel="Budget" />)

    const content = screen
      .getByRole('button', { name: 'Budget' })
      .closest('[data-slot="sidebar-content"]')

    expect(content).toHaveProperty('scrollTop', 20)
  })

  it('leaves the scroll alone when the active item is already whole', () => {
    reportVerticalBounds({
      'sidebar-content': [0, 100],
      Itinerary: [10, 46],
    })
    render(<TripNavOnly currentLabel="Itinerary" />)

    const content = screen
      .getByRole('button', { name: 'Itinerary' })
      .closest('[data-slot="sidebar-content"]')

    expect(content).toHaveProperty('scrollTop', 0)
  })

  it('renders header and footer content in the strip', () => {
    reportViewportWidth(420)
    render(<TripSidebar />)

    expect(screen.getByText('Layout is strip')).toBeInTheDocument()
    expect(screen.getByText('Lisbon week')).toBeVisible()
    expect(screen.getByText('Signed in as Brian')).toBeVisible()
  })

  describe('nest', () => {
    it('reveals its children through the parent toggle', async () => {
      const user = userEvent.setup()
      render(<DaysNest currentLabel="Itinerary" />)

      const toggle = screen.getByRole('button', { name: 'Days items' })
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(screen.queryByRole('button', { name: 'Sintra' })).toBeNull()

      await user.click(toggle)

      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('button', { name: 'Sintra' })).toBeInTheDocument()

      await user.click(toggle)

      expect(screen.queryByRole('button', { name: 'Sintra' })).toBeNull()
    })

    it('keeps the parent page reachable beside the toggle', () => {
      render(<DaysNest defaultOpen />)

      expect(screen.getByRole('button', { name: 'Days' })).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Days items' }),
      ).toHaveAttribute('aria-expanded', 'true')
    })

    it('opens itself when a child is the current page', () => {
      render(<DaysNest currentLabel="Sintra" />)

      expect(screen.getByRole('button', { name: 'Sintra' })).toBeInTheDocument()
      expect(currentMarkOwner()).toBe('Sintra')
    })

    it('hands the current mark to the parent while closed', async () => {
      const user = userEvent.setup()
      render(<DaysNest currentLabel="Sintra" />)

      await user.click(screen.getByRole('button', { name: 'Days items' }))

      expect(currentMarkOwner()).toBe('Days')
    })

    it('shows its children flat in the strip', () => {
      reportViewportWidth(600)
      render(<DaysNest currentLabel="Itinerary" />)

      expect(screen.getByRole('button', { name: 'Sintra' })).toBeInTheDocument()
    })
  })
})
