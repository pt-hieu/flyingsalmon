import { describe, expect, it } from 'vitest'

import { rowsToHeight } from '@/registry/ui/textarea/utils'

describe('rowsToHeight', () => {
  it('sizes the field to hold the rows plus its borders and padding', () => {
    expect(rowsToHeight(3)).toBe('calc(3lh + 2px + 1rem)')
  })
})
