import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Sticker } from '@/registry/ui/sticker'
import type { StickerArt, StickerRoleClassNames } from '@/registry/ui/sticker'

const windowArt: StickerArt = {
  width: 80,
  height: 80,
  frames: [
    [
      { role: 'cut', paint: 'fill', d: 'M20 20 L60 20 L60 60 L20 60' },
      { role: 'glass', paint: 'fill', d: 'M21 21 L59 21 L59 59 L21 59' },
      { role: 'ink', paint: 'stroke', d: 'M21 21 L59 21 L59 59 L21 59 Z' },
    ],
    [
      { role: 'cut', paint: 'fill', d: 'M19 21 L61 19 L60 61 L20 60' },
      { role: 'glass', paint: 'fill', d: 'M22 20 L58 22 L60 58 L20 60' },
      { role: 'ink', paint: 'stroke', d: 'M22 20 L58 22 L60 58 L20 60 Z' },
    ],
  ],
}

const roleClassNames: StickerRoleClassNames = {
  ink: { stroke: 'stroke-foreground' },
  glass: { fill: 'fill-group-sky' },
}

describe('Sticker', () => {
  it('is one image named by its label', () => {
    render(
      <Sticker
        art={windowArt}
        label="A window"
        roleClassNames={roleClassNames}
      />,
    )

    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(screen.getByRole('img', { name: 'A window' })).toBeInTheDocument()
  })

  it('keeps its label as its name when a caller passes another', () => {
    const callerProps: React.ComponentProps<'svg'> = {
      'aria-label': 'Decoration',
    }
    render(
      <Sticker
        art={windowArt}
        label="A window"
        roleClassNames={roleClassNames}
        {...callerProps}
      />,
    )

    expect(screen.getByRole('img', { name: 'A window' })).toBeInTheDocument()
  })

  it('forwards consumer attributes and classes to the image it renders', () => {
    render(
      <Sticker
        art={windowArt}
        label="A window"
        roleClassNames={roleClassNames}
        id="route-sticker"
        className="max-w-60 -rotate-3"
      />,
    )

    const image = screen.getByRole('img', { name: 'A window' })

    expect(image).toHaveAttribute('id', 'route-sticker')
    expect(image).toHaveClass('max-w-60', '-rotate-3')
  })
})
