import { describe, expect, it } from 'vitest'

import {
  defaultPageLabel,
  pageItemLabel,
} from '@/registry/ui/pagination/page-labels'

describe('pageItemLabel', () => {
  it('names a page item by its number', () => {
    expect(pageItemLabel(5)).toBe('Page 5')
  })
})

describe('defaultPageLabel', () => {
  it('reads the position out of the page count', () => {
    expect(defaultPageLabel(3, 12)).toBe('Page 3 of 12')
  })
})
