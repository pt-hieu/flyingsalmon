import { Children, isValidElement } from 'react'

import { ComboboxGroup } from './combobox-group'
import { ComboboxLabel } from './combobox-label'
import { ComboboxSeparator } from './combobox-separator'

const panelStructureParts = new Set<unknown>([
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
])

function isContentComponent(type: unknown) {
  const isComponent = typeof type === 'function' || typeof type === 'object'

  return isComponent && !panelStructureParts.has(type)
}

export function hasPanelContent(children: React.ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement<{ children?: React.ReactNode }>(child)) {
      return false
    }

    if (isContentComponent(child.type)) {
      return true
    }

    return hasPanelContent(child.props.children)
  })
}
