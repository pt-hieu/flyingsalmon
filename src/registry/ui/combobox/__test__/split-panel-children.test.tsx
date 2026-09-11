import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  ComboboxEmpty,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
} from '@/registry/ui/combobox'
import { splitPanelChildren } from '@/registry/ui/combobox/split-panel-children'

describe('splitPanelChildren', () => {
  it('pulls the empty message out and keeps everything else in order', () => {
    const { listChildren, emptyChildren } = splitPanelChildren([
      <ComboboxLabel key="europe">Europe</ComboboxLabel>,
      <ComboboxEmpty key="empty">No city matches</ComboboxEmpty>,
      <ComboboxSeparator key="separator" />,
      'Asia',
    ])

    render(
      <>
        <section aria-label="List">{listChildren}</section>
        <section aria-label="Empty">{emptyChildren}</section>
      </>,
    )

    const list = screen.getByRole('region', { name: 'List' })
    const empty = screen.getByRole('region', { name: 'Empty' })

    expect(list).toHaveTextContent('EuropeAsia')
    expect(within(list).getByRole('separator')).toBeInTheDocument()
    expect(empty).toHaveTextContent(/^No city matches$/)
  })

  it('leaves the empty slot empty when there is no empty message', () => {
    const { listChildren, emptyChildren } = splitPanelChildren(
      <ComboboxItem value="paris">Paris</ComboboxItem>,
    )

    expect(listChildren).toHaveLength(1)
    expect(emptyChildren).toEqual([])
  })
})
