import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeadCell,
  TableHeadCellScope,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

function reportContainerOverflow() {
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1200)
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400)
}

function installReportingResizeObserver() {
  const observers: { callback: ResizeObserverCallback; targets: Element[] }[] =
    []

  class ReportingResizeObserver implements ResizeObserver {
    private readonly targets: Element[] = []

    constructor(callback: ResizeObserverCallback) {
      observers.push({ callback, targets: this.targets })
    }

    observe(target: Element) {
      this.targets.push(target)
    }

    unobserve(target: Element) {
      this.targets.splice(this.targets.indexOf(target), 1)
    }

    disconnect() {
      this.targets.length = 0
    }
  }

  vi.stubGlobal('ResizeObserver', ReportingResizeObserver)

  return function reportResize(target: Element) {
    for (const observer of observers) {
      if (observer.targets.includes(target)) {
        observer.callback([], {} as ResizeObserver)
      }
    }
  }
}

function controlTableWidth(containerWidth: number) {
  const width = { table: containerWidth }

  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(
    () => width.table,
  )
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(
    containerWidth,
  )

  return width
}

function stopsTable() {
  return (
    <Table scrollRegionLabel="Stops">
      <TableBody>
        <TableRow>
          <TableCell>Kyoto</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

describe('Table', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders the content of every part it is given', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Stop</TableHeadCell>
            <TableHeadCell>Nights</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Kyoto</TableCell>
            <TableCell>Three</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>Three</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Stop')).toBeInTheDocument()
    expect(screen.getByText('Nights')).toBeInTheDocument()
    expect(screen.getByText('Kyoto')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(3)
  })

  it('exposes a head cell as a column header by default and as a row header when scoped to a row', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Stop</TableHeadCell>
            <TableHeadCell>Nights</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHeadCell scope={TableHeadCellScope.Row}>Kyoto</TableHeadCell>
            <TableCell>Three</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(
      screen.getByRole('columnheader', { name: 'Stop' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Nights' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'Kyoto' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Three' })).toBeInTheDocument()
  })

  it('takes no tab stop of its own when it fits and no row is interactive', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadCell>Stop</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Kyoto</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('takes one tab stop as a named region when it is wider than its container', async () => {
    reportContainerOverflow()
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Table scrollRegionLabel="Stops">
          <TableBody>
            <TableRow>
              <TableCell>Kyoto</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    await user.tab()
    expect(screen.getByRole('region', { name: 'Stops' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('becomes a focusable region once its rows grow wider than its container', async () => {
    const reportResize = installReportingResizeObserver()
    const width = controlTableWidth(400)
    const user = userEvent.setup()
    render(stopsTable())

    expect(screen.queryByRole('region')).not.toBeInTheDocument()

    width.table = 1200
    act(() => reportResize(screen.getByRole('table')))

    await user.tab()
    expect(screen.getByRole('region', { name: 'Stops' })).toHaveFocus()
  })

  it('stops being a region once it fits its container again', () => {
    const reportResize = installReportingResizeObserver()
    const width = controlTableWidth(400)
    width.table = 1200
    render(stopsTable())

    const region = screen.getByRole('region', { name: 'Stops' })
    width.table = 400
    act(() => reportResize(region))

    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('names an overflowing region after the table when no region label is given', () => {
    reportContainerOverflow()
    render(
      <Table aria-label="Stops">
        <TableBody>
          <TableRow>
            <TableCell>Kyoto</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByRole('region', { name: 'Stops' })).toBeInTheDocument()
    expect(screen.getByRole('table', { name: 'Stops' })).toBeInTheDocument()
  })

  it('takes one tab stop per interactive row, the link in its cell', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Table>
          <TableBody>
            <TableRow interactive>
              <TableCell>Two nights</TableCell>
              <TableCell rowLink>
                <a href="#kyoto">Kyoto</a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Kyoto' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('activates the link of an interactive row from the keyboard', async () => {
    const user = userEvent.setup()
    const openStop = vi.fn((event: React.MouseEvent) => event.preventDefault())
    render(
      <Table>
        <TableBody>
          <TableRow interactive>
            <TableCell>Two nights</TableCell>
            <TableCell rowLink>
              <a href="#kyoto" onClick={openStop}>
                Kyoto
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(openStop).toHaveBeenCalledTimes(1)
  })

  it('keeps a second link in an interactive row reachable and independent of the row link', async () => {
    const user = userEvent.setup()
    const openStop = vi.fn((event: React.MouseEvent) => event.preventDefault())
    const editStop = vi.fn((event: React.MouseEvent) => event.preventDefault())
    render(
      <Table>
        <TableBody>
          <TableRow interactive>
            <TableCell rowLink>
              <a href="#kyoto" onClick={openStop}>
                Kyoto
              </a>
            </TableCell>
            <TableCell>
              <a href="#kyoto-edit" onClick={editStop}>
                Edit
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Kyoto' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('link', { name: 'Edit' })).toHaveFocus()

    await user.click(screen.getByRole('link', { name: 'Edit' }))
    expect(editStop).toHaveBeenCalledTimes(1)
    expect(openStop).not.toHaveBeenCalled()
  })
})
