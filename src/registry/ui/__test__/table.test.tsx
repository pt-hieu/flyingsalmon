import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

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

describe('Table', () => {
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

  it('takes no tab stop of its own when no row is interactive', async () => {
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

  it('takes one tab stop per interactive row, the link in its cell', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Table>
          <TableBody>
            <TableRow interactive>
              <TableCell>Two nights</TableCell>
              <TableCell>
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
            <TableCell>
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
})
