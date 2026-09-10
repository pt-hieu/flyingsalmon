import { Children, isValidElement } from 'react'

import { ComboboxEmpty } from './combobox-empty'

export function splitPanelChildren(children: React.ReactNode) {
  const listChildren: React.ReactNode[] = []
  const emptyChildren: React.ReactNode[] = []

  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === ComboboxEmpty) {
      emptyChildren.push(child)
    } else {
      listChildren.push(child)
    }
  }

  return { listChildren, emptyChildren }
}
