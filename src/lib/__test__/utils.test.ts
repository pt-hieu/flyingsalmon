import { describe, expect, it } from 'vitest'

import { cn } from '@/lib/utils'

describe('cn', () => {
  it('joins the class names it is given', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('drops falsy and switched-off class names', () => {
    expect(
      cn('flex', false, null, undefined, { hidden: false, 'gap-2': true }),
    ).toBe('flex gap-2')
  })

  it('lets a later class override an earlier class for the same property', () => {
    expect(
      cn(
        'focus-visible:ring-offset-background focus-visible:ring-3',
        'focus-visible:ring-offset-card',
      ),
    ).toBe('focus-visible:ring-3 focus-visible:ring-offset-card')
  })
})
