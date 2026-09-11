import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AvatarGroup } from '@/registry/ui/avatar-group'
import { TooltipProvider } from '@/registry/ui/tooltip'

const crew = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Katherine Johnson' },
  { name: 'Alan Turing' },
  { name: 'Barbara Liskov' },
]

function renderAvatarGroup(
  props: Partial<React.ComponentProps<typeof AvatarGroup>> = {},
) {
  return render(
    <TooltipProvider>
      <AvatarGroup items={crew} {...props} />
    </TooltipProvider>,
  )
}

function renderAvatarGroupBetweenButtons(
  props: Partial<React.ComponentProps<typeof AvatarGroup>> = {},
) {
  return render(
    <TooltipProvider>
      <button type="button">Before</button>
      <AvatarGroup items={crew} {...props} />
      <button type="button">After</button>
    </TooltipProvider>,
  )
}

describe('AvatarGroup', () => {
  it('shows four avatars and a chip counting the rest by default', () => {
    renderAvatarGroup()

    expect(
      screen.getByRole('img', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Grace Hopper' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Katherine Johnson' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Alan Turing' })).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Barbara Liskov' }),
    ).not.toBeInTheDocument()

    expect(screen.getByRole('img', { name: '1 more' })).toHaveTextContent('+1')
  })

  it('shows no chip when the roster fits inside max', () => {
    renderAvatarGroup({ max: 5 })

    expect(
      screen.getByRole('img', { name: 'Barbara Liskov' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('+0')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: '0 more' }),
    ).not.toBeInTheDocument()
  })

  it('counts every person past max into the chip', () => {
    renderAvatarGroup({ max: 2 })

    expect(
      screen.getByRole('img', { name: 'Grace Hopper' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Katherine Johnson' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: '3 more' })).toHaveTextContent('+3')
  })

  it('clamps a max below one back up to a single avatar', () => {
    renderAvatarGroup({ max: 0 })

    expect(
      screen.getByRole('img', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Grace Hopper' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: '4 more' })).toHaveTextContent('+4')
  })

  it('caps the chip text while its accessible name states the true count', () => {
    const crowd = Array.from({ length: 254 }, (_unused, index) => ({
      id: `person-${index}`,
      name: `Person ${index}`,
    }))
    renderAvatarGroup({ items: crowd, cap: 99 })

    expect(screen.getByRole('img', { name: '250 more' })).toHaveTextContent(
      '+99',
    )
  })

  it('leaves the chip text uncapped when the true count is under cap', () => {
    renderAvatarGroup({ cap: 99 })

    expect(screen.getByRole('img', { name: '1 more' })).toHaveTextContent('+1')
  })

  it('keeps hidden people out of the document entirely', () => {
    const { container } = renderAvatarGroup()

    expect(container).not.toHaveTextContent('Barbara Liskov')
    expect(container).not.toHaveTextContent('BL')
  })

  it('renders nothing at all for an empty roster', () => {
    const { container } = renderAvatarGroup({ items: [] })

    expect(container).toBeEmptyDOMElement()
  })

  it('exposes a group named by the aria-label it is given', () => {
    renderAvatarGroup({ 'aria-label': 'Trip members' })

    expect(
      screen.getByRole('group', { name: 'Trip members' }),
    ).toBeInTheDocument()
  })

  it('costs one tab stop that enters on the first avatar and leaves the group', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()
  })

  it('walks the avatars and the chip with the arrow keys and stops at both ends', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    await user.tab()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveFocus()

    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')
    expect(screen.getByRole('img', { name: '1 more' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('img', { name: '1 more' })).toHaveFocus()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('img', { name: 'Alan Turing' })).toHaveFocus()
  })

  it('jumps to the first avatar on Home and the chip on End', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    await user.tab()

    await user.keyboard('{End}')
    expect(screen.getByRole('img', { name: '1 more' })).toHaveFocus()

    await user.keyboard('{Home}')
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveFocus()
  })

  it('ends the arrow path on the last avatar when there is no chip', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons({ max: 5 })

    await user.tab()
    await user.tab()

    await user.keyboard('{End}')
    expect(screen.getByRole('img', { name: 'Barbara Liskov' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('img', { name: 'Barbara Liskov' })).toHaveFocus()
  })

  it('re-enters on the first avatar after focus has left the group', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    await user.tab()
    await user.keyboard('{End}')
    expect(screen.getByRole('img', { name: '1 more' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus()

    await user.tab({ shift: true })
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveFocus()
  })

  it('leaves the group backwards from wherever the arrows left focus', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    await user.tab()
    await user.keyboard('{End}')
    expect(screen.getByRole('img', { name: '1 more' })).toHaveFocus()

    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()
  })

  it('runs a consumer keydown handler alongside its own arrow path', async () => {
    const user = userEvent.setup()
    const keysSeen: string[] = []
    renderAvatarGroupBetweenButtons({
      onKeyDown: (event) => keysSeen.push(event.key),
    })

    await user.tab()
    await user.tab()
    await user.keyboard('{ArrowRight}')

    expect(keysSeen).toEqual(['ArrowRight'])
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveFocus()
  })

  it('opens a tooltip naming the person when an avatar takes focus', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons()

    await user.tab()
    await user.tab()
    await user.keyboard('{ArrowRight}')

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Grace Hopper')
  })

  it('opens a tooltip listing the hidden people when the chip takes focus', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons({ max: 2 })

    await user.tab()
    await user.tab()
    await user.keyboard('{End}')

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent(
      'Katherine Johnson, Alan Turing, Barbara Liskov',
    )
  })

  it('prefers the person name over alt in the tooltip', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons({
      items: [{ name: 'Ada Lovelace', alt: 'Trip owner' }],
    })

    await user.tab()
    await user.tab()

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Ada Lovelace')
  })

  it('falls back to alt when an item carries no name', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons({
      items: [{ src: '/anonymous.png', alt: 'Trip owner' }],
    })

    await user.tab()
    await user.tab()

    expect(screen.getByRole('img', { name: 'Trip owner' })).toHaveFocus()

    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 1000 })
    expect(tooltip).toHaveTextContent('Trip owner')
  })

  it('hides a nameless item from assistive tech and from the arrow path', async () => {
    const user = userEvent.setup()
    renderAvatarGroupBetweenButtons({
      items: [
        { name: 'Ada Lovelace' },
        { src: '/anonymous.png' },
        { name: 'Grace Hopper' },
      ],
    })

    await user.tab()
    await user.tab()
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveFocus()

    expect(screen.getAllByRole('img')).toHaveLength(2)
  })
})
