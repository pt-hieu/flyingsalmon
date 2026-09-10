import { Children, isValidElement } from 'react'

import { ComboboxEmpty } from './combobox-empty'
import { ComboboxItem } from './combobox-item'

export function hasPanelContent(children: React.ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement<{ children?: React.ReactNode }>(child)) {
      return false
    }

    if (child.type === ComboboxItem || child.type === ComboboxEmpty) {
      return true
    }

    return hasPanelContent(child.props.children)
  })
}
