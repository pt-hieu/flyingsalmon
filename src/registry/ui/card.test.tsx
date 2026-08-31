import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

describe('Card', () => {
  it('renders the content of every slot it is given', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Weekend in Kyoto</CardTitle>
          <CardDescription>Three days, ten stops</CardDescription>
          <CardAction>
            <button type="button">Save</button>
          </CardAction>
        </CardHeader>
        <CardContent>Temples, tea, and a river walk.</CardContent>
        <CardFooter>Updated today</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Weekend in Kyoto')).toBeInTheDocument()
    expect(screen.getByText('Three days, ten stops')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(
      screen.getByText('Temples, tea, and a river walk.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Updated today')).toBeInTheDocument()
  })

  it('takes no tab stop of its own when it is static', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Card>
          <CardHeader>
            <CardTitle>Weekend in Kyoto</CardTitle>
          </CardHeader>
          <CardContent>Temples, tea, and a river walk.</CardContent>
        </Card>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('takes one tab stop when it is interactive, the title link', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Card interactive>
          <CardHeader>
            <CardTitle>
              <a href="#kyoto">Weekend in Kyoto</a>
            </CardTitle>
            <CardDescription>Three days, ten stops</CardDescription>
          </CardHeader>
          <CardContent>Temples, tea, and a river walk.</CardContent>
        </Card>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Weekend in Kyoto' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('activates the title link when Enter is pressed on it', async () => {
    const user = userEvent.setup()
    const openTrip = vi.fn((event: React.MouseEvent) => event.preventDefault())
    render(
      <Card interactive>
        <CardHeader>
          <CardTitle>
            <a href="#kyoto" onClick={openTrip}>
              Weekend in Kyoto
            </a>
          </CardTitle>
        </CardHeader>
      </Card>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(openTrip).toHaveBeenCalledTimes(1)
  })

  it('gives a nested action its own tab stop after the title link', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Card interactive>
          <CardHeader>
            <CardTitle>
              <a href="#kyoto">Weekend in Kyoto</a>
            </CardTitle>
            <CardAction>
              <button type="button">Save</button>
            </CardAction>
          </CardHeader>
        </Card>
        <button type="button">After</button>
      </>,
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Weekend in Kyoto' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('never triggers the title link when a nested action is clicked', async () => {
    const user = userEvent.setup()
    const openTrip = vi.fn((event: React.MouseEvent) => event.preventDefault())
    const saveTrip = vi.fn()
    render(
      <Card interactive>
        <CardHeader>
          <CardTitle>
            <a href="#kyoto" onClick={openTrip}>
              Weekend in Kyoto
            </a>
          </CardTitle>
          <CardAction>
            <button type="button" onClick={saveTrip}>
              Save
            </button>
          </CardAction>
        </CardHeader>
      </Card>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(saveTrip).toHaveBeenCalledTimes(1)
    expect(openTrip).not.toHaveBeenCalled()
  })

  it('keeps a nested action outside the title link', () => {
    render(
      <Card interactive>
        <CardHeader>
          <CardTitle>
            <a href="#kyoto">Weekend in Kyoto</a>
          </CardTitle>
          <CardAction>
            <button type="button">Save</button>
          </CardAction>
        </CardHeader>
      </Card>,
    )

    const titleLink = screen.getByRole('link', { name: 'Weekend in Kyoto' })

    expect(within(titleLink).queryByRole('button')).not.toBeInTheDocument()
  })
})
