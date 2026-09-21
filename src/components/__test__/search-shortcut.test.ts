import { describe, expect, it } from 'vitest'

import { isSearchShortcut } from '@/components/search-shortcut'

function keydown(key: string, init: KeyboardEventInit = {}, target?: Element) {
  const event = new KeyboardEvent('keydown', { key, ...init })
  Object.defineProperty(event, 'target', { value: target ?? document.body })
  return event
}

describe('isSearchShortcut', () => {
  it('accepts Command+K on Apple platforms and Control+K elsewhere', () => {
    expect(isSearchShortcut(keydown('k', { metaKey: true }), true)).toBe(true)
    expect(isSearchShortcut(keydown('k', { ctrlKey: true }), true)).toBe(false)
    expect(isSearchShortcut(keydown('k', { ctrlKey: true }), false)).toBe(true)
    expect(isSearchShortcut(keydown('k', { metaKey: true }), false)).toBe(false)
  })

  it('ignores a plain K', () => {
    expect(isSearchShortcut(keydown('k'), true)).toBe(false)
  })

  it('accepts a slash outside text fields only', () => {
    const textField = document.createElement('input')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    const textArea = document.createElement('textarea')
    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')

    expect(isSearchShortcut(keydown('/'), false)).toBe(true)
    expect(isSearchShortcut(keydown('/', {}, checkbox), false)).toBe(true)
    expect(isSearchShortcut(keydown('/', {}, textField), false)).toBe(false)
    expect(isSearchShortcut(keydown('/', {}, textArea), false)).toBe(false)
    expect(isSearchShortcut(keydown('/', {}, editable), false)).toBe(false)
  })
})
