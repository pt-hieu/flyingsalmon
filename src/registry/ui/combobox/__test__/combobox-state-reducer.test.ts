import { useCombobox } from 'downshift'
import type { UseComboboxState, UseComboboxStateChangeOptions } from 'downshift'
import { describe, expect, it } from 'vitest'

import {
  createComboboxStateReducer,
  type ComboboxStateReducerOptions,
} from '@/registry/ui/combobox/combobox-state-reducer'
import {
  type ComboboxItemEntry,
  ComboboxMode,
} from '@/registry/ui/combobox/types'

type ComboboxStateChange = UseComboboxStateChangeOptions<ComboboxItemEntry>

const paris: ComboboxItemEntry = {
  value: 'paris',
  label: 'Paris',
  disabled: false,
}
const rome: ComboboxItemEntry = {
  value: 'rome',
  label: 'Rome',
  disabled: false,
}

const singleOptions: ComboboxStateReducerOptions = {
  mode: ComboboxMode.Single,
  allowFreeText: false,
  canOpen: true,
  selectedLabel: 'Paris',
}

const multipleOptions: ComboboxStateReducerOptions = {
  ...singleOptions,
  mode: ComboboxMode.Multiple,
  selectedLabel: '',
}

const openWhileTyping: UseComboboxState<ComboboxItemEntry> = {
  isOpen: true,
  highlightedIndex: 1,
  inputValue: 'Ro',
  selectedItem: paris,
}

function reduce(
  options: ComboboxStateReducerOptions,
  state: UseComboboxState<ComboboxItemEntry>,
  type: ComboboxStateChange['type'],
  changes: ComboboxStateChange['changes'],
) {
  return createComboboxStateReducer(options)(state, {
    type,
    changes,
  } as ComboboxStateChange)
}

describe('createComboboxStateReducer', () => {
  it('closes on Escape but keeps the typed text and the selection', () => {
    expect(
      reduce(
        singleOptions,
        openWhileTyping,
        useCombobox.stateChangeTypes.InputKeyDownEscape,
        { isOpen: false, inputValue: '', selectedItem: null },
      ),
    ).toEqual({ isOpen: false, inputValue: 'Ro', selectedItem: paris })
  })

  it('drops the highlight while the user types', () => {
    expect(
      reduce(
        singleOptions,
        openWhileTyping,
        useCombobox.stateChangeTypes.InputChange,
        { isOpen: true, inputValue: 'Rom', highlightedIndex: 0 },
      ),
    ).toEqual({ isOpen: true, inputValue: 'Rom', highlightedIndex: -1 })
  })

  it('leaves the panel and highlight as they were when the input is clicked', () => {
    expect(
      reduce(
        singleOptions,
        openWhileTyping,
        useCombobox.stateChangeTypes.InputClick,
        { isOpen: false, highlightedIndex: -1 },
      ),
    ).toEqual({ isOpen: true, highlightedIndex: 1 })
  })

  it('restores the selected label and keeps the selection when a single combobox loses focus', () => {
    expect(
      reduce(
        singleOptions,
        openWhileTyping,
        useCombobox.stateChangeTypes.InputBlur,
        {
          isOpen: false,
          highlightedIndex: -1,
          selectedItem: rome,
          inputValue: 'Rome',
        },
      ),
    ).toEqual({
      isOpen: false,
      highlightedIndex: -1,
      selectedItem: paris,
      inputValue: 'Paris',
    })
  })

  it.each([
    ['a free-text combobox', { ...singleOptions, allowFreeText: true }],
    ['a multiple combobox', multipleOptions],
  ])('keeps the typed text when %s loses focus', (_description, options) => {
    expect(
      reduce(options, openWhileTyping, useCombobox.stateChangeTypes.InputBlur, {
        isOpen: false,
        highlightedIndex: -1,
        selectedItem: rome,
        inputValue: 'Rome',
      }),
    ).toEqual({
      isOpen: false,
      highlightedIndex: -1,
      selectedItem: paris,
      inputValue: 'Ro',
    })
  })

  it.each([
    ['Enter', useCombobox.stateChangeTypes.InputKeyDownEnter],
    ['an item click', useCombobox.stateChangeTypes.ItemClick],
  ])(
    'closes a single combobox on the pick made by %s',
    (_description, type) => {
      const pickRome = {
        isOpen: false,
        highlightedIndex: -1,
        selectedItem: rome,
        inputValue: 'Rome',
      }

      expect(reduce(singleOptions, openWhileTyping, type, pickRome)).toEqual(
        pickRome,
      )
    },
  )

  it.each([
    [
      'Enter on a highlighted item',
      useCombobox.stateChangeTypes.InputKeyDownEnter,
    ],
    ['an item click', useCombobox.stateChangeTypes.ItemClick],
  ])(
    'keeps a multiple combobox open with a cleared input after %s',
    (_description, type) => {
      expect(
        reduce(multipleOptions, openWhileTyping, type, {
          isOpen: false,
          highlightedIndex: -1,
          selectedItem: rome,
          inputValue: 'Rome',
        }),
      ).toEqual({
        isOpen: true,
        highlightedIndex: 1,
        selectedItem: rome,
        inputValue: '',
      })
    },
  )

  it('closes a multiple combobox on Enter when nothing is highlighted', () => {
    expect(
      reduce(
        multipleOptions,
        { ...openWhileTyping, highlightedIndex: -1 },
        useCombobox.stateChangeTypes.InputKeyDownEnter,
        {},
      ),
    ).toEqual({ isOpen: false })
  })

  it('keeps a free-text multiple combobox open with a cleared input when Enter commits typed text', () => {
    expect(
      reduce(
        { ...multipleOptions, allowFreeText: true },
        { ...openWhileTyping, highlightedIndex: -1 },
        useCombobox.stateChangeTypes.InputKeyDownEnter,
        {},
      ),
    ).toEqual({ isOpen: true, highlightedIndex: -1, inputValue: '' })
  })

  it('never opens while the combobox cannot open', () => {
    const closedOptions = { ...singleOptions, canOpen: false }
    const closedState = { ...openWhileTyping, isOpen: false }

    expect(
      reduce(
        closedOptions,
        closedState,
        useCombobox.stateChangeTypes.InputChange,
        { isOpen: true, inputValue: 'R', highlightedIndex: 0 },
      ),
    ).toEqual({ isOpen: false, inputValue: 'R', highlightedIndex: -1 })
    expect(
      reduce(
        closedOptions,
        closedState,
        useCombobox.stateChangeTypes.InputKeyDownArrowDown,
        { isOpen: true, highlightedIndex: 0 },
      ),
    ).toEqual({ isOpen: false, highlightedIndex: 0 })
  })

  it('passes other changes through untouched', () => {
    expect(
      reduce(
        singleOptions,
        { ...openWhileTyping, isOpen: false },
        useCombobox.stateChangeTypes.InputKeyDownArrowDown,
        { isOpen: true, highlightedIndex: 0 },
      ),
    ).toEqual({ isOpen: true, highlightedIndex: 0 })
  })
})
