import { describe, expect, it } from 'vitest'

import { toAnchorId, toConsumerSource } from '../utils'

describe('toConsumerSource', () => {
  it('points registry imports at the paths a consumer gets from shadcn add', () => {
    const source = [
      "import { cn } from '@/lib/utils'",
      "import { offsetFocusRingGeometry } from '@/registry/lib/interaction'",
      "import { Button } from '@/registry/ui/button'",
      "import { Dialog } from '@/registry/ui/dialog'",
      '',
    ].join('\n')

    expect(toConsumerSource(source)).toBe(
      [
        "import { cn } from '@/lib/utils'",
        "import { offsetFocusRingGeometry } from '@/lib/interaction'",
        "import { Button } from '@/components/ui/button'",
        "import { Dialog } from '@/components/ui/dialog'",
      ].join('\n'),
    )
  })

  it('leaves a registry path that is not an import specifier alone', () => {
    const source = 'const note = "files live in @/registry/ui/ here"'

    expect(toConsumerSource(source)).toBe(source)
  })
})

describe('toAnchorId', () => {
  it('turns a caption into a lowercase hyphenated id', () => {
    expect(toAnchorId('Server error, with a way back')).toBe(
      'server-error-with-a-way-back',
    )
  })
})
