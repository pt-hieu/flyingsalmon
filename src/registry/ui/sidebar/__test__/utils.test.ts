import { createElement } from 'react'
import { describe, expect, it } from 'vitest'

import { slottedItem } from '@/registry/ui/sidebar/utils'

describe('slottedItem', () => {
  it('returns the single element it is given', () => {
    const link = createElement('a', { href: '/trips/lisbon' }, 'Lisbon')

    expect(slottedItem(link)).toBe(link)
  })

  it.each([
    ['text', 'Lisbon'],
    [
      'several elements',
      [
        createElement('a', { key: 'lisbon' }),
        createElement('a', { key: 'porto' }),
      ],
    ],
  ])('rejects %s', (_kind, children) => {
    expect(() => slottedItem(children)).toThrow(
      'SidebarItem with asChild takes a single element child',
    )
  })
})
