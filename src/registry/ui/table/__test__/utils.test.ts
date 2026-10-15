import { describe, expect, it } from 'vitest'

import { scrollRegionProps } from '../utils'

describe('scrollRegionProps', () => {
  it('adds nothing while the table fits', () => {
    expect(scrollRegionProps(false, 'Stops')).toEqual({})
  })

  it('makes an overflowing wrapper a focusable region named by the label', () => {
    expect(scrollRegionProps(true, 'Stops')).toEqual({
      role: 'region',
      tabIndex: 0,
      'aria-label': 'Stops',
    })
  })

  it('names an unlabelled overflowing wrapper as a scrollable table', () => {
    expect(scrollRegionProps(true, undefined)).toEqual({
      role: 'region',
      tabIndex: 0,
      'aria-label': 'Scrollable table',
    })
  })
})
