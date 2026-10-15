import { createElement } from 'react'
import { describe, expect, it } from 'vitest'

import type { SidebarNestState } from '@/registry/ui/sidebar/types'
import { ownsCurrentMark, slottedItem } from '@/registry/ui/sidebar/utils'

function nestState(open: boolean, hasActiveChild: boolean): SidebarNestState {
  return {
    open,
    setOpen: () => {},
    itemsId: 'trip-days',
    hasActiveChild,
    registerActiveChild: () => () => {},
  }
}

describe('ownsCurrentMark', () => {
  it('marks a top-level item only when it is the current page', () => {
    expect(ownsCurrentMark(true, null, false)).toBe(true)
    expect(ownsCurrentMark(false, null, false)).toBe(false)
  })

  it('marks a current child only while its nest is open', () => {
    expect(ownsCurrentMark(true, nestState(true, true), true)).toBe(true)
    expect(ownsCurrentMark(true, nestState(false, true), true)).toBe(false)
  })

  it('hands the mark to the parent of a closed nest holding the current page', () => {
    expect(ownsCurrentMark(false, nestState(false, true), false)).toBe(true)
    expect(ownsCurrentMark(false, nestState(true, true), false)).toBe(false)
    expect(ownsCurrentMark(false, nestState(false, false), false)).toBe(false)
  })

  it('marks a parent that is itself the current page', () => {
    expect(ownsCurrentMark(true, nestState(true, false), false)).toBe(true)
  })
})

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
