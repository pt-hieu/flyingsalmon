import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

const registryPath = resolve(process.cwd(), 'registry.json')
const registry = JSON.parse(readFileSync(registryPath, 'utf-8')) as {
  items: Array<{
    name: string
    type: string
    files?: Array<{ path: string; type: string }>
    registryDependencies?: string[]
    cssVars?: { theme?: Record<string, string> }
    css?: Record<string, unknown>
  }>
}

function findItem(name: string) {
  const item = registry.items.find((candidate) => candidate.name === name)
  if (!item) throw new Error(`registry.json has no item named "${name}"`)
  return item
}

describe('registry.json batch-2 prerequisites', () => {
  it('ships a CSS-only floating item with no files', () => {
    const floating = findItem('floating')

    expect(floating.files).toBeUndefined()

    const animateVariableNames = Object.keys(floating.cssVars?.theme ?? {})
    expect(animateVariableNames).toHaveLength(6)
    expect(animateVariableNames).toEqual(
      expect.arrayContaining([
        'animate-floating-anchored-enter',
        'animate-floating-anchored-exit',
        'animate-floating-dialog-enter',
        'animate-floating-dialog-exit',
        'animate-floating-overlay-enter',
        'animate-floating-overlay-exit',
      ]),
    )

    const keyframeNames = Object.keys(floating.css ?? {})
    expect(keyframeNames).toHaveLength(6)
    expect(keyframeNames).toEqual(
      expect.arrayContaining([
        '@keyframes floating-anchored-enter',
        '@keyframes floating-anchored-exit',
        '@keyframes floating-dialog-enter',
        '@keyframes floating-dialog-exit',
        '@keyframes floating-overlay-enter',
        '@keyframes floating-overlay-exit',
      ]),
    )
  })

  it('ships a dependency-free menu lib item exporting the shared item class strings', () => {
    const menu = findItem('menu')

    expect(menu.type).toBe('registry:lib')
    expect(menu.files).toEqual([
      { path: 'src/registry/lib/menu.ts', type: 'registry:lib' },
    ])
  })

  it('wires floating and menu as registryDependencies of their batch-2 consumers', () => {
    expect(findItem('dialog').registryDependencies).toContain(
      '@flyingsalmon/floating',
    )
    expect(findItem('tooltip').registryDependencies).toContain(
      '@flyingsalmon/floating',
    )
    expect(findItem('dropdown-menu').registryDependencies).toEqual(
      expect.arrayContaining(['@flyingsalmon/floating', '@flyingsalmon/menu']),
    )
    expect(findItem('select').registryDependencies).toEqual(
      expect.arrayContaining([
        '@flyingsalmon/floating',
        '@flyingsalmon/menu',
        '@flyingsalmon/field',
      ]),
    )
  })

  it('moves the light popover surface to neutral-50 while dark keeps neutral-900', () => {
    const theme = findItem('theme') as unknown as {
      cssVars: { light: Record<string, string>; dark: Record<string, string> }
    }

    expect(theme.cssVars.light.popover).toBe('var(--color-neutral-50)')
    expect(theme.cssVars.dark.popover).toBe('var(--color-neutral-900)')
  })
})
