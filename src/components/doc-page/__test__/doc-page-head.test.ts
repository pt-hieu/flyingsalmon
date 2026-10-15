import { describe, expect, it } from 'vitest'

import { docPageHead } from '../doc-page-head'

describe('docPageHead', () => {
  it('names the page in the title and describes it with its lead', () => {
    expect(
      docPageHead('Date picker', 'A field for one date or a range.'),
    ).toEqual({
      meta: [
        { title: 'Date picker · flyingsalmon' },
        { name: 'description', content: 'A field for one date or a range.' },
      ],
    })
  })
})
