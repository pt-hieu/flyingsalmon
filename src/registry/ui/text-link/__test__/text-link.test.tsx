import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { TextLink } from '@/registry/ui/text-link'

describe('TextLink', () => {
  it('renders a link carrying its href and its children', () => {
    render(<TextLink href="/trips/kyoto">Weekend in Kyoto</TextLink>)

    const link = screen.getByRole('link', { name: 'Weekend in Kyoto' })

    expect(link).toHaveAttribute('href', '/trips/kyoto')
  })

  it('renders the anchor a consumer slots in, and no anchor of its own', () => {
    render(
      <TextLink asChild>
        <a href="/trips/kyoto" data-router-link>
          Weekend in Kyoto
        </a>
      </TextLink>,
    )

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', '/trips/kyoto')
    expect(links[0]).toHaveAttribute('data-router-link')
    expect(links[0]).toHaveTextContent('Weekend in Kyoto')
  })

  it('passes the target and rel the app sets through to the anchor', () => {
    render(
      <TextLink
        href="https://www.japan.travel"
        target="_blank"
        rel="noreferrer"
      >
        Japan travel
      </TextLink>,
    )

    const link = screen.getByRole('link', { name: 'Japan travel' })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('takes one tab stop, between the controls around it', async () => {
    const user = userEvent.setup()
    render(
      <p>
        Read the <button type="button">Before</button>{' '}
        <TextLink href="/trips/kyoto">Weekend in Kyoto</TextLink> before you{' '}
        <button type="button">After</button>
      </p>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('link', { name: 'Weekend in Kyoto' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })
})
