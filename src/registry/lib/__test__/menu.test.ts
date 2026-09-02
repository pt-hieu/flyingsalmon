import { describe, expect, it } from 'vitest'

import {
  menuContent,
  menuItem,
  menuItemDestructive,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'

describe('menu class strings', () => {
  it('sizes the panel to the popover surface with the fixed geometry from #52', () => {
    expect(menuContent).toContain('bg-popover')
    expect(menuContent).toContain('text-popover-foreground')
    expect(menuContent).toContain('border-border')
    expect(menuContent).toContain('rounded-lg')
    expect(menuContent).toContain('p-1')
    expect(menuContent).toContain('min-w-32')
    expect(menuContent).toContain('z-50')
  })

  it('sizes an item at the 32px row height shared with button sm and input sm', () => {
    expect(menuItem).toContain('h-8')
    expect(menuItem).toContain('px-2')
    expect(menuItem).toContain('gap-2')
    expect(menuItem).toContain('text-sm')
    expect(menuItem).toContain('rounded-md')
  })

  it('disables an item through the Radix data-disabled attribute', () => {
    expect(menuItem).toContain('data-disabled:opacity-50')
    expect(menuItem).toContain('data-disabled:pointer-events-none')
  })

  it('steps the highlighted item to the accent surface with no transition', () => {
    expect(menuItemHighlighted).toContain('data-highlighted:bg-accent')
    expect(menuItemHighlighted).toContain(
      'data-highlighted:text-accent-foreground',
    )
    expect(menuItemHighlighted).not.toContain('transition')
  })

  it('steps a highlighted destructive item to the error surface, red at rest', () => {
    expect(menuItemDestructive).toContain('text-destructive')
    expect(menuItemDestructive).toContain('data-highlighted:bg-error')
    expect(menuItemDestructive).toContain(
      'data-highlighted:text-error-foreground',
    )
  })

  it('reserves a fixed size-4 box for the icon slot', () => {
    expect(menuItemIconSlot).toContain('size-4')
    expect(menuItemIconSlot).toContain('shrink-0')
  })

  it('renders a non-interactive muted label', () => {
    expect(menuLabel).toBe(
      'px-2 py-1.5 text-xs font-medium text-muted-foreground',
    )
  })

  it('renders a hairline separator on the border color', () => {
    expect(menuSeparator).toBe('-mx-1 my-1 h-px bg-border')
  })
})
