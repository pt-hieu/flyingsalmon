import { render, screen } from '@testing-library/react'
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
  CardTitleElement,
} from '@/registry/ui/card'

describe('Card', () => {
  it('renders the content of every slot it is given', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Weekend in Kyoto</CardTitle>
          <CardDescription>Three days, ten stops</CardDescription>
        </CardHeader>
        <CardContent>Temples, tea, and a river walk.</CardContent>
        <CardFooter>Updated today</CardFooter>
        <CardAction>
          <button type="button">Save</button>
        </CardAction>
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

  it('gives a nested action its own tab stop after the title link', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Card interactive>
          <CardHeader>
            <CardTitle>
              <a href="#kyoto">Weekend in Kyoto</a>
            </CardTitle>
          </CardHeader>
          <CardAction>
            <button type="button">Save</button>
          </CardAction>
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
        </CardHeader>
        <CardAction>
          <button type="button" onClick={saveTrip}>
            Save
          </button>
        </CardAction>
      </Card>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(saveTrip).toHaveBeenCalledTimes(1)
    expect(openTrip).not.toHaveBeenCalled()
  })

  it('reads the title as plain text, not a heading, by default', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Weekend in Kyoto</CardTitle>
        </CardHeader>
      </Card>,
    )

    expect(screen.getByText('Weekend in Kyoto')).toBeInTheDocument()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('makes the title a heading at the level it is given', () => {
    render(
      <Card interactive>
        <CardHeader>
          <CardTitle as={CardTitleElement.H3}>
            <a href="#kyoto">Weekend in Kyoto</a>
          </CardTitle>
        </CardHeader>
      </Card>,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Weekend in Kyoto' }),
    ).toContainElement(screen.getByRole('link', { name: 'Weekend in Kyoto' }))
  })
})
