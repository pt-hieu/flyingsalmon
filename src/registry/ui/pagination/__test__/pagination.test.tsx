import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from '@/registry/ui/pagination'

function ControlledPagination({
  firstPage,
  pageCount,
}: {
  firstPage: number
  pageCount: number
}) {
  const [page, setPage] = useState(firstPage)

  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
}

function renderPageLink(page: number, children: React.ReactNode) {
  return <a href={`/results?page=${page}`}>{children}</a>
}

function readItemNames() {
  return screen
    .getAllByRole('button')
    .map((item) => item.getAttribute('aria-label'))
}

describe('Pagination', () => {
  it('renders nothing for a list of one page', () => {
    render(<Pagination page={1} pageCount={1} onPageChange={vi.fn()} />)

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it.each([
    ['both pages of a two-page list', 1, 2, ['Page 1', 'Page 2']],
    [
      'every page of a seven-page list',
      4,
      7,
      ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7'],
    ],
    [
      'the first five pages and the last on page 1',
      1,
      20,
      ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 20'],
    ],
    [
      'the first five pages and the last on page 4',
      4,
      20,
      ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 20'],
    ],
    [
      'both boundaries and the neighbours on page 5',
      5,
      20,
      ['Page 1', 'Page 4', 'Page 5', 'Page 6', 'Page 20'],
    ],
    [
      'both boundaries and the neighbours on page 10',
      10,
      20,
      ['Page 1', 'Page 9', 'Page 10', 'Page 11', 'Page 20'],
    ],
    [
      'both boundaries and the neighbours on page 16',
      16,
      20,
      ['Page 1', 'Page 15', 'Page 16', 'Page 17', 'Page 20'],
    ],
    [
      'the first page and the last five on page 17',
      17,
      20,
      ['Page 1', 'Page 16', 'Page 17', 'Page 18', 'Page 19', 'Page 20'],
    ],
    [
      'the first page and the last five on page 20',
      20,
      20,
      ['Page 1', 'Page 16', 'Page 17', 'Page 18', 'Page 19', 'Page 20'],
    ],
  ])('shows %s', (_description, page, pageCount, expectedPageNames) => {
    render(
      <Pagination page={page} pageCount={pageCount} onPageChange={vi.fn()} />,
    )

    expect(readItemNames()).toEqual([
      'Previous page',
      ...expectedPageNames,
      'Next page',
    ])
  })

  it('names the landmark Pagination', () => {
    render(<Pagination page={1} pageCount={5} onPageChange={vi.fn()} />)

    expect(
      screen.getByRole('navigation', { name: 'Pagination' }),
    ).toBeInTheDocument()
  })

  it('takes the landmark name a caller gives it', () => {
    render(
      <Pagination
        page={1}
        pageCount={5}
        onPageChange={vi.fn()}
        aria-label="Search results"
      />,
    )

    expect(
      screen.getByRole('navigation', { name: 'Search results' }),
    ).toBeInTheDocument()
  })

  it('shows no ellipsis while every page fits', () => {
    render(<Pagination page={4} pageCount={7} onPageChange={vi.fn()} />)

    expect(screen.queryByText('…')).not.toBeInTheDocument()
  })

  it('keeps the ellipsis out of the accessibility tree', () => {
    render(<Pagination page={10} pageCount={20} onPageChange={vi.fn()} />)

    expect(screen.getAllByText('…')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
  })

  it('reports the page a click asks for', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={5} pageCount={20} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: 'Page 6' }))

    expect(onPageChange).toHaveBeenCalledWith(6)
  })

  it('reports the page before and the page after', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={5} pageCount={20} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: 'Previous page' }))
    await user.click(screen.getByRole('button', { name: 'Next page' }))

    expect(onPageChange.mock.calls).toEqual([[4], [6]])
  })

  it('disables the previous page on the first page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={20} onPageChange={onPageChange} />)

    const previousPage = screen.getByRole('button', { name: 'Previous page' })

    expect(previousPage).toBeDisabled()

    await user.click(previousPage)

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('disables the next page on the last page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={20} pageCount={20} onPageChange={onPageChange} />)

    const nextPage = screen.getByRole('button', { name: 'Next page' })

    expect(nextPage).toBeDisabled()

    await user.click(nextPage)

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('marks the current page and leaves it focusable', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={3} pageCount={20} onPageChange={onPageChange} />)

    const currentPage = screen.getByRole('button', { name: 'Page 3' })

    expect(currentPage).toHaveAttribute('aria-current', 'page')

    await user.click(currentPage)

    expect(currentPage).toHaveFocus()
    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('keeps focus on the page the user activated when the window shifts', async () => {
    const user = userEvent.setup()
    render(<ControlledPagination firstPage={4} pageCount={20} />)

    await user.click(screen.getByRole('button', { name: 'Page 5' }))

    expect(readItemNames()).toEqual([
      'Previous page',
      'Page 1',
      'Page 4',
      'Page 5',
      'Page 6',
      'Page 20',
      'Next page',
    ])
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveFocus()
  })
})

describe('Pagination in compact form', () => {
  it('reads the position instead of showing page items', () => {
    render(
      <Pagination page={3} pageCount={12} onPageChange={vi.fn()} compact />,
    )

    expect(screen.getByText('Page 3 of 12')).toHaveAttribute(
      'aria-live',
      'polite',
    )
    expect(
      screen.queryByRole('button', { name: 'Page 3' }),
    ).not.toBeInTheDocument()
    expect(readItemNames()).toEqual(['Previous page', 'Next page'])
  })

  it('takes the text a caller formats', () => {
    render(
      <Pagination
        page={3}
        pageCount={12}
        onPageChange={vi.fn()}
        compact
        formatPageLabel={(page, pageCount) => `${page} / ${pageCount}`}
      />,
    )

    expect(screen.getByText('3 / 12')).toBeInTheDocument()
    expect(screen.queryByText('Page 3 of 12')).not.toBeInTheDocument()
  })

  it('still moves through the list', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(
      <Pagination
        page={3}
        pageCount={12}
        onPageChange={onPageChange}
        compact
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Next page' }))

    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})

describe('Pagination with page links', () => {
  it('renders every page item as the anchor the app gives it', () => {
    render(
      <Pagination page={2} pageCount={5} renderPageLink={renderPageLink} />,
    )

    expect(screen.getByRole('link', { name: 'Page 4' })).toHaveAttribute(
      'href',
      '/results?page=4',
    )
    expect(screen.getByRole('link', { name: 'Next page' })).toHaveAttribute(
      'href',
      '/results?page=3',
    )
  })

  it('marks the current page link', () => {
    render(
      <Pagination page={2} pageCount={5} renderPageLink={renderPageLink} />,
    )

    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Page 3' })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('leaves no link and no tab stop at the ends', async () => {
    const user = userEvent.setup()
    render(
      <Pagination page={1} pageCount={5} renderPageLink={renderPageLink} />,
    )

    expect(
      screen.queryByRole('link', { name: 'Previous page' }),
    ).not.toBeInTheDocument()

    await user.tab()

    expect(screen.getByRole('link', { name: 'Page 1' })).toHaveFocus()
  })
})
