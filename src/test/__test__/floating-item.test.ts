import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

type RegistryItem = {
  name: string
  cssVars?: { theme?: Record<string, string> }
  css?: Record<string, unknown>
}

const registry = JSON.parse(
  readFileSync(resolve(process.cwd(), 'registry.json'), 'utf-8'),
) as { items: RegistryItem[] }

const floating = registry.items.find((item) => item.name === 'floating')

describe('floating registry item', () => {
  it('ships a keyframe for every animation variable it declares', () => {
    const animationVariables = Object.entries(floating?.cssVars?.theme ?? {})
    expect(animationVariables.length).toBeGreaterThan(0)

    const shippedKeyframes = Object.keys(floating?.css ?? {})
    const missingKeyframes = animationVariables
      .map(([, value]) => `@keyframes ${value.split(' ')[0]}`)
      .filter((keyframe) => !shippedKeyframes.includes(keyframe))

    expect(missingKeyframes).toEqual([])
  })
})
