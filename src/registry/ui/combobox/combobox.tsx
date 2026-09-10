import { useCombobox, useMultipleSelection } from 'downshift'
import { ChevronDown, X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { DismissableLayer, Popper } from 'radix-ui/internal'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  FieldLabelPlacement,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import { Spinner } from '@/registry/ui/spinner'

import {
  comboboxChevronClassName,
  comboboxClearIconClassName,
  comboboxEndSlotButtonClassName,
  comboboxEndSlotVariants,
  comboboxFieldVariants,
  comboboxInputVariants,
  comboboxListClassName,
  comboboxSpinnerErrorClassName,
  comboboxWrapperClassName,
} from './classnames'
import { ComboboxChip } from './combobox-chip'
import { ComboboxPanel } from './combobox-panel'
import { createComboboxStateReducer } from './combobox-state-reducer'
import { ComboboxSharedStateContext } from './context'
import { hasPanelContent } from './has-panel-content'
import { splitPanelChildren } from './split-panel-children'
import { spinnerSizeByComboboxSize } from './spinner-size-by-combobox-size'
import { toSelectedValues } from './to-selected-values'
import {
  type ComboboxItemEntry,
  ComboboxMode,
  ComboboxPanelAlign,
  ComboboxPanelSide,
  ComboboxSize,
} from './types'
import { useComboboxItemRegistry } from './use-combobox-item-registry'
import { useHighlightOnArrowOpen } from './use-highlight-on-arrow-open'

interface ComboboxBaseProps {
  label?: string
  error?: string
  size?: ComboboxSize
  loading?: boolean
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  'aria-describedby'?: string
  allowFreeText?: boolean
  inputValue?: string
  onInputValueChange?: (inputValue: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  side?: ComboboxPanelSide
  align?: ComboboxPanelAlign
  className?: string
  children?: React.ReactNode
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  mode: ComboboxMode.Single
  value: string | null
  onValueChange: (value: string | null) => void
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  mode: ComboboxMode.Multiple
  value: string[]
  onValueChange: (value: string[]) => void
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

// Downshift's own key handler runs after the caller's and only stands down when
// this flag is set on the native event; it is absent from downshift's typings.
function leaveKeyToTheCaret(event: React.KeyboardEvent) {
  ;(
    event.nativeEvent as KeyboardEvent & { preventDownshiftDefault?: boolean }
  ).preventDownshiftDefault = true
}

export function Combobox(props: ComboboxProps) {
  const {
    label,
    error,
    size = ComboboxSize.Default,
    loading = false,
    placeholder,
    disabled = false,
    id,
    name,
    required = false,
    'aria-describedby': callerDescribedBy,
    allowFreeText = false,
    inputValue,
    onInputValueChange,
    open,
    defaultOpen,
    onOpenChange,
    side = ComboboxPanelSide.Bottom,
    align = ComboboxPanelAlign.Start,
    className,
    children,
  } = props

  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const labelId = `${fieldId}-label`
  const hasError = Boolean(error)
  const isMultiple = props.mode === ComboboxMode.Multiple

  const { itemEntries, registerItem, labelForValue } = useComboboxItemRegistry()

  const selectedValues = toSelectedValues(props.value)
  const selectedEntries = selectedValues.map((selectedValue) => ({
    value: selectedValue,
    label: labelForValue(selectedValue) ?? selectedValue,
    disabled: false,
  }))
  const selectedLabel = isMultiple ? '' : (selectedEntries[0]?.label ?? '')

  const { listChildren, emptyChildren } = splitPanelChildren(children)
  const canOpen = hasPanelContent(children)

  const multipleSelection = useMultipleSelection<ComboboxItemEntry>({
    selectedItems: isMultiple ? selectedEntries : [],
    itemToKey: (entry) => entry?.value,
  })

  const {
    isOpen,
    highlightedIndex,
    inputValue: currentInputValue,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    closeMenu,
    setInputValue,
    setHighlightedIndex,
  } = useCombobox<ComboboxItemEntry>({
    items: itemEntries,
    itemToString: (entry) => entry?.label ?? '',
    itemToKey: (entry) => entry?.value,
    isItemDisabled: (entry) => entry.disabled,
    inputId: fieldId,
    labelId,
    menuId: `${fieldId}-listbox`,
    toggleButtonId: `${fieldId}-toggle`,
    selectedItem: isMultiple ? undefined : (selectedEntries[0] ?? null),
    isOpen: open,
    initialIsOpen: defaultOpen,
    inputValue,
    onInputValueChange: (changes) => onInputValueChange?.(changes.inputValue),
    onIsOpenChange: (changes) => onOpenChange?.(changes.isOpen),
    stateReducer: createComboboxStateReducer({
      mode: props.mode,
      allowFreeText,
      canOpen,
      selectedLabel,
    }),
  })

  const rememberArrowOpen = useHighlightOnArrowOpen({
    isOpen,
    itemEntries,
    highlightedIndex,
    setHighlightedIndex,
  })

  function pickEntry(entry: ComboboxItemEntry) {
    if (props.mode === ComboboxMode.Single) {
      props.onValueChange(entry.value)
      return
    }

    const nextValues = props.value.includes(entry.value)
      ? props.value.filter((selectedValue) => selectedValue !== entry.value)
      : [...props.value, entry.value]

    props.onValueChange(nextValues)
  }

  function removeValue(value: string) {
    if (props.mode === ComboboxMode.Single) {
      props.onValueChange(null)
      return
    }

    props.onValueChange(
      props.value.filter((selectedValue) => selectedValue !== value),
    )
  }

  function commitTypedText() {
    const typedText = currentInputValue.trim()

    if (props.mode !== ComboboxMode.Multiple) {
      return
    }

    if (typedText.length === 0 || props.value.includes(typedText)) {
      return
    }

    props.onValueChange([...props.value, typedText])
  }

  function clearField() {
    setInputValue('')

    if (props.mode === ComboboxMode.Single) {
      props.onValueChange(null)
      return
    }

    props.onValueChange([])
  }

  function handleEnter() {
    if (!isOpen) {
      return
    }

    const highlightedEntry = itemEntries[highlightedIndex]

    if (highlightedEntry && !highlightedEntry.disabled) {
      pickEntry(highlightedEntry)
      return
    }

    if (isMultiple && allowFreeText) {
      commitTypedText()
    }
  }

  function handleBackspace() {
    if (!isMultiple || currentInputValue.length > 0) {
      return
    }

    const lastValue = selectedValues.at(-1)

    if (lastValue !== undefined) {
      removeValue(lastValue)
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    rememberArrowOpen(event)

    if (event.key === 'Home' || event.key === 'End') {
      leaveKeyToTheCaret(event)
      return
    }

    if (event.key === 'Enter') {
      handleEnter()
    }

    if (event.key === 'Backspace') {
      handleBackspace()
    }
  }

  function handleInputBlur() {
    if (props.mode !== ComboboxMode.Single || !allowFreeText) {
      return
    }

    if (currentInputValue === selectedLabel) {
      return
    }

    props.onValueChange(currentInputValue.length > 0 ? currentInputValue : null)
  }

  function handleChipKeyDown(
    event: React.KeyboardEvent<HTMLSpanElement>,
    value: string,
  ) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      removeValue(value)
    }
  }

  const listProps = getMenuProps(
    { className: comboboxListClassName },
    { suppressRefError: true },
  )

  const inputProps = getInputProps({
    ...multipleSelection.getDropdownProps({ onKeyDown: handleInputKeyDown }),
    onBlur: handleInputBlur,
    disabled,
    placeholder,
    'aria-required': required || undefined,
    'aria-invalid': hasError || undefined,
    'aria-busy': loading || undefined,
    'aria-describedby': describedBy,
    className: comboboxInputVariants({ size }),
  })

  const toggleButtonProps = getToggleButtonProps({
    'aria-label': 'Show suggestions',
    className: comboboxEndSlotButtonClassName,
  })

  const hasContentToClear =
    currentInputValue.length > 0 || selectedValues.length > 0

  return (
    <div className={cn(comboboxWrapperClassName, className)}>
      {label ? (
        <label
          {...getLabelProps({
            className: fieldLabelVariants({
              placement: FieldLabelPlacement.Above,
              error: hasError,
              disabled,
              required,
            }),
          })}
        >
          {label}
        </label>
      ) : null}

      <ComboboxSharedStateContext
        value={{
          mode: props.mode,
          itemEntries,
          highlightedIndex,
          selectedValues,
          registerItem,
          pickEntry,
          getItemProps,
        }}
      >
        <Popper.Root>
          <Popper.Anchor asChild>
            <DismissableLayer.Branch asChild>
              <div
                className={comboboxFieldVariants({
                  size,
                  invalid: hasError,
                  disabled,
                })}
              >
                <AnimatePresence initial={false}>
                  {isMultiple
                    ? selectedEntries.map((entry, index) => (
                        <ComboboxChip
                          key={entry.value}
                          onRemove={() => removeValue(entry.value)}
                          {...multipleSelection.getSelectedItemProps({
                            selectedItem: entry,
                            index,
                            onKeyDown: (event) =>
                              handleChipKeyDown(event, entry.value),
                          })}
                        >
                          {entry.label}
                        </ComboboxChip>
                      ))
                    : null}
                </AnimatePresence>

                <input {...inputProps} />

                <div className={comboboxEndSlotVariants({ size })}>
                  {loading ? (
                    <Spinner
                      aria-hidden
                      size={spinnerSizeByComboboxSize[size]}
                      className={
                        hasError ? comboboxSpinnerErrorClassName : undefined
                      }
                    />
                  ) : null}

                  {!loading && hasContentToClear ? (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label="Clear selection"
                      className={comboboxEndSlotButtonClassName}
                      onClick={clearField}
                    >
                      <X aria-hidden className={comboboxClearIconClassName} />
                    </button>
                  ) : null}

                  {!loading && !hasContentToClear ? (
                    <button type="button" {...toggleButtonProps}>
                      <ChevronDown
                        aria-hidden
                        className={comboboxChevronClassName}
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </DismissableLayer.Branch>
          </Popper.Anchor>

          <ComboboxPanel
            open={isOpen}
            side={side}
            align={align}
            listProps={listProps}
            emptyChildren={emptyChildren}
            onDismiss={closeMenu}
          >
            {listChildren}
          </ComboboxPanel>
        </Popper.Root>
      </ComboboxSharedStateContext>

      {name
        ? selectedValues.map((selectedValue) => (
            <input
              key={selectedValue}
              type="hidden"
              name={name}
              value={selectedValue}
            />
          ))
        : null}

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}
