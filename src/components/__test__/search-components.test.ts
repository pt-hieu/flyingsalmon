import { describe, expect, it } from 'vitest'

import type { CatalogComponent } from '@/components/component-catalog'
import { ComponentCategory } from '@/components/component-catalog'
import {
  groupComponentsByCategory,
  searchComponents,
} from '@/components/search-components'

const dialog: CatalogComponent = {
  to: '/components/dialog',
  label: 'Dialog',
  category: ComponentCategory.SurfacesAndOverlays,
  aliases: ['modal', 'popup'],
  description: 'A modal surface over a scrim.',
}

const notice: CatalogComponent = {
  to: '/components/notice',
  label: 'Notice',
  category: ComponentCategory.Feedback,
  aliases: ['toast', 'banner'],
  description: 'One persistent message for a result with no visible home.',
}

const drawer: CatalogComponent = {
  to: '/components/drawer',
  label: 'Drawer',
  category: ComponentCategory.SurfacesAndOverlays,
  aliases: ['sheet'],
  description: 'A panel inset at the right edge of the viewport.',
}

const button: CatalogComponent = {
  to: '/components/button',
  label: 'Button',
  category: ComponentCategory.Inputs,
  aliases: ['action'],
  description: 'The action component, with a loading state.',
}

const components = [button, dialog, drawer, notice]

function labelsOf(matchedComponents: CatalogComponent[]) {
  return matchedComponents.map((component) => component.label)
}

describe('searchComponents', () => {
  it('returns every component in the given order for a blank query', () => {
    expect(labelsOf(searchComponents(components, '   '))).toEqual([
      'Button',
      'Dialog',
      'Drawer',
      'Notice',
    ])
  })

  it('matches the name case-insensitively as a substring', () => {
    expect(labelsOf(searchComponents(components, 'DIAL'))).toEqual(['Dialog'])
  })

  it('matches an alias', () => {
    expect(labelsOf(searchComponents(components, 'toast'))).toEqual(['Notice'])
  })

  it('matches the category label', () => {
    expect(labelsOf(searchComponents(components, 'overlays'))).toEqual([
      'Dialog',
      'Drawer',
    ])
  })

  it('matches the description', () => {
    expect(labelsOf(searchComponents(components, 'viewport'))).toEqual([
      'Drawer',
    ])
  })

  it('requires every word to match some field', () => {
    expect(labelsOf(searchComponents(components, 'modal scrim'))).toEqual([
      'Dialog',
    ])
    expect(labelsOf(searchComponents(components, 'modal toast'))).toEqual([])
  })

  it('does not match misspellings', () => {
    expect(labelsOf(searchComponents(components, 'dialgo'))).toEqual([])
  })

  it('ranks name and alias matches above description matches', () => {
    const buttonDescribingASheet = {
      ...button,
      description: 'An action that opens a sheet.',
    }

    expect(
      labelsOf(searchComponents([buttonDescribingASheet, drawer], 'sheet')),
    ).toEqual(['Drawer', 'Button'])
  })
})

describe('groupComponentsByCategory', () => {
  it('groups in category order, sorts each group by name, and drops empty categories', () => {
    expect(
      groupComponentsByCategory([notice, drawer, button, dialog]).map(
        (group) => ({ label: group.label, names: labelsOf(group.components) }),
      ),
    ).toEqual([
      { label: 'Inputs', names: ['Button'] },
      { label: 'Feedback', names: ['Notice'] },
      { label: 'Surfaces & overlays', names: ['Dialog', 'Drawer'] },
    ])
  })
})
