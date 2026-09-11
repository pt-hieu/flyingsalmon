import { describe, expect, it } from 'vitest'

import { getInitials } from '@/registry/ui/avatar/utils'

describe('getInitials', () => {
  it.each([
    ['Ada Lovelace', 'AL'],
    ['Grace Brewster Murray Hopper', 'GH'],
    ['Prince', 'P'],
    ['katherine johnson', 'KJ'],
    ['  Alan   Turing  ', 'AT'],
  ])('turns %j into %j', (name, initials) => {
    expect(getInitials(name)).toBe(initials)
  })

  it.each([[''], ['   ']])(
    'gives no initials for the blank name %j',
    (name) => {
      expect(getInitials(name)).toBe('')
    },
  )
})
