import { Check } from 'lucide-react'
import { useLayoutEffect } from 'radix-ui/internal'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import {
  comboboxItemClassName,
  comboboxItemDescriptionClassName,
  comboboxItemIconSlotClassName,
  comboboxItemIndicatorIconClassName,
  comboboxItemLabelClassName,
} from './classnames'
import { ComboboxMode } from './types'
import { useComboboxSharedState } from './use-combobox-shared-state'

export interface ComboboxItemProps extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  value: string
  disabled?: boolean
  description?: string
  icon?: React.ReactNode
  children: string
}

export function ComboboxItem({
  value,
  disabled = false,
  description,
  icon,
  className,
  children,
  ...props
}: ComboboxItemProps) {
  const {
    mode,
    itemEntries,
    highlightedIndex,
    selectedValues,
    registerItem,
    pickEntry,
    getItemProps,
  } = useComboboxSharedState()

  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const declaredEntry = useMemo(
    () => ({ value, label: children, disabled }),
    [value, children, disabled],
  )

  useLayoutEffect(() => {
    if (!element) {
      return
    }

    return registerItem(element, declaredEntry)
  }, [element, registerItem, declaredEntry])

  const index = itemEntries.findIndex((entry) => entry.value === value)
  const entry = itemEntries[index] ?? declaredEntry

  const isSelected = selectedValues.includes(value)
  const isHighlighted = index >= 0 && index === highlightedIndex
  const handleClick = disabled ? undefined : () => pickEntry(entry)

  return (
    <div
      {...getItemProps({
        ref: setElement,
        item: entry,
        index,
        'aria-selected': isSelected,
        'data-highlighted': isHighlighted ? '' : undefined,
        'data-disabled': disabled ? '' : undefined,
        onClick: handleClick,
        className: cn(comboboxItemClassName, className),
        ...props,
      })}
    >
      {icon ? (
        <span aria-hidden className={comboboxItemIconSlotClassName}>
          {icon}
        </span>
      ) : null}

      <span className={comboboxItemLabelClassName}>{children}</span>

      {description ? (
        <span className={comboboxItemDescriptionClassName}>{description}</span>
      ) : null}

      {mode === ComboboxMode.Multiple ? (
        <span className={comboboxItemIconSlotClassName}>
          {isSelected ? (
            <Check aria-hidden className={comboboxItemIndicatorIconClassName} />
          ) : null}
        </span>
      ) : null}
    </div>
  )
}
