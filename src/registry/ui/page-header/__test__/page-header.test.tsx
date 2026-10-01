import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

describe('PageHeader', () => {
  it('names the page with its one level-1 heading', () => {
    render(
      <main>
        <PageHeader>
          <PageHeaderTitle>Trips</PageHeaderTitle>
          <PageHeaderActions>
            <Button>Plan a new trip</Button>
          </PageHeaderActions>
        </PageHeader>
      </main>,
    )

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Trips' }),
    ).toBeInTheDocument()
  })

  it('gives a tab stop to the actions in order and to nothing else', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <PageHeader>
          <PageHeaderTitle>Kyoto in autumn</PageHeaderTitle>
          <PageHeaderActions>
            <Button>Share</Button>
            <Button variant={ButtonVariant.Outline}>Replan</Button>
          </PageHeaderActions>
        </PageHeader>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Share' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Replan' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })
})
