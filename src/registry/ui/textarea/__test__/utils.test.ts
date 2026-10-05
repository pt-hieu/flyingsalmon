import { describe, expect, it } from 'vitest'

import { rowsToHeight } from '../utils'

describe('rowsToHeight', () => {
  it('fits the given number of lines inside the border and padding', () => {
    expect(rowsToHeight(3)).toBe('calc(3lh + 2px + 1rem)')
  })
})
