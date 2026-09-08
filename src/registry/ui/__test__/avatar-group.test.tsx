import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AvatarGroup } from '@/registry/ui/avatar-group'
import { resolveRoster } from '@/registry/ui/avatar-group/resolve-roster'
import { revealSteps } from '@/registry/ui/avatar-group/reveal-steps'
import { tabStopChildIndex } from '@/registry/ui/avatar-group/tab-stop-child-index'
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

describe('resolveRoster', () => {
  it('shows every person and asks for no chip when the roster fits max', () => {
    const roster = resolveRoster({ items: crew, max: 5 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
      'Grace Hopper',
      'Katherine Johnson',
      'Alan Turing',
      'Barbara Liskov',
    ])
    expect(roster.chip).toBeNull()
  })

  it('splits the roster at max and counts everyone past it into the chip', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
      'Grace Hopper',
    ])
    expect(roster.chip?.count).toBe(3)
    expect(roster.chip?.text).toBe('+3')
  })

  it('clamps a max below one back up to a single person', () => {
    const roster = resolveRoster({ items: crew, max: 0 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.name)).toEqual([
      'Ada Lovelace',
    ])
    expect(roster.chip?.count).toBe(4)
  })

  it('caps the chip text while the count keeps the true total', () => {
    const crowd = Array.from({ length: 254 }, (_unused, index) => ({
      id: `person-${index}`,
      name: `Person ${index}`,
    }))

    const roster = resolveRoster({ items: crowd, max: 4, cap: 99 })

    expect(roster.chip?.count).toBe(250)
    expect(roster.chip?.text).toBe('+99')
  })

  it('leaves the chip text uncapped when the true count is under cap', () => {
    const roster = resolveRoster({ items: crew, max: 4, cap: 99 })

    expect(roster.chip?.text).toBe('+1')
  })

  it('joins the hidden names in roster order', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(roster.chip?.hiddenNames).toBe(
      'Katherine Johnson, Alan Turing, Barbara Liskov',
    )
  })

  it('leaves a nameless hidden person out of the joined names', () => {
    const roster = resolveRoster({
      items: [
        { name: 'Ada Lovelace' },
        { src: '/anonymous.png' },
        { name: 'Grace Hopper' },
      ],
      max: 1,
    })

    expect(roster.chip?.count).toBe(2)
    expect(roster.chip?.hiddenNames).toBe('Grace Hopper')
  })

  it('falls back to alt for a person carrying no name', () => {
    const roster = resolveRoster({
      items: [{ src: '/ada.png', alt: 'Trip owner' }],
      max: 4,
    })

    expect(roster.visibleItems[0].name).toBe('Trip owner')
  })

  it('stacks the first person highest and descends to the right', () => {
    const roster = resolveRoster({ items: crew, max: 4 })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.layer)).toEqual(
      [4, 3, 2, 1],
    )
  })

  it('keys each person by id and falls back to the roster position', () => {
    const roster = resolveRoster({
      items: [{ id: 'ada', name: 'Ada Lovelace' }, { name: 'Grace Hopper' }],
      max: 4,
    })

    expect(roster.visibleItems.map((visibleItem) => visibleItem.key)).toEqual([
      'ada',
      1,
    ])
  })

  it('resolves an empty roster to nothing to render', () => {
    const roster = resolveRoster({ items: [], max: 4 })

    expect(roster.visibleItems).toEqual([])
    expect(roster.chip).toBeNull()
  })
})

describe('revealSteps', () => {
  it('holds every avatar in place while nothing is revealed', () => {
    expect(revealSteps({ childIndex: 0, revealedIndex: null })).toBe(0)
    expect(revealSteps({ childIndex: 4, revealedIndex: null })).toBe(0)
  })

  it('holds the revealed avatar itself in place', () => {
    expect(revealSteps({ childIndex: 2, revealedIndex: 2 })).toBe(0)
  })

  it('pushes everything before the revealed avatar one step back', () => {
    expect(revealSteps({ childIndex: 1, revealedIndex: 2 })).toBe(-1)
    expect(revealSteps({ childIndex: 0, revealedIndex: 2 })).toBe(-1)
  })

  it('pushes everything after the revealed avatar one step forward', () => {
    expect(revealSteps({ childIndex: 3, revealedIndex: 2 })).toBe(1)
    expect(revealSteps({ childIndex: 9, revealedIndex: 2 })).toBe(1)
  })
})

describe('tabStopChildIndex', () => {
  it('opens the group on the first avatar before focus has been anywhere', () => {
    const roster = resolveRoster({ items: crew, max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBe(0)
  })

  it('keeps the tab stop on the avatar focus last reached', () => {
    const roster = resolveRoster({ items: crew, max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 2 })).toBe(2)
  })

  it('keeps the tab stop on the chip, one past the last avatar', () => {
    const roster = resolveRoster({ items: crew, max: 2 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 2 })).toBe(2)
  })

  it('opens on the first named avatar when earlier ones are nameless', () => {
    const roster = resolveRoster({
      items: [{ src: '/anonymous.png' }, { name: 'Ada Lovelace' }],
      max: 4,
    })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBe(1)
  })

  it('refuses the tab stop to a nameless avatar and falls back to the first', () => {
    const roster = resolveRoster({
      items: [
        { name: 'Ada Lovelace' },
        { src: '/anonymous.png' },
        { name: 'Grace Hopper' },
      ],
      max: 4,
    })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 1 })).toBe(0)
  })

  it('falls back to the first avatar when the remembered child is gone', () => {
    const roster = resolveRoster({ items: crew, max: 5 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: 9 })).toBe(0)
  })

  it('offers no tab stop when nobody in the group can be named', () => {
    const roster = resolveRoster({ items: [{ src: '/anonymous.png' }], max: 4 })

    expect(tabStopChildIndex({ roster, focusedChildIndex: null })).toBeNull()
  })
})
