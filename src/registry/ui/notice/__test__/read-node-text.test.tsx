import { describe, expect, it } from 'vitest'

import { readNodeText } from '@/registry/ui/notice/read-node-text'

describe('readNodeText', () => {
  it('reads the text of a nested element tree', () => {
    expect(
      readNodeText(
        <span>
          View <strong>the Da Nang trip</strong>
        </span>,
      ),
    ).toBe('View the Da Nang trip')
  })

  it('reads a number as its digits', () => {
    expect(readNodeText(<span>{6} days</span>)).toBe('6 days')
  })

  it('reads an element with no text as an empty string', () => {
    expect(readNodeText(<span />)).toBe('')
  })
})
