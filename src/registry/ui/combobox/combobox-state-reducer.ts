import { useCombobox } from 'downshift'
import type { UseComboboxState, UseComboboxStateChangeOptions } from 'downshift'

import { type ComboboxItemEntry, ComboboxMode } from './types'

export interface ComboboxStateReducerOptions {
  mode: ComboboxMode
  allowFreeText: boolean
  canOpen: boolean
  selectedLabel: string
}

type ComboboxState = UseComboboxState<ComboboxItemEntry>
type ComboboxStateChanges = Partial<ComboboxState>

function stayOpenAfterPick(
  state: ComboboxState,
  changes: ComboboxStateChanges,
): ComboboxStateChanges {
  return {
    ...changes,
    isOpen: true,
    inputValue: '',
    highlightedIndex: state.highlightedIndex,
  }
}

function reduceMultipleEnter(
  state: ComboboxState,
  changes: ComboboxStateChanges,
  { allowFreeText }: ComboboxStateReducerOptions,
): ComboboxStateChanges {
  const hasHighlight = state.highlightedIndex >= 0
  const commitsTypedText = allowFreeText && state.inputValue.length > 0

  if (!hasHighlight && !commitsTypedText) {
    return { ...changes, isOpen: false }
  }

  return stayOpenAfterPick(state, changes)
}

function reduceWithVetoes(
  state: ComboboxState,
  { type, changes }: UseComboboxStateChangeOptions<ComboboxItemEntry>,
  options: ComboboxStateReducerOptions,
): ComboboxStateChanges {
  const isMultiple = options.mode === ComboboxMode.Multiple

  switch (type) {
    case useCombobox.stateChangeTypes.InputKeyDownEscape:
      return {
        ...changes,
        isOpen: false,
        inputValue: state.inputValue,
        selectedItem: state.selectedItem,
      }

    case useCombobox.stateChangeTypes.InputChange:
      return { ...changes, highlightedIndex: -1 }

    case useCombobox.stateChangeTypes.InputClick:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      }

    case useCombobox.stateChangeTypes.InputBlur:
      return {
        ...changes,
        isOpen: false,
        selectedItem: state.selectedItem,
        inputValue:
          isMultiple || options.allowFreeText
            ? state.inputValue
            : options.selectedLabel,
      }

    case useCombobox.stateChangeTypes.InputKeyDownEnter:
      return isMultiple ? reduceMultipleEnter(state, changes, options) : changes

    case useCombobox.stateChangeTypes.ItemClick:
      return isMultiple ? stayOpenAfterPick(state, changes) : changes

    case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
    case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
    case useCombobox.stateChangeTypes.InputKeyDownHome:
    case useCombobox.stateChangeTypes.InputKeyDownEnd:
    case useCombobox.stateChangeTypes.InputKeyDownPageUp:
    case useCombobox.stateChangeTypes.InputKeyDownPageDown:
    case useCombobox.stateChangeTypes.MenuMouseLeave:
    case useCombobox.stateChangeTypes.ItemMouseMove:
    case useCombobox.stateChangeTypes.ToggleButtonClick:
    case useCombobox.stateChangeTypes.FunctionToggleMenu:
    case useCombobox.stateChangeTypes.FunctionOpenMenu:
    case useCombobox.stateChangeTypes.FunctionCloseMenu:
    case useCombobox.stateChangeTypes.FunctionSetHighlightedIndex:
    case useCombobox.stateChangeTypes.FunctionSelectItem:
    case useCombobox.stateChangeTypes.FunctionSetInputValue:
    case useCombobox.stateChangeTypes.FunctionReset:
    case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
      return changes

    default: {
      const unhandledType: never = type
      void unhandledType
      return changes
    }
  }
}

export function createComboboxStateReducer(
  options: ComboboxStateReducerOptions,
) {
  return function comboboxStateReducer(
    state: ComboboxState,
    stateChangeOptions: UseComboboxStateChangeOptions<ComboboxItemEntry>,
  ): ComboboxStateChanges {
    const changes = reduceWithVetoes(state, stateChangeOptions, options)

    if (changes.isOpen && !options.canOpen) {
      return { ...changes, isOpen: false }
    }

    return changes
  }
}
