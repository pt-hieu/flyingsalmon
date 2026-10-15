import { describe, expect, it } from 'vitest'

import { onlySingleElement } from '@/registry/ui/accordion/utils'

describe('onlySingleElement', () => {
  it('hands back the single element it is given', () => {
    const heading = <h3>Baggage allowance</h3>

    expect(onlySingleElement(heading)).toBe(heading)
  })

  it.each([
    ['plain text', 'Baggage allowance'],
    ['nothing', null],
    [
      'several elements',
      [<h3 key="baggage">Baggage</h3>, <h3 key="meals">Meals</h3>],
    ],
  ])(
    'rejects %s with an error that names the asChild contract',
    (_description, children) => {
      expect(() => onlySingleElement(children)).toThrow(/asChild/)
    },
  )
})
