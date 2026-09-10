import { readdirSync, readFileSync } from 'node:fs'
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

const siteStylesheet = readFileSync(
  resolve(process.cwd(), 'src/styles.css'),
  'utf-8',
)

function animationVariables(item: RegistryItem) {
  return Object.entries(item.cssVars?.theme ?? {}).filter(([name]) =>
    name.startsWith('animate-'),
  )
}

function keyframeName(animationValue: string) {
  return `@keyframes ${animationValue.split(' ')[0]}`
}

const animatedItems = registry.items.filter(
  (item) => animationVariables(item).length > 0,
)

const componentsDirectory = resolve(process.cwd(), 'src/registry/ui')

const referencedAnimationClasses = [
  ...new Set(
    readdirSync(componentsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((entry) => {
        const classnamesPath = resolve(
          componentsDirectory,
          entry.name,
          'classnames.ts',
        )

        try {
          return [
            ...readFileSync(classnamesPath, 'utf-8').matchAll(
              /animate-[a-z0-9-]+/g,
            ),
          ].map((match) => match[0])
        } catch {
          return []
        }
      }),
  ),
].toSorted()

describe('registry animations', () => {
  it.each(animatedItems.map((item) => [item.name, item] as const))(
    'the %s item ships a keyframe for every animation variable it declares',
    (_name, item) => {
      const shippedKeyframes = Object.keys(item.css ?? {})
      const missingKeyframes = animationVariables(item)
        .map(([, value]) => keyframeName(value))
        .filter((keyframe) => !shippedKeyframes.includes(keyframe))

      expect(missingKeyframes).toEqual([])
    },
  )

  it('ships an animation variable and keyframe for every animate class a component uses', () => {
    expect(referencedAnimationClasses.length).toBeGreaterThan(0)

    const unshipped = referencedAnimationClasses.filter(
      (animationClass) =>
        !animatedItems.some((item) =>
          animationVariables(item).some(
            ([name, value]) =>
              name === animationClass &&
              Object.keys(item.css ?? {}).includes(keyframeName(value)),
          ),
        ),
    )

    expect(unshipped).toEqual([])
  })

  it('mirrors every animation variable between the registry and the site stylesheet', () => {
    const declaredInRegistry = animatedItems
      .flatMap(animationVariables)
      .map(([name]) => name)
      .toSorted()

    const declaredInStylesheet = [
      ...new Set(
        [...siteStylesheet.matchAll(/--(animate-[a-z0-9-]+):/g)].map(
          (match) => match[1],
        ),
      ),
    ].toSorted()

    expect(declaredInStylesheet).toEqual(declaredInRegistry)
  })
})
