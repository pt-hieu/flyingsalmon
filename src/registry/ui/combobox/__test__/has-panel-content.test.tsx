import { describe, expect, it } from 'vitest'

import {
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
} from '@/registry/ui/combobox'
import { hasPanelContent } from '@/registry/ui/combobox/has-panel-content'

describe('hasPanelContent', () => {
  it('counts an item as panel content', () => {
    expect(
      hasPanelContent(<ComboboxItem value="paris">Paris</ComboboxItem>),
    ).toBe(true)
  })

  it('counts an empty message as panel content', () => {
    expect(
      hasPanelContent(<ComboboxEmpty>No city matches</ComboboxEmpty>),
    ).toBe(true)
  })

  it('finds an item nested inside a group and a fragment', () => {
    expect(
      hasPanelContent(
        <ComboboxGroup>
          <ComboboxLabel>Europe</ComboboxLabel>
          <>
            <ComboboxItem value="paris">Paris</ComboboxItem>
          </>
        </ComboboxGroup>,
      ),
    ).toBe(true)
  })

  it('does not count labels, separators, or plain markup', () => {
    expect(
      hasPanelContent([
        <ComboboxGroup key="europe">
          <ComboboxLabel>Europe</ComboboxLabel>
        </ComboboxGroup>,
        <ComboboxSeparator key="separator" />,
        <p key="note">Popular cities</p>,
      ]),
    ).toBe(false)
  })

  it.each([
    ['nothing', null],
    ['an empty list', []],
    ['text', 'No cities yet'],
  ])('finds no panel content in %s', (_description, children) => {
    expect(hasPanelContent(children)).toBe(false)
  })
})
